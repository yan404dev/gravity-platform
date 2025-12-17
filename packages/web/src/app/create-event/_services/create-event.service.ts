import { format } from 'date-fns';
import { User } from "@/lib/mock-data";

interface CreateEventParams {
    eventName: string; // Changed from title
    description: string;
    startDate: Date;
    startTime: string;
    endTime: string;
    location: string;
    imageUrl: string;
    user: User;
}

export const createEventService = {
    async createEvent(params: CreateEventParams) {
        console.log("Mock: Creating event", params);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    }
};
