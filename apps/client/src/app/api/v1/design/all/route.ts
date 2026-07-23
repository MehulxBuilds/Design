// api/v1/design/all

// get all the published designs (public link)

import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import { uploadthingsURI } from "@/lib/constants";

const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Something went wrong";

const imageUrl = (key: string) => `${uploadthingsURI}/f/${key}`;

const withUrl = <T extends { key: string }>(design: T) => ({
    ...design,
    url: imageUrl(design.key),
});

export async function GET() {
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
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: errorMessage(error),
                design: [],
            },
            { status: 500 }
        );
    }
};