"use client";

import { useRouter } from "@/i18n/routing";
import { Event } from "../_types/event";

interface EventCardProps {
    event: Event;
}

import { useTranslations } from 'next-intl';

export function EventCard({ event }: EventCardProps) {
    const t = useTranslations('EventCard');
    const router = useRouter();

    const isEventLive = () => {
        const now = new Date().getTime();
        const target = new Date(event.target_date).getTime();
        const oneHour = 1000 * 60 * 60;
        return now >= target && now <= target + oneHour;
    };

    const eventLive = isEventLive();

    return (
        <div
            className="relative cursor-pointer group"
            onClick={() => router.push(`/event/${event.id}`)}
        >
            <div className="overflow-hidden mb-3">
                <div
                    className="aspect-square bg-gray-300 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.background_image_url})` }}
                ></div>
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-0">
                <div className="bg-white border border-black px-3 h-[23px] flex items-center">
                    <div className="text-[11px] font-medium uppercase leading-none">{event.date}</div>
                </div>
                <div className="bg-white border border-t-0 border-black px-3 h-[23px] flex items-center">
                    <div className="text-[11px] font-medium leading-none">{event.time}</div>
                </div>
                {eventLive && (
                    <div className="bg-white border border-t-0 border-black px-3 h-[23px] flex items-center">
                        <div className="text-[11px] font-medium uppercase leading-none">{t('liveNow')}</div>
                    </div>
                )}
            </div>
            <h3 className="text-lg font-medium">{event.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{event.address}</p>
        </div>
    );
}
