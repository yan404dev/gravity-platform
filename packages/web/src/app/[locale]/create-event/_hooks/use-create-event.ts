'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { User } from '@/shared/lib/mock-data';
import { useGooglePlacesAutocomplete } from '@/shared/hooks/useGooglePlacesAutocomplete';
import {
    CreateEventFormData,
    createEventSchema,
} from '../_schemas/create-event.schema';

interface UseCreateEventProps {
    user: User;
}

export function useCreateEvent({ user }: UseCreateEventProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const locationInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const form = useForm<CreateEventFormData>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            eventName: '',
            description: '',
            location: '',
            startTime: '',
            endTime: '',
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = form;

    const { onPlaceSelected } = useGooglePlacesAutocomplete(locationInputRef);

    useEffect(() => {
        onPlaceSelected((place) => {
            const address = place.formatted_address || place.name || '';
            setValue('location', address);
        });
    }, [onPlaceSelected, setValue]);

    useEffect(() => {
        if (startDate && !endDate) {
            setEndDate(startDate);
        }
    }, [startDate, endDate]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif',
                'image/webp',
            ];
            if (!validTypes.includes(file.type)) {
                toast.error('Please upload a JPG, PNG, GIF, or WebP image');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: CreateEventFormData) => {
        if (!startDate) {
            toast.error('Please select a start date');
            return;
        }
        if (!endDate) {
            toast.error('Please select an end date');
            return;
        }
        if (!imageFile) {
            toast.error('Please add an event image');
            return;
        }

        const startDateTime = new Date(startDate);
        const [startHours, startMinutes] = data.startTime.split(':');
        startDateTime.setHours(
            parseInt(startHours),
            parseInt(startMinutes),
            0,
            0,
        );

        const endDateTime = new Date(endDate);
        const [endHours, endMinutes] = data.endTime.split(':');
        endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

        if (endDateTime <= startDateTime) {
            toast.error('End date/time must be after start date/time');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Mock: Creating event', {
                ...data,
                startDate,
                endDate,
                imagePreview,
                user,
            });

            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Event created successfully!');
            router.push('/my-events');
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        isSubmitting,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        imagePreview,
        fileInputRef,
        handleImageUpload,
        locationInputRef,
        onSubmit: handleSubmit(onSubmit),
    };
}
