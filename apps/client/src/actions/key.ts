"use server";
import { randomBytes } from "node:crypto";
import { client } from "@/lib/db";
import type { KeyAllRes, KeyBlock, KeyBlockRes, KeyDel, KeyDelRes, KeyGenRes, KeyMe, KeyMeRes } from "@/types/key";
import { errorMessage } from "@/utils";

const generateKey = () => {
  return `dk_${randomBytes(32).toString("hex")}`;
};

export const keygen = async (): Promise<KeyGenRes> => {
  try {
    const key = await client.accessKey.create({ data: { key: generateKey(), updatedAt: new Date() } });
    return { success: true, message: "Access key created successfully", key };
  } catch (error) { return { success: false, message: errorMessage(error) }; }
};

export const keydel = async ({ id }: KeyDel): Promise<KeyDelRes> => {
  try {
    const result = await client.accessKey.deleteMany({ where: { id } });
    return result.count ? { success: true, message: "Access key deleted successfully" } : { success: false, message: "Access key not found" };
  } catch (error) { return { success: false, message: errorMessage(error) }; }
};

export const Keyblock = async ({ id }: KeyBlock): Promise<KeyBlockRes> => {
  try {
    const existing = await client.accessKey.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Access key not found" };
    const key = await client.accessKey.update({ where: { id }, data: { block: !existing.block } });
    return { success: true, message: key.block ? "Access key blocked" : "Access key unblocked", key };
  } catch (error) { return { success: false, message: errorMessage(error) }; }
};

export const keyall = async (): Promise<KeyAllRes> => {
  try {
    const keys = await client.accessKey.findMany({ orderBy: { createdAt: "desc" } });
    return { success: true, message: "Access keys fetched successfully", keys };
  } catch (error) { return { success: false, message: errorMessage(error), keys: [] }; }
};

export const keyme = async ({ key }: KeyMe): Promise<KeyMeRes> => {
  try {
    const accesskey = await client.accessKey.findUnique({
      where: { key: String(key) }
    });

    if (!accesskey?.key) {
      return { success: false, message: errorMessage("AccessKey Not Found") };
    }

    return { success: true, message: "Access keys fetched successfully", key: accesskey };
  } catch (error) { return { success: false, message: errorMessage(error) }; }
};