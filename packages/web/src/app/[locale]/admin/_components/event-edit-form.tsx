'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Event } from '../../_types/event';
import { User } from '@/lib/mock-data';
import { useEventEditForm } from '../_hooks/use-admin-dashboard';

interface EventEditFormProps {
    event: Event;
    user: User;
    onSuccess: () => void;
}

export function EventEditForm({ event, user, onSuccess }: EventEditFormProps) {
    const { form, uploading, currentImageUrl, handleImageUpload, onSubmit } =
        useEventEditForm({ event, user, onSuccess });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = form;

    // React to event prop change to reset form
    useEffect(() => {
        setValue('title', event.title);
        // @ts-ignore
        setValue('creator', event.creator || '');
        // @ts-ignore
        setValue('description', event.description || '');
        setValue('date', event.date);
        setValue('time', event.time);
        setValue('address', event.address);
        setValue('target_date', event.target_date);
    }, [event, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Event Title
                </label>
                <Input className="border-[#1A1A1A]" {...register('title')} />
                {errors.title && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Creator
                </label>
                <Input className="border-[#1A1A1A]" {...register('creator')} />
                {errors.creator && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.creator.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Description
                </label>
                <Textarea
                    className="min-h-[120px] border-[#1A1A1A]"
                    {...register('description')}
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                        Date
                    </label>
                    <Input className="border-[#1A1A1A]" {...register('date')} />
                    {errors.date && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.date.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                        Time
                    </label>
                    <Input className="border-[#1A1A1A]" {...register('time')} />
                    {errors.time && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.time.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Address
                </label>
                <Input className="border-[#1A1A1A]" {...register('address')} />
                {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Background Image
                </label>
                {currentImageUrl && (
                    <img
                        src={currentImageUrl}
                        alt="Current background"
                        className="mb-2 h-32 w-full rounded object-cover"
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
                    <p className="mt-1 text-sm text-[#1A1A1A]">Uploading...</p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-normal text-[#1A1A1A] uppercase">
                    Target Date (YYYY-MM-DD HH:MM:SS)
                </label>
                <Input
                    type="datetime-local"
                    // Simple formatting hook or handling needed for controlled input but standard works for now
                    // We rely on RHF string handling
                    {...register('target_date')}
                    className="border-[#1A1A1A]"
                />
                {errors.target_date && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.target_date.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="hover:bg-opacity-90 w-full bg-[#1A1A1A] text-white"
            >
                Save Changes
            </Button>
        </form>
    );
}
