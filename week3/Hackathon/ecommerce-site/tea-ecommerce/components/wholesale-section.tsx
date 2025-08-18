import { Button } from "@/components/ui/button"

export function WholesaleSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-headline-large font-display mb-6">FOR WHOLESALERS</h2>
        <p className="text-body-large mb-8 max-w-2xl mx-auto">
          We offer loose tea leaves of the best quality for your business. With a choice of more than 450 different
          kinds of loose tea, we can make a sophisticated selection that fits exactly in your kind of establishment.
        </p>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 text-label-large">
          GET STARTED
        </Button>
      </div>
    </section>
  )
}
