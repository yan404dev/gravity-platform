'use client';

import { Navbar } from '@/components/navbar';
import { Event } from '../../_types/event';
import { EventEditForm } from './event-edit-form';
import { User } from '@/lib/mock-data';
import { useAdminDashboard } from '../_hooks/use-admin-dashboard';

interface AdminDashboardProps {
    initialEvents: Event[];
    user: User;
}

export function AdminDashboard({ initialEvents, user }: AdminDashboardProps) {
    const { events, selectedEvent, setSelectedEvent, refreshEvents } =
        useAdminDashboard({ initialEvents, user });

    return (
        <div className="mx-auto max-w-4xl pt-32">
            <Navbar />
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-4xl font-normal tracking-[-0.02em] text-[#1A1A1A]">
                    Event CMS
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Sidebar List */}
                <div className="border-r border-gray-200 pr-4 md:col-span-1">
                    <h3 className="mb-4 font-bold">Events</h3>
                    <ul className="space-y-2">
                        {events.map((evt) => (
                            <li key={evt.id}>
                                <button
                                    onClick={() => setSelectedEvent(evt)}
                                    className={`w-full rounded p-2 text-left hover:bg-gray-100 ${
                                        selectedEvent?.id === evt.id
                                            ? 'bg-gray-100 font-medium'
                                            : ''
                                    }`}
                                >
                                    {evt.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit Area */}
                <div className="md:col-span-2">
                    {selectedEvent ? (
                        <EventEditForm
                            event={selectedEvent}
                            user={user}
                            onSuccess={refreshEvents}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Select an event to edit
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
