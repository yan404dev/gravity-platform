'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/shared/lib/mock-data';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useGooglePlacesAutocomplete } from '@/shared/hooks/useGooglePlacesAutocomplete';
import {
    EditEventFormData,
    editEventSchema,
} from '../_schemas/edit-event.schema';
import { Event } from '../../(home)/_types/event';

interface UseEditEventProps {
    event: Event;
    user: User;
}

export function useEditEvent({ event, user }: UseEditEventProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>(
        event.target_date ? new Date(event.target_date) : undefined,
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        event.target_date ? new Date(event.target_date) : undefined,
    );

    const [imagePreview, setImagePreview] = useState<string>(
        event.background_image_url,
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    const locationInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [initialStartTime, initialEndTime] = event.time.split(' - ');

    const form = useForm<EditEventFormData>({
        resolver: zodResolver(editEventSchema),
        defaultValues: {
            eventName: event.title,
            description: event.description || '',
            location: event.address,
            startTime: initialStartTime || '',
            endTime: initialEndTime || '',
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = form;

    const { onPlaceSelected } = useGooglePlacesAutocomplete(locationInputRef);

    useEffect(() => {
        onPlaceSelected((place) => {
            const address = place.formatted_address || place.name || '';
            setValue('location', address);
        });
    }, [onPlaceSelected, setValue]);

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                return;
            }

            try {
                // Mock upload
                console.log('Mock: Uploading edit image', file.name);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const publicUrl =
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000';
                setImagePreview(publicUrl);
            } catch (error) {
                toast.error('Failed to upload image');
                console.error(error);
            }
        }
    };

    const onSubmit = async (data: EditEventFormData) => {
        if (!startDate || !endDate) {
            toast.error('Please select start and end dates');
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('Mock: Updating event', event.id, {
                ...data,
                date: format(startDate, 'MMMM dd, yyyy'),
                target_date: startDate.toISOString(),
                background_image_url:
                    imagePreview || event.background_image_url,
                creator: user.id,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success('Event updated successfully');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update event');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                console.log('Mock: Deleting event', event.id);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                toast.success('Event deleted');
                router.push('/my-events');
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete event');
            }
        }
    };

    return {
        form,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        imagePreview,
        handleImageUpload,
        isSubmitting,
        handleDelete,
        locationInputRef,
        fileInputRef,
    };
}
