"use client";

import { useEffect } from "react";
import { Toaster } from "./ui/sonner";
import QueryProvider from "./query-client";
import { ThemeProvider } from "./theme-provider";
import { useKeyMe } from "@/hooks/use-key";
import { useAuthStore } from "@/store/key-store";

const AuthInitializer = () => {
    const token = useAuthStore((state) => state.token);
    const validateKey = useKeyMe();

    useEffect(() => {
        if (token) validateKey.mutate({ key: token });
        // Revalidate only when the persisted credential changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return null;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <AuthInitializer />
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                forcedTheme="light"
                enableSystem={false}
                disableTransitionOnChange
            >
                {children}
                <Toaster position="top-center" />
            </ThemeProvider>
        </QueryProvider>
    );
};

export default Providers;
