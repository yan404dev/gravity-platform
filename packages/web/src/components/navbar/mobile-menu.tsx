import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { User } from '@/lib/mock-data';

interface MobileMenuProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    handleCreateEventClick: () => void;
    handleSignOut: () => void;
    openAuth: () => void;
}

const MobileMenu = memo(
    ({
        isOpen,
        user,
        onClose,
        handleCreateEventClick,
        handleSignOut,
        openAuth,
    }: MobileMenuProps) => {
        const t = useTranslations('Navbar');
        const tDiscover = useTranslations('Discover');

        if (!isOpen) return null;

        return createPortal(
            <div className="animate-in slide-in-from-top fixed inset-0 z-[3000] flex flex-col duration-300 md:hidden">
                <div className="animate-in fade-in flex items-center justify-center bg-[#1A1A1A] py-16 duration-500">
                    <button
                        onClick={onClose}
                        className="text-[11px] font-medium tracking-wider text-white uppercase"
                    >
                        CLOSE
                    </button>
                </div>

                <div className="flex flex-1 flex-col bg-white">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="animate-fade-in flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase"
                        style={{
                            animationDelay: '0.1s',
                            animationFillMode: 'both',
                        }}
                    >
                        {tDiscover('discover')}
                    </Link>
                    <button
                        onClick={handleCreateEventClick}
                        className="animate-fade-in flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase"
                        style={{
                            animationDelay: '0.2s',
                            animationFillMode: 'both',
                        }}
                    >
                        {t('createEvent')}
                    </button>
                    {user ? (
                        <>
                            <Link
                                href="/my-events"
                                onClick={onClose}
                                className="animate-fade-in flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase"
                                style={{
                                    animationDelay: '0.3s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('myEvents')}
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="animate-fade-in flex flex-1 items-center justify-center text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase"
                                style={{
                                    animationDelay: '0.4s',
                                    animationFillMode: 'both',
                                }}
                            >
                                {t('signOut')}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={openAuth}
                            className="animate-fade-in flex flex-1 items-center justify-center text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase"
                            style={{
                                animationDelay: '0.3s',
                                animationFillMode: 'both',
                            }}
                        >
                            {t('signIn')}
                        </button>
                    )}
                </div>
            </div>,
            document.body,
        );
    },
);

MobileMenu.displayName = 'MobileMenu';

export { MobileMenu };
