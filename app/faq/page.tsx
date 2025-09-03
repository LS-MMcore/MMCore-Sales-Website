"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/contexts/LanguageContext"

type FaqItem = { question: string; answer: string }

// Build FAQ items with i18n strings
const buildFaqItems = (t: (k: string, opts?: any) => any): FaqItem[] => {
    // Try items array (i18next/next-intl with returnObjects)
    const itemsAttempt = (t as any)("apiDocs.faq.items", { returnObjects: true }) as any
    if (Array.isArray(itemsAttempt)) {
        return itemsAttempt
            .filter(Boolean)
            .map((it) => ({ question: String(it?.question ?? ""), answer: String(it?.answer ?? "") }))
            .filter((it) => it.question && it.answer)
    }

    // Try reading the whole faq object and pulling subkeys (ignoring title/subtitle)
    const faqObj = (t as any)("apiDocs.faq", { returnObjects: true }) as any
    if (faqObj && typeof faqObj === "object" && !Array.isArray(faqObj)) {
        const derived: FaqItem[] = []
        for (const key of Object.keys(faqObj)) {
            if (key === "title" || key === "subtitle") continue
            const maybe = faqObj[key]
            const question = typeof maybe?.question === "string" ? maybe.question : (t as any)(`apiDocs.faq.${key}.question`)
            const answer = typeof maybe?.answer === "string" ? maybe.answer : (t as any)(`apiDocs.faq.${key}.answer`)
            if (typeof question === "string" && typeof answer === "string" && question && answer) {
                derived.push({ question, answer })
            }
        }
        if (derived.length) return derived
    }

    // Final fallback: known keys
    const DEFAULT_FAQ_KEYS = ["shipping", "orderTracking", "returns", "orderChanges", "payment", "customerService"]
    return DEFAULT_FAQ_KEYS.map((k) => ({
        question: t(`apiDocs.faq.${k}.question`),
        answer: t(`apiDocs.faq.${k}.answer`),
    }))
}

export default function FaqPage() {
    const [expandedItems, setExpandedItems] = useState<number[]>([])
    const { t } = useLanguage()

    const faqItems = buildFaqItems(t as any)

    const toggleItem = (index: number) => {
        setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div style={{ paddingTop: "50px" }}>
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#63b2dc]/10 via-[#63b2dc]/20 to-background">
                    <div className="container px-4 md:px-6">
                        <div className="text-center space-y-4 max-w-4xl mx-auto">
                            <div className="flex justify-center mb-6">
                                <div className="p-3 rounded-full" style={{ backgroundColor: "#63b2dc20" }}>
                                    <HelpCircle className="h-8 w-8" style={{ color: "#63b2dc" }} />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ color: "#63b2dc" }}>
                                {t("apiDocs.faq.title")}
                            </h1>
                            <p className="mx-auto max-w-[800px] text-slate-700 text-lg md:text-xl">{t("apiDocs.faq.subtitle")}</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="w-full py-12 md:py-24 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqItems.map((faq, idx) => {
                                const isExpanded = expandedItems.includes(idx)
                                return (
                                    <Card key={idx} className="border-[#63b2dc]/30">
                                        <CardHeader
                                            className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                                            onClick={() => toggleItem(idx)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg text-slate-800 text-left">{faq.question}</CardTitle>
                                                <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                                                    {isExpanded ? (
                                                        <ChevronDown className="h-5 w-5 text-slate-500" />
                                                    ) : (
                                                        <ChevronRight className="h-5 w-5 text-slate-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <CardContent>
                                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                            </CardContent>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="w-full py-12 md:py-24" style={{ backgroundColor: "#63b2dc10" }}>
                    <div className="container px-4 md:px-6">
                        <div className="text-center space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" style={{ color: "#63b2dc" }}>
                                {t("apiDocs.faq.ctaTitle")}
                            </h2>
                            <p className="text-slate-700 md:text-lg">
                                {t("apiDocs.faq.ctaSubtitle")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/#contact"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2"
                                    style={{ backgroundColor: "#63b2dc" }}
                                >
                                    {t("apiDocs.faq.ctaButton")}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}
