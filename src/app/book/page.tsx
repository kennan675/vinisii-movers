"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function BookMove() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date>();
    const [formData, setFormData] = useState({
        pickup: "",
        destination: "",
        houseType: "",
        phone: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) return alert("Please select a date");
        setLoading(true);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, date }),
            });

            if (res.ok) {
                alert("Booking request received! We will contact you shortly.");
                router.push("/");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container px-6 pt-32 pb-20 max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                            Book Your Move
                        </h1>
                        <p className="text-gray-600">
                            Fill in the details below and get a quote instantly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="pickup">Pickup Location</Label>
                                <Input
                                    id="pickup"
                                    placeholder="e.g. Westlands, Nairobi"
                                    required
                                    value={formData.pickup}
                                    onChange={(e) =>
                                        setFormData({ ...formData, pickup: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destination">Destination</Label>
                                <Input
                                    id="destination"
                                    placeholder="e.g. Eldoret CBD"
                                    required
                                    value={formData.destination}
                                    onChange={(e) =>
                                        setFormData({ ...formData, destination: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Moving Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Current House Type</Label>
                                <Select
                                    required
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, houseType: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Studio">Studio / Bedsitter</SelectItem>
                                        <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                                        <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                                        <SelectItem value="3+ Bedroom">3+ Bedroom</SelectItem>
                                        <SelectItem value="Office">Office</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+254 700 000 000"
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Fragile items, stairs only, elevator availability, etc."
                                value={formData.notes}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                }
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-lg h-12"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
