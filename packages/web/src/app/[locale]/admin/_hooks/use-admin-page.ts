'use client';

import { useEffect, useState } from 'react';
import { User, MOCK_USER, MOCK_EVENTS } from '@/lib/mock-data';
import { Event } from '../../(home)/_types/event';

export function useAdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setUser(MOCK_USER);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setEvents(MOCK_EVENTS as unknown as Event[]);
            setIsLoading(false);
        };

        loadData();
    }, []);

    return {
        isLoading,
        user,
        events,
    };
}
