'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { useMyEvents } from '../_hooks/use-my-events';
import { useSlidingTabs } from '../_hooks/use-sliding-tabs';
import { Event } from '../../(home)/_types/event';
import { User } from '@/lib/mock-data';
import { EventCard } from './event-card';

interface MyEventsListProps {
    user: User;
    initialCreatedEvents: Event[];
    initialRegisteredEvents: Event[];
}

import { useTranslations } from 'next-intl';

export const MyEventsList = React.memo(function MyEventsList({
    user,
    initialCreatedEvents,
    initialRegisteredEvents,
}: MyEventsListProps) {
    const t = useTranslations('MyEvents');
    const { createdEvents, registeredEvents, loading, handleDeleteEvent } =
        useMyEvents({ user, initialCreatedEvents, initialRegisteredEvents });

    const { activeTab, setActiveTab, slideStyle, createdRef, registeredRef } =
        useSlidingTabs();

    const displayedEvents =
        activeTab === 'created' ? createdEvents : registeredEvents;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="px-4 pt-32 pb-20 md:px-8">
                <div>
                    <h1 className="mb-8 text-3xl leading-tight font-medium sm:text-4xl md:text-5xl lg:text-6xl">
                        {t('title')}
                    </h1>

                    <div className="relative mb-12 flex gap-0">
                        <div
                            className="pointer-events-none absolute top-0 left-0 h-full border border-black bg-[#ff6bff] transition-all duration-300 ease-out"
                            style={{
                                width: `${slideStyle.width}px`,
                                transform: slideStyle.transform,
                            }}
                        />

                        <button
                            ref={createdRef}
                            onClick={() => setActiveTab('created')}
                            className="relative z-10 border border-black bg-transparent px-6 py-3 text-[11px] font-medium text-black uppercase transition-colors max-sm:flex-1"
                        >
                            {t('created')} ({createdEvents.length})
                        </button>
                        <button
                            ref={registeredRef}
                            onClick={() => setActiveTab('registered')}
                            className="relative z-10 border border-l-0 border-black bg-transparent px-6 py-3 text-[11px] font-medium text-black uppercase transition-colors max-sm:flex-1"
                        >
                            {t('registered')} ({registeredEvents.length})
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {loading && displayedEvents.length === 0 && (
                            <div className="col-span-full py-12 text-center">
                                {t('updating')}
                            </div>
                        )}

                        {!loading && displayedEvents.length === 0 && (
                            <div className="col-span-full py-12 text-center">
                                {activeTab === 'created' && t('noCreated')}
                                {activeTab === 'registered' &&
                                    t('noRegistered')}
                            </div>
                        )}

                        {displayedEvents.length > 0 &&
                            displayedEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    isCreated={activeTab === 'created'}
                                    onDelete={
                                        activeTab === 'created'
                                            ? handleDeleteEvent
                                            : undefined
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
