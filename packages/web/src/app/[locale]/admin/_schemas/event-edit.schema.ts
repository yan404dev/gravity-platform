import { z } from 'zod';

export const eventEditSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),
    creator: z
        .string()
        .trim()
        .min(1, 'Creator is required')
        .max(100, 'Creator must be less than 100 characters'),
    description: z
        .string()
        .trim()
        .min(1, 'Description is required')
        .max(2000, 'Description must be less than 2000 characters'),
    date: z
        .string()
        .trim()
        .min(1, 'Date is required')
        .max(50, 'Date must be less than 50 characters'),
    time: z
        .string()
        .trim()
        .min(1, 'Time is required')
        .max(50, 'Time must be less than 50 characters'),
    address: z
        .string()
        .trim()
        .min(1, 'Address is required')
        .max(300, 'Address must be less than 300 characters'),
    target_date: z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, 'Invalid date format'),
});

export type EventEditFormData = z.infer<typeof eventEditSchema>;
