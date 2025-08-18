import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CollectionsSection } from "@/components/CollectionsSection"
import { BlogSection } from "@/components/BlogSection"
import { WholesaleSection } from "@/components/WholesaleSection"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CollectionsSection />
        <BlogSection />
        <WholesaleSection />
      </main>
      <Footer />
    </div>
  )
}
