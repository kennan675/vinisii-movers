import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pickup, destination, date, houseType, phone, notes } = body;

        // Basic validation
        if (!pickup || !destination || !date || !phone) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const job = await prisma.job.create({
            data: {
                pickup,
                destination,
                date: new Date(date),
                houseType: houseType || "Standard",
                phone,
                notes,
                status: "New",
            },
        });

        // TODO: Send WhatsApp notification here

        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
