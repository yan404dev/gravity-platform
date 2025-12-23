import React from 'react';
import arrowRight from '@/shared/assets/arrow-right.svg';

interface EventLocationProps {
    address: string;
    onGetDirections: () => void;
}

import { useTranslations } from 'next-intl';

export const EventLocation: React.FC<EventLocationProps> = ({
    address,
    onGetDirections,
}) => {
    const t = useTranslations('EventView');
    const encodedAddress = encodeURIComponent(address);
    return (
        <section className="relative flex flex-col items-start gap-4 self-stretch">
            <div className="relative flex flex-col items-start gap-5 self-stretch">
                <hr className="relative h-px self-stretch border-0 bg-[#1A1A1A]" />
                <h2 className="relative self-stretch text-[11px] font-normal text-[#1A1A1A] uppercase">
                    {t('location')}
                </h2>
            </div>
            <div className="relative flex items-start gap-8 self-stretch max-sm:flex-col max-sm:gap-4">
                <address className="relative flex-1 text-[17px] leading-[20.74px] font-normal tracking-[-0.34px] text-[#1A1A1A] not-italic">
                    {address}
                </address>
                <a
                    href={`https://maps.google.com/?q=${encodedAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex cursor-pointer items-center gap-2 bg-transparent text-[11px] font-normal whitespace-nowrap text-[#1A1A1A] uppercase no-underline transition-opacity hover:opacity-70"
                >
                    <img src={arrowRight.src} alt="" className="h-2.5 w-2" />
                    {t('getDirections')}
                </a>
            </div>
            <iframe
                src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                className="relative h-[214px] w-full self-stretch border-0 max-sm:h-[180px]"
                loading="lazy"
                title="Event location map"
            />
        </section>
    );
};
