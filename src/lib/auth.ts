import { supabase } from './supabaseClient';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export async function signUp(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { user: data?.user ?? null, error };
}

export async function logIn(email: string, password: string): Promise<{ session: Session | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { session: data?.session ?? null, error };
}

export async function logOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
}

export async function getSession(): Promise<{ data: { session: Session | null }; error: AuthError | null }> {
    return supabase.auth.getSession();
}
