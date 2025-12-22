import React, { memo, useState } from 'react';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';
import { User } from '@/shared/entities/user.entity';
import { AuthSheet } from '../auth-sheet';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/shared/components/ui/sheet';

interface MobileMenuProps {
    children: React.ReactNode;
    user: User | null;
    handleCreateEventClick: () => void;
    handleSignOut: () => void;
}

const MobileMenu = memo(
    ({
        children,
        user,
        handleSignOut,
    }: MobileMenuProps) => {
        const t = useTranslations('Navbar');
        const tDiscover = useTranslations('Discover');
        const [isOpen, setIsOpen] = useState(false);

        const closeMenu = () => setIsOpen(false);

        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent side="top" className="h-full w-full border-none bg-white p-0 [&>button]:hidden">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-center bg-[#1A1A1A] py-16">
                            <button
                                onClick={closeMenu}
                                className="text-[11px] font-medium tracking-wider text-white uppercase"
                            >
                                CLOSE
                            </button>
                        </div>

                        <div className="flex flex-1 flex-col bg-white">
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-100"
                            >
                                {tDiscover('discover')}
                            </Link>

                            {user ? (
                                <>
                                    <Link
                                        href="/create-event"
                                        onClick={closeMenu}
                                        className="flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-200"
                                    >
                                        {t('createEvent')}
                                    </Link>
                                    <Link
                                        href="/my-events"
                                        onClick={closeMenu}
                                        className="flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-300"
                                    >
                                        {t('myEvents')}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            closeMenu();
                                        }}
                                        className="flex flex-1 items-center justify-center text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-400"
                                    >
                                        {t('signOut')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <AuthSheet>
                                        <button
                                            className="w-full flex flex-1 items-center justify-center border-b border-black text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-200"
                                        >
                                            {t('createEvent')}
                                        </button>
                                    </AuthSheet>
                                    <AuthSheet>
                                        <button
                                            className="w-full flex flex-1 items-center justify-center text-[17px] font-medium tracking-[-0.34px] text-[#1A1A1A] uppercase animate-in fade-in duration-500 fill-mode-both delay-300"
                                        >
                                            {t('signIn')}
                                        </button>
                                    </AuthSheet>
                                </>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        );
    },
);

MobileMenu.displayName = 'MobileMenu';

export { MobileMenu };
