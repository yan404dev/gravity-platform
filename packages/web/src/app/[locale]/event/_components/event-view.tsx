'use client';

import React from 'react';
import { User } from '@/shared/lib/mock-data';
import { Navbar } from '@/shared/components/navbar';
import { EventMeta } from '@/shared/components/event-meta';
import dynamic from 'next/dynamic';

const EventCountdown = dynamic(
    () =>
        import('@/shared/components/event-countdown').then(
            (mod) => mod.EventCountdown,
        ),
    {
        ssr: false,
        loading: () => (
            <div className="h-[49px] w-[409px] animate-pulse rounded bg-gray-100" />
        ),
    },
);
import { EventHeader } from '@/shared/components/event-header';
import { EventDescription } from '@/shared/components/event-description';
import { EventLocation } from '@/shared/components/event-location';
import { EventRegistration } from '@/shared/components/event-registration';
import { AuthSheet } from '@/shared/components/auth-sheet';
import { SEOHead } from '@/shared/components/seo-head';
import { useEventView } from '../_hooks/use-event-view';
import { Event } from '../../(home)/_types/event';

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

            <main className="relative mx-auto my-0 flex h-screen w-full items-start justify-center bg-white max-lg:h-auto max-lg:flex-col">
                <div
                    className="fixed top-0 left-0 flex h-screen w-[calc(100%-540px)] flex-col items-start justify-end overflow-hidden pt-[calc(100vh-97px)] pr-[590px] pb-12 pl-[49px] max-lg:relative max-lg:right-0 max-lg:h-[400px] max-lg:w-full max-lg:bg-cover max-lg:bg-center max-lg:px-4 max-lg:pt-80 max-lg:pb-6 max-sm:h-[300px] max-sm:px-4 max-sm:pt-60 max-sm:pb-6"
                    role="img"
                    aria-label="Event background image"
                >
                    <div
                        className="absolute inset-0 animate-[zoom-in_1.2s_ease-out_forwards]"
                        style={{
                            backgroundImage: `url("${event.background_image_url}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div
                        className="animate-fade-in relative z-10"
                        style={{
                            animationDelay: '0.5s',
                            animationFillMode: 'both',
                        }}
                    >
                        <EventCountdown
                            targetDate={new Date(event.target_date)}
                        />
                    </div>
                </div>

                <aside className="fixed top-0 right-0 box-border flex h-screen w-[540px] flex-col items-start justify-start overflow-y-auto bg-white max-lg:relative max-lg:top-0 max-lg:right-auto max-lg:h-auto max-lg:w-full max-lg:overflow-y-visible">
                    <div className="animate-fade-in relative flex w-full flex-col items-start gap-10 p-10 pb-24 opacity-0 [animation-delay:200ms] max-lg:w-full max-lg:gap-8 max-lg:px-4 max-lg:py-6 max-lg:pb-6">
                        <div className="relative flex flex-col items-start gap-4 self-stretch">
                            <EventMeta date={event.date} time={event.time} />
                            <EventHeader
                                title={event.title}
                                creator={event.creator || 'Unknown'}
                            />
                        </div>

                        <EventDescription
                            description={event.description || ''}
                        />

                        <EventLocation
                            address={event.address}
                            onGetDirections={handleGetDirections}
                        />
                    </div>

                    <div className="border-border fixed right-0 bottom-0 w-[540px] border-t bg-white py-6 max-lg:relative max-lg:w-full max-lg:border-t-0 max-lg:py-6">
                        <div className="px-10 max-lg:px-4">
                            <EventRegistration
                                onRegister={handleRegister}
                                isRegistered={isRegistered}
                                isLoading={loading}
                                isEnded={isEventEnded}
                                className="animate-fade-in opacity-0 [animation-delay:400ms]"
                            />
                        </div>
                    </div>
                </aside>
            </main>
            <AuthSheet
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
}
