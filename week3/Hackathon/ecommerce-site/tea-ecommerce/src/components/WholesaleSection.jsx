import { Button } from "@/components/ui/button"

export function WholesaleSection() {
  return (
    <section className="bg-[#282828] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-prosto mb-6">FOR WHOLESALERS</h2>
        <p className="text-lg font-montserrat mb-8 max-w-2xl mx-auto">
          We offer loose tea leaves of the best quality for your business. With a choice of more than 450 different
          kinds of loose tea, we can make a sophisticated selection that fits exactly in your kind of establishment.
        </p>
        <Button className="bg-[#C3B212] text-white hover:bg-[#C3B212]/90 px-8 py-3 text-sm font-montserrat font-medium">
          GET STARTED
        </Button>
      </div>
    </section>
  )
}
