"use client";

import React from 'react';

interface EventRegistrationProps {
    onRegister: () => void;
    isRegistered: boolean;
    isLoading?: boolean;
    isEnded?: boolean;
    className?: string;
}

import { useTranslations } from 'next-intl';

export const EventRegistration: React.FC<EventRegistrationProps> = ({
    onRegister,
    isRegistered,
    isLoading = false,
    isEnded = false,
    className = "",
}) => {
    const t = useTranslations('EventView');
    return (
        <div className={`group flex items-center self-stretch relative overflow-hidden ${className}`}>
            <button
                onClick={onRegister}
                disabled={isLoading || isEnded}
                className={`flex h-[50px] justify-center items-center gap-2.5 border relative px-2.5 py-3.5 border-solid transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-[calc(100%-50px)] z-10 ${isEnded
                    ? 'bg-gray-400 border-gray-400 cursor-not-allowed'
                    : 'bg-[#1A1A1A] border-[#1A1A1A] group-hover:w-full group-hover:bg-[#FA76FF] group-hover:border-[#FA76FF]'
                    }`}
                aria-label={isEnded ? "Event has ended" : isRegistered ? "Unregister from event" : "Register for event"}
            >
                <span className={`text-white text-[13px] font-normal uppercase relative transition-colors duration-300 ${!isEnded && 'group-hover:text-black'}`}>
                    {isLoading ? t('loading') : isEnded ? t('eventEnded') : isRegistered ? t('unregister') : t('register')}
                </span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-[18px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                    aria-hidden="true"
                >
                    <path d="M0.857178 6H10.3929" stroke="#1A1A1A" strokeWidth="1.5" />
                    <path d="M6.39282 10L10.3928 6L6.39282 2" stroke="#1A1A1A" strokeWidth="1.5" />
                </svg>
            </button>
            {!isEnded && (
                <div className="flex w-[50px] h-[50px] justify-center items-center border absolute right-0 bg-white rounded-[99px] border-solid border-[#1A1A1A] transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:scale-50 pointer-events-none z-0">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow-icon"
                        aria-hidden="true"
                    >
                        <path d="M0.857178 6H10.3929" stroke="#1A1A1A" strokeWidth="1.5" />
                        <path d="M6.39282 10L10.3928 6L6.39282 2" stroke="#1A1A1A" strokeWidth="1.5" />
                    </svg>
                </div>
            )}
        </div>
    );
};
