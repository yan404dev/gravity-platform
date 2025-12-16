"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/app/_types/event";
import { EventEditFormData, eventEditSchema } from "../_schemas/event-edit.schema";
import { adminService } from "../_services/admin.service";
import { supabase } from "@/integrations/supabase/client";

interface UseAdminDashboardProps {
    initialEvents: Event[];
    user: User;
}

export function useAdminDashboard({ initialEvents, user }: UseAdminDashboardProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(
        initialEvents.length > 0 ? initialEvents[0] : null
    );
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/auth");
    };

    const refreshEvents = async () => {
        const data = await adminService.getAllEvents();
        if (data) {
            setEvents(data);
        }
    };

    return {
        events,
        selectedEvent,
        setSelectedEvent,
        handleSignOut,
        refreshEvents,
    };
}

export function useEventEditForm({
    event,
    user,
    onSuccess,
}: {
    event: Event;
    user: User;
    onSuccess: () => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(
        event.background_image_url
    );
    const { toast } = useToast();

    const form = useForm<EventEditFormData>({
        resolver: zodResolver(eventEditSchema),
        defaultValues: {
            title: event.title,
            // @ts-ignore
            creator: (event as any).creator || "",
            // @ts-ignore
            description: (event as any).description || "",
            date: event.date,
            time: event.time,
            address: event.address,
            target_date: event.target_date,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];

        // Quick validation
        if (file.size > 5 * 1024 * 1024) {
            toast({ title: "Error", description: "Image too large (max 5MB)", variant: "destructive" });
            return;
        }

        setUploading(true);
        try {
            const publicUrl = await adminService.uploadImage(file, user.id, event.id);
            setCurrentImageUrl(publicUrl);
            toast({ title: "Success", description: "Image uploaded" });
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: EventEditFormData) => {
        try {
            await adminService.updateEvent(event.id, {
                ...data,
                background_image_url: currentImageUrl,
            });
            toast({ title: "Success", description: "Event saved" });
            onSuccess();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    return {
        form,
        uploading,
        currentImageUrl,
        handleImageUpload,
        onSubmit,
    };
}
