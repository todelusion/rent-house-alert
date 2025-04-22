import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { StatisticsSection } from "@/components/statistics-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatisticsSection />
        <FeatureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

