"use client";

import { useState, useEffect, useMemo } from "react";
import { Event } from "../_types/event";

interface UseDiscoverProps {
    initialEvents: Event[];
}

export function useDiscover({ initialEvents }: UseDiscoverProps) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    // We can treat passed events as the source of truth. 
    // If we needed to re-fetch, we'd use SWR or another state. 
    // For now, we use the initialEvents passed from server.

    const [userCountry, setUserCountry] = useState<string>('the world');
    const [initialDateSet, setInitialDateSet] = useState(false);

    useEffect(() => {
        // Detect country on mount
        const getCountry = async () => {
            try {
                // Mocking country detection or using a public API
                // For simplicity in mocked version:
                setUserCountry('Mock Country');
            } catch (error) {
                console.error('Error detecting country:', error);
                setUserCountry('the world');
            }
        };
        getCountry();
    }, []);

    useEffect(() => {
        // Auto-select date if there are events today
        if (!initialDateSet && initialEvents.length > 0) {
            const today = new Date();
            const now = today.getTime();
            const oneHour = 1000 * 60 * 60;

            const hasEventsToday = initialEvents.some((event) => {
                const eventDate = new Date(event.target_date);
                const target = eventDate.getTime();
                const hasEnded = target < now - oneHour;

                if (hasEnded) return false;

                return (
                    eventDate.getFullYear() === today.getFullYear() &&
                    eventDate.getMonth() === today.getMonth() &&
                    eventDate.getDate() === today.getDate()
                );
            });

            if (hasEventsToday) {
                setDate(today);
            }
            setInitialDateSet(true);
        }
    }, [initialEvents, initialDateSet]);

    const filteredEvents = useMemo(() => {
        return initialEvents.filter((event) => {
            const now = new Date().getTime();
            const target = new Date(event.target_date).getTime();
            const oneHour = 1000 * 60 * 60;
            const hasEnded = target < now - oneHour;

            if (hasEnded) return false;

            if (!date) return true;

            const eventDate = new Date(event.target_date);
            const selectedDate = new Date(date);

            return (
                eventDate.getFullYear() === selectedDate.getFullYear() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getDate() === selectedDate.getDate()
            );
        });
    }, [initialEvents, date]);

    return {
        date,
        setDate,
        userCountry,
        filteredEvents,
    };
}
