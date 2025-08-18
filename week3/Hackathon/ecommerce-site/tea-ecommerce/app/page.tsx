import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CollectionsSection } from "@/components/collections-section"
import { BlogSection } from "@/components/blog-section"
import { WholesaleSection } from "@/components/wholesale-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
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
