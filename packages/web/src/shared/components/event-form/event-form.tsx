import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Calendar } from '@/shared/components/ui/calendar';
import { cn } from '@/shared/lib/utils';
import { AnimatedActionButton } from '@/shared/components/ui/animated-action-button';
import { formatEventDate } from '@/shared/lib/date-utils';
import { EventFormData } from '@/shared/types/event-form.types';

interface EventFormProps {
    form: UseFormReturn<EventFormData>;
    onSubmit: () => void;
    isSubmitting: boolean;
    startDate: Date | undefined;
    setStartDate: (date: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    imagePreview: string | null;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    locationInputRef: React.RefObject<HTMLInputElement | null>;
    submitText: string;
    submittingText: string;
    children?: React.ReactNode;
    extraContent?: React.ReactNode;
}

import { useTranslations } from 'next-intl';

export function EventForm({
    form,
    onSubmit,
    isSubmitting,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    imagePreview,
    fileInputRef,
    handleImageUpload,
    locationInputRef,
    submitText,
    submittingText,
    children,
    extraContent,
}: EventFormProps) {
    const {
        register,
        formState: { errors },
    } = form;
    const [isDragging, setIsDragging] = useState(false);
    const t = useTranslations('CreateEvent');

    return (
        <div className="grid items-start gap-8 md:gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-3 md:gap-4">
                <label
                    className={cn(
                        'group relative flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-black bg-[#D9D9D9] transition-colors',
                        isDragging
                            ? 'border-2 border-dashed bg-[#CECECE]'
                            : 'hover:bg-[#CECECE]',
                    )}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file && fileInputRef.current) {
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            fileInputRef.current.files = dataTransfer.files;

                            const event = new Event('change', {
                                bubbles: true,
                            });
                            fileInputRef.current.dispatchEvent(event);
                        }
                    }}
                >
                    {imagePreview ? (
                        <>
                            <img
                                src={imagePreview}
                                alt="Event preview"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                <span className="border border-black bg-white px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                                    {t('changeImage')}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span className="text-[11px] font-medium tracking-wider text-black uppercase">
                                {isDragging ? t('dropImage') : t('addImage')}
                            </span>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </label>

                {imagePreview && (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-black bg-white px-4 py-3 text-[13px] font-medium tracking-wider uppercase transition-colors hover:bg-black hover:text-white"
                        type="button"
                    >
                        {t('changeImage')}
                    </button>
                )}
            </div>

            <div className="space-y-4 md:space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder={t('eventName')}
                        className={cn(
                            'mb-4 w-full border-none bg-transparent p-0 leading-[1.2] font-medium text-black placeholder:text-[#C4C4C4] focus:outline-none md:mb-8',
                            'text-[32px] md:text-[48px] lg:text-[56px]',
                        )}
                        {...register('eventName')}
                    />
                    {errors.eventName && (
                        <p className="text-sm text-red-500">
                            {errors.eventName.message as string}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <div className="mb-4 grid grid-cols-[80px_1fr_80px] gap-0 border border-black md:mb-6 md:grid-cols-[100px_1fr_100px]">
                        <div className="flex items-center justify-start gap-1.5 border-r border-black px-2 py-2 md:gap-2 md:px-3 md:py-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-black md:h-2 md:w-2"></div>
                            <span className="text-[14px] font-medium md:text-[17px]">
                                {t('start')}
                            </span>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={cn(
                                        'border-r border-black bg-white px-2 py-2 text-left text-[14px] focus:outline-none md:px-4 md:py-3 md:text-[17px]',
                                        !startDate && 'text-[#C4C4C4]',
                                    )}
                                >
                                    {formatEventDate(startDate)}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                    className="pointer-events-auto p-3"
                                />
                            </PopoverContent>
                        </Popover>
                        <input
                            type="time"
                            className="px-2 py-2 text-center text-[14px] text-black placeholder:text-[#C4C4C4] focus:outline-none md:px-4 md:py-3 md:text-[17px]"
                            {...register('startTime')}
                        />
                    </div>
                    {errors.startTime && (
                        <p className="mb-2 text-sm text-red-500">
                            {errors.startTime.message as string}
                        </p>
                    )}

                    <div className="grid grid-cols-[80px_1fr_80px] gap-0 border border-black md:grid-cols-[100px_1fr_100px]">
                        <div className="flex items-center justify-start gap-1.5 border-r border-black px-2 py-2 md:gap-2 md:px-3 md:py-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-black md:h-2 md:w-2"></div>
                            <span className="text-[14px] font-medium md:text-[17px]">
                                {t('end')}
                            </span>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={cn(
                                        'border-r border-black bg-white px-2 py-2 text-left text-[14px] focus:outline-none md:px-4 md:py-3 md:text-[17px]',
                                        !endDate && 'text-[#C4C4C4]',
                                    )}
                                >
                                    {formatEventDate(endDate)}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                    className="pointer-events-auto p-3"
                                />
                            </PopoverContent>
                        </Popover>
                        <input
                            type="time"
                            className="px-2 py-2 text-center text-[14px] text-black placeholder:text-[#C4C4C4] focus:outline-none md:px-4 md:py-3 md:text-[17px]"
                            {...register('endTime')}
                        />
                    </div>
                    {errors.endTime && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.endTime.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder={t('location')}
                        className="w-full border border-black px-3 py-2 text-[14px] text-black placeholder:text-[#C4C4C4] focus:outline-none md:px-4 md:py-3 md:text-[17px]"
                        {...(() => {
                            const { ref, ...rest } = register('location');
                            return {
                                ...rest,
                                ref: (e: HTMLInputElement | null) => {
                                    ref(e);
                                    if (
                                        locationInputRef &&
                                        'current' in locationInputRef
                                    ) {
                                        locationInputRef.current = e;
                                    }
                                },
                            };
                        })()}
                    />
                    {errors.location && (
                        <p className="text-sm text-red-500">
                            {errors.location.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <textarea
                        placeholder={t('description')}
                        rows={6}
                        className="w-full resize-none border border-black px-3 py-2 text-[14px] text-black placeholder:text-[#C4C4C4] focus:outline-none md:px-4 md:py-3 md:text-[17px]"
                        {...register('description')}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">
                            {errors.description.message as string}
                        </p>
                    )}
                </div>

                {extraContent}

                <div className="mt-4 flex items-center gap-3 md:mt-8">
                    <AnimatedActionButton
                        onClick={onSubmit}
                        isSubmitting={isSubmitting}
                        defaultText={submitText}
                        submittingText={submittingText}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}
