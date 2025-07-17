import { ServiceCard } from "@/components/service-card";
import { Package, Box, Warehouse, Truck, Landmark, Settings } from "lucide-react";

const services = [
    {
        icon: Package,
        title: "3PL Partner Search",
        description: "Matching businesses with reliable fulfilment and logistics partners.",
        tag: "Logistics",
    },
    {
        icon: Box,
        title: "ECommerce Fulfillment",
        description: "Fast and efficient order processing, pick, pack & ship services.",
        tag: "E-commerce",
    },
    {
        icon: Warehouse,
        title: "Warehousing Connections",
        description: "Secure, scalable, and cost-effective warehousing solutions.",
        tag: "Storage",
    },
    {
        icon: Truck,
        title: "Shipping & Freight Solutions",
        description: "Smooth and cost-efficient transportation via air, sea, and road.",
        tag: "Transport",
    },
    {
        icon: Landmark,
        title: "Customs Clearance & Compliance",
        description: "Ensuring smooth and compliant international trade procedures.",
        tag: "Customs",
    },
    {
        icon: Settings,
        title: "Customizing Your Supply Chain Needs",
        description: "Tailored supply chain solutions for seamless operations and cost savings.",
        tag: "Consulting",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Our Comprehensive Solutions
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        MMCore offers a wide range of logistics and supply chain services tailored to your business needs.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
