'use client';

import React, { useMemo, useCallback } from 'react';
import { Navbar } from '@/shared/components/navbar';
import { Calendar } from '@/shared/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/shared/lib/utils';
import { useDiscover } from '../_hooks/use-discover';
import { EventCard } from './event-card';
import { Event } from '../_types/event';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const EventsCarousel = dynamic(
    () =>
        import('@/shared/components/events-carousel').then(
            (mod) => mod.EventsCarousel,
        ),
    {
        loading: () => (
            <div className="h-[500px] w-full animate-pulse bg-gray-100" />
        ),
        ssr: false,
    },
);

interface DiscoverViewProps {
    initialEvents: Event[];
}

import { AnimatedEventCard } from './animated-event-card';

export function DiscoverView({ initialEvents }: DiscoverViewProps) {
    const t = useTranslations('Discover');
    const { date, setDate, userCountry, filteredEvents } = useDiscover({
        initialEvents,
    });

    const scrollToEvents = useCallback(() => {
        const eventsSection = document.getElementById('events-section');
        eventsSection?.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div
                className="animate-fade-in"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
                <Navbar />
            </div>

            {/*  */}
            <section className="px-4 pt-32 pb-6 md:px-8 md:pt-40 md:pb-16 lg:pt-48 lg:pb-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h1
                        className="mb-6 inline-flex flex-col items-center text-3xl font-medium sm:text-4xl md:mb-10 md:text-5xl lg:text-6xl"
                        style={{
                            animationDelay: '0.3s',
                            animationFillMode: 'both',
                        }}
                    >
                        <div className="flex items-center">
                            <span
                                className="animate-fade-in border border-black px-3 py-2 md:px-6 md:py-4"
                                style={{
                                    animationDelay: '0.3s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('discover')}
                            </span>
                            <span
                                className="animate-fade-in -ml-px rounded-[20px] border border-black bg-[#ff6bff] px-3 py-2 md:rounded-[40px] md:px-6 md:py-4"
                                style={{
                                    animationDelay: '0.4s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('events')}
                            </span>
                        </div>
                        <div className="-mt-px flex items-center">
                            <span
                                className="animate-fade-in border border-black px-3 py-2 md:px-6 md:py-4"
                                style={{
                                    animationDelay: '0.5s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('near')}
                            </span>
                            <span
                                className="animate-fade-in border border-l-0 border-black px-3 py-2 md:px-6 md:py-4"
                                style={{
                                    animationDelay: '0.6s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('you')}
                            </span>
                        </div>
                    </h1>
                    <p
                        className="animate-fade-in mx-auto max-w-2xl text-sm text-black md:text-base lg:text-[18px]"
                        style={{
                            animationDelay: '0.7s',
                            animationFillMode: 'both',
                        }}
                    >
                        {t('subheading')}
                    </p>
                </div>
            </section>

            <EventsCarousel />

            <section
                id="events-section"
                className="px-4 pt-6 pb-16 md:px-8 md:pt-16"
            >
                <div>
                    <div
                        className="animate-fade-in mb-6 flex flex-wrap items-center gap-0 md:mb-8"
                        style={{
                            animationDelay: '0.8s',
                            animationFillMode: 'both',
                        }}
                    >
                        <h2 className="mb-2 w-full text-base font-normal sm:mb-0 sm:w-auto md:text-lg lg:text-xl">
                            {t('browsingIn')}
                        </h2>
                        <span className="border border-black px-2 py-1 text-base font-normal sm:ml-2 md:text-lg lg:text-xl">
                            {userCountry}
                        </span>

                        <div className="lg:hidden">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className={cn(
                                            'flex items-center border border-l-0 border-black bg-white px-2 py-1 text-base font-normal transition-colors hover:bg-gray-50 md:text-lg lg:text-xl',
                                            !date && 'text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            format(date, 'MMM do, yyyy')
                                        ) : (
                                            <span>{t('pickDate')}</span>
                                        )}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className={cn(
                                            'pointer-events-auto p-3',
                                        )}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-[280px_1fr] lg:gap-12">
                        <div
                            className="animate-fade-in hidden self-start lg:sticky lg:top-24 lg:block"
                            style={{
                                animationDelay: '0.9s',
                                animationFillMode: 'both',
                            }}
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="mx-auto"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-start-2 lg:grid-cols-3">
                            {filteredEvents.length === 0 ? (
                                <div className="col-span-full py-12 text-center">
                                    {date
                                        ? `${t('noEvents')} for ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
                                        : t('noEvents')}
                                </div>
                            ) : (
                                filteredEvents.map((event, index) => (
                                    <AnimatedEventCard
                                        key={event.id}
                                        event={event}
                                        index={index}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
