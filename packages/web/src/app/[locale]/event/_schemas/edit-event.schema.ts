import { z } from 'zod';
import { EventFormData } from '@/shared/types/event-form.types';

export const editEventSchema = z.object({
    eventName: z.string().min(1, 'Event name is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
});

export type EditEventFormData = EventFormData;
