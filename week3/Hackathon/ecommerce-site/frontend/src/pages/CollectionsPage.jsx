// import { useState, useEffect } from "react"
// import { useParams, useSearchParams } from "react-router-dom"
// import { Header } from "@/components/Header"
// import { Footer } from "@/components/Footer"
// import { ProductCard } from "@/components/ProductCard"
// import { FilterSidebar } from "@/components/FilterSidebar"
// import { MobileFilterModal } from "@/components/MobileFilterModal"
// import { Button } from "@/components/ui/button"
// import { productsAPI } from "@/lib/api"
// import { Filter } from "lucide-react"

// export default function CollectionsPage() {
//   const { category } = useParams()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showMobileFilters, setShowMobileFilters] = useState(false)
//   const [filters, setFilters] = useState({
//     collections: [],
//     origin: [],
//     flavor: [],
//     qualities: [],
//     caffeine: [],
//     allergens: [],
//     organic: false,
//   })
//   const [sortBy, setSortBy] = useState("newest")

//   // Breadcrumb path
//   const breadcrumb = `HOME/COLLECTIONS${category ? `/${category.toUpperCase()}` : ""}`

//   useEffect(() => {
//     fetchProducts()
//   }, [category, searchParams])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const params = new URLSearchParams(searchParams)
//       if (category) params.set("category", category)

//       const response = await productsAPI.getProducts(params.toString())
//       setProducts(response.products || [])
//     } catch (error) {
//       console.error("Error fetching products:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFilterChange = (filterType, value, checked) => {
//     const newFilters = { ...filters }

//     if (filterType === "organic") {
//       newFilters.organic = checked
//     } else {
//       if (checked) {
//         newFilters[filterType] = [...newFilters[filterType], value]
//       } else {
//         newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
//       }
//     }

//     setFilters(newFilters)
//     updateSearchParams(newFilters, sortBy)
//   }

//   const handleSortChange = (newSortBy) => {
//     setSortBy(newSortBy)
//     updateSearchParams(filters, newSortBy)
//   }

//   const updateSearchParams = (filters, sort) => {
//     const params = new URLSearchParams()

//     Object.entries(filters).forEach(([key, value]) => {
//       if (key === "organic" && value) {
//         params.set("organic", "true")
//       } else if (Array.isArray(value) && value.length > 0) {
//         params.set(key, value.join(","))
//       }
//     })

//     if (sort && sort !== "newest") {
//       params.set("sort", sort)
//     }

//     setSearchParams(params)
//   }

//   const clearAllFilters = () => {
//     const clearedFilters = {
//       collections: [],
//       origin: [],
//       flavor: [],
//       qualities: [],
//       caffeine: [],
//       allergens: [],
//       organic: false,
//     }
//     setFilters(clearedFilters)
//     setSortBy("newest")
//     setSearchParams({})
//   }

//   return (
//     <div className="min-h-screen bg-[#FEFEFE]">
//       <Header />

//       {/* Hero Section with Category Image */}
//       <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#282828] to-[#C3B212] overflow-hidden">
//         <img
//           src="../public/bgPic.png"
//           alt={category || "Tea Collections"}
//           className="w-full h-full object-cover opacity-80"
//         />
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="absolute bottom-6 left-6 text-white">
//           <h1 className="text-3xl md:text-4xl font-bold font-prosto-one capitalize">{category || "All Collections"}</h1>
//           <p className="text-sm mt-2 opacity-90">{breadcrumb}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Desktop Filter Sidebar */}
//           <div className="hidden lg:block w-80 flex-shrink-0">
//             <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={clearAllFilters} />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Mobile Filter Button & Sort */}
//             <div className="flex items-center justify-between mb-6 lg:hidden">
//               <Button variant="outline" onClick={() => setShowMobileFilters(true)} className="flex items-center gap-2">
//                 <Filter className="w-4 h-4" />
//                 FILTER
//               </Button>

//               <select
//                 value={sortBy}
//                 onChange={(e) => handleSortChange(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 text-sm"
//               >
//                 <option value="newest">Newest products</option>
//                 <option value="price-low">Low Price</option>
//                 <option value="price-high">High Price</option>
//                 <option value="popular">Most Popular</option>
//               </select>
//             </div>

//             {/* Desktop Sort */}
//             <div className="hidden lg:flex justify-between items-center mb-6">
//               <p className="text-gray-600">Showing {products.length} products</p>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">SORT BY</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => handleSortChange(e.target.value)}
//                   className="border border-gray-300 rounded px-3 py-2 text-sm"
//                 >
//                   <option value="newest">Newest products</option>
//                   <option value="price-low">Low Price</option>
//                   <option value="price-high">High Price</option>
//                   <option value="popular">Most Popular</option>
//                 </select>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="animate-pulse">
//                     <div className="bg-gray-200 aspect-square rounded-lg mb-3" />
//                     <div className="bg-gray-200 h-4 rounded mb-2" />
//                     <div className="bg-gray-200 h-4 rounded w-2/3" />
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No products found</p>
//                 <Button onClick={clearAllFilters} variant="outline" className="mt-4 bg-transparent">
//                   Clear all filters
//                 </Button>
//               </div>
//             )}

//             {/* Load More Button */}
//             {products.length > 0 && (
//               <div className="text-center mt-8">
//                 <Button variant="outline" className="px-8 bg-transparent">
//                   SHOW MORE ({products.length}) PRODUCTS
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Modal */}
//       <MobileFilterModal
//         isOpen={showMobileFilters}
//         onClose={() => setShowMobileFilters(false)}
//         filters={filters}
//         sortBy={sortBy}
//         onFilterChange={handleFilterChange}
//         onSortChange={handleSortChange}
//         onClearAll={clearAllFilters}
//       />

//       <Footer />
//     </div>
//   )
// }





////above is deepseekgenerated but without errors, below is the refactoried:

// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { ProductCard } from "@/components/ProductCard";
// import { FilterSidebar } from "@/components/FilterSidebar";
// import { MobileFilterModal } from "@/components/MobileFilterModal";
// import { Button } from "@/components/ui/button";
// import { productsAPI } from "@/lib/api";
// import { Filter } from "lucide-react";

// export default function CollectionsPage() {
//   const { category } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     collection: [],
//     origin: [],
//     flavour: [],
//     quality: [],
//     caffeine: [],
//     organic: false,
//   });
//   const [sortBy, setSortBy] = useState("newest");

//   // Initialize filters from URL on component mount
//   useEffect(() => {
//     const params = Object.fromEntries(searchParams.entries());
//     setFilters({
//       collection: params.collection?.split(',') || [],
//       origin: params.origin?.split(',') || [],
//       flavour: params.flavour?.split(',') || [],
//       quality: params.quality?.split(',') || [],
//       caffeine: params.caffeine?.split(',') || [],
//       organic: params.organic === 'true',
//     });
//     if (params.sort) setSortBy(params.sort);
//   }, []);

//   // Fetch products when filters change
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const params = new URLSearchParams();

//         // Add all active filters
//         if (filters.collection.length > 0) {
//           params.set('collection', filters.collection.join(','));
//         }
//         if (filters.origin.length > 0) {
//           params.set('origin', filters.origin.join(','));
//         }
//         if (filters.flavour.length > 0) {
//           params.set('flavour', filters.flavour.join(','));
//         }
//         if (filters.quality.length > 0) {
//           params.set('quality', filters.quality.join(','));
//         }
//         if (filters.caffeine.length > 0) {
//           params.set('caffeine', filters.caffeine.join(','));
//         }
//         if (filters.organic) {
//           params.set('organic', 'true');
//         }

//         // Add sorting
//         if (sortBy !== 'newest') {
//           params.set('sort', sortBy);
//         }

//         // Add category if exists
//         if (category) {
//           params.set('category', category);
//         }

//         const response = await productsAPI.getProducts(params.toString());
//         setProducts(response.products || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [category, searchParams]);

//   const handleFilterChange = (filterType, value, checked) => {
//     const newFilters = { ...filters };

//     if (filterType === "organic") {
//       newFilters.organic = checked;
//     } else {
//       newFilters[filterType] = checked
//         ? [...newFilters[filterType], value]
//         : newFilters[filterType].filter(item => item !== value);
//     }

//     setFilters(newFilters);
//     updateSearchParams(newFilters, sortBy);
//   };

//   const handleSortChange = (newSortBy) => {
//     setSortBy(newSortBy);
//     updateSearchParams(filters, newSortBy);
//   };

//   const updateSearchParams = (currentFilters, currentSort) => {
//     const params = new URLSearchParams();

//     // Add all active filters
//     if (currentFilters.collection.length > 0) {
//       params.set('collection', currentFilters.collection.map(encodeURIComponent).join(','));
//     }
//     if (currentFilters.origin.length > 0) {
//       params.set('origin', currentFilters.origin.map(encodeURIComponent).join(','));
//     }
//     if (currentFilters.flavour.length > 0) {
//       params.set('flavour', currentFilters.flavour.map(encodeURIComponent).join(','));
//     }
//     if (currentFilters.quality.length > 0) {
//       params.set('quality', currentFilters.quality.map(encodeURIComponent).join(','));
//     }
//     if (currentFilters.caffeine.length > 0) {
//       params.set('caffeine', currentFilters.caffeine.map(encodeURIComponent).join(','));
//     }
//     if (currentFilters.organic) {
//       params.set('organic', 'true');
//     }

//     // Add sorting
//     if (currentSort && currentSort !== 'newest') {
//       params.set('sort', currentSort);
//     }

//     // Add category if exists
//     if (category) {
//       params.set('category', category);
//     }

//     setSearchParams(params);
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       collection: [],
//       origin: [],
//       flavour: [],
//       quality: [],
//       caffeine: [],
//       organic: false,
//     });
//     setSortBy("newest");
//     setSearchParams(category ? { category } : {});
//   };

//   const breadcrumb = `HOME/COLLECTIONS${category ? `/${category.toUpperCase()}` : ""}`;

//   return (
//     <div className="min-h-screen bg-[#FEFEFE]">
//       <Header />

//       <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#282828] to-[#C3B212] overflow-hidden">
//         <img
//           src="/bgPic.png"
//           alt={category || "Tea Collections"}
//           className="w-full h-full object-cover opacity-80"
//         />
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="absolute bottom-6 left-6 text-white">
//           <h1 className="text-3xl md:text-4xl font-bold font-prosto-one capitalize">
//             {category || "All Collections"}
//           </h1>
//           <p className="text-sm mt-2 opacity-90">{breadcrumb}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="hidden lg:block w-80 flex-shrink-0">
//             <FilterSidebar
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               onClearAll={clearAllFilters}
//             />
//           </div>

//           <div className="flex-1">
//             <div className="flex items-center justify-between mb-6 lg:hidden">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowMobileFilters(true)}
//                 className="flex items-center gap-2"
//               >
//                 <Filter className="w-4 h-4" />
//                 FILTER
//               </Button>

//               <select
//                 value={sortBy}
//                 onChange={(e) => handleSortChange(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 text-sm"
//               >
//                 <option value="newest">Newest products</option>
//                 <option value="price-low">Low Price</option>
//                 <option value="price-high">High Price</option>
//                 <option value="popular">Most Popular</option>
//               </select>
//             </div>

//             <div className="hidden lg:flex justify-between items-center mb-6">
//               <p className="text-gray-600">Showing {products.length} products</p>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">SORT BY</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => handleSortChange(e.target.value)}
//                   className="border border-gray-300 rounded px-3 py-2 text-sm"
//                 >
//                   <option value="newest">Newest products</option>
//                   <option value="price-low">Low Price</option>
//                   <option value="price-high">High Price</option>
//                   <option value="popular">Most Popular</option>
//                 </select>
//               </div>
//             </div>

//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="animate-pulse">
//                     <div className="bg-gray-200 aspect-square rounded-lg mb-3" />
//                     <div className="bg-gray-200 h-4 rounded mb-2" />
//                     <div className="bg-gray-200 h-4 rounded w-2/3" />
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No products found</p>
//                 <Button
//                   onClick={clearAllFilters}
//                   variant="outline"
//                   className="mt-4 bg-transparent"
//                 >
//                   Clear all filters
//                 </Button>
//               </div>
//             )}

//             {products.length > 0 && (
//               <div className="text-center mt-8">
//                 <Button variant="outline" className="px-8 bg-transparent">
//                   SHOW MORE ({products.length}) PRODUCTS
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <MobileFilterModal
//         isOpen={showMobileFilters}
//         onClose={() => setShowMobileFilters(false)}
//         filters={filters}
//         sortBy={sortBy}
//         onFilterChange={handleFilterChange}
//         onSortChange={handleSortChange}
//         onClearAll={clearAllFilters}
//       />

//       <Footer />
//     </div>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilterModal } from "@/components/MobileFilterModal";
import { Button } from "@/components/ui/button";
import { productsAPI } from "@/lib/api";
import { Filter } from "lucide-react";

export default function CollectionsPage() {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    collection: [],
    origin: [],
    flavour: [],
    quality: [],
    caffeine: [],
    organic: false,
  });
  const [sortBy, setSortBy] = useState("newest");

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProducts();
        setAllProducts(response.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = [...allProducts];

    // Apply filters
    if (filters.collection.length > 0) {
      results = results.filter(product => 
        filters.collection.includes(product.collection));
    }
    if (filters.origin.length > 0) {
      results = results.filter(product => 
        filters.origin.includes(product.origin));
    }
    if (filters.flavour.length > 0) {
      results = results.filter(product => 
        filters.flavour.includes(product.flavour));
    }
    if (filters.quality.length > 0) {
      results = results.filter(product => 
        filters.quality.includes(product.quality));
    }
    if (filters.caffeine.length > 0) {
      results = results.filter(product => 
        filters.caffeine.includes(product.caffeine));
    }
    if (filters.organic) {
      results = results.filter(product => product.Organic);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return [...results].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...results].sort((a, b) => b.price - a.price);
      case "popular":
        return [...results].sort((a, b) => b.rating - a.rating);
      default: // "newest"
        return [...results].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }, [allProducts, filters, sortBy]);

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      if (filterType === "organic") {
        return { ...prev, organic: checked };
      } else {
        return {
          ...prev,
          [filterType]: checked
            ? [...(prev[filterType] || []), value]
            : prev[filterType].filter(item => item !== value)
        };
      }
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const clearAllFilters = () => {
    setFilters({
      collection: [],
      origin: [],
      flavour: [],
      quality: [],
      caffeine: [],
      organic: false,
    });
  };

  // ... rest of your component (UI code) remains the same ...

  const breadcrumb = `HOME/COLLECTIONS${category ? `/${category.toUpperCase()}` : ""}`;

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#282828] to-[#C3B212] overflow-hidden">
        <img
          src="./BgPic.png"
          alt={category || "Tea Collections"}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-prosto-one capitalize">
            {category || "All Collections"}
          </h1>
          <p className="text-sm mt-2 opacity-90">{breadcrumb}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button 
                variant="outline" 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                FILTER
              </Button>

              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="newest">Newest products</option>
                <option value="price-low">Low Price</option>
                <option value="price-high">High Price</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">SORT BY</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="newest">Newest products</option>
                  <option value="price-low">Low Price</option>
                  <option value="price-high">High Price</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-3" />
                    <div className="bg-gray-200 h-4 rounded mb-2" />
                    <div className="bg-gray-200 h-4 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <Button 
                  onClick={clearAllFilters} 
                  variant="outline" 
                  className="mt-4 bg-transparent"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        sortBy={sortBy}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClearAll={clearAllFilters}
      />

      <Footer />
    </div>
  );
}