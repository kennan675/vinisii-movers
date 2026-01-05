import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Services />
    </main>
  );
}
