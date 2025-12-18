"use client";

import React from "react";
import { useRouter } from "@/i18n/routing";
import { Trash2 } from "lucide-react";
import { Event } from "../../_types/event";

interface EventCardProps {
    event: Event;
    isCreated?: boolean;
    onDelete?: (id: string) => void;
}

export const EventCard = React.memo(({ event, isCreated, onDelete }: EventCardProps) => {
    const router = useRouter();

    const handleDelete = React.useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this event?")) {
            onDelete?.(event.id);
        }
    }, [event.id, onDelete]);

    const handleCardClick = React.useCallback(() => {
        router.push(
            isCreated ? `/event/${event.id}/edit` : `/event/${event.id}`
        );
    }, [router, isCreated, event.id]);

    return (
        <div
            className="relative cursor-pointer group"
            onClick={handleCardClick}
        >
            <div className="overflow-hidden mb-3">
                <div
                    className="aspect-[4/3] bg-gray-300 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.background_image_url})` }}
                ></div>
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-0">
                <div className="bg-white border border-black px-3 h-[23px] flex items-center">
                    <div className="text-[11px] font-medium uppercase leading-none">
                        {event.date}
                    </div>
                </div>
                <div className="bg-white border border-t-0 border-black px-3 h-[23px] flex items-center">
                    <div className="text-[11px] font-medium leading-none">
                        {event.time}
                    </div>
                </div>
            </div>
            {isCreated && (
                <button
                    onClick={handleDelete}
                    className="absolute top-4 right-4 bg-white border border-black p-2 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete event"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
            <h3 className="text-base font-medium">{event.title}</h3>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.event.id === nextProps.event.id &&
        prevProps.event.title === nextProps.event.title &&
        prevProps.event.date === nextProps.event.date &&
        prevProps.event.time === nextProps.event.time &&
        prevProps.event.background_image_url === nextProps.event.background_image_url &&
        prevProps.isCreated === nextProps.isCreated &&
        prevProps.onDelete === nextProps.onDelete; // Assuming onDelete is stable or we want to re-render if it changes
});
