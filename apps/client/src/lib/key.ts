import { useAuthStore } from "@/store/auth-store";

export function setAuthCookie(token: string) {
    if (typeof document === "undefined") return;

    const secure = window.location.protocol === "https:" ? "; secure" : "";
    const maxAge = token ? 604800 : 0;
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
}

export const authOptions = () => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("Not authenticated");
    return { headers: { authorization: `Bearer ${token}` } };
};