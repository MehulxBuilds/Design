import { useAuthStore } from "@/store/key-store";

export function setAuthCookie(token: string) {
    if (typeof document === "undefined") return;
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${token ? 604800 : 0}; samesite=strict${secure}`;
}

export const authOptions = () => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("Not authenticated");
    return { headers: { authorization: `Bearer ${token}` } };
};
