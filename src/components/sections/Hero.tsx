"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const images = [
    "/images/hero-1.png",
    "/images/hero-2.png",
    "/images/hero-3.png",
];

export function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Slideshow */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={images[index]}
                        alt="Moving Background"
                        fill
                        className="object-cover brightness-[0.85]" // Light overlay
                        priority
                    />
                    {/* Light white gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container relative z-10 px-6 mt-16 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-2xl space-y-8"
                >
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-gray-900 tracking-tight">
                            Move with <br />
                            <span className="text-primary">Confidence</span> & Ease
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            Experience the future of moving with Vinisee Movers.
                            Premium, reliable, and stress-free relocation services across Kenya.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1">
                            Book Your Move <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 bg-white/50 backdrop-blur-sm hover:bg-white transition-all text-gray-800">
                            <Phone className="mr-2 w-5 h-5 text-green-600" /> Call Us Now
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* 3D Accent Placeholder (To be enhanced) */}
            <div className="absolute right-0 bottom-0 md:bottom-20 md:right-20 w-32 h-32 md:w-64 md:h-64 opacity-50 pointer-events-none">
                {/* Placeholder for Three.js element */}
            </div>
        </section>
    );
}
