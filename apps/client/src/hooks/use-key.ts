"use client";
import { Keyblock, keyall, keydel, keygen, keyme } from "@/actions/key";
import type { KeyBlock, KeyDel, KeyMe } from "@/types/key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const accessKeyKeys = { all: ["access-keys"] as const };

const ensureSuccess = <T extends { success: boolean; message: string }>(result: T) => {
    if (!result.success) throw new Error(result.message); return result;
};

export const useAccessKeys = () => useQuery({
    queryKey: accessKeyKeys.all,
    queryFn: async () => ensureSuccess(await keyall())
});

export const useCreateAccessKey = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async () => ensureSuccess(await keygen()),
        onSuccess: () => qc.invalidateQueries({ queryKey: accessKeyKeys.all })
    });
};

export const useDeleteAccessKey = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: KeyDel) => ensureSuccess(await keydel(input)), onSuccess: () => qc.invalidateQueries({ queryKey: accessKeyKeys.all })
    });
};

export const useToggleAccessKeyBlock = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: KeyBlock) => ensureSuccess(await Keyblock(input)),
        onSuccess: () => qc.invalidateQueries({ queryKey: accessKeyKeys.all })
    });
};

export const useKeyMe = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: KeyMe) => ensureSuccess(await keyme({ key: input.key })),
        onSuccess: () => qc.invalidateQueries({ queryKey: accessKeyKeys.all })
    });
};