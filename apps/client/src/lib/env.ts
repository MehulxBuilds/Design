import { z } from "zod";

export const EnvSchema = z.object({
    DATABASE_URL: z.string().url(),
    UPLOADTHING_TOKEN: z.string(),
});

export type WebEnv = z.infer<typeof EnvSchema>;

export const env = EnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
});