"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { useMyEvents } from "../_hooks/use-my-events";
import { useSlidingTabs } from "../_hooks/use-sliding-tabs";
import { Event } from "../../_types/event";
import { User } from "@/lib/mock-data";
import { EventCard } from "./event-card";

interface MyEventsListProps {
    user: User;
    initialCreatedEvents: Event[];
    initialRegisteredEvents: Event[];
}

import { useTranslations } from 'next-intl';

export function MyEventsList({
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
        activeTab === "created" ? createdEvents : registeredEvents;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 md:px-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8">
                        {t('title')}
                    </h1>

                    <div className="relative flex gap-0 mb-12">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#ff6bff] border border-black transition-all duration-300 ease-out pointer-events-none"
                            style={{
                                width: `${slideStyle.width}px`,
                                transform: slideStyle.transform,
                            }}
                        />

                        <button
                            ref={createdRef}
                            onClick={() => setActiveTab("created")}
                            className="relative z-10 px-6 py-3 text-[11px] font-medium uppercase text-black border border-black transition-colors max-sm:flex-1 bg-transparent"
                        >
                            {t('created')} ({createdEvents.length})
                        </button>
                        <button
                            ref={registeredRef}
                            onClick={() => setActiveTab("registered")}
                            className="relative z-10 px-6 py-3 text-[11px] font-medium uppercase text-black border border-l-0 border-black transition-colors max-sm:flex-1 bg-transparent"
                        >
                            {t('registered')} ({registeredEvents.length})
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {loading && displayedEvents.length === 0 && (
                            <div className="col-span-full text-center py-12">{t('updating')}</div>
                        )}

                        {!loading && displayedEvents.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                {activeTab === "created" && t('noCreated')}
                                {activeTab === "registered" &&
                                    t('noRegistered')}
                            </div>
                        )}

                        {displayedEvents.length > 0 &&
                            displayedEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    isCreated={activeTab === "created"}
                                    onDelete={
                                        activeTab === "created" ? handleDeleteEvent : undefined
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
