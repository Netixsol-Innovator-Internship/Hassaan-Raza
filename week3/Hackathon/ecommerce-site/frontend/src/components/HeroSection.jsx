import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/LandingImage.png"
                alt="Various tea varieties in spoons"
                className="w-full h-full object-cover "
              />
            </div>
          </div>

          {/* Right Image */}

          <div className="order-1 lg:order-2 space-y-6 p-5 justify-self-end ">
            <h1 className="text-4xl lg:text-5xl font-prosto text-[#282828]">Every day is unique, just like our tea</h1>

            <div className="space-y-4">
              <p className="text-lg font-montserrat text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros
                in.
              </p>
              <p className="text-lg font-montserrat text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros
                in.
              </p>
            </div>

            <Button  className="bg-[#282828] text-white hover:bg-[#282828]/90 px-8 py-3 text-sm font-montserrat font-medium">
              BROWSE TEAS
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
