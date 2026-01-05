"use client";

import { motion } from "framer-motion";
import { Truck, Home, Briefcase, Globe, Package, Clock } from "lucide-react";

const services = [
    {
        icon: Home,
        title: "Residential Moving",
        description: "Stress-free household moves. We handle your furniture and delicate items with extreme care.",
    },
    {
        icon: Briefcase,
        title: "Office Relocation",
        description: "Efficient business moves with minimal downtime. We organize and transport your office assets securely.",
    },
    {
        icon: Globe,
        title: "Long Distance",
        description: "Moving across the country? Our logistics network ensures safe and timely delivery to any destination.",
    },
    {
        icon: Package,
        title: "Packing Services",
        description: "Premium packing with high-quality materials. We pack, label, and inventory everything for you.",
    },
    {
        icon: Truck,
        title: "Vehicle Transport",
        description: "Secure transport for your cars or motorcycles alongside your household goods.",
    },
    {
        icon: Clock,
        title: "Storage Solutions",
        description: "Short-term and long-term storage in our secure, climate-controlled facilities.",
    },
];

export function Services() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden" id="services">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900">
                        Premium Moving Services
                    </h2>
                    <p className="text-lg text-gray-600">
                        Tailored solutions for every move. Whether it's a studio apartment or a corporate headquarters, we have the expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-white border border-white/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <service.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
