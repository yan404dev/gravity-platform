import { supabase } from '@/integrations/supabase/client';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export const authService = {
    signIn: async (email: string, password: string) => {
        return await supabase.auth.signInWithPassword({
            email,
            password
        });
    },

    signUp: async (email: string, password: string) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/`
            }
        });
    },

    signOut: async () => {
        return await supabase.auth.signOut();
    },

    getSession: async () => {
        return await supabase.auth.getSession();
    },

    onAuthStateChange: (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
        return supabase.auth.onAuthStateChange(callback);
    }
};
