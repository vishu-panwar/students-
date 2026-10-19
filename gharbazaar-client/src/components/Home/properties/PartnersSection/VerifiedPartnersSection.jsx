import React from "react";
import { ChevronRight } from "lucide-react";

const VerifiedPartnersSection = () => {
  // Verified Partners (Brokers & Builders)
  const partners = [
    {
      id: 1,
      name: "Rahul Sharma",
      type: "Premium Broker",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/e74c3c/ffffff?text=RS",
      color: "#e74c3c",
    },
    {
      id: 2,
      name: "Anita Builders",
      type: "Verified Builder",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/e67e22/ffffff?text=AB",
      color: "#e67e22",
    },
    {
      id: 3,
      name: "Amit Kumar",
      type: "Trusted Broker",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/3498db/ffffff?text=AK",
      color: "#3498db",
    },
    {
      id: 4,
      name: "Skyline Properties",
      type: "Premium Builder",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/27ae60/ffffff?text=SP",
      color: "#27ae60",
    },
    {
      id: 5,
      name: "Priya Malhotra",
      type: "Verified Broker",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/8e44ad/ffffff?text=PM",
      color: "#8e44ad",
    },
    {
      id: 6,
      name: "DLF Homes",
      type: "Elite Builder",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/c0392b/ffffff?text=DLF",
      color: "#c0392b",
    },
    {
      id: 7,
      name: "Vikram Singh",
      type: "Top Broker",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/f39c12/ffffff?text=VS",
      color: "#f39c12",
    },
    {
      id: 8,
      name: "Godrej Properties",
      type: "Premium Builder",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      logo: "https://via.placeholder.com/60/16a085/ffffff?text=GP",
      color: "#16a085",
    },
  ];

  const handleViewAll = () => {
    console.log("View all partners clicked");
  };

  return (
    <section className="bg-transparent py-6 sm:py-8 lg:py-10 px-3 sm:px-4 md:px-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Verified Partners Near You
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
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex-none w-[220px] sm:w-[240px] cursor-pointer group"
              onClick={() => console.log(`Clicked: ${partner.name}`)}
            >
              <div className="relative h-[140px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Background Image */}
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                {/* Partner Logo */}
                <div className="absolute top-3 left-3 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Partner Name & Type */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-bold text-sm mb-0.5 line-clamp-1 drop-shadow-lg">
                    {partner.name}
                  </h3>
                  <p className="text-white/90 text-xs drop-shadow-md">
                    {partner.type}
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

export default VerifiedPartnersSection;
