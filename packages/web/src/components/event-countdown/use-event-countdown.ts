'use client';
import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export type EventStatus = 'upcoming' | 'happening' | 'ended';

export const useEventCountdown = (targetDate: Date) => {
    const calculateTimeLeft = (target: Date): TimeLeft => {
        const now = new Date().getTime();
        const distance = target.getTime() - now;

        if (distance > 0) {
            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                ),
                minutes: Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60),
                ),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const getEventStatus = (): EventStatus => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        const distance = target - now;
        const oneHour = 1000 * 60 * 60;

        if (distance < -oneHour) return 'ended';
        if (distance >= -oneHour && distance <= oneHour) return 'happening';
        return 'upcoming';
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
        calculateTimeLeft(targetDate),
    );
    const [status, setStatus] = useState<EventStatus>(getEventStatus());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(newTimeLeft);
            setStatus(getEventStatus());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const formatTime = (value: number, unit: string) => {
        return `${value.toString().padStart(unit === 'D' ? 1 : 2, '0')}${unit}`;
    };

    return {
        timeLeft,
        status,
        formatTime,
    };
};
