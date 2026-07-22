"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        // const data = await getUserApi(token);
        // return data.user;
    } catch {
        return null;
    }
}

export const requireSession = async () => {
    const user = await getSession();
    if (!user) redirect("/sign-in");
    return user;
};

export const requireNotSession = async () => {
    const user = await getSession();
    if (user) redirect("/dashboard");
    return user;
};

export const requireOnboarded = async () => {
    const user = await requireSession();
    if (!user.name) redirect("/onboarding");
    return user;
};

export const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Something went wrong";