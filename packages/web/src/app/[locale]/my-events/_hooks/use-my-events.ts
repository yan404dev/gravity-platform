'use client';

import { useState, useCallback } from 'react';
import { User, MOCK_EVENTS } from '@/lib/mock-data';
import { toast } from 'sonner';
import { Event } from '../../(home)/_types/event';

interface MyEventsState {
    createdEvents: Event[];
    registeredEvents: Event[];
    loading: boolean;
}

interface UseMyEventsProps {
    user: User;
    initialCreatedEvents: Event[];
    initialRegisteredEvents: Event[];
}

export function useMyEvents({
    user,
    initialCreatedEvents,
    initialRegisteredEvents,
}: UseMyEventsProps) {
    const [state, setState] = useState<MyEventsState>({
        createdEvents: initialCreatedEvents,
        registeredEvents: initialRegisteredEvents,
        loading: false,
    });

    const refreshEvents = useCallback(async () => {
        if (!user) return;
        setState((prev) => ({ ...prev, loading: true }));
        try {
            // Mock refresh
            await new Promise((resolve) => setTimeout(resolve, 500));

            setState({
                createdEvents: MOCK_EVENTS as unknown as Event[],
                registeredEvents: [
                    ...MOCK_EVENTS,
                ].reverse() as unknown as Event[],
                loading: false,
            });
        } catch (error) {
            console.error('Error refreshing events:', error);
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, [user]);

    const handleDeleteEvent = useCallback(async (eventId: string) => {
        try {
            // Mock delete
            console.log('Mock: Deleting', eventId);
            await new Promise((resolve) => setTimeout(resolve, 500));

            toast.success('Event deleted successfully');

            // Optimistic update or refresh
            setState((prev) => ({
                ...prev,
                createdEvents: prev.createdEvents.filter(
                    (e) => e.id !== eventId,
                ),
            }));
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event');
        }
    }, []);

    return {
        ...state,
        handleDeleteEvent,
        refreshEvents,
    };
}
