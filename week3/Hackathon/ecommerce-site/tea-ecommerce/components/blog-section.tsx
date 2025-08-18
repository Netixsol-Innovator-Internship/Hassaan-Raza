import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    title: "HOW TO STEEP TEA LIKE A PRO",
    excerpt: "Learn the art of steeping tea perfectly every time with our expert tips and techniques.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 15, 2024",
  },
  {
    title: "ALL ABOUT TEA AROMAS",
    excerpt: "Discover the complex world of tea aromas and how they enhance your tea drinking experience.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 10, 2024",
  },
]

export function BlogSection() {
  return (
    <section className="bg-background-variant py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-headline-large font-display text-primary mb-4">Last Blog Posts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="text-body-small text-muted-foreground mb-2">{post.date}</div>
                <h3 className="text-title-large font-medium text-primary mb-3">{post.title}</h3>
                <p className="text-body-medium text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="link" className="text-secondary hover:text-secondary/80 p-0">
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            BROWSE ALL POSTS
          </Button>
        </div>
      </div>
    </section>
  )
}
