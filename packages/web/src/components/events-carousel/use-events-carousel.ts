"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_EVENTS } from '@/lib/mock-data';

import { Event } from '../../app/[locale]/_types/event';

export const useEventsCarousel = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Use Mock Data
        const mappedEvents = MOCK_EVENTS.map(e => ({
            id: e.id,
            title: e.title,
            background_image_url: e.background_image_url,
            address: e.address,
            date: e.date,
            time: e.time,
            target_date: e.target_date
        }));

        setEvents(mappedEvents);
    }, []);

    const handleEventClick = (id: string) => {
        router.push(`/event/${id}`);
    };

    return {
        events,
        handleEventClick
    };
};
