// api/v1/design/all

// get all the published designs (public link)

import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import { uploadthingsURI } from "@/lib/constants";

const allowedOrigins = new Set([
    "https://mehulxbuilds.in",
    "http://localhost:3000",
]);

const corsHeaders = (request: Request) => {
    const origin = request.headers.get("origin");

    return {
        ...(origin && allowedOrigins.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Vary": "Origin",
    };
};

const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Something went wrong";

const imageUrl = (key: string) => `${uploadthingsURI}/f/${key}`;

const withUrl = <T extends { key: string }>(design: T) => ({
    ...design,
    url: imageUrl(design.key),
});

export async function GET(request: Request) {
    try {
        const rows = await client.design.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        const design = rows.map(withUrl);

        return NextResponse.json({
            success: true,
            message: "Designs fetched successfully",
            design,
        }, {
            headers: corsHeaders(request),
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: errorMessage(error),
                design: [],
            },
            {
                status: 500,
                headers: corsHeaders(request),
            }
        );
    }
}

export function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders(request),
    });
}
