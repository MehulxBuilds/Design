"use client";
import { designall, designdel, designgen, designupd } from "@/actions/design";
import type { DesignDel, DesignGen, DesignUpd } from "@/types/design";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const designKeys = { all: ["designs"] as const };

const ensureSuccess = <T extends { success: boolean; message: string }>(result: T) => {
    if (!result.success) throw new Error(result.message);
    return result;
};

export const useDesigns = () => useQuery({
    queryKey: designKeys.all,
    queryFn: async () => ensureSuccess(await designall())
});

export const useCreateDesign = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: DesignGen) => ensureSuccess(await designgen(input)),
        onSuccess: () => qc.invalidateQueries({ queryKey: designKeys.all })
    });
};

export const useUpdateDesign = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: DesignUpd) => ensureSuccess(await designupd(input)),
        onSuccess: () => qc.invalidateQueries({ queryKey: designKeys.all })
    });
};

export const useDeleteDesign = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: DesignDel) => ensureSuccess(await designdel(input)),
        onSuccess: () => qc.invalidateQueries({ queryKey: designKeys.all })
    });
};
