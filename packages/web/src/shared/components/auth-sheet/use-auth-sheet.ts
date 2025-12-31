'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToast } from '@/shared/hooks/use-toast';
import { createAuthSchema, AuthFormData } from './auth.schema';
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

    const authSchema = createAuthSchema(t);

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
            );
            setIsSignUp(false);
        },
    });

    const onSubmit = (data: AuthFormData) => {
        if (isSignUp) registerUser(data);
        else login(data);
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

