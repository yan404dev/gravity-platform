import React from 'react';
import { useEventCountdown } from './use-event-countdown';
import { useTranslations } from 'next-intl';

interface EventCountdownProps {
    targetDate?: Date;
}
export const EventCountdown: React.FC<EventCountdownProps> = ({
    targetDate = new Date(
        Date.now() +
            132 * 24 * 60 * 60 * 1000 +
            12 * 60 * 60 * 1000 +
            51 * 60 * 1000 +
            2 * 1000,
    ),
}) => {
    const t = useTranslations('EventView');
    const { timeLeft, status, formatTime } = useEventCountdown(targetDate);
    if (status === 'ended') {
        return null;
    }

    if (status === 'happening') {
        return (
            <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full border border-black bg-white md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]">
                <span className="font-medium text-black">{t('live')}</span>
            </div>
        );
    }

    return (
        <div className="flex h-[49px] w-[409px] items-center gap-[2px] max-md:static max-md:w-auto max-md:justify-center max-sm:flex-wrap">
            <div
                className="animate-fade-in relative flex items-center justify-center gap-[5px] bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
                <div className="relative text-[42px] font-medium tracking-[-1.68px] text-[#1A1A1A] max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                    {formatTime(timeLeft.days, 'D')}
                </div>
            </div>
            <div
                className="animate-fade-in relative flex items-center justify-center gap-[5px] bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
                <div className="relative text-[42px] font-medium tracking-[-1.68px] text-[#1A1A1A] max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                    {formatTime(timeLeft.hours, 'H')}
                </div>
            </div>
            <div
                className="animate-fade-in relative mx-0 flex items-center justify-center gap-[5px] bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
                <div className="relative text-[42px] font-medium tracking-[-1.68px] text-[#1A1A1A] max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                    {formatTime(timeLeft.minutes, 'M')}
                </div>
            </div>
            <div
                className="animate-fade-in relative flex items-center justify-center gap-[5px] bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
                <div className="relative text-[42px] font-medium tracking-[-1.68px] text-[#1A1A1A] max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                    {formatTime(timeLeft.seconds, 'S')}
                </div>
            </div>
        </div>
    );
};
