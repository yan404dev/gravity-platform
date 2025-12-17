"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/mock-data';
import { authService } from '@/lib/auth-store';

export const useNavbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [pendingRoute, setPendingRoute] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        authService.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (user && pendingRoute) {
            router.push(pendingRoute);
            setPendingRoute(null);
            setIsAuthOpen(false);
        }
    }, [user, pendingRoute, router]);

    useEffect(() => setMounted(true), []);

    const handleSignOut = async () => {
        await authService.signOut();
        setIsMobileMenuOpen(false);
    };

    const handleCreateEventClick = () => {
        if (user) {
            router.push('/create-event');
        } else {
            setPendingRoute('/create-event');
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
    const closeAuth = () => {
        setIsAuthOpen(false);
        setPendingRoute(null);
    };

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
            setIsAuthOpen
        }
    };
};
