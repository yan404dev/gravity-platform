import { supabase } from '@/integrations/supabase/client';
import { Event, eventSchema } from '../_types/event';
import { z } from 'zod';

export const eventService = {
    async getAll(): Promise<Event[]> {
        const { data, error } = await supabase
            .from('events')
            .select('id, title, date, time, background_image_url, target_date, address')
            .order('target_date', { ascending: true });

        if (error) throw error;

        // Validate data using Zod
        try {
            return z.array(eventSchema).parse(data);
        } catch (validationError) {
            console.error('Event data validation failed:', validationError);
            // Fallback or rethrow depending on strictness. 
            // For high quality, we might want to throw or filter invalid items.
            // Here we parse and might let it throw if critical data is missing.
            return [];
        }
    }
};
