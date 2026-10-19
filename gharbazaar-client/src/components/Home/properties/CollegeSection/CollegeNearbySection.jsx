import React from "react";
import { ChevronRight } from "lucide-react";

const CollegeNearbySection = () => {
  // College/Location data with images
  const colleges = [
    {
      id: 1,
      name: "St. Stephen's College",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/e74c3c/ffffff?text=SS",
    },
    {
      id: 2,
      name: "Hindu College",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/e67e22/ffffff?text=HC",
    },
    {
      id: 3,
      name: "Hansraj College",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/3498db/ffffff?text=HJ",
    },
    {
      id: 4,
      name: "SRCC",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/27ae60/ffffff?text=SR",
    },
    {
      id: 5,
      name: "Daulat Ram College",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/8e44ad/ffffff?text=DR",
    },
    {
      id: 6,
      name: "IIT Delhi",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/e74c3c/ffffff?text=IIT",
    },
    {
      id: 7,
      name: "Miranda House",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/f39c12/ffffff?text=MH",
    },
    {
      id: 8,
      name: "Ramjas College",
      subtitle: "Find verified PGs nearby",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/16a085/ffffff?text=RC",
    },
  ];

  const handleViewAll = () => {
    console.log("View all colleges clicked");
  };

  return (
    <section className="bg-transparent py-6 sm:py-8 lg:py-10 px-3 sm:px-4 md:px-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Find PGs Near Your Colleges
          </h2>
          <button
            onClick={handleViewAll}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            View all
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="flex-none w-[220px] sm:w-[240px] cursor-pointer group"
              onClick={() => console.log(`Clicked: ${college.name}`)}
            >
              <div className="relative h-[140px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Background Image */}
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                {/* College Logo */}
                <div className="absolute top-3 left-3 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                  <img
                    src={college.logo}
                    alt={`${college.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* College Name & Subtitle */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-bold text-sm mb-0.5 line-clamp-1 drop-shadow-lg">
                    {college.name}
                  </h3>
                  <p className="text-white/90 text-xs drop-shadow-md">
                    {college.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CollegeNearbySection;
