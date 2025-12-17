"use client";

import { useState } from "react";
import { User } from "@/lib/mock-data";
import { toast } from "sonner";

interface UseEventViewProps {
    eventId: string;
    user: User | null;
    initialIsRegistered: boolean;
    targetDate: string;
}

export function useEventView({
    eventId,
    user,
    initialIsRegistered,
    targetDate,
}: UseEventViewProps) {
    const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isEventEnded = new Date(targetDate).getTime() < Date.now() - 3600000; // 1 hour buffer

    const handleRegister = async () => {
        if (isEventEnded) {
            toast.error("Event has ended", {
                description: "You cannot register for past events",
            });
            return;
        }

        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            if (isRegistered) {
                // Mock Unregister
                setIsRegistered(false);
                toast.success("Unregistered", {
                    description: "You have been unregistered from this event",
                });
            } else {
                // Mock Register
                setIsRegistered(true);
                toast.success("Registered!", {
                    description: "You have successfully registered for this event",
                });
            }
        } catch (error: any) {
            toast.error("Error", {
                description: error.message || "Failed to update registration",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGetDirections = () => {
        window.open("https://maps.google.com", "_blank");
    };

    return {
        isRegistered,
        isAuthOpen,
        setIsAuthOpen,
        loading,
        isEventEnded,
        handleRegister,
        handleGetDirections,
    };
}
