"use client";

import React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { AuthSheet } from '../auth-sheet';
import { useNavbar } from './use-navbar';

export const Navbar: React.FC = () => {
    const {
        user,
        isAuthOpen,
        isMobileMenuOpen,
        mounted,
        actions: {
            handleSignOut,
            handleCreateEventClick,
            openAuth,
            toggleMobileMenu,
            closeMobileMenu,
            closeAuth,
            setIsAuthOpen
        }
    } = useNavbar();

    if (!mounted) return null;

    return createPortal(
        <>
            <nav className="fixed top-8 left-4 md:left-8 z-[2000] flex items-center gap-0" >
                <div className="bg-black text-white h-[34px] w-[34px] border border-black flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className="w-4 h-4">
                        <g id="smiley-smirk">
                            <path id="Subtract" fill="currentColor" stroke="currentColor" strokeWidth="0.5" fillRule="evenodd" d="M1.83645 1.83645C3.06046 0.612432 4.82797 0 7 0s3.9395 0.612432 5.1636 1.83645C13.3876 3.06046 14 4.82797 14 7s-0.6124 3.9395 -1.8364 5.1636C10.9395 13.3876 9.17203 14 7 14s-3.93954 -0.6124 -5.16355 -1.8364C0.612432 10.9395 0 9.17203 0 7s0.612432 -3.93954 1.83645 -5.16355ZM5.0769 4.98816c0 -0.34518 -0.27982 -0.625 -0.625 -0.625 -0.34517 0 -0.625 0.27982 -0.625 0.625v0.7c0 0.34518 0.27983 0.625 0.625 0.625 0.34518 0 0.625 -0.27982 0.625 -0.625v-0.7Zm5.0962 0c0 -0.34518 -0.27983 -0.625 -0.625 -0.625 -0.34518 0 -0.625 0.27982 -0.625 0.625v0.7c0 0.34518 0.27982 0.625 0.625 0.625 0.34517 0 0.625 -0.27982 0.625 -0.625v-0.7Zm0.1787 2.42929c0.3217 0.12505 0.4812 0.48724 0.3561 0.80897 -0.2805 0.72182 -0.75537 1.29603 -1.40641 1.68306 -0.64416 0.38292 -1.4264 0.56282 -2.30149 0.56282 -0.34518 0 -0.625 -0.2798 -0.625 -0.62501 0 -0.34518 0.27982 -0.625 0.625 -0.625 0.7083 0 1.25628 -0.14564 1.66273 -0.38728 0.39956 -0.23753 0.69571 -0.58697 0.88012 -1.06143 0.12505 -0.32173 0.48725 -0.48117 0.80895 -0.35613Z" clipRule="evenodd"></path>
                        </g>
                    </svg>
                </div>

                <div className="hidden md:flex items-center">
                    <Link
                        href="/"
                        className="relative overflow-hidden bg-white text-black h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border border-black leading-none group"
                    >
                        <span className="relative z-10">DISCOVER</span>
                        <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                    </Link>
                    <button
                        onClick={handleCreateEventClick}
                        className="relative overflow-hidden bg-white text-black h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-black leading-none group"
                    >
                        <span className="relative z-10">CREATE EVENT</span>
                        <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                    </button>
                    {user ? (
                        <>
                            <Link
                                href="/my-events"
                                className="relative overflow-hidden bg-white text-black h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-black leading-none group"
                            >
                                <span className="relative z-10">MY EVENTS</span>
                                <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="relative overflow-hidden bg-white text-black h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-black leading-none group"
                            >
                                <span className="relative z-10">SIGN OUT</span>
                                <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={openAuth}
                            className="relative overflow-hidden bg-white text-black h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-black leading-none group"
                        >
                            <span className="relative z-10">SIGN IN</span>
                            <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                        </button>
                    )}
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-[3000] flex flex-col animate-in slide-in-from-top duration-300">
                        <div className="bg-[#1A1A1A] flex items-center justify-center py-16 animate-in fade-in duration-500">
                            <button
                                onClick={closeMobileMenu}
                                className="text-white text-[11px] font-medium uppercase tracking-wider"
                            >
                                CLOSE
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col bg-white">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
                                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                            >
                                DISCOVER
                            </Link>
                            <button
                                onClick={handleCreateEventClick}
                                className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
                                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                            >
                                CREATE EVENT
                            </button>
                            {user ? (
                                <>
                                    <Link
                                        href="/my-events"
                                        onClick={closeMobileMenu}
                                        className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
                                        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                                    >
                                        MY EVENTS
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
                                        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                                    >
                                        SIGN OUT
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={openAuth}
                                    className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
                                    style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                                >
                                    SIGN IN
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden relative overflow-hidden bg-white text-black h-[34px] px-3 border border-l-0 border-black flex items-center justify-center text-[11px] font-medium uppercase leading-none group"
                >
                    <span className="relative z-10">MENU</span>
                    <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                </button>
            </nav>

            <AuthSheet isOpen={isAuthOpen} onClose={closeAuth} />
        </>,
        document.body
    );
};
