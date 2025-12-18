"use client";

import { useEffect, useState } from "react";
import { User, MOCK_EVENTS } from "@/lib/mock-data";
import { authService } from "@/lib/auth-store";
import { Event } from "../../_types/event";

export function useAdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const { data: { session } } = await authService.getSession();

            if (session) {
                setUser(session.user);
                // Simulate fetch delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setEvents(MOCK_EVENTS as unknown as Event[]);
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
