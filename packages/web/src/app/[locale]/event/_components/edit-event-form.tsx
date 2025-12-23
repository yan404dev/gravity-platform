'use client';

import { useEditEvent } from '../_hooks/use-edit-event';
import { Registrant } from '@/shared/types/event.types';
import { User } from '@/shared/lib/mock-data';
import { Navbar } from '@/shared/components/navbar';
import { format } from 'date-fns';
import { cn } from '@/shared/lib/utils';
import { Trash2 } from 'lucide-react';
import { EventForm } from '@/shared/components/event-form/event-form';
import { Event } from '../../(home)/_types/event';

interface EditEventFormProps {
    event: Event;
    user: User;
    registrants: Registrant[];
}

export function EditEventForm({
    event,
    user,
    registrants,
}: EditEventFormProps) {
    const {
        register,
        handleSubmit,
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
        form,
    } = useEditEvent({ event, user });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 md:px-8 md:pt-32 md:pb-16">
                <EventForm
                    form={form}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    imagePreview={imagePreview}
                    fileInputRef={fileInputRef}
                    handleImageUpload={handleImageUpload}
                    locationInputRef={locationInputRef}
                    submitText="UPDATE EVENT"
                    submittingText="UPDATING..."
                    extraContent={
                        registrants.length > 0 && (
                            <div className="mt-8">
                                <h3 className="mb-4 text-[18px] font-medium">
                                    Registrations ({registrants.length})
                                </h3>
                                <div className="max-h-64 overflow-y-auto border border-black">
                                    {registrants.map((registrant, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                'flex items-center justify-between px-3 py-2 md:px-4 md:py-3',
                                                index !==
                                                registrants.length - 1 &&
                                                'border-b border-black',
                                            )}
                                        >
                                            <span className="text-[14px] font-medium md:text-[17px]">
                                                {registrant.display_name}
                                            </span>
                                            <span className="text-[12px] text-gray-500 md:text-[14px]">
                                                {format(
                                                    new Date(
                                                        registrant.registered_at,
                                                    ),
                                                    'MMM d, yyyy',
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                >
                    <button
                        onClick={handleDelete}
                        className="flex h-[50px] w-[50px] items-center justify-center border border-red-500 bg-red-500 text-white transition-all duration-300 hover:border-red-600 hover:bg-red-600"
                        aria-label="Delete event"
                        type="button"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </EventForm>
            </div>
        </div>
    );
}
