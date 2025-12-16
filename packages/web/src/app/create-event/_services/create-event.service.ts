import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { User } from "@supabase/supabase-js";

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
        const { eventName, description, startDate, startTime, endTime, location, imageUrl, user } = params;

        const startDateTime = new Date(startDate);
        const [startHours, startMinutes] = startTime.split(':');

        // Create target date properly
        const targetDate = new Date(startDate);
        targetDate.setHours(parseInt(startHours) || 0, parseInt(startMinutes) || 0);

        const dateStr = format(startDate, 'MMMM dd, yyyy');
        const timeStr = `${startTime} - ${endTime}`;

        // Fetch user profile for display name
        const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('user_id', user.id)
            .single();

        const creatorName = profile?.display_name || user.email?.split('@')[0] || 'Anonymous';

        const { error: insertError } = await supabase
            .from('events')
            .insert({
                title: eventName,
                description: description,
                date: dateStr,
                time: timeStr,
                address: location,
                background_image_url: imageUrl,
                target_date: targetDate.toISOString(),
                creator: creatorName,
            });

        if (insertError) throw insertError;
    }
};
