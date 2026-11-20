// ===============================
// HomeSection.jsx — matches RecentCard UI exactly
// ===============================

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPropertiesQuery,
} from "../../../../store/propertyQuery/getPropertyQuery";
import RecentCard from "../Recentsection/RecentCard";
import RecentCardSkeleton from "../Recentsection/RecentCardSkeleton";

// ===============================
// MAIN SECTION
// ===============================
const HomeSection = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetPropertiesQuery();

  const allProperties = Array.isArray(data) ? data : data?.data || [];

  const homeProperties = allProperties
    .filter((item) => {
      const type = item?.type?.toLowerCase()?.trim();
      return (
        type === "home/house" ||
        type === "independent house" ||
        type === "villa" ||
        type === "apartment"
      );
    })
    .slice(0, 5);

  const propertiesToRender = homeProperties;

  const handleExploreMore = () => {
    navigate("/properties", {
      state: {
        title: "Houses/Homes",
        location: "all",
        propertyType: "Home/House",
      },
    });
  };

  return (
    
    <section className="bg-[#EDE8DF] py-4 sm:py-6 lg:py-7 px-3 sm:px-4 md:px-6">
      <div className="w-full mx-auto">

        {/* HEADER */}
        {/* ✅ Reduced: mb-6 sm:mb-8 → mb-4 sm:mb-5 */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Homes & Houses
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-xs sm:text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS */}
        {isError ? (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center font-medium text-sm">
            Failed to load home properties. Please refresh the page.
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-3">
            {isLoading
              ? [1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:shrink sm:max-w-none"
                  >
                    <RecentCardSkeleton />
                  </div>
                ))
              : propertiesToRender.map((property) => (
                  <div
                    key={property?._id}
                    className="w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:shrink sm:max-w-none transition-transform duration-300 hover:-translate-y-1"
                  >
                    <RecentCard property={property} />
                  </div>
                ))}
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && propertiesToRender.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No Home/House listings available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default HomeSection;