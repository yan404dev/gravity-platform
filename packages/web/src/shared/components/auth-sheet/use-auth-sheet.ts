'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToast } from '@/shared/hooks/use-toast';
import { createAuthSchema, AuthFormData } from './auth.schema';
import { authService } from '../../services/auth.service';

export const useAuthSheet = (onClose: () => void) => {
    const t = useTranslations('AuthSheet');
    const [isSignUp, setIsSignUp] = useState(false);
    const { toast } = useToast();

    const authSchema = createAuthSchema(t);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { email: '', password: '', name: '' },
    });

    const handleSuccess = (
        title: string,
        description: string,
        clearInputs = false,
    ) => {
        toast({ title, description });
        if (!isSignUp) onClose();
    };

    const { mutate: login, isPending: isLoginPending } = useMutation({
        mutationFn: (data: AuthFormData) => authService.login(data),
        onSuccess: () =>
            handleSuccess(
                t('success.signIn.title'),
                t('success.signIn.description'),
            ),
    });

    const { mutate: registerUser, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: AuthFormData) => authService.register(data),
        onSuccess: () => {
            handleSuccess(
                t('success.create.title'),
                t('success.create.description'),
                true,
            );
            setIsSignUp(false);
        },
    });

    const onSubmit = (data: AuthFormData) => {
        if (isSignUp) registerUser(data);
        else login(data);
    };

    const toggleMode = () => setIsSignUp((prev) => !prev);

    return {
        isSignUp,
        loading: isLoginPending || isRegisterPending,
        register,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        toggleMode,
    };
};
