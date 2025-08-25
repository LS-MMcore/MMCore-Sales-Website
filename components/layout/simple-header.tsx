import { useState } from "react"
import { Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
]

export default function SimpleHeader() {
    const [currentLang, setCurrentLang] = useState("en")

    const handleLanguageChange = (langCode: string) => {
        setCurrentLang(langCode)
        // Update document language
        if (typeof document !== "undefined") {
            document.documentElement.lang = langCode
        }
    }

    const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.history.back()}
                            className="gap-2 text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back</span>
                        </Button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                <Globe className="h-4 w-4" />
                                <span className="hidden sm:inline">{currentLanguage.name}</span>
                                <span className="sm:hidden">{currentLanguage.flag}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {languages.map((lang) => (
                                <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="gap-2">
                                    <span>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
