import { UseFormReturn } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { AnimatedActionButton } from "@/components/ui/animated-action-button";
import { formatEventDate } from "@/lib/date-utils";
import { EventFormData } from "@/types/event-form.types";

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
    extraContent
}: EventFormProps) {
    const { register, formState: { errors } } = form;

    return (
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="flex flex-col gap-3 md:gap-4">
                <label className="w-full aspect-[4/3] border border-black bg-[#D9D9D9] flex items-center justify-center cursor-pointer hover:bg-[#CECECE] transition-colors">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Event preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-black text-[11px] font-medium uppercase tracking-wider">
                            ADD IMAGE
                        </span>
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
                        className="px-4 py-3 text-[13px] font-medium uppercase tracking-wider border border-black bg-white hover:bg-black hover:text-white transition-colors"
                        type="button"
                    >
                        Change image
                    </button>
                )}
            </div>

            <div className="space-y-4 md:space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Event name"
                        className={cn(
                            "w-full text-black font-medium leading-[1.2] mb-4 md:mb-8 focus:outline-none bg-transparent border-none p-0 placeholder:text-[#C4C4C4]",
                            "text-[32px] md:text-[48px] lg:text-[56px]"
                        )}
                        {...register("eventName")}
                    />
                    {errors.eventName && (
                        <p className="text-red-500 text-sm">{errors.eventName.message as string}</p>
                    )}
                </div>

                <div className="relative">
                    <div className="grid grid-cols-[80px_1fr_80px] md:grid-cols-[100px_1fr_100px] gap-0 border border-black mb-4 md:mb-6">
                        <div className="flex items-center justify-start gap-1.5 md:gap-2 border-r border-black px-2 md:px-3 py-2 md:py-3">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-black rounded-full"></div>
                            <span className="text-[14px] md:text-[17px] font-medium">Start</span>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={cn(
                                        "px-2 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-left border-r border-black focus:outline-none bg-white",
                                        !startDate && "text-[#C4C4C4]"
                                    )}
                                >
                                    {formatEventDate(startDate)}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                />
                            </PopoverContent>
                        </Popover>
                        <input
                            type="text"
                            placeholder="15:00"
                            className="px-2 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-black text-center focus:outline-none placeholder:text-[#C4C4C4]"
                            {...register("startTime")}
                        />
                    </div>
                    {errors.startTime && (
                        <p className="text-red-500 text-sm mb-2">{errors.startTime.message as string}</p>
                    )}

                    <div className="grid grid-cols-[80px_1fr_80px] md:grid-cols-[100px_1fr_100px] gap-0 border border-black">
                        <div className="flex items-center justify-start gap-1.5 md:gap-2 border-r border-black px-2 md:px-3 py-2 md:py-3">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-black rounded-full"></div>
                            <span className="text-[14px] md:text-[17px] font-medium">End</span>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={cn(
                                        "px-2 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-left border-r border-black focus:outline-none bg-white",
                                        !endDate && "text-[#C4C4C4]"
                                    )}
                                >
                                    {formatEventDate(endDate)}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                />
                            </PopoverContent>
                        </Popover>
                        <input
                            type="text"
                            placeholder="16:00"
                            className="px-2 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-black text-center focus:outline-none placeholder:text-[#C4C4C4]"
                            {...register("endTime")}
                        />
                    </div>
                    {errors.endTime && (
                        <p className="text-red-500 text-sm mt-2">{errors.endTime.message as string}</p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Add event location"
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-black border border-black focus:outline-none placeholder:text-[#C4C4C4]"
                        {...(() => {
                            const { ref, ...rest } = register("location");
                            return {
                                ...rest,
                                ref: (e: HTMLInputElement | null) => {
                                    ref(e);
                                    if (locationInputRef && 'current' in locationInputRef) {
                                        // @ts-ignore
                                        locationInputRef.current = e;
                                    }
                                },
                            };
                        })()}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location.message as string}</p>
                    )}
                </div>

                <div>
                    <textarea
                        placeholder="Add description"
                        rows={6}
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-[14px] md:text-[17px] text-black border border-black focus:outline-none resize-none placeholder:text-[#C4C4C4]"
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message as string}</p>
                    )}
                </div>

                {extraContent}

                <div className="flex gap-3 items-center mt-4 md:mt-8">
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
