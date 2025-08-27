import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import TrackingSection from "@/components/sections/TrackingSection"
import ContactSection from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 pt-[58px]">
        <HeroSection />
        <AboutSection />
        <TrackingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
