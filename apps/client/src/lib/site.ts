import { env } from "./env";

const configuredUrl = env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = (configuredUrl).replace(/\/$/, "");
