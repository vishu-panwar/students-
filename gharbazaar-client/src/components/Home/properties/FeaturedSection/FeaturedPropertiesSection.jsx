// ===============================
// FeaturedPropertiesSection.jsx
// Duplicate of RecentPropertiesSection
// ===============================

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import FeaturedCard from "./FeaturedCard.jsx";
import FeaturedCardSkeleton from "./FeaturedCardSkeleton.jsx";

// ===============================
// MAIN SECTION
// ===============================
const FeaturedPropertiesSection = () => {
  const navigate = useNavigate();

  // Mock boosted/featured properties data
  const mockFeaturedProperties = [
    {
      _id: "featured-001",
      title: "Premium 4BHK Sea View Penthouse",
      location: "Marine Drive, Mumbai",
      price: 8500000,
      listingType: "Sale",
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
      status: "Available",
      views: 2341,
      isBoosted: true,
    },
    {
      _id: "featured-002",
      title: "Luxury Villa with Private Pool",
      location: "Whitefield, Bangalore",
      price: 125000,
      listingType: "Rent",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
      status: "Available",
      views: 1876,
      isBoosted: true,
    },
    {
      _id: "featured-003",
      title: "Modern 3BHK in Prime Location",
      location: "Cyber City, Gurgaon",
      price: 65000,
      listingType: "Rent",
      images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
      status: "Available",
      views: 1523,
      isBoosted: true,
    },
    {
      _id: "featured-004",
      title: "Spacious Independent House",
      location: "Koramangala, Bangalore",
      price: 4500000,
      listingType: "Sale",
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"],
      status: "Available",
      views: 1298,
      isBoosted: true,
    },
    {
      _id: "featured-005",
      title: "Elegant 2BHK Apartment",
      location: "Andheri West, Mumbai",
      price: 45000,
      listingType: "Rent",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
      status: "Available",
      views: 987,
      isBoosted: true,
    },
  ];

  const [isLoading] = React.useState(false);
  const [isError] = React.useState(false);

  // ===============================
  // SAFE DATA
  // ===============================
  const properties = useMemo(() => {
    return mockFeaturedProperties.slice(0, 5);
  }, []);

  // ===============================
  // NAVIGATION
  // ===============================
  const handleExploreMore = () => {
    navigate("/properties", {
      state: {
        title: "Featured Properties",
        location: "all",
        propertyType: "all",
      },
    });
  };

  // ===============================
  // JSX
  // ===============================
  return (
    <section className="bg-[#EDE8DF] py-4 sm:py-6 lg:py-8 px-3 sm:px-4 md:px-6">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Featured Properties
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Premium properties with maximum visibility
              </p>
            </div>
          </div>

          <button
            onClick={handleExploreMore}
            className="text-xs sm:text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all whitespace-nowrap"
          >
            View All →
          </button>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 sm:items-start overflow-x-auto scrollbar-hide sm:overflow-visible gap-4 sm:gap-4 pb-2 sm:pb-0">
          {isLoading ? (
            [1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex-none w-[320px] sm:w-auto">
                <FeaturedCardSkeleton />
              </div>
            ))
          ) : isError ? (
            <div className="col-span-full bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center font-medium text-sm w-full">
              Failed to load featured properties. Please refresh the page.
            </div>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <div key={property?._id} className="flex-none w-[320px] sm:w-auto">
                <FeaturedCard property={property} />
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full">
              <p className="text-gray-400 font-medium text-sm px-4">
                No featured properties available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedPropertiesSection);

