"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eventsCarouselService } from './events-carousel.service';

export interface Event {
    id: string;
    title: string;
    background_image_url: string;
    address: string;
    date: string;
    time: string;
}

export const useEventsCarousel = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await eventsCarouselService.getCarouselEvents();

            if (data && !error) {
                setEvents(data);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (id: string) => {
        router.push(`/event/${id}`);
    };

    return {
        events,
        handleEventClick
    };
};
