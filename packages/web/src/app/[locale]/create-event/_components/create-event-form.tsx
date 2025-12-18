'use client';

import { Navbar } from '@/components/navbar';
import { User } from '@/lib/mock-data';
import { EventForm } from '@/components/event-form/event-form';
import { useCreateEvent } from '../_hooks/use-create-event';

interface CreateEventFormProps {
    user: User;
}

import { useTranslations } from 'next-intl';

export function CreateEventForm({ user }: CreateEventFormProps) {
    const t = useTranslations('CreateEvent');
    const {
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
        onSubmit,
    } = useCreateEvent({ user });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 md:px-8 md:pt-32 md:pb-16">
                <EventForm
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    imagePreview={imagePreview}
                    fileInputRef={fileInputRef}
                    handleImageUpload={handleImageUpload}
                    locationInputRef={locationInputRef}
                    submitText={t('submit')}
                    submittingText={t('submitting')}
                />
            </div>
        </div>
    );
}
