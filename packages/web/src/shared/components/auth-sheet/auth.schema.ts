import { z } from 'zod';

// Schema base para login (apenas email e senha)
export const createLoginSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email({ message: t('email.error') }),
        password: z.string().min(6, { message: t('password.error') }),
    });

export const createRegisterSchema = (t: (key: string) => string) =>
    createLoginSchema(t).extend({
        profile: z.object({
            name: z.string().min(1, { message: t('name.error') || 'Name is required' }),
        }),
    });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
export type AuthFormData = RegisterFormData;
export const createAuthSchema = createRegisterSchema;

