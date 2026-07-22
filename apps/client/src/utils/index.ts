"use server";

import { redirect } from "next/navigation";
import { getAccessKeySession } from "@/lib/access";

async function getSession() {
    try { return await getAccessKeySession(); } catch { return null; }
}

export const requireSession = async () => {
    const user = await getSession();
    if (!user) redirect("/access");
    return user;
};

export const requireNotSession = async () => {
    const user = await getSession();
    if (user) redirect("/dashboard");
    return user;
};

export const requireOnboarded = async () => {
    return requireSession();
};
