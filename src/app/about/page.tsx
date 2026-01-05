import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";

export default function About() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container px-6 pt-32 pb-20 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
                    About Vinisee Movers
                </h1>
                <div className="prose prose-lg text-gray-600 mb-12">
                    <p>
                        Vinisee Movers is Eldoret's premier moving agency, dedicated to providing seamless,
                        efficient, and stress-free relocation services. Founded with a vision to modernize
                        the logistics industry in Kenya, we combine technology with top-tier customer service.
                    </p>
                    <p>
                        Our team consists of trained professionals who handle your belongings with the utmost care.
                        From studio apartments to large corporate offices, we have the fleet and the expertise to move you safely.
                    </p>
                </div>

                <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-xl mb-12">
                    <Image
                        src="/images/hero-2.png"
                        alt="Our Team"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
