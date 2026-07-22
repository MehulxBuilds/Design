import "server-only";
import { cookies } from "next/headers";
import { client } from "@/lib/db";

export const getAccessKeySession = async () => {
  const value = (await cookies()).get("token")?.value;
  if (!value) return null;
  return client.accessKey.findFirst({ where: { key: value, block: false } });
};

export const requireAccessKey = async () => {
  const accessKey = await getAccessKeySession();
  if (!accessKey) throw new Error("Unauthorized: a valid access key is required");
  return accessKey;
};
