import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    title: "HOW TO STEEP TEA LIKE A PRO",
    excerpt: "Learn the art of steeping tea perfectly every time with our expert tips and techniques.",
    image: "/tea-steeping-guide.png",
    date: "March 15, 2024",
  },
  {
    title: "ALL ABOUT TEA AROMAS",
    excerpt: "Discover the complex world of tea aromas and how they enhance your tea drinking experience.",
    image: "/tea-aromas.png",
    date: "March 10, 2024",
  },
]

export function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-prosto text-[#282828] mb-4">Last Blog Posts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-montserrat text-gray-500 mb-2">{post.date}</div>
                <h3 className="text-xl font-montserrat font-medium text-[#282828] mb-3">{post.title}</h3>
                <p className="text-base font-montserrat text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="link" className="text-[#C3B212] hover:text-[#C3B212]/80 p-0">
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-[#282828] text-[#282828] hover:bg-[#282828] hover:text-white bg-transparent"
          >
            BROWSE ALL POSTS
          </Button>
        </div>
      </div>
    </section>
  )
}
