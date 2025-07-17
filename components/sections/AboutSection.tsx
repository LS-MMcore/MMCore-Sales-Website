import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="w-full py-8 md:py-16 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Your Trusted Partner in Logistics
                        </h2>
                        <p className="text-muted-foreground md:text-lg">
                            With our extensive 3PL and 4PL network across Europe and the UK, we help businesses streamline
                            operations, reduce costs, and improve efficiency.
                        </p>
                        <p className="text-muted-foreground md:text-lg">
                            With MMCore, you gain a trusted logistics partner that helps streamline your operations, expand your
                            reach, and optimize your supply chain. Let's connect and move your business forward.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Image src="./orb.png" alt="MMCore Logo" width={300} height={300} priority />
                    </div>
                </div>
            </div>
        </section >
    );
}
