import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                        V
                    </div>
                    <span className="text-2xl font-bold font-display text-gray-800 tracking-tight">
                        Vinisee<span className="text-primary">Movers</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Home", "Services", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="text-gray-600 hover:text-primary font-medium transition-colors relative hover:after:w-full after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-4px] after:left-0 after:transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://wa.me/254700000000" // Placeholder number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        WhatsApp
                    </a>
                    <Button className="rounded-full px-6 py-6 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" size="lg">
                        Book a Move
                    </Button>
                </div>
            </div>
        </nav>
    );
}
