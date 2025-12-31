'use client';


import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { authService } from '@/shared/services/auth.service';
import { useToast } from '@/shared/hooks/use-toast';
import { useUser } from '@/shared/hooks/use-user';

export const useNavbar = () => {
    const t = useTranslations('Navbar');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { user } = useUser();

    const { mutate: signOut } = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(['me'], null);
            router.push('/');
            toast({ title: t('signOutSuccess') });
        },
    });

    const handleSignOut = () => {
        signOut();
    };

    return {
        user,
        handleSignOut,
    };
};
