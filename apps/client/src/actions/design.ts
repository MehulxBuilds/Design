"use server";
import { client } from "@/lib/db";
import { utapi } from "@/lib/uploadthings";
import type { DesignAllRes, DesignDel, DesignDelRes, DesignGen, DesignGenRes, DesignUpd, DesignUpdRes } from "@/types/design";
import { requireAccessKey } from "@/lib/access";

const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Something went wrong";

const uploadImage = async (image: Buffer, title: string) => {
    const name = title.trim();
    const file = new File([new Uint8Array(image)], `${name}.png`, { type: "image/png" });
    const result = await utapi.uploadFiles(file);
    if (result.error || !result.data) throw new Error(result.error?.message ?? "Image upload failed");
    return result.data;
};

export const designall = async (): Promise<DesignAllRes> => {
  try {
    await requireAccessKey();
        const design = await client.design.findMany({ orderBy: { createdAt: "desc" } });
        return { success: true, message: "Designs fetched successfully", design };
    } catch (error) { return { success: false, message: errorMessage(error), design: [] }; }
};

export const designdel = async ({ id }: DesignDel): Promise<DesignDelRes> => {
  try {
    await requireAccessKey();
        const existing = await client.design.findUnique({ where: { id } });
        if (!existing) return { success: false, message: "Design not found" };
        await utapi.deleteFiles(existing.key);
        await client.design.delete({ where: { id } });
        return { success: true, message: "Design deleted successfully" };
    } catch (error) { return { success: false, message: errorMessage(error) }; }
};

export const designgen = async (input: DesignGen): Promise<DesignGenRes> => {
  let uploadedKey: string | undefined;
  try {
    await requireAccessKey();
        const uploaded = await uploadImage(input.image, input.title);
        uploadedKey = uploaded.key;
        const design = await client.design.create({ data: { title: input.title, description: input.description, key: uploaded.key, provider: "UPLOADTHINGS", updatedAt: new Date() } });
        return { success: true, message: "Design created successfully", design };
    } catch (error) {
        if (uploadedKey) await utapi.deleteFiles(uploadedKey).catch(() => undefined);
        return { success: false, message: errorMessage(error) };
    }
};

export const designupd = async (input: DesignUpd): Promise<DesignUpdRes> => {
  let uploadedKey: string | undefined;
  try {
    await requireAccessKey();
        const existing = await client.design.findUnique({ where: { id: input.id } });
        if (!existing) return { success: false, message: "Design not found" };
        let url = input.key || existing.key;
        if (input.buffer) {
            const uploaded = await uploadImage(input.buffer, input.title);
            uploadedKey = uploaded.key;
            url = uploaded.url;
        }
        const design = await client.design.update({ where: { id: input.id }, data: { title: input.title, description: input.description, url } });
        if (uploadedKey) await utapi.deleteFiles(existing.key).catch(() => undefined);
        return { success: true, message: "Design updated successfully", design };
    } catch (error) {
        if (uploadedKey) await utapi.deleteFiles(uploadedKey).catch(() => undefined);
        return { success: false, message: errorMessage(error) };
    }
};
