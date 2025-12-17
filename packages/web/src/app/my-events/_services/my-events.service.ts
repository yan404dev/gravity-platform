import { MOCK_EVENTS } from "@/lib/mock-data";
import { Event } from "@/app/_types/event";

export const myEventsService = {
    async getCreatedEvents(userId: string): Promise<Event[]> {
        // Return a subset of mock events to simulate "created by me"
        return MOCK_EVENTS as unknown as Event[];
    },

    async getRegisteredEvents(userId: string): Promise<Event[]> {
        // Return a subset of mock events to simulate "registered"
        // Just reversing the list to look different
        return [...MOCK_EVENTS].reverse() as unknown as Event[];
    },

    async deleteEvent(eventId: string): Promise<void> {
        console.log("Mock: Deleting event", eventId);
        await new Promise(resolve => setTimeout(resolve, 500));
    },
};
