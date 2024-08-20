import { writable } from 'svelte/store';
import { supabase } from './supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

const user = writable<User | null>(null);
const session = writable<Session | null>(null);
const userRole = writable<string | null>(null);

async function initializeAuth() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error fetching session:', error.message);
        return;
    }
    session.set(data.session);
    user.set(data.session?.user ?? null);

    if (data.session?.user) {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();

        if (!profileError) {
            userRole.set(profile?.role || null);
        }
    }

    supabase.auth.onAuthStateChange((event, currentSession) => {
        if (currentSession) {
            user.set(currentSession.user ?? null);
            session.set(currentSession);
            if (currentSession.user) {
                // add post-login event
            } else {
                userRole.set(null);
            }
        } else {
            user.set(null);
            session.set(null);
            userRole.set(null);
        }
    });
}

initializeAuth();

export { user, session, userRole };
