'use client';

import { MOCK_USER, User } from '@/lib/mock-data';

export function useUser() {
    const user: User | null = MOCK_USER;
    const loading = false;

    return { user, loading };
}
