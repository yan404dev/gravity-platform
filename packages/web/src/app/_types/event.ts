import { z } from "zod";

export const eventSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    time: z.string(),
    background_image_url: z.string().url(),
    target_date: z.string(),
    address: z.string(),
    description: z.string().optional(),
    creator: z.string().optional(),
});

export type Event = z.infer<typeof eventSchema>;
