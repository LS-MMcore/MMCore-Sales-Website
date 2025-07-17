import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground"
        >
            <div className="container px-4 md:px-6 text-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                        Seamless Logistics & Fulfillment Solutions Across Europe and the UK
                    </h1>
                    <p className="mx-auto max-w-[800px] text-lg md:text-xl">
                        Welcome to MMCore, your trusted partner in logistics and supply chain solutions. Based in the Netherlands,
                        we specialize in connecting brands, manufacturers, and logistics providers with the right partners.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="#contact">
                            <Button className="bg-white text-primary hover:bg-gray-100">Let's Connect</Button>
                        </Link>
                        <Link href="#services">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
