'use client';

import { MOCK_USER, User } from '@/lib/mock-data';

/**
 * Hook simplificado para obter o usuário atual.
 * TODO: Substituir por chamada real à API quando implementada.
 */
export function useUser() {
    // Mock: sempre retorna usuário logado
    const user: User | null = MOCK_USER;
    const loading = false;

    return { user, loading };
}
