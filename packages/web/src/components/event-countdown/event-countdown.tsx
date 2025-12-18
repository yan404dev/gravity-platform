import React from 'react';
import { useEventCountdown } from './use-event-countdown';
import { useTranslations } from 'next-intl';

interface EventCountdownProps {
    targetDate?: Date;
}
export const EventCountdown: React.FC<EventCountdownProps> = ({
    targetDate = new Date(Date.now() + 132 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 51 * 60 * 1000 + 2 * 1000)
}) => {
    const t = useTranslations('EventView');
    const { timeLeft, status, formatTime } = useEventCountdown(targetDate);
    if (status === 'ended') {
        return null;
    }

    if (status === 'happening') {
        return (
            <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] flex items-center justify-center bg-white border border-black rounded-full">
                <span className="text-black font-medium">{t('live')}</span>
            </div>
        );
    }

    return <div className="flex items-center gap-[2px] w-[409px] h-[49px] max-md:static max-md:w-auto max-md:justify-center max-sm:flex-wrap">
        <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                {formatTime(timeLeft.days, 'D')}
            </div>
        </div>
        <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                {formatTime(timeLeft.hours, 'H')}
            </div>
        </div>
        <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 mx-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                {formatTime(timeLeft.minutes, 'M')}
            </div>
        </div>
        <div className="flex justify-center items-center gap-[5px] relative bg-white px-4 py-2.5 max-sm:px-3 max-sm:py-2 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="text-[#1A1A1A] text-[42px] font-medium tracking-[-1.68px] relative max-md:text-[32px] max-md:tracking-[-1.28px] max-sm:text-2xl max-sm:tracking-[-0.96px]">
                {formatTime(timeLeft.seconds, 'S')}
            </div>
        </div>
    </div>;
};
