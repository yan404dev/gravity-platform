import { z } from 'zod';

export const createAuthSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email({ message: t('email.error') }),
        password: z
            .string()
            .min(6, { message: t('password.error') }),
        profile: z.object({
            name: z.string().min(1, { message: t('name.error') || 'Name is required' }),
        }),
    });

export type AuthFormData = z.infer<ReturnType<typeof createAuthSchema>>;
