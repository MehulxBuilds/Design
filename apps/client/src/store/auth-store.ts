"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setAuthCookie } from '@/lib/key';
import type { User } from '@/types/key';

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    updateUser: (user: User) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user, token) => {
                setAuthCookie(token);
                set({ user, token });
            },
            updateUser: (user) => set({ user }),
            clearUser: () => {
                setAuthCookie('');
                set({ user: null, token: null });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: ({ user, token }) => ({ user, token }),
        }
    )
);