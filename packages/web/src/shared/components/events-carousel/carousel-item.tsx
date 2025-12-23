import React, { memo } from 'react';
import { Event } from '../../../app/[locale]/(home)/_types/event';

interface CarouselItemProps {
    event: Event;
    index: number;
    onClick: (id: string) => void;
}

export const CarouselItem = memo(
    ({ event, index, onClick }: CarouselItemProps) => (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick(event.id);
            }}
            className="animate-fade-in relative aspect-[4/5] max-h-[800px] w-[65vw] flex-shrink-0 cursor-pointer overflow-hidden md:w-[calc(40vw-0.5px)]"
            style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
            }}
        >
            <img
                src={event.background_image_url}
                alt={event.title}
                className="h-full w-full object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-col gap-0">
                <div className="flex h-[23px] items-center border border-black bg-white px-3">
                    <div className="text-[11px] leading-none font-medium uppercase">
                        {event.date}
                    </div>
                </div>
                <div className="flex h-[23px] items-center border border-t-0 border-black bg-white px-3">
                    <div className="text-[11px] leading-none font-medium uppercase">
                        {event.time}
                    </div>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 p-6 text-white md:p-8">
                <h3 className="mb-1 text-xl font-medium tracking-tight md:text-2xl">
                    {event.title}
                </h3>
                <p className="text-sm text-white/80 md:text-base">
                    {event.address}
                </p>
            </div>
        </div>
    ),
);

CarouselItem.displayName = 'CarouselItem';
