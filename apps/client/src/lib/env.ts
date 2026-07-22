export interface WebEnv {
    DATABASE_URL: string;
    UPLOADTHING_TOKEN: string;
}

const required = (name: keyof WebEnv, value: string | undefined) => {
    if (!value) throw new Error(`${name} is not set`);
    return value;
};

const databaseUrl = required("DATABASE_URL", process.env.DATABASE_URL);

try {
    new URL(databaseUrl);
} catch {
    throw new Error("DATABASE_URL must be a valid URL");
}

export const env: WebEnv = {
    DATABASE_URL: databaseUrl,
    UPLOADTHING_TOKEN: required("UPLOADTHING_TOKEN", process.env.UPLOADTHING_TOKEN),
};
