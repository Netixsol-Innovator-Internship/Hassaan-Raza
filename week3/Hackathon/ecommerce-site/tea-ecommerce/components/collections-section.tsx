"use client"

import { useEffect, useState } from "react"
import { productsAPI, type Product } from "@/lib/api"

// Collection mapping for display
const collectionConfig = [
  { name: "BLACK TEA", key: "Black Tea" },
  { name: "GREEN TEA", key: "Green Tea" },
  { name: "WHITE TEA", key: "White Tea" },
  { name: "OOLONG", key: "Oolong Tea" },
  { name: "HERBAL TEA", key: "Herbal Tea" },
  { name: "PU-ERH TEA", key: "Pu-erh Tea" },
]

export function CollectionsSection() {
  const [collections, setCollections] = useState<
    Array<{
      name: string
      key: string
      count: number
      image: string
      products: Product[]
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)

        // Fetch products for each collection
        const collectionPromises = collectionConfig.map(async (config) => {
          const response = await productsAPI.getProducts({
            collection: config.key,
            limit: 3, // Get a few products for each collection
          })

          return {
            name: config.name,
            key: config.key,
            count: response.pagination?.totalProducts || 0,
            image:
              response.data?.[0]?.image || `/placeholder.svg?height=300&width=300&query=${config.name.toLowerCase()}`,
            products: response.data || [],
          }
        })

        const collectionsData = await Promise.all(collectionPromises)
        setCollections(collectionsData)
      } catch (error) {
        console.error("Error fetching collections:", error)
        // Fallback to static data if API fails
        setCollections(
          collectionConfig.map((config) => ({
            name: config.name,
            key: config.key,
            count: 0,
            image: `/placeholder.svg?height=300&width=300&query=${config.name.toLowerCase()}`,
            products: [],
          })),
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const handleCollectionClick = (collectionKey: string) => {
    // TODO: Navigate to collection page with filters
    console.log("Navigate to collection:", collectionKey)
  }

  if (loading) {
    return (
      <section id="collections" className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-headline-large font-display text-primary mb-4">Our Collections</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-gray-200 mb-4" />
                <div className="h-6 bg-gray-200 rounded mx-auto w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="collections" className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-headline-large font-display text-primary mb-4">Our Collections</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => handleCollectionClick(collection.key)}>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                {collection.count > 0 && (
                  <div className="absolute top-4 right-4 bg-white/90 text-primary px-2 py-1 rounded-full text-sm font-medium">
                    {collection.count} teas
                  </div>
                )}
              </div>
              <h3 className="text-title-medium font-medium text-center text-primary">{collection.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
