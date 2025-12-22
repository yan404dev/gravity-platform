'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, MOCK_EVENTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Event } from '../../(home)/_types/event';
import {
    EventEditFormData,
    eventEditSchema,
} from '../_schemas/event-edit.schema';

interface UseAdminDashboardProps {
    initialEvents: Event[];
    user: User;
}

export function useAdminDashboard({
    initialEvents,
    user,
}: UseAdminDashboardProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(
        initialEvents.length > 0 ? initialEvents[0] : null,
    );
    const { toast } = useToast();

    const handleSignOut = async () => {
        console.log('Sign out clicked');
        window.location.href = '/';
    };

    const refreshEvents = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setEvents(MOCK_EVENTS as unknown as Event[]);
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
        event.background_image_url,
    );
    const { toast } = useToast();

    const form = useForm<EventEditFormData>({
        resolver: zodResolver(eventEditSchema),
        defaultValues: {
            title: event.title,
            creator: (event as any).creator || '',
            description: (event as any).description || '',
            date: event.date,
            time: event.time,
            address: event.address,
            target_date: event.target_date,
        },
    });

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];

        // Quick validation
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'Error',
                description: 'Image too large (max 5MB)',
                variant: 'destructive',
            });
            return;
        }

        setUploading(true);
        try {
            console.log('Mock: Uploading admin image', file.name);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const publicUrl =
                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000';

            setCurrentImageUrl(publicUrl);
            toast({ title: 'Success', description: 'Image uploaded' });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: EventEditFormData) => {
        try {
            console.log('Mock: Updating event', event.id, data);
            await new Promise((resolve) => setTimeout(resolve, 500));

            toast({ title: 'Success', description: 'Event saved' });
            onSuccess();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
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
