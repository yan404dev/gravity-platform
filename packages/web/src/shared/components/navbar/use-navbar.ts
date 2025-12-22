'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MOCK_USER } from '@/shared/lib/mock-data';

export const useNavbar = () => {
    const [user] = useState<User | null>(MOCK_USER);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleSignOut = async () => {
        console.log('Sign out clicked');
        setIsMobileMenuOpen(false);
    };

    const handleCreateEventClick = () => {
        if (user) {
            router.push('/create-event');
        } else {
            setIsAuthOpen(true);
        }
        setIsMobileMenuOpen(false);
    };

    const openAuth = () => {
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const closeAuth = () => setIsAuthOpen(false);

    return {
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
            setIsAuthOpen,
        },
    };
};
