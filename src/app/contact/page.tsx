import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container px-6 pt-32 pb-20 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-12">
                    Contact Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Phone</h3>
                                <p className="text-gray-600">+254 700 000 000</p>
                                <p className="text-gray-600">+254 711 111 111</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Email</h3>
                                <p className="text-gray-600">hello@viniseemovers.co.ke</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Office</h3>
                                <p className="text-gray-600">Zion Mall, Eldoret, Kenya</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-3xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
                        <form className="space-y-4">
                            <input className="w-full p-4 rounded-xl border border-gray-200" placeholder="Your Name" />
                            <input className="w-full p-4 rounded-xl border border-gray-200" placeholder="Email Address" />
                            <textarea className="w-full p-4 rounded-xl border border-gray-200 h-32" placeholder="Message" />
                            <Button className="w-full h-12 text-lg">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
