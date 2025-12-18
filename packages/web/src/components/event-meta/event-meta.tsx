import React from 'react';

interface EventMetaProps {
    date: string;
    time: string;
}

export const EventMeta: React.FC<EventMetaProps> = ({ date, time }) => {
    return (
        <div className="relative flex items-start gap-[-1px]">
            <div className="relative flex h-[24px] items-center justify-center gap-2.5 bg-[#1A1A1A] px-2">
                <time className="relative text-[11px] font-normal text-white uppercase">
                    {date}
                </time>
            </div>
            <div className="relative flex h-[24px] items-center justify-center gap-2.5 border border-solid border-[#1A1A1A] px-2">
                <time className="relative text-[11px] font-normal text-[#1A1A1A] uppercase">
                    {time}
                </time>
            </div>
        </div>
    );
};
