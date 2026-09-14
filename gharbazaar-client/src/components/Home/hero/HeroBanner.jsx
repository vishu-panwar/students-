import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Building2, Briefcase } from 'lucide-react';

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleRentPG = () => {
    navigate("/properties", {
      state: {
        title: "PG/Hostels",
        location: "all",
        propertyType: "PG/Hostel",
      },
    });
  };

  return (
    <div className="bg-[#EDE8DF] w-full py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-6">
      <div className="bg-white max-w-10xl mx-auto border border-gray-200 shadow-[0_2px_16px_rgba(0,0,0,0.06)] px-8 py-6 sm:px-12 sm:py-8 md:px-16 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-16">

        {/* Left Content */}
        <div className="flex-1 space-y-4 sm:space-y-5 md:space-y-6 w-full text-center md:text-left">
          <div className="space-y-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#000000] leading-tight tracking-tight">
              Find Verified Properties
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B9E4B] leading-tight">
              Near You
            </h2>
          </div>

          <div className="text-sm sm:text-sm md:text-base text-gray-600 font-normal space-y-0.5">
            <p>Connect with India's top-rated real estate <span className="text-[#1B9E4B]">brokers.</span></p>
            <p>Zero hidden charges, <span className="text-[#1B9E4B]">100% verified listings.</span></p>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
            <Link
              to="/dashboard/list-property"
              className="inline-block bg-[#1B9E4B] text-white px-5 sm:px-6 py-2.5 sm:py-3 font-bold text-sm hover:bg-[#147638] transition-colors active:scale-95"
            >
              List Properties Free
            </Link>
            <button className="inline-block border border-gray-300 text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors">
              Post Requirement
            </button>
          </div>
        </div>

        {/* Right Cards Section */}
        {/* Mobile: 3-col compact grid. md+: vertical stack */}
        <div className="grid grid-cols-3 md:flex md:flex-col gap-2 sm:gap-3 md:gap-3 w-full md:w-60 shrink-0">

          {/* Card 1 — disabled */}
          <div className="bg-white border border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-4 text-center opacity-60 cursor-not-allowed flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#1B9E4B] shrink-0" strokeWidth={2} />
            <span className="text-[#1B9E4B] font-semibold text-[11px] sm:text-sm md:text-sm leading-tight">
              Rent a Home
            </span>
          </div>

          {/* Card 2 — active */}
          <button
            onClick={handleRentPG}
            className="bg-[#eaf5ee] border-2 border-[#1B9E4B] px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-4 text-center hover:bg-[#d8f0e2] transition-colors group flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5"
          >
            <Building2
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#1B9E4B] shrink-0"
              strokeWidth={2}
            />
            <span className="text-[#1B9E4B] font-bold text-[11px] sm:text-sm md:text-sm leading-tight">
              Rent a PG
            </span>
          </button>

          {/* Card 3 — disabled */}
          <div className="bg-white border border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-4 text-center opacity-60 cursor-not-allowed flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#1B9E4B] shrink-0" strokeWidth={2} />
            <span className="text-[#1B9E4B] font-semibold text-[11px] sm:text-sm md:text-sm leading-tight">
              Rent a WorkSpace
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;