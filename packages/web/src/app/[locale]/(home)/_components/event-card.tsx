'use client';

import { useRouter } from '@/i18n/routing';
import { Event } from '../_types/event';
import { useTranslations } from 'next-intl';
import React from 'react';

interface EventCardProps {
    event: Event;
}

export const EventCard = React.memo(
    function EventCard({ event }: EventCardProps) {
        const t = useTranslations('EventCard');
        const router = useRouter();

        const isEventLive = React.useMemo(() => {
            const now = new Date().getTime();
            const target = new Date(event.target_date).getTime();
            const oneHour = 1000 * 60 * 60;
            return now >= target && now <= target + oneHour;
        }, [event.target_date]);

        return (
            <div
                className="group relative cursor-pointer"
                onClick={() => router.push(`/event/${event.id}`)}
            >
                <div className="mb-3 overflow-hidden">
                    <div
                        className="aspect-square bg-gray-300 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{
                            backgroundImage: `url(${event.background_image_url})`,
                        }}
                    ></div>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-0">
                    <div className="flex h-[23px] items-center border border-black bg-white px-3">
                        <div className="text-[11px] leading-none font-medium uppercase">
                            {event.date}
                        </div>
                    </div>
                    <div className="flex h-[23px] items-center border border-t-0 border-black bg-white px-3">
                        <div className="text-[11px] leading-none font-medium">
                            {event.time}
                        </div>
                    </div>
                    {isEventLive && (
                        <div className="flex h-[23px] items-center border border-t-0 border-black bg-white px-3">
                            <div className="text-[11px] leading-none font-medium uppercase">
                                {t('liveNow')}
                            </div>
                        </div>
                    )}
                </div>
                <h3 className="text-lg font-medium">{event.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{event.address}</p>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.event.id === nextProps.event.id &&
            prevProps.event.title === nextProps.event.title &&
            prevProps.event.date === nextProps.event.date &&
            prevProps.event.time === nextProps.event.time &&
            prevProps.event.address === nextProps.event.address &&
            prevProps.event.background_image_url ===
                nextProps.event.background_image_url &&
            prevProps.event.target_date === nextProps.event.target_date
        );
    },
);
