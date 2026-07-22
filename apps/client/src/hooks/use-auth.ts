"use client";

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';
import { getUserApi, loginApi, registerApi } from '@/lib/client/auth';
import { User } from '@/types/auth';

export const useLogin = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setUser(data?.user as User, data?.token ?? "");
            toast.success(data?.message);
            router.push('/dashboard');
        },
        onError: (error) => {
            toast.error(error.message ?? 'Login failed');
        },
    });
};

export const useRegister = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setUser(data?.user as User, data?.token ?? "");
            toast.success(data?.message);
            router.push('/dashboard');
        },
        onError: (error) => {
            toast.error(error.message ?? 'Registration failed');
        },
    });
};

export const useCurrentUser = () => {
    const updateUser = useAuthStore((s) => s.updateUser);
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await getUserApi(token!);
            updateUser(data?.user as User);
            return data;
        },
        enabled: Boolean(token),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};