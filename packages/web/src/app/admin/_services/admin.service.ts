import { supabase } from "@/integrations/supabase/client";
import { EventEditFormData } from "../_schemas/event-edit.schema";
import { User } from "@supabase/supabase-js";
import { Event } from "@/app/_types/event";

export const adminService = {
    async isAdmin(userId: string): Promise<boolean> {
        const { data: roles, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId)
            .eq("role", "admin")
            .single();

        if (error || !roles) return false;
        return true;
    },

    async updateEvent(id: string, data: EventEditFormData & { background_image_url: string }) {
        const targetDateISO = data.target_date.includes('T')
            ? new Date(data.target_date).toISOString()
            : data.target_date;

        const { error } = await supabase
            .from("events")
            .update({
                title: data.title.trim(),
                creator: data.creator.trim(),
                description: data.description.trim(),
                date: data.date.trim(),
                time: data.time.trim(),
                address: data.address.trim(),
                background_image_url: data.background_image_url,
                target_date: targetDateISO,
            })
            .eq("id", id);

        if (error) throw error;
    },

    async uploadImage(file: File, userId: string, eventId: string): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${eventId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('event-images')
            .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(fileName);

        return publicUrl;
    },

    async getAllEvents(): Promise<Event[]> {
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;
        return (data as any) || [];
    }
};
