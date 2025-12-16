import { supabase } from '@/integrations/supabase/client';

export const eventsCarouselService = {
    getCarouselEvents: async () => {
        return await supabase
            .from('events')
            .select('id, title, background_image_url, address, date, time')
            .order('target_date', { ascending: false })
            .limit(10);
    }
};
