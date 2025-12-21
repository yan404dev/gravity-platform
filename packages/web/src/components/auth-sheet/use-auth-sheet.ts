'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { authSchema, AuthFormData } from './auth.schema';

export const useAuthSheet = (onClose: () => void) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: AuthFormData) => {
        setLoading(true);

        try {
            // TODO: Implementar chamada real à API
            console.log('Auth submit:', { isSignUp, ...data });

            if (isSignUp) {
                toast({
                    title: 'Account created!',
                    description: 'You can now sign in with your credentials.',
                });
                setIsSignUp(false);
                reset({ ...data, password: '' });
            } else {
                toast({
                    title: 'Welcome back!',
                    description: 'You have successfully signed in.',
                });
                reset();
                onClose();
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => setIsSignUp(!isSignUp);

    return {
        isSignUp,
        loading,
        register,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        toggleMode,
    };
};
