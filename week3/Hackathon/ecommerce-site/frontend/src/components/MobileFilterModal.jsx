
// import { useState } from "react"
// import { X, ChevronDown, ChevronUp } from "lucide-react"
// import { Button } from "@/components/ui/button"


// const filterOptions = {
//   collections: [
//     "Black Tea",
//     "Green Tea",
//     "White Tea",
//     "Oolong Tea",
//     "Herbal Tea",
//     "Pu-erh Tea",
//   ],
//   origin: ["India", "Japan", "China", "Iran", "South Africa"],
//   flavor: ["Spicy", "Sweet", "Citrus", "Smooth", "Fruity", "Floral", "Grassy", "Minty", "Bitter", "Creamy"],
//   qualities: ["Premium", "Standard", "Organic", "Fair Trade"],
//   caffeine: ["High", "Medium", "Low", "Caffeine-Free"],
//   allergens: ["Lactose-free", "Gluten-free", "Nuts-free", "Soy-free"],
// }

// export function MobileFilterModal({ isOpen, onClose, filters, sortBy, onFilterChange, onSortChange, onClearAll }) {
//   const [expandedSections, setExpandedSections] = useState({
//     collections: true,
//     origin: false,
//     flavor: false,
//     qualities: false,
//     caffeine: false,
//     allergens: false,
//   })

//   if (!isOpen) return null

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }))
//   }

//   const FilterSection = ({ title, filterKey, options }) => {
//     const isExpanded = expandedSections[filterKey]
//     const activeCount = filters[filterKey]?.length || 0

//     return (
//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <button
//           onClick={() => toggleSection(filterKey)}
//           className="flex items-center justify-between w-full text-left font-medium text-[#282828] py-2"
//         >
//           <div className="flex items-center gap-2">
//             <span className="uppercase text-sm">{title}</span>
//             {activeCount > 0 && (
//               <span className="bg-[#C3B212] text-white text-xs px-2 py-1 rounded-full">{activeCount}</span>
//             )}
//           </div>
//           {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//         </button>

//         {isExpanded && (
//           <div className="mt-3 space-y-3">
//             {options.map((option) => (
//               <label key={option} className="flex items-center space-x-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters[filterKey].includes(option)}
//                   onChange={(e) => onFilterChange(filterKey, option, e.target.checked)}
//                   className="w-4 h-4 rounded border-gray-300 text-[#C3B212] focus:ring-[#C3B212]"
//                 />
//                 <span className="text-sm text-gray-700">{option}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="fixed inset-0 z-50 lg:hidden">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       {/* Modal */}
//       <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="font-medium text-[#282828]">SORT & FILTER</h2>
//             <button onClick={onClose} className="p-1">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {/* Sort Section */}
//             <div className="mb-6">
//               <h3 className="font-medium text-[#282828] mb-3">Sort your selected items</h3>
//               <div className="space-y-2">
//                 {[
//                   { value: "price-low", label: "Low Price" },
//                   { value: "price-high", label: "High Price" },
//                   { value: "newest", label: "Newest products" },
//                   { value: "popular", label: "Most Popular" },
//                 ].map((option) => (
//                   <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="sort"
//                       value={option.value}
//                       checked={sortBy === option.value}
//                       onChange={(e) => onSortChange(e.target.value)}
//                       className="w-4 h-4 text-[#C3B212] focus:ring-[#C3B212]"
//                     />
//                     <span className="text-sm">{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Filter Sections */}
//             <div className="mb-6">
//               <h3 className="font-medium text-[#282828] mb-3">Select by your favour</h3>

//               <FilterSection title="Collections" filterKey="collections" options={filterOptions.collections} />

//               <FilterSection title="Origin" filterKey="origin" options={filterOptions.origin} />

//               <FilterSection title="Flavour" filterKey="flavor" options={filterOptions.flavor} />

//               <FilterSection title="Qualities" filterKey="qualities" options={filterOptions.qualities} />

//               <FilterSection title="Caffeine" filterKey="caffeine" options={filterOptions.caffeine} />

//               <FilterSection title="Allergens" filterKey="allergens" options={filterOptions.allergens} />

//               {/* Organic Toggle */}
//               <div className="border-b border-gray-200 pb-4 mb-4">
//                 <div className="flex items-center justify-between py-2">
//                   <span className="uppercase text-sm font-medium text-[#282828]">Organic</span>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={filters.organic}
//                       onChange={(e) => onFilterChange("organic", null, e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C3B212]"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="p-4 border-t">
//             <Button onClick={onClearAll} variant="outline" className="w-full mb-3 bg-transparent">
//               Clear all filters
//             </Button>
//             <Button onClick={onClose} className="w-full bg-[#282828] hover:bg-[#C3B212] text-white">
//               Apply filters
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const filterOptions = {
  collection: ["Black Tea", "Green Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
  origin: ["India", "Japan", "China", "Iran", "South Africa"],
  flavour: ["Spicy", "Sweet", "Citrus", "Smooth", "Fruity", "Floral", "Grassy", "Minty", "Bitter", "Creamy"],
  quality: ["Premium", "Standard", "Organic", "Fair Trade"],
  caffeine: ["High", "Medium", "Low", "Caffeine-Free"],
};

export function MobileFilterModal({ isOpen, onClose, filters, sortBy, onFilterChange, onSortChange, onClearAll }) {
  const [expandedSections, setExpandedSections] = useState({
    collection: true,
    origin: false,
    flavour: false,
    quality: false,
    caffeine: false,
  });

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({ title, filterKey, options }) => {
    const isExpanded = expandedSections[filterKey];
    const activeCount = filters[filterKey]?.length || 0;

    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection(filterKey)}
          className="flex items-center justify-between w-full text-left font-medium text-[#282828] py-2"
        >
          <div className="flex items-center gap-2">
            <span className="uppercase text-sm">{title}</span>
            {activeCount > 0 && (
              <span className="bg-[#C3B212] text-white text-xs px-2 py-1 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {options.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[filterKey]?.includes(option)}
                  onChange={(e) => onFilterChange(filterKey, option, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#C3B212] focus:ring-[#C3B212]"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium text-[#282828]">FILTERS</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="font-medium text-[#282828] mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: "newest", label: "Newest products" },
                  { value: "price-low", label: "Low Price" },
                  { value: "price-high", label: "High Price" },
                  { value: "popular", label: "Most Popular" },
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => onSortChange(e.target.value)}
                      className="w-4 h-4 text-[#C3B212] focus:ring-[#C3B212]"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-[#282828] mb-3">Filters</h3>
              
              <FilterSection title="Collection" filterKey="collection" options={filterOptions.collection} />
              <FilterSection title="Origin" filterKey="origin" options={filterOptions.origin} />
              <FilterSection title="Flavour" filterKey="flavour" options={filterOptions.flavour} />
              <FilterSection title="Quality" filterKey="quality" options={filterOptions.quality} />
              <FilterSection title="Caffeine" filterKey="caffeine" options={filterOptions.caffeine} />

              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between py-2">
                  <span className="uppercase text-sm font-medium text-[#282828]">Organic</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.organic || false}
                      onChange={(e) => onFilterChange("organic", null, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C3B212]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button onClick={onClearAll} variant="outline" className="w-full mb-3 bg-transparent">
              Clear all filters
            </Button>
            <Button onClick={onClose} className="w-full bg-[#282828] hover:bg-[#C3B212] text-white">
              Apply filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}