"use client";

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import arrowDown from '@/assets/arrow-down.png';
import { EventsCarousel } from '@/components/events-carousel';
import { RotatingBadge } from '@/components/rotating-badge';
import { useDiscover } from '../_hooks/use-discover';
import { EventCard } from './event-card';
import { Event } from '../_types/event';
// import { CategoryFilter } from '../../components/CategoryFilter';

interface DiscoverViewProps {
    initialEvents: Event[];
}

export function DiscoverView({ initialEvents }: DiscoverViewProps) {
    const { date, setDate, userCountry, filteredEvents } = useDiscover({ initialEvents });

    const scrollToEvents = () => {
        const eventsSection = document.getElementById('events-section');
        eventsSection?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <Navbar />
            </div>

            <RotatingBadge
                text="BROWSE"
                onClick={scrollToEvents}
                showIcon={true}
                icon={<img src={arrowDown.src} alt="Arrow down" className="w-6 h-6 md:w-7 md:h-7 lg:w-12 lg:h-12" />}
            />

            {/* Hero Section */}
            <section className="pt-32 md:pt-40 lg:pt-48 pb-6 md:pb-16 lg:pb-24 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-10 inline-flex flex-col items-center" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                        <div className="flex items-center">
                            <span className="border border-black px-3 md:px-6 py-2 md:py-4 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>Discover</span>
                            <span className="bg-[#ff6bff] border border-black px-3 md:px-6 py-2 md:py-4 rounded-[20px] md:rounded-[40px] -ml-px animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>events</span>
                        </div>
                        <div className="flex items-center -mt-px">
                            <span className="border border-black px-3 md:px-6 py-2 md:py-4 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>near</span>
                            <span className="border border-l-0 border-black px-3 md:px-6 py-2 md:py-4 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>you</span>
                        </div>
                    </h1>
                    <p className="text-sm md:text-base lg:text-[18px] text-black max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                        Explore popular events near you, browse by category, or check out some of the great community calendars.
                    </p>
                </div>
            </section>

            <EventsCarousel />

            <section id="events-section" className="px-4 md:px-8 pb-16 pt-6 md:pt-16">
                <div>
                    {/* Controls: Country & Date Picker (Mobile) */}
                    <div className="flex flex-wrap items-center gap-0 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                        <h2 className="text-base md:text-lg lg:text-xl font-normal w-full sm:w-auto mb-2 sm:mb-0">Browsing events in</h2>
                        <span className="text-base md:text-lg lg:text-xl font-normal border border-black px-2 py-1 sm:ml-2">{userCountry}</span>

                        <div className="lg:hidden">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className={cn(
                                            "text-base md:text-lg lg:text-xl font-normal border border-l-0 border-black px-2 py-1 flex items-center bg-white hover:bg-gray-50 transition-colors",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "MMM do, yyyy") : <span>Pick a date</span>}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className={cn("p-3 pointer-events-auto")}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 mt-8 md:mt-16">
                        {/* Desktop Calendar */}
                        <div className="hidden lg:block animate-fade-in lg:sticky lg:top-24 self-start" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
                            <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:col-start-2 gap-5">
                            {filteredEvents.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    {date ? `No events found for ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` : 'No events found'}
                                </div>
                            ) : (
                                filteredEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="animate-fade-in"
                                        style={{ animationDelay: `${1.0 + (index * 0.1)}s`, animationFillMode: 'both' }}
                                    >
                                        <EventCard event={event} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
