import { writable } from 'svelte/store';
import { supabase } from './supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

const user = writable<User | null>(null);

async function initializeAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error fetching session:', error.message);
        return;
    }
    user.set(session?.user ?? null);

    supabase.auth.onAuthStateChange((event, session) => {
        user.set(session?.user ?? null);
    });
}

initializeAuth();

export { user };
