import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="text-display-small lg:text-display-medium font-display text-primary">
              Every day is unique, just like our tea
            </h1>

            <div className="space-y-4">
              <p className="text-body-large text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros
                in.
              </p>
              <p className="text-body-large text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros
                in.
              </p>
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-label-large">
              BROWSE TEAS
            </Button>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/placeholder-u46j6.png"
                alt="Various tea varieties in spoons"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
