import { MOCK_EVENTS } from '@/lib/mock-data';
import { Event } from '../_types/event';

export const eventService = {
    async getAll(): Promise<Event[]> {
        // Return mock events
        // In a real mock scenario, we might want to simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Cast to Event[] - we assume mock data matches structure enough
        return MOCK_EVENTS as unknown as Event[];
    }
};
