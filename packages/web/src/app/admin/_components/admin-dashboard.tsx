"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/app/_types/event";
import { EventEditForm } from "./event-edit-form";
import { User } from "@supabase/supabase-js";
import { useAdminDashboard } from "../_hooks/use-admin-dashboard";

interface AdminDashboardProps {
    initialEvents: Event[];
    user: User;
}

export function AdminDashboard({ initialEvents, user }: AdminDashboardProps) {
    const {
        events,
        selectedEvent,
        setSelectedEvent,
        handleSignOut,
        refreshEvents,
    } = useAdminDashboard({ initialEvents, user });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-normal text-[#1A1A1A] tracking-[-0.02em]">
                    Event CMS
                </h1>
                <Button onClick={handleSignOut} variant="outline">
                    Sign Out
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar List */}
                <div className="md:col-span-1 border-r border-gray-200 pr-4">
                    <h3 className="font-bold mb-4">Events</h3>
                    <ul className="space-y-2">
                        {events.map((evt) => (
                            <li key={evt.id}>
                                <button
                                    onClick={() => setSelectedEvent(evt)}
                                    className={`w-full text-left p-2 hover:bg-gray-100 rounded ${selectedEvent?.id === evt.id
                                            ? "bg-gray-100 font-medium"
                                            : ""
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
                        <div className="text-gray-500">Select an event to edit</div>
                    )}
                </div>
            </div>
        </div>
    );
}
