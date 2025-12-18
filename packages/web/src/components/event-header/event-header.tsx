import React from 'react';

interface EventHeaderProps {
    title: string;
    creator: string;
}

import { useTranslations } from 'next-intl';

export const EventHeader: React.FC<EventHeaderProps> = ({ title, creator }) => {
    const t = useTranslations('EventView');
    return (
        <div className="relative flex flex-col items-start gap-4 self-stretch">
            <header>
                <h1 className="relative self-stretch text-[56px] leading-[54.88px] font-medium tracking-[-2.24px] text-[#1A1A1A] max-md:text-[42px] max-md:leading-[38px] max-md:tracking-[-1.68px] max-sm:text-[32px] max-sm:leading-[30px] max-sm:tracking-[-1.28px]">
                    {title}
                </h1>
            </header>
            <div className="relative self-stretch text-[11px] font-normal text-[#1A1A1A] uppercase">
                {t('by')} {creator}
            </div>
        </div>
    );
};
