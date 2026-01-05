import { prisma } from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const bookings = await prisma.job.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <Button>Export Data</Button>
                </div>

                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            {format(new Date(booking.date), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{booking.phone}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(new Date(booking.createdAt), "MMM d, HH:mm")}
                                            </div>
                                        </TableCell>
                                        <TableCell>{booking.pickup}</TableCell>
                                        <TableCell>{booking.destination}</TableCell>
                                        <TableCell>{booking.houseType}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    booking.status === "New" ? "default" : "secondary"
                                                }
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}
