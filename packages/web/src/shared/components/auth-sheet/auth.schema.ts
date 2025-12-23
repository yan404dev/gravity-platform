import { z } from 'zod';

export const createAuthSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email({ message: t('email.error') }),
        password: z
            .string()
            .min(6, { message: t('password.error') }),
        name: z.string().optional(),
    });

export type AuthFormData = z.infer<ReturnType<typeof createAuthSchema>>;
