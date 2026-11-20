import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin, SlidersHorizontal, Home, Building2,
  ClipboardList, ClipboardCheck, Loader2, Search
} from "lucide-react";
import axios from "axios";

const CATEGORIES = [
  { label: "Rent a\nHome",    icon: Home,           type: "Rent a Home" },
  { label: "PG\nRooms",       icon: Building2,      type: "PG Rooms" },
  { label: "List\nProperty",  icon: ClipboardList,  type: "List Property" },
  { label: "Requirement",     icon: ClipboardCheck, type: "Requirement" },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [locationQuery, setLocationQuery]   = useState("");
  const [searchResults, setSearchResults]   = useState([]);
  const [isLoading, setIsLoading]           = useState(false);
  const [showDropdown, setShowDropdown]     = useState(false);

  // Debounced search
  useEffect(() => {
    if (!locationQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/search?q=${encodeURIComponent(locationQuery)}`,
          { withCredentials: true }
        );
        setSearchResults(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [locationQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function onOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const handleCategoryClick = (type) => {
    if (type === "List Property") { navigate("/dashboard/list-property"); return; }
    if (type === "Requirement")   { navigate("/post-requirement"); return; }
    const stateMap = {
      "Rent a Home": { title: "Houses/Homes", location: locationQuery.trim() || "all", propertyType: "Home/House" },
      "PG Rooms":    { title: "PG Rooms",     location: locationQuery.trim() || "all", propertyType: "PG/Hostel" },
    };
    navigate("/properties", { state: stateMap[type] });
  };

  return (
    <div className="w-full px-4 pt-4 pb-6">

      {/* ── SEARCH ROW ── */}
      <div className="flex items-center gap-2 mb-5" ref={searchRef}>

        {/* Pill search input */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100">
            <MapPin size={17} className="text-gray-400 shrink-0" strokeWidth={1.8} />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => { setLocationQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search by location, city or area.."
              className="flex-1 bg-transparent text-sm text-gray-600 placeholder:text-gray-400 outline-none"
            />
            {isLoading && <Loader2 size={15} className="text-gray-400 animate-spin shrink-0" />}
          </div>

          {/* Dropdown */}
          {showDropdown && locationQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-[260px] overflow-y-auto z-50">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div className="py-1">
                  {searchResults.map((item) => (
                    <Link
                      key={item._id || item.id}
                      to={`/property/${item._id || item.id}`}
                      onClick={() => { setShowDropdown(false); setLocationQuery(item.location || item.title || ""); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      {item.images?.[0] ? (
                        <img src={item.images[0]} alt={item.title} className="w-9 h-9 object-cover rounded-lg shrink-0" />
                      ) : (
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <Search size={14} className="text-gray-400" />
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.title || item.name}</p>
                        <p className="text-xs text-gray-500 truncate">{item.location || item.address || "Property"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">No properties found</div>
              )}
            </div>
          )}
        </div>

        {/* Filters pill button */}
        <button className="flex items-center gap-2 bg-[#1B9E4B] hover:bg-[#147638] active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-full transition-colors shrink-0 shadow-sm">
          <SlidersHorizontal size={16} strokeWidth={2.2} />
          <span>Filters</span>
        </button>

      </div>

      {/* ── CATEGORY GRID ── */}
      <div className="grid grid-cols-4 gap-3">
        {CATEGORIES.map(({ label, icon: Icon, type }) => (
          <button
            key={type}
            onClick={() => handleCategoryClick(type)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-full h-[140px] bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-active:scale-95 transition-all overflow-hidden flex flex-col">
              {/* Icon area */}
              <div className="flex-1 flex items-center justify-center">
                <Icon size={36} className="text-[#1B9E4B]" strokeWidth={1.5} />
              </div>
              {/* Label */}
              <div className="px-1 pb-2.5 text-center border-t border-gray-100">
                <span className="font-black text-[#0A0A0A] text-[11px] leading-tight whitespace-pre-line">
                  {label}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
