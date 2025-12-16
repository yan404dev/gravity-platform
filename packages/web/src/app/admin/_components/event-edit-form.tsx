"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/app/_types/event";
import { User } from "@supabase/supabase-js";
import { useEventEditForm } from "../_hooks/use-admin-dashboard";

interface EventEditFormProps {
    event: Event;
    user: User;
    onSuccess: () => void;
}

export function EventEditForm({ event, user, onSuccess }: EventEditFormProps) {
    const { form, uploading, currentImageUrl, handleImageUpload, onSubmit } =
        useEventEditForm({ event, user, onSuccess });

    const { register, handleSubmit, formState: { errors }, setValue } = form;

    // React to event prop change to reset form
    useEffect(() => {
        setValue("title", event.title);
        // @ts-ignore
        setValue("creator", event.creator || "");
        // @ts-ignore
        setValue("description", event.description || "");
        setValue("date", event.date);
        setValue("time", event.time);
        setValue("address", event.address);
        setValue("target_date", event.target_date);
    }, [event, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Event Title
                </label>
                <Input className="border-[#1A1A1A]" {...register("title")} />
                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Creator
                </label>
                <Input className="border-[#1A1A1A]" {...register("creator")} />
                {errors.creator && (
                    <p className="text-red-500 text-xs mt-1">{errors.creator.message}</p>
                )}
            </div>

            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Description
                </label>
                <Textarea
                    className="border-[#1A1A1A] min-h-[120px]"
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                        Date
                    </label>
                    <Input className="border-[#1A1A1A]" {...register("date")} />
                    {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                        Time
                    </label>
                    <Input className="border-[#1A1A1A]" {...register("time")} />
                    {errors.time && (
                        <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Address
                </label>
                <Input className="border-[#1A1A1A]" {...register("address")} />
                {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
            </div>

            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Background Image
                </label>
                {currentImageUrl && (
                    <img
                        src={currentImageUrl}
                        alt="Current background"
                        className="w-full h-32 object-cover mb-2 rounded"
                    />
                )}
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="border-[#1A1A1A]"
                />
                {uploading && (
                    <p className="text-sm text-[#1A1A1A] mt-1">Uploading...</p>
                )}
            </div>

            <div>
                <label className="text-[#1A1A1A] text-sm font-normal uppercase mb-2 block">
                    Target Date (YYYY-MM-DD HH:MM:SS)
                </label>
                <Input
                    type="datetime-local"
                    // Simple formatting hook or handling needed for controlled input but standard works for now
                    // We rely on RHF string handling
                    {...register("target_date")}
                    className="border-[#1A1A1A]"
                />
                {errors.target_date && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.target_date.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-[#1A1A1A] text-white hover:bg-opacity-90"
            >
                Save Changes
            </Button>
        </form>
    );
}
