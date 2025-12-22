'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@/shared/i18n/routing';
import { Menu } from 'lucide-react';
import { AuthSheet } from '../auth-sheet';
import { useNavbar } from './use-navbar';
import { LanguageSwitcher } from '../language-switcher';
import { MobileMenu } from './mobile-menu';

import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

export const Navbar: React.FC = () => {
    const t = useTranslations('Navbar');
    const tDiscover = useTranslations('Discover');
    const {
        user,
        handleSignOut,
    } = useNavbar();

    return (
        <nav className="fixed top-8 right-4 left-4 z-[2000] flex items-center justify-between md:right-8 md:left-8">
            <div className="flex items-center gap-0">
                <div className="flex h-[34px] w-[34px] items-center justify-center border border-black bg-black text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        className="h-4 w-4"
                    >
                        <g id="smiley-smirk">
                            <path
                                id="Subtract"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                fillRule="evenodd"
                                d="M1.83645 1.83645C3.06046 0.612432 4.82797 0 7 0s3.9395 0.612432 5.1636 1.83645C13.3876 3.06046 14 4.82797 14 7s-0.6124 3.9395 -1.8364 5.1636C10.9395 13.3876 9.17203 14 7 14s-3.93954 -0.6124 -5.16355 -1.8364C0.612432 10.9395 0 9.17203 0 7s0.612432 -3.93954 1.83645 -5.16355ZM5.0769 4.98816c0 -0.34518 -0.27982 -0.625 -0.625 -0.625 -0.34517 0 -0.625 0.27982 -0.625 0.625v0.7c0 0.34518 0.27983 0.625 0.625 0.625 0.34518 0 0.625 -0.27982 0.625 -0.625v-0.7Zm5.0962 0c0 -0.34518 -0.27983 -0.625 -0.625 -0.625 -0.34518 0 -0.625 0.27982 -0.625 0.625v0.7c0 0.34518 0.27982 0.625 0.625 0.625 0.34517 0 0.625 -0.27982 0.625 -0.625v-0.7Zm0.1787 2.42929c0.3217 0.12505 0.4812 0.48724 0.3561 0.80897 -0.2805 0.72182 -0.75537 1.29603 -1.40641 1.68306 -0.64416 0.38292 -1.4264 0.56282 -2.30149 0.56282 -0.34518 0 -0.625 -0.2798 -0.625 -0.62501 0 -0.34518 0.27982 -0.625 0.625 -0.625 0.7083 0 1.25628 -0.14564 1.66273 -0.38728 0.39956 -0.23753 0.69571 -0.58697 0.88012 -1.06143 0.12505 -0.32173 0.48725 -0.48117 0.80895 -0.35613Z"
                                clipRule="evenodd"
                            ></path>
                        </g>
                    </svg>
                </div>

                <div className="hidden items-center md:flex">
                    <Link
                        href="/"
                        className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                    >
                        <span className="relative z-10">
                            {tDiscover('discover')}
                        </span>
                        <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                    </Link>

                    {user ? (
                        <Link
                            href="/create-event"
                            className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                        >
                            <span className="relative z-10">
                                {t('createEvent')}
                            </span>
                            <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                        </Link>
                    ) : (
                        <AuthSheet>
                            <button
                                className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                            >
                                <span className="relative z-10">
                                    {t('createEvent')}
                                </span>
                                <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            </button>
                        </AuthSheet>
                    )}

                    {user ? (
                        <>
                            <Link
                                href="/my-events"
                                className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                            >
                                <span className="relative z-10">
                                    {t('myEvents')}
                                </span>
                                <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                            >
                                <span className="relative z-10">
                                    {t('signOut')}
                                </span>
                                <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            </button>
                        </>
                    ) : (
                        <AuthSheet>
                            <button
                                className="group relative flex h-[34px] items-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase"
                            >
                                <span className="relative z-10">
                                    {t('signIn')}
                                </span>
                                <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            </button>
                        </AuthSheet>
                    )}
                </div>

                <MobileMenu
                    user={user}
                    handleSignOut={handleSignOut}
                    handleCreateEventClick={() => { }} // No longer used directly, handled internally or via link
                >
                    <button
                        className="group relative flex h-[34px] items-center justify-center overflow-hidden border border-l-0 border-black bg-white px-3 text-[11px] leading-none font-medium text-black uppercase md:hidden"
                    >
                        <span className="relative z-10">MENU</span>
                        <span className="absolute inset-0 translate-y-full bg-[#FA76FF] transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                    </button>
                </MobileMenu>
            </div>

            <div className="flex items-center gap-3">
                <LanguageSwitcher />

                {user && (
                    <Avatar className="h-9 w-9 border border-white/20 transition-opacity hover:opacity-80">
                        <AvatarImage
                            src={undefined}
                            alt={user.name || user.email}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-[#1A1A1A] text-xs font-medium text-white uppercase">
                            {user.name
                                ? user.name.substring(0, 2)
                                : user.email.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>
        </nav>
    );
};
