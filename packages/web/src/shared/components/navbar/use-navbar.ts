'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { User } from '@/shared/entities/user.entity';
import { authService } from '@/shared/services/auth.service';
import { useToast } from '@/shared/hooks/use-toast';

export const useNavbar = () => {
    const t = useTranslations('Navbar');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const { data: user } = useQuery({
        queryKey: ['me'],
        queryFn: authService.me,
        retry: false,
    });

    const { mutate: signOut } = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(['me'], null);
            router.push('/');
            setIsMobileMenuOpen(false);
            toast({ title: t('signOutSuccess') });
        },
    });

    const handleSignOut = () => {
        signOut();
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
        handleSignOut,
        handleCreateEventClick,
        openAuth,
        toggleMobileMenu,
        closeMobileMenu,
        closeAuth,
        setIsAuthOpen,
    };
};
