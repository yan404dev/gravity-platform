import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/app/_types/event";

export const myEventsService = {
    async getCreatedEvents(userId: string): Promise<Event[]> {
        const { data, error } = await supabase
            .from("events")
            .select("id, title, date, time, background_image_url")
            .eq("created_by", userId)
            .order("target_date", { ascending: true });

        if (error) throw error;
        return (data as Event[]) || [];
    },

    async getRegisteredEvents(userId: string): Promise<Event[]> {
        const { data, error } = await supabase
            .from("event_registrations")
            .select(`
        event_id,
        events (
          id,
          title,
          date,
          time,
          background_image_url
        )
      `)
            .eq("user_id", userId);

        if (error) throw error;

        return (data?.map((r) => r.events).filter(Boolean) as Event[]) || [];
    },

    async deleteEvent(eventId: string): Promise<void> {
        const { error } = await supabase.from("events").delete().eq("id", eventId);
        if (error) throw error;
    },
};
