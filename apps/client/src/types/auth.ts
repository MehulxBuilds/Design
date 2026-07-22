
export type UserPlans = "";
export interface User {
    id: string;
    name: string;
    email: string;
    plan: UserPlans;
    analysisCount: number;
    lastAnalysisDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    name: string;
    password: string;
}