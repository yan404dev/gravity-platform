import { EventEditFormData } from "../_schemas/event-edit.schema";
import { Event } from "@/app/_types/event";
import { MOCK_EVENTS, MOCK_ADMIN } from "@/lib/mock-data";

export const adminService = {
    async isAdmin(userId: string): Promise<boolean> {
        // Mock check - just checking if ID matches our mock admin
        return userId === MOCK_ADMIN.id || userId === 'mock-admin-id';
    },

    async updateEvent(id: string, data: EventEditFormData & { background_image_url: string }) {
        console.log("Mock: Updating event", id, data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
    },

    async uploadImage(file: File, userId: string, eventId: string): Promise<string> {
        console.log("Mock: Uploading admin image");
        return "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000";
    },

    async getAllEvents(): Promise<Event[]> {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_EVENTS as unknown as Event[];
    }
};
