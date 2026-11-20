// ===============================
// RecentPropertiesSection.jsx
// Optimized Version
// ===============================

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
} from "lucide-react";

import {
  useGetPropertiesQuery,
} from "../../../../store/propertyQuery/getPropertyQuery";

import RecentCard from "./RecentCard";
import RecentCardSkeleton from "./RecentCardSkeleton";

// ===============================
// MAIN SECTION
// ===============================
const RecentPropertiesSection = () => {

  const navigate = useNavigate();

  // ===============================
  // API
  // ===============================
  const {
    data,
    isLoading,
    isError,
  } = useGetPropertiesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
    }
  );

  // ===============================
  // SAFE DATA
  // ===============================
  const properties = useMemo(() => {

    const allProperties =
      Array.isArray(data)
        ? data
        : data?.data || [];

    return allProperties.slice(0, 5);

  }, [data]);

  // ===============================
  // NAVIGATION
  // ===============================
  const handleExploreMore = () => {

    navigate("/properties", {
      state: {
        title:
          "Recent Apartment Properties",
        location: "all",
        propertyType: "all",
      },
    });
  };

  // ===============================
  // JSX
  // ===============================
  // ✅ Reduced: py-8 sm:py-10 lg:py-12 → py-4 sm:py-6 lg:py-8
  return (
    <section className="bg-[#EDE8DF] py-4 sm:py-6 lg:py-8 px-3 sm:px-4 md:px-6">

      <div className="w-full mx-auto">

        {/* HEADER */}
        {/* ✅ Reduced: mb-6 sm:mb-8 → mb-4 sm:mb-5 */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">

          <div className="flex items-center gap-3">

            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B9E4B] to-[#147638] flex items-center justify-center shadow-md shadow-[#063e23]/10">

              <TrendingUp
                size={18}
                className="text-white"
              />

            </div> */}

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Recently Listed Properties
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Handpicked latest listings
              </p>
            </div>

          </div>

          <button
            onClick={handleExploreMore}
            className="text-xs sm:text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all whitespace-nowrap"
          >
            Explore more →
          </button>

        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 sm:items-start overflow-x-auto scrollbar-hide sm:overflow-visible gap-4 sm:gap-4 pb-2 sm:pb-0">

          {isLoading ? (

            [1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex-none w-[320px] sm:w-auto"
              >
                <RecentCardSkeleton />
              </div>
            ))

          ) : isError ? (

            <div className="col-span-full bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center font-medium text-sm w-full">
              Failed to load properties.
              Please refresh the page.
            </div>

          ) : properties.length > 0 ? (

            properties.map((property) => (

              <div
                key={property?._id}
                className="flex-none w-[320px] sm:w-auto"
              >
                <RecentCard property={property} />
              </div>

            ))

          ) : (

            <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full">

              <p className="text-gray-400 font-medium text-sm px-4">
                No properties available
                at the moment.
              </p>

            </div>

          )}

        </div>
      </div>
    </section>
  );
};

export default React.memo(
  RecentPropertiesSection
);
