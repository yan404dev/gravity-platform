"use client";

import { useEditEvent } from "../_hooks/use-edit-event";
import { Registrant } from "@/types/event.types";
import { User } from "@/lib/mock-data";
import { Navbar } from "@/components/navbar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { EventForm } from "@/components/event-form/event-form";
import { Event } from "@/app/_types/event";

interface EditEventFormProps {
    event: Event;
    user: User;
    registrants: Registrant[];
}

export function EditEventForm({ event, user, registrants }: EditEventFormProps) {
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
        form
    } = useEditEvent({ event, user });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-8">
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
                                <h3 className="text-[18px] font-medium mb-4">
                                    Registrations ({registrants.length})
                                </h3>
                                <div className="border border-black max-h-64 overflow-y-auto">
                                    {registrants.map((registrant, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "px-3 md:px-4 py-2 md:py-3 flex justify-between items-center",
                                                index !== registrants.length - 1 &&
                                                "border-b border-black"
                                            )}
                                        >
                                            <span className="text-[14px] md:text-[17px] font-medium">
                                                {registrant.display_name}
                                            </span>
                                            <span className="text-[12px] md:text-[14px] text-gray-500">
                                                {format(
                                                    new Date(registrant.registered_at),
                                                    "MMM d, yyyy"
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
                        className="flex w-[50px] h-[50px] justify-center items-center border border-red-500 bg-red-500 text-white transition-all duration-300 hover:bg-red-600 hover:border-red-600"
                        aria-label="Delete event"
                        type="button"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </EventForm>
            </div>
        </div>
    );
}
