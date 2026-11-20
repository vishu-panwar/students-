import React from "react";

const FeaturedCardSkeleton = () => {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm flex flex-col p-2.5 animate-pulse">
      {/* IMAGE SKELETON */}
      <div className="relative h-[195px] sm:h-[205px] w-full bg-gray-200 shrink-0" />

      {/* CONTENT SKELETON */}
      <div className="px-1.5 pt-3 pb-1 flex flex-col flex-1">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        
        {/* Location skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />

        {/* Price + Button skeleton */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-24" />
          <div className="h-7 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCardSkeleton;
