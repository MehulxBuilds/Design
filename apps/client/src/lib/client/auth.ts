import { LoginPayload, RegisterPayload } from "@/types/auth";
import { api } from "../auth";

export const loginApi = async (payload: LoginPayload) => {
    const { data, error } = await api.v1.auth.login.post({
        email: payload.email,
        password: payload.password
    });

    if (error) {
        throw new Error(error.value.message);
    }

    return data;
}

export const registerApi = async (payload: RegisterPayload) => {
    const { data, error } = await api.v1.auth.register.post({
        name: payload.name,
        email: payload.email,
        password: payload.password
    });

    if (error) {
        throw new Error(error.value.message);
    }

    return data;
}

export const getUserApi = async (token: string) => {

    if (!token) {
        throw new Error("Not authenticated");
    }

    const { data, error } = await api.v1.auth.me.get({
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (error) {
        throw new Error(error.value.message);
    }

    return data;
}