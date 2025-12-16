import { supabase } from "@/integrations/supabase/client";
import { EditEventFormData } from "../_schemas/edit-event.schema";

export interface Registrant {
    display_name: string;
    registered_at: string;
}

export const eventOwnerService = {
    async verifyOwnership(eventId: string, userId: string): Promise<boolean> {
        const { data, error } = await supabase
            .from("events")
            .select("created_by")
            .eq("id", eventId)
            .single();

        if (error || !data) return false;
        return data.created_by === userId;
    },

    async getRegistrants(eventId: string): Promise<Registrant[]> {
        const { data, error } = await supabase
            .from("event_registrations")
            .select(`registered_at, profiles:user_id (display_name)`)
            .eq("event_id", eventId)
            .order("registered_at", { ascending: false });

        if (error) {
            console.error("Error fetching registrants:", error);
            return [];
        }

        type RegistrationResponse = {
            registered_at: string;
            profiles: { display_name: string | null } | null;
        };

        const registrations = data as unknown as RegistrationResponse[];

        return (
            registrations?.map((reg) => ({
                display_name: reg.profiles?.display_name || "Anonymous",
                registered_at: reg.registered_at,
            })) || []
        );
    },

    async updateEvent(
        id: string,
        data: EditEventFormData & {
            date: string;
            target_date: string;
            background_image_url?: string;
            creator: string;
        }
    ) {
        const { error } = await supabase
            .from("events")
            .update({
                title: data.eventName,
                description: data.description,
                date: data.date,
                time: `${data.startTime} - ${data.endTime}`,
                address: data.location,
                background_image_url: data.background_image_url,
                target_date: data.target_date,
                creator: data.creator,
            })
            .eq("id", id);

        if (error) throw error;
    },

    async deleteEvent(id: string) {
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) throw error;
    },

    async uploadImage(file: File): Promise<string> {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("event-images")
            .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
            data: { publicUrl },
        } = supabase.storage.from("event-images").getPublicUrl(fileName);

        return publicUrl;
    },
};
