'use client';

import React from 'react';
import { useRouter } from '@/shared/i18n/routing';
import { Trash2 } from 'lucide-react';
import { Event } from '../../(home)/_types/event';

interface EventCardProps {
    event: Event;
    isCreated?: boolean;
    onDelete?: (id: string) => void;
}

export const EventCard = React.memo(
    ({ event, isCreated, onDelete }: EventCardProps) => {
        const router = useRouter();

        const handleDelete = React.useCallback(
            async (e: React.MouseEvent) => {
                e.stopPropagation();
                if (
                    window.confirm(
                        'Are you sure you want to delete this event?',
                    )
                ) {
                    onDelete?.(event.id);
                }
            },
            [event.id, onDelete],
        );

        const handleCardClick = React.useCallback(() => {
            router.push(
                isCreated ? `/event/${event.id}/edit` : `/event/${event.id}`,
            );
        }, [router, isCreated, event.id]);

        return (
            <div
                className="group relative cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="mb-3 overflow-hidden">
                    <div
                        className="aspect-[4/3] bg-gray-300 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
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
                </div>
                {isCreated && (
                    <button
                        onClick={handleDelete}
                        className="absolute top-4 right-4 border border-black bg-white p-2 opacity-0 transition-colors group-hover:opacity-100 hover:border-red-500 hover:bg-red-500 hover:text-white"
                        aria-label="Delete event"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
                <h3 className="text-base font-medium">{event.title}</h3>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.event.id === nextProps.event.id &&
            prevProps.event.title === nextProps.event.title &&
            prevProps.event.date === nextProps.event.date &&
            prevProps.event.time === nextProps.event.time &&
            prevProps.event.background_image_url ===
            nextProps.event.background_image_url &&
            prevProps.isCreated === nextProps.isCreated &&
            prevProps.onDelete === nextProps.onDelete
        ); // Assuming onDelete is stable or we want to re-render if it changes
    },
);
