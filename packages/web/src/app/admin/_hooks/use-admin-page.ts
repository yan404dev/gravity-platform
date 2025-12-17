"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { adminService } from "../_services/admin.service";
import { Event } from "@/app/_types/event";

export function useAdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    router.push("/");
                    return;
                }

                const isAdmin = await adminService.isAdmin(session.user.id);
                if (!isAdmin) {
                    router.push("/");
                    return;
                }

                setUser(session.user);

                const { data } = await supabase.from("events").select("*");
                if (data) {
                    setEvents(data as Event[]);
                }
            } catch (error) {
                console.error("Auth check failed", error);
                router.push("/");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    return {
        isLoading,
        user,
        events
    };
}
