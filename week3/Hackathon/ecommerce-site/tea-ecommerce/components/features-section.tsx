import { Button } from "@/components/ui/button"
import { Package, Award, Truck, Leaf } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "450+ KIND OF LOOSE TEA",
    description: "Wide variety of premium loose tea",
  },
  {
    icon: Award,
    title: "CERTIFICATED ORGANIC TEAS",
    description: "Certified organic and premium quality",
  },
  {
    icon: Truck,
    title: "FREE DELIVERY",
    description: "Free shipping on all orders",
  },
  {
    icon: Leaf,
    title: "SAMPLE FOR ALL TEAS",
    description: "Try before you buy with samples",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background-variant py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-label-large font-medium text-primary">{feature.title}</h3>
              <p className="text-body-small text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  )
}
