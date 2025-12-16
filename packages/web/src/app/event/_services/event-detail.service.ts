import { supabase } from '@/integrations/supabase/client';
import { Event } from '../../_types/event';
import { z } from 'zod';

// We can reuse the schema or make a specific one if details differ (often they do for aggregations)
const eventDetailSchema = z.object({
    id: z.string(),
    title: z.string(),
    creator: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    address: z.string(),
    background_image_url: z.string(),
    target_date: z.string(),
});

export type EventDetail = z.infer<typeof eventDetailSchema>;

export const eventDetailService = {
    async getEventById(id: string): Promise<EventDetail | null> {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error('Error fetching event detail:', error);
            return null;
        }

        if (!data) return null;

        try {
            return eventDetailSchema.parse(data);
        } catch (e) {
            console.error('Event detail validation failed:', e);
            return null;
        }
    },

    async getRegistrationStatus(eventId: string, userId: string): Promise<boolean> {
        const { data } = await supabase
            .from('event_registrations')
            .select('id')
            .eq('user_id', userId)
            .eq('event_id', eventId)
            .maybeSingle();
        return !!data;
    },

    async registerUser(eventId: string, userId: string): Promise<void> {
        const { error } = await supabase
            .from('event_registrations')
            .insert({ user_id: userId, event_id: eventId });
        if (error) throw error;
    },

    async unregisterUser(eventId: string, userId: string): Promise<void> {
        const { error } = await supabase
            .from('event_registrations')
            .delete()
            .eq('user_id', userId)
            .eq('event_id', eventId);
        if (error) throw error;
    }
};
