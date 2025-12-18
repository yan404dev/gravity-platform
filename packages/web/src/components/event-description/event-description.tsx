import React from 'react';
interface EventDescriptionProps {
    description: string;
}
import { useTranslations } from 'next-intl';

export const EventDescription: React.FC<EventDescriptionProps> = ({
    description,
}) => {
    const t = useTranslations('EventView');
    return (
        <section className="relative flex flex-col items-start gap-4 self-stretch">
            <div className="relative my-0 flex flex-col items-start gap-5 self-stretch">
                <hr className="relative h-px self-stretch border-0 bg-[#1A1A1A]" />
                <h2 className="relative self-stretch text-[11px] font-normal text-[#1A1A1A] uppercase">
                    {t('about')}
                </h2>
            </div>
            <p className="relative self-stretch text-[17px] leading-[20.74px] font-normal tracking-[-0.34px] text-[#1A1A1A]">
                {description}
            </p>
        </section>
    );
};
