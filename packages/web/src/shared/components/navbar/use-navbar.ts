'use client';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { authService } from '@/shared/services/auth.service';
import { useToast } from '@/shared/hooks/use-toast';

export const useNavbar = () => {
    const t = useTranslations('Navbar');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();

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
