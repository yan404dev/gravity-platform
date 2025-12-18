import React, { useMemo } from 'react';
import { useEventsCarousel } from './use-events-carousel';
import { Event } from '../../app/[locale]/_types/event';

import { CarouselItem } from './carousel-item';

export const EventsCarousel = React.memo(() => {
    const { events, handleEventClick } = useEventsCarousel();

    const multipliedEvents = useMemo(() => {
        if (events.length === 0) return [];
        return [...events, ...events];
    }, [events]);

    if (events.length === 0) return null;

    return (
        <div className="bg-background w-full overflow-hidden py-12 pb-20 md:pb-24">
            <div className="relative overflow-hidden">
                <div className="animate-scroll-left-fast flex w-max gap-px will-change-[transform]">
                    {multipliedEvents.map((event, index) => (
                        <CarouselItem
                            key={`${event.id}-${index}`}
                            event={event}
                            index={index}
                            onClick={handleEventClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});
EventsCarousel.displayName = 'EventsCarousel';
