// "use client"

// import { useState } from "react"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const filterOptions = {
//   collections: ["Black Tea", "Green Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
//   origins: ["India", "Japan", "China", "Iran", "South Africa"],
//   flavours: ["Spicy", "Sweet", "Citrus", "Smooth", "Fruity", "Floral", "Grassy", "Minty", "Bitter", "Creamy"],
//   qualities: ["Premium", "Standard", "Organic", "Fair Trade"],
//   caffeinelevels: ["High", "Medium", "Low", "Caffeine-Free"],
// }

// export function FilterSidebar({ filters, onFilterChange, onClearAll }) {
//   const [expandedSections, setExpandedSections] = useState({
//     collections: true,
//     origin: false,
//     flavor: false,
//     qualities: false,
//     caffeine: false,
//     allergens: false,
//   })

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }))
//   }

//   const FilterSection = ({ title, filterKey, options }) => {
//     const isExpanded = expandedSections[filterKey]

//     return (
//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <button
//           onClick={() => toggleSection(filterKey)}
//           className="flex items-center justify-between w-full text-left font-medium text-[#282828] hover:text-[#C3B212] transition-colors"
//         >
//           <span className="uppercase text-sm">{title}</span>
//           {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//         </button>

//         {isExpanded && (
//           <div className="mt-3 space-y-2">
//             {options.map((option) => (
//               <label key={option} className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters[filterKey].includes(option)}
//                   onChange={(e) => onFilterChange(filterKey, option, e.target.checked)}
//                   className="rounded border-gray-300 text-[#C3B212] focus:ring-[#C3B212]"
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
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="font-medium text-[#282828]">FILTERS</h3>
//         <Button variant="ghost" size="sm" onClick={onClearAll} className="text-[#C3B212] hover:text-[#282828]">
//           Clear all
//         </Button>
//       </div>

//       <FilterSection title="Collections" filterKey="collections" options={filterOptions.collections} />

//       <FilterSection title="Origin" filterKey="origin" options={filterOptions.origin} />

//       <FilterSection title="Flavor" filterKey="flavor" options={filterOptions.flavor} />

//       <FilterSection title="Qualities" filterKey="qualities" options={filterOptions.qualities} />

//       <FilterSection title="Caffeine" filterKey="caffeine" options={filterOptions.caffeine} />

//       {/* <FilterSection title="Allergens" filterKey="allergens" options={filterOptions.allergens} /> */}

//       {/* Organic Toggle */}
//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <div className="flex items-center justify-between">
//           <span className="uppercase text-sm font-medium text-[#282828]">Organic</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={filters.organic}
//               onChange={(e) => onFilterChange("organic", null, e.target.checked)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C3B212]"></div>
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState } from "react"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const filterOptions = {
//   collection: ["Black Tea", "Green Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
//   origin: ["India", "Japan", "China", "Iran", "South Africa"],
//   flavour: ["Spicy", "Sweet", "Citrus", "Smooth", "Fruity", "Floral", "Grassy", "Minty", "Bitter", "Creamy"],
//   quality: ["Premium", "Standard", "Organic", "Fair Trade"],
//   caffeine: ["High", "Medium", "Low", "Caffeine-Free"],
// }

// export function FilterSidebar  ({ filters, onFilterChange, onClearAll }) {
//   const [expandedSections, setExpandedSections] = useState({
//     collection: true,
//     origin: false,
//     flavour: false,
//     quality: false,
//     caffeine: false,
//   })

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }))
//   }

//   const FilterSection = ({ title, filterKey, options }) => {
//     const isExpanded = expandedSections[filterKey]

//     return (
//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <button
//           onClick={() => toggleSection(filterKey)}
//           className="flex items-center justify-between w-full text-left font-medium text-[#282828] hover:text-[#C3B212] transition-colors"
//         >
//           <span className="uppercase text-sm">{title}</span>
//           {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//         </button>

//         {isExpanded && (
//           <div className="mt-3 space-y-2">
//             {options.map(option => (
//               <label key={option} className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters[filterKey]?.includes(option)}
//                   onChange={(e) => onFilterChange(filterKey, option, e.target.checked)}
//                   className="rounded border-gray-300 text-[#C3B212] focus:ring-[#C3B212]"
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
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="font-medium text-[#282828]">FILTERS</h3>
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={onClearAll} 
//           className="text-[#C3B212] hover:text-[#282828]"
//         >
//           Clear all
//         </Button>
//       </div>

//       <FilterSection title="Collection" filterKey="collection" options={filterOptions.collection} />
//       <FilterSection title="Origin" filterKey="origin" options={filterOptions.origin} />
//       <FilterSection title="Flavour" filterKey="flavour" options={filterOptions.flavour} />
//       <FilterSection title="Quality" filterKey="quality" options={filterOptions.quality} />
//       <FilterSection title="Caffeine" filterKey="caffeine" options={filterOptions.caffeine} />

//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <div className="flex items-center justify-between">
//           <span className="uppercase text-sm font-medium text-[#282828]">Organic</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={filters.organic || false}
//               onChange={(e) => onFilterChange("organic", null, e.target.checked)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C3B212]"></div>
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }



// without error code above but fileter was not working


// below is code from deepseek:



import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const filterOptions = {
  collection: ["Black Tea", "Green Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
  origin: ["India", "Japan", "China", "Iran", "South Africa"],
  flavour: ["Spicy", "Sweet", "Citrus", "Smooth", "Fruity", "Floral", "Grassy", "Minty", "Bitter", "Creamy"],
  quality: ["Premium", "Standard", "Organic", "Fair Trade"],
  caffeine: ["High", "Medium", "Low", "Caffeine-Free"],
};

export function FilterSidebar({ filters, onFilterChange, onClearAll }) {
  const [expandedSections, setExpandedSections] = useState({
    collection: true,
    origin: false,
    flavour: false,
    quality: false,
    caffeine: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({ title, filterKey, options }) => {
    const isExpanded = expandedSections[filterKey];

    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection(filterKey)}
          className="flex items-center justify-between w-full text-left font-medium text-[#282828] hover:text-[#C3B212] transition-colors"
        >
          <span className="uppercase text-sm">{title}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-2">
            {options.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[filterKey]?.includes(option)}
                  onChange={(e) => onFilterChange(filterKey, option, e.target.checked)}
                  className="rounded border-gray-300 text-[#C3B212] focus:ring-[#C3B212]"
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
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-[#282828]">FILTERS</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll} 
          className="text-[#C3B212] hover:text-[#282828]"
        >
          Clear all
        </Button>
      </div>

      <FilterSection title="Collection" filterKey="collection" options={filterOptions.collection} />
      <FilterSection title="Origin" filterKey="origin" options={filterOptions.origin} />
      <FilterSection title="Flavour" filterKey="flavour" options={filterOptions.flavour} />
      <FilterSection title="Quality" filterKey="quality" options={filterOptions.quality} />
      <FilterSection title="Caffeine" filterKey="caffeine" options={filterOptions.caffeine} />

      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center justify-between">
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
  );
}
