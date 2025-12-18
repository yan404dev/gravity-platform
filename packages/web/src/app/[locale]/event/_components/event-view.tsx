"use client";

import React from "react";
import { User } from "@/lib/mock-data";
import { Navbar } from "@/components/navbar";
import { EventMeta } from "@/components/event-meta";
import dynamic from 'next/dynamic';

const EventCountdown = dynamic(() => import('@/components/event-countdown').then(mod => mod.EventCountdown), {
    ssr: false,
    loading: () => <div className="h-[49px] w-[409px] bg-gray-100 animate-pulse rounded" />
});
import { EventHeader } from "@/components/event-header";
import { EventDescription } from "@/components/event-description";
import { EventLocation } from "@/components/event-location";
import { EventRegistration } from "@/components/event-registration";
import { AuthSheet } from "@/components/auth-sheet";
import { SEOHead } from "@/components/seo-head";
import { useEventView } from "../_hooks/use-event-view";
import { Event } from "../../_types/event";

interface EventViewProps {
    event: Event;
    user: User | null;
    initialIsRegistered: boolean;
}

export function EventView({
    event,
    user,
    initialIsRegistered,
}: EventViewProps) {
    const {
        isRegistered,
        isAuthOpen,
        setIsAuthOpen,
        loading,
        isEventEnded,
        handleRegister,
        handleGetDirections,
    } = useEventView({
        eventId: event.id,
        user,
        initialIsRegistered,
        targetDate: event.target_date,
    });

    return (
        <>
            <SEOHead
                title={event.title}
                description={(event.description || '').substring(0, 160)}
                image={event.background_image_url}
                keywords={`event, ${event.title}, ${event.address}, community event`}
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <Navbar />

            <main className="flex h-screen justify-center items-start w-full relative bg-white mx-auto my-0 max-lg:flex-col max-lg:h-auto">
                <div
                    className="flex flex-col justify-end items-start fixed h-screen w-[calc(100%-540px)] pl-[49px] pr-[590px] pt-[calc(100vh-97px)] pb-12 left-0 top-0 overflow-hidden max-lg:relative max-lg:w-full max-lg:h-[400px] max-lg:bg-cover max-lg:bg-center max-lg:pt-80 max-lg:pb-6 max-lg:px-4 max-lg:right-0 max-sm:h-[300px] max-sm:pt-60 max-sm:pb-6 max-sm:px-4"
                    role="img"
                    aria-label="Event background image"
                >
                    <div
                        className="absolute inset-0 animate-[zoom-in_1.2s_ease-out_forwards]"
                        style={{
                            backgroundImage: `url("${event.background_image_url}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div
                        className="relative z-10 animate-fade-in"
                        style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                    >
                        <EventCountdown targetDate={new Date(event.target_date)} />
                    </div>
                </div>

                <aside className="flex w-[540px] flex-col justify-start items-start fixed h-screen box-border right-0 top-0 bg-white overflow-y-auto max-lg:relative max-lg:w-full max-lg:h-auto max-lg:right-auto max-lg:top-0 max-lg:overflow-y-visible">
                    <div className="flex w-full flex-col items-start gap-10 relative p-10 pb-24 max-lg:w-full max-lg:px-4 max-lg:py-6 max-lg:pb-6 max-lg:gap-8 opacity-0 animate-fade-in [animation-delay:200ms]">
                        <div className="flex flex-col items-start gap-4 self-stretch relative">
                            <EventMeta date={event.date} time={event.time} />
                            <EventHeader title={event.title} creator={event.creator || 'Unknown'} />
                        </div>

                        <EventDescription description={event.description || ''} />

                        <EventLocation
                            address={event.address}
                            onGetDirections={handleGetDirections}
                        />
                    </div>

                    <div className="fixed bottom-0 right-0 w-[540px] bg-white py-6 border-t border-border max-lg:relative max-lg:w-full max-lg:py-6 max-lg:border-t-0">
                        <div className="px-10 max-lg:px-4">
                            <EventRegistration
                                onRegister={handleRegister}
                                isRegistered={isRegistered}
                                isLoading={loading}
                                isEnded={isEventEnded}
                                className="opacity-0 animate-fade-in [animation-delay:400ms]"
                            />
                        </div>
                    </div>
                </aside>
            </main>
            <AuthSheet isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
