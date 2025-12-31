'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToast } from '@/shared/hooks/use-toast';
import { createAuthSchema, createLoginSchema, createRegisterSchema, AuthFormData, LoginFormData } from './auth.schema';
import { authService } from '../../services/auth.service';

type StringFieldPath = 'email' | 'password' | 'profile.name';

export type FormFieldConfig = {
    name: StringFieldPath;
    type: 'text' | 'email' | 'password';
    labelKey: string;
    showOnlySignUp?: boolean;
};

const FORM_FIELDS: FormFieldConfig[] = [
    { name: 'profile.name', type: 'text', labelKey: 'name', showOnlySignUp: true },
    { name: 'email', type: 'email', labelKey: 'email' },
    { name: 'password', type: 'password', labelKey: 'password' },
];

export const useAuthSheet = (onClose: () => void) => {
    const t = useTranslations('AuthSheet');
    const [isSignUp, setIsSignUp] = useState(false);
    const { toast } = useToast();

    const authSchema = isSignUp ? createRegisterSchema(t) : createLoginSchema(t);

    const form = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { email: '', password: '', profile: { name: '' } },
    });

    const handleSuccess = (
        title: string,
        description: string,
    ) => {
        toast({ title, description });
        if (!isSignUp) onClose();
    };

    const { mutate: login, isPending: isLoginPending } = useMutation({
        mutationFn: (data: LoginFormData) => authService.login(data),
        onSuccess: () =>
            handleSuccess(
                t('success.signIn.title'),
                t('success.signIn.description'),
            ),
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const { mutate: registerUser, isPending: isRegisterPending } = useMutation({
        mutationFn: (data: AuthFormData) => authService.register(data),
        onSuccess: (_, variables) => {
            toast({
                title: t('success.create.title'),
                description: t('success.create.description'),
            });
            login({
                email: variables.email,
                password: variables.password,
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: AuthFormData) => {
        if (isSignUp) {
            return registerUser(data);
        }


        const { profile, ...loginData } = data;

        login(loginData);
    };

    const toggleMode = () => setIsSignUp((prev) => !prev);

    const visibleFields = FORM_FIELDS.filter(
        field => !field.showOnlySignUp || isSignUp
    );

    return {
        isSignUp,
        loading: isLoginPending || isRegisterPending,
        form,
        onSubmit,
        toggleMode,
        visibleFields,
    };
};

