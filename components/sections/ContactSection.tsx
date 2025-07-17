"use client";

import { Card } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        sector: "",
        message: "",
    })
    const [status, setStatus] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, sector: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Simulate form submission
        console.log("Form submitted:", formData)
        setStatus("Your message has been sent successfully!")
        setFormData({ firstName: "", lastName: "", email: "", companyName: "", sector: "", message: "" }) // Clear form
        setTimeout(() => setStatus(null), 5000) // Clear status after 5 seconds
    }

    return (
        <Card className="p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Stuur ons een bericht</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">Voornaam *</Label>
                        <Input
                            id="firstName"
                            placeholder="Je voornaam"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Achternaam *</Label>
                        <Input
                            id="lastName"
                            placeholder="Je achternaam"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="je@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="companyName">Bedrijfsnaam</Label>
                        <Input id="companyName" placeholder="Je bedrijf" value={formData.companyName} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Select onValueChange={handleSelectChange} value={formData.sector}>
                            <SelectTrigger id="sector">
                                <SelectValue placeholder="Selecteer sector" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ecommerce">E-commerce</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Bericht *</Label>
                    <Textarea
                        id="message"
                        placeholder="Vertel ons over je project of vraag..."
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="mr-2 h-4 w-4" /> Verstuur bericht
                </Button>
                {status && <p className="text-center text-sm text-green-600 mt-2">{status}</p>}
            </form>
        </Card>
    )
}

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-400 text-white"
        >
            <div className="container px-4 md:px-6 text-center">
                <div className="space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Neem Contact Op</h2>
                    <p className="mx-auto max-w-[700px] text-white md:text-xl">
                        Klaar om je bedrijf naar het volgende niveau te tillen? Laten we praten over jouw uitdagingen en doelen.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <ContactForm />
                    {/* Right Column: Contact Details & CTA */}
                    <div className="flex flex-col gap-8">
                        <Card className="p-6 shadow-lg flex-1">
                            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Contactgegevens</h3>
                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Telefoon</p>
                                        <a href="tel:+310612345678" className="text-muted-foreground hover:underline">
                                            +31 (0)6 12 34 56 78
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">E-mail</p>
                                        <a href="mailto:info@MMCore.eu" className="text-muted-foreground hover:underline">
                                            info@MMCore.eu
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Bereikbaarheid</p>
                                        <p className="text-muted-foreground">Ma-Vr: 9:00 - 18:00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Locatie</p>
                                        <p className="text-muted-foreground">Nederland</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
