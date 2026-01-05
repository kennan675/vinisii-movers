import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const bookings = await prisma.job.findMany({
            orderBy: { createdAt: "desc" },
            include: { staff: true, vehicle: true },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}
