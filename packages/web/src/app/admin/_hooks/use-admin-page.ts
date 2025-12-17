"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/mock-data";
import { authService } from "@/services/auth.service";
import { adminService } from "../_services/admin.service";
import { Event } from "@/app/_types/event";

export function useAdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const { data: { session } } = await authService.getSession();

            if (session) {
                setUser(session.user);
                const data = await adminService.getAllEvents();
                if (data) {
                    setEvents(data);
                }
            }
            setIsLoading(false);
        };

        loadData();
    }, []);

    return {
        isLoading,
        user,
        events
    };
}
