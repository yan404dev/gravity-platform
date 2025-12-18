import { MOCK_USER, User } from '@/lib/mock-data';

// value to simulate logged in state - default to logged in for dev convenience if desired, or null
let currentUser: User | null = MOCK_USER;
const listeners: ((
    event: string,
    session: { user: User | null } | null,
) => void)[] = [];

export const authService = {
    signIn: async (email: string, password: string) => {
        console.log('Mock: Signing in', email);
        currentUser = { ...MOCK_USER, email };
        authService.notifyListeners('SIGNED_IN');
        return {
            data: { user: currentUser, session: { user: currentUser } },
            error: null,
        };
    },

    signUp: async (email: string, password: string) => {
        console.log('Mock: Signing up', email);
        currentUser = { ...MOCK_USER, email };
        authService.notifyListeners('SIGNED_IN');
        return {
            data: { user: currentUser, session: { user: currentUser } },
            error: null,
        };
    },

    signOut: async () => {
        console.log('Mock: Signing out');
        currentUser = null;
        authService.notifyListeners('SIGNED_OUT');
        return { error: null };
    },

    getSession: async () => {
        return {
            data: {
                session: currentUser ? { user: currentUser } : null,
            },
            error: null,
        };
    },

    getUser: async () => {
        return {
            data: {
                user: currentUser,
            },
            error: null,
        };
    },

    onAuthStateChange: (callback: (event: any, session: any) => void) => {
        listeners.push(callback);
        // Immediate callback with current state
        callback(
            currentUser ? 'SIGNED_IN' : 'SIGNED_OUT',
            currentUser ? { user: currentUser } : null,
        );

        return {
            data: {
                subscription: {
                    unsubscribe: () => {
                        const index = listeners.indexOf(callback);
                        if (index > -1) listeners.splice(index, 1);
                    },
                },
            },
        };
    },

    notifyListeners(event: string) {
        listeners.forEach((l) =>
            l(event, currentUser ? { user: currentUser } : null),
        );
    },
};
