import { z } from "zod";

export const EnvSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
});

export type WebEnv = z.infer<typeof EnvSchema>;

export const env = EnvSchema.parse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});