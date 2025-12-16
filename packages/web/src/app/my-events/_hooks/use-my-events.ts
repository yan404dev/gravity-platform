"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Event } from "@/app/_types/event";
import { myEventsService } from "../_services/my-events.service";

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
        loading: false, // Initial state is loaded from server
    });

    const refreshEvents = async () => {
        if (!user) return;
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const [created, registered] = await Promise.all([
                myEventsService.getCreatedEvents(user.id),
                myEventsService.getRegisteredEvents(user.id),
            ]);

            setState({
                createdEvents: created,
                registeredEvents: registered,
                loading: false,
            });
        } catch (error) {
            console.error("Error refreshing events:", error);
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        try {
            await myEventsService.deleteEvent(eventId);
            toast.success("Event deleted successfully");
            refreshEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Failed to delete event");
        }
    };

    return {
        ...state,
        handleDeleteEvent,
        refreshEvents,
    };
}
