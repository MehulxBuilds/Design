"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { setAuthCookie } from "@/lib/key";
import type { AccessKeyRecord } from "@/types/key";

interface AuthState {
    accessKey: AccessKeyRecord | null;
    token: string | null;
    setAccessKey: (accessKey: AccessKeyRecord) => void;
    updateAccessKey: (accessKey: AccessKeyRecord) => void;
    clearAccessKey: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessKey: null,
            token: null,
            setAccessKey: (accessKey) => {
                setAuthCookie(accessKey.key);
                set({ accessKey, token: accessKey.key });
            },
            updateAccessKey: (accessKey) => set({ accessKey, token: accessKey.key }),
            clearAccessKey: () => {
                setAuthCookie("");
                set({ accessKey: null, token: null });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: ({ accessKey, token }) => ({ accessKey, token }),
        }
    )
);
