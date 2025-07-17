"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/tracking", label: "Tracking" },
        { href: "#services", label: "services" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="fixed w-full top-0 z-50 bg-card border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center py-2">
                    <Image src="/mmcore_slogan.png" alt="Company Logo" width={150} height={60} priority />
                </div>

                <div className="hidden md:flex items-center space-x-8 h-full">
                    {navItems.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`relative h-full flex items-center px-2 group ${isActive(href)
                                ? "text-primary font-semibold"
                                : "text-foreground hover:text-primary transition-colors"
                                }`}
                        >
                            {label}
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive(href) ? "scale-x-100" : ""
                                    }`}
                            />
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors flex items-center space-x-1">
                                <Globe className="w-5 h-5" />
                                <span className="uppercase">{selectedLanguage}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedLanguage("en")}>English</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedLanguage("nl")}>Nederlands</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors flex items-center space-x-1">
                                <Globe className="w-5 h-5" />
                                <span className="uppercase">{selectedLanguage}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedLanguage("en")}>English</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedLanguage("nl")}>Nederlands</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden bg-card border-t border-border shadow-lg animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
