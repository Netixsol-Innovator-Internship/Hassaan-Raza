"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CartSidebar } from "@/components/CartSidebar"
import { productsAPI } from "@/lib/api"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { Minus, Plus, ShoppingBag, Clock, Thermometer, Droplets, Palette } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState("50g")
  const [quantity, setQuantity] = useState(1)
  const [showCart, setShowCart] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (id) {
      fetchProduct()
      fetchRelatedProducts()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getProduct(id)
      setProduct(response)
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await productsAPI.getProducts("limit=3")
      setRelatedProducts(response.products || [])
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart")
      return
    }

    try {
      setAddingToCart(true)
      await addToCart(product._id, quantity, { variant: selectedVariant })
      toast.success(`${product.name} added to cart!`)
      setShowCart(true)
    } catch (error) {
      toast.error("Failed to add item to cart")
    } finally {
      setAddingToCart(false)
    }
  }

  const handlePurchase = async () => {
    await handleAddToCart()
    if (isAuthenticated) {
      setShowCart(true)
    }
  }

  const variants = [
    { size: "50g", label: "50 g bag",image: "50.png", price: product?.price || 3.9 },
    { size: "100g", label: "100 g bag",image: "100.png", price: (product?.price || 3.9) * 1.8 },
    { size: "170g", label: "170 g bag",image: "170.png", price: (product?.price || 3.9) * 2.8 },
    { size: "250g", label: "250 g bag",image: "250.png", price: (product?.price || 3.9) * 3.5 },
    { size: "1kg", label: "1 kg bag",image: "1kg.png", price: (product?.price || 3.9) * 12 },
    { size: "sampler", label: "Sampler",image: "Sample.png", price: (product?.price || 3.9) * 0.5 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 aspect-square rounded-lg" />
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded" />
                <div className="bg-gray-200 h-4 rounded w-2/3" />
                <div className="bg-gray-200 h-20 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-[#282828] mb-4">Product not found</h1>
          <Link to="/collections">
            <Button variant="outline" className="bg-transparent">
              Back to Collections
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const breadcrumb = `HOME/COLLECTIONS/${product.collection?.toUpperCase()}/${product.name?.toUpperCase()}`
  const selectedVariantData = variants.find((v) => v.size === selectedVariant)

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>{breadcrumb}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || `/placeholder.svg?height=600&width=600&query=${product.name}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-prosto-one text-[#282828] mb-2">{product.name}</h1>
              <p className="text-gray-600 font-montserrat">{product.description}</p>
            </div>

            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="flex gap-1"> <img className="w-4 h-auto" src="/World.png" alt="" />  <div> Origin: {product.origin}</div></div>
              </Badge>
              {product.organic && (
                <Badge variant="outline" className="flex items-center gap-1">
                  🌱 Organic
                </Badge>
              )}
              {product.vegan && (
                <Badge variant="outline" className="flex items-center gap-1">
                  🌿 Vegan
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="text-3xl font-bold font-montserrat text-[#282828]">
              €{selectedVariantData?.price.toFixed(2)}
            </div>

            {/* Variants */}
            <div>
              <h3 className="font-medium font-montserrat text-[#282828] mb-3">Variants</h3>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedVariant(variant.size)}
                    className={`flex flex-col items-center p-3 border rounded-lg text-center transition-colors ${
                      selectedVariant === variant.size
                        ? "border-[#C3B212] bg-[#C3B212]/10"
                        : "border-gray-300 hover:border-[#C3B212]"
                    }`}
                  >
                    <img
                      src={`/${variant.image}`}
                      alt={variant.label}
                      className="w-10 h-10 mb-2 object-contain"
                    />
                    <div className="text-xs font-montserrat text-gray-600">{variant.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-montserrat">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={addingToCart}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <ShoppingBag className="w-4 h-4" />
                {addingToCart ? "Adding..." : "ADD TO BAG"}
              </Button>
            </div>

            {/* Purchase Button */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-montserrat">
                <span>Subtotal</span>
                <span>€{(selectedVariantData?.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-montserrat">
                <span>Delivery</span>
                <span>€3.95</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold font-montserrat">
                <span>Total</span>
                <span>€{(selectedVariantData?.price * quantity + 3.95).toFixed(2)}</span>
              </div>
              <Button
                onClick={handlePurchase}
                className="w-full bg-[#282828] hover:bg-[#C3B212] text-white font-montserrat"
              >
                PURCHASE
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Steeping Instructions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold font-prosto-one text-[#282828] mb-4">Steeping instructions</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img className="w-4 h-4" src="/Cup.png" alt="" />
                  <div className="font-medium font-montserrat">SERVING SIZE:</div>
                  <div className="text-sm text-gray-600">2 tsp per cup, 6 tsp per pot</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-4 h-4" src="/Drop.png" alt="" />

                <div>
                  <div className="font-medium font-montserrat">WATER TEMPERATURE:</div>
                  <div className="text-sm text-gray-600">100°C</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-4 h-4" src="/Clock.png" alt="" />

                <div>
                  <div className="font-medium font-montserrat">STEEPING TIME:</div>
                  <div className="text-sm text-gray-600">3 - 5 minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                  <img className="w-4 h-4" src="/Circle.png" alt="" />
               
                <div>
                  <div className="font-medium font-montserrat">COLOR AFTER 3 MINUTES</div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* About This Tea */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold font-prosto-one text-[#282828] mb-4">About this tea</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-medium font-montserrat text-[#C3B212] mb-1">FLAVOR</div>
                  <div className="text-sm text-gray-600">{product.flavor || "Spicy"}</div>
                </div>
                <div>
                  <div className="font-medium font-montserrat text-[#C3B212] mb-1">QUALITIES</div>
                  <div className="text-sm text-gray-600">{product.qualities || "Smoothing"}</div>
                </div>
                <div>
                  <div className="font-medium font-montserrat text-[#C3B212] mb-1">CAFFEINE</div>
                  <div className="text-sm text-gray-600">{product.caffeine || "Medium"}</div>
                </div>
                <div>
                  <div className="font-medium font-montserrat text-[#C3B212] mb-1">ALLERGENS</div>
                  <div className="text-sm text-gray-600">{product.allergens || "Nuts-free"}</div>
                </div>
              </div>

              <h3 className="font-bold font-montserrat text-[#282828] mb-2">Ingredients</h3>
              <p className="text-sm text-gray-600">
                {product.ingredients ||
                  "Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks, Cardamom, Cinnamon pieces."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-prosto-one text-[#282828] text-center mb-8">You may also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />

      <Footer />
    </div >
  )
}
