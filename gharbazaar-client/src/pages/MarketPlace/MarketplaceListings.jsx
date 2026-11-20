// ─────────────────────────────────────────────────────────────────────────────
// MarketplaceListings.jsx — Search results + advanced filter sidebar
// Route: /marketplace/listings
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  X, ChevronDown, MapPin, Filter, ArrowUpDown,
} from "lucide-react";
import { useGetPropertiesQuery } from "../../store/propertyQuery/getPropertyQuery";
import {
  PageWrapper, SectionHeading, Btn, Breadcrumb, EmptyState, Badge,
} from "./ds";
import MarketplacePropertyCard, { PropertyCardSkeleton } from "./MarketplacePropertyCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPES = [
  { value: "all",        label: "All Types"   },
  { value: "apartment",  label: "Apartment"   },
  { value: "pg",         label: "PG / Hostel" },
  { value: "villa",      label: "Villa"       },
  { value: "room",       label: "Room"        },
  { value: "commercial", label: "Commercial"  },
  { value: "plot",       label: "Plot / Land" },
];

const CITIES = [
  "all","Saharanpur","Dehradun","Roorkee",
  "Haridwar","Muzaffarnagar","Noida","Delhi",
];

const PRICE_RANGES = [
  { label: "Any Price",       min: 0,      max: Infinity },
  { label: "Under ₹5,000",    min: 0,      max: 5000     },
  { label: "₹5K – ₹10K",     min: 5000,   max: 10000    },
  { label: "₹10K – ₹20K",    min: 10000,  max: 20000    },
  { label: "₹20K – ₹50K",    min: 20000,  max: 50000    },
  { label: "₹50K+",           min: 50000,  max: Infinity },
];

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First"      },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "views",      label: "Most Viewed"        },
];

const AMENITIES = [
  "Wi-Fi", "AC", "Parking", "Gym", "Security", "CCTV",
  "Power Backup", "Lift", "Furnished", "Semi-Furnished",
];

// ─── FilterSidebar ────────────────────────────────────────────────────────────

function FilterSidebar({ filters, onChange, onReset, onClose }) {
  const set = (key, val) => onChange({ ...filters, [key]: val });

  const toggleAmenity = (a) => {
    const cur = filters.amenities || [];
    set("amenities", cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]);
  };

  return (
    <aside className="flex flex-col gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Filter size={15} className="text-[#1B7A3E]" /> Filters
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="text-[11px] text-red-500 hover:underline font-medium">Reset</button>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* City */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-2">City</p>
        <div className="flex flex-wrap gap-1.5">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => set("city", c)}
              className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all ${
                filters.city === c
                  ? "bg-[#1B7A3E] text-white border-[#1B7A3E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1B7A3E] hover:text-[#1B7A3E]"
              }`}
            >
              {c === "all" ? "All Cities" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Property type */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-2">Property Type</p>
        <div className="flex flex-col gap-1.5">
          {TYPES.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={value}
                checked={filters.type === value}
                onChange={() => set("type", value)}
                className="accent-[#1B7A3E] w-3.5 h-3.5"
              />
              <span className="text-xs text-gray-700 group-hover:text-[#1B7A3E] transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Price range */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-2">Price Range</p>
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map(({ label, min, max }) => {
            const active = filters.priceMin === min && filters.priceMax === max;
            return (
              <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={active}
                  onChange={() => set("priceMin", min) || onChange({ ...filters, priceMin: min, priceMax: max })}
                  onClick={() => onChange({ ...filters, priceMin: min, priceMax: max })}
                  className="accent-[#1B7A3E] w-3.5 h-3.5"
                />
                <span className="text-xs text-gray-700 group-hover:text-[#1B7A3E] transition-colors">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Bedrooms */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-2">Bedrooms</p>
        <div className="flex gap-2">
          {["Any", "1", "2", "3", "4+"].map((b) => (
            <button
              key={b}
              onClick={() => set("bedrooms", b === "Any" ? "any" : b)}
              className={`flex-1 text-[11px] font-semibold py-1.5 rounded-lg border transition-all ${
                (filters.bedrooms === b || (b === "Any" && (!filters.bedrooms || filters.bedrooms === "any")))
                  ? "bg-[#1B7A3E] text-white border-[#1B7A3E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1B7A3E]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Amenities */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-2">Amenities</p>
        <div className="flex flex-wrap gap-1.5">
          {AMENITIES.map((a) => {
            const active = (filters.amenities || []).includes(a);
            return (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? "bg-[#1B7A3E] text-white border-[#1B7A3E]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1B7A3E]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Apply */}
      <Btn className="w-full" size="sm">
        Apply Filters
      </Btn>
    </aside>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MarketplaceListings() {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  const initFilters = {
    city:     searchParams.get("city")  || "all",
    type:     searchParams.get("type")  || "all",
    q:        searchParams.get("q")     || "",
    sort:     "newest",
    priceMin: 0,
    priceMax: Infinity,
    bedrooms: "any",
    amenities: [],
  };

  const [filters,        setFilters]        = useState(initFilters);
  const [layout,         setLayout]         = useState("grid"); // "grid" | "list"
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [searchInput,    setSearchInput]    = useState(initFilters.q);

  const { data, isLoading, isError } = useGetPropertiesQuery(
    undefined,
    { refetchOnMountOrArgChange: false, refetchOnFocus: false }
  );

  const allProperties = useMemo(() => {
    return Array.isArray(data) ? data : data?.data || [];
  }, [data]);

  // Client-side filter + sort
  const filtered = useMemo(() => {
    let list = [...allProperties];

    if (filters.city && filters.city !== "all") {
      list = list.filter((p) =>
        p.location?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.type && filters.type !== "all") {
      list = list.filter((p) =>
        p.type?.toLowerCase() === filters.type.toLowerCase()
      );
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter((p) =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q)
      );
    }
    if (filters.priceMax !== Infinity) {
      list = list.filter((p) => {
        const pr = Number(p.price) || 0;
        return pr >= filters.priceMin && pr <= filters.priceMax;
      });
    }
    if (filters.bedrooms && filters.bedrooms !== "any") {
      const n = filters.bedrooms === "4+" ? 4 : Number(filters.bedrooms);
      list = list.filter((p) => {
        const b = Number(p.bedrooms) || 0;
        return filters.bedrooms === "4+" ? b >= 4 : b === n;
      });
    }

    // Sort
    switch (filters.sort) {
      case "price_asc":  list.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case "price_desc": list.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case "views":      list.sort((a, b) => {
        const va = Array.isArray(a.views) ? a.views.length : a.views || 0;
        const vb = Array.isArray(b.views) ? b.views.length : b.views || 0;
        return vb - va;
      }); break;
      default: break; // newest — use API order
    }

    return list;
  }, [allProperties, filters]);

  const resetFilters = () => setFilters({ ...initFilters, q: "", city: "all", type: "all" });

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.city !== "all")       n++;
    if (filters.type !== "all")       n++;
    if (filters.priceMax !== Infinity) n++;
    if (filters.bedrooms !== "any")   n++;
    if ((filters.amenities || []).length) n++;
    return n;
  }, [filters]);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home",        href: "/" },
          { label: "Marketplace", href: "/marketplace" },
          { label: "Listings" },
        ]} />

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {filters.city !== "all" ? `Properties in ${filters.city}` : "All Properties"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isLoading ? "Loading…" : `${filtered.length} results found`}
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
              <Search size={14} className="text-gray-400" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setFilters((f) => ({ ...f, q: searchInput }))}
                placeholder="Search properties…"
                className="text-sm outline-none bg-transparent w-40 sm:w-52 placeholder:text-gray-400"
              />
              {searchInput && (
                <button onClick={() => { setSearchInput(""); setFilters((f) => ({ ...f, q: "" })); }}>
                  <X size={13} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
              <ArrowUpDown size={13} className="text-gray-400" />
              <select
                value={filters.sort}
                onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-[#1B7A3E] transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters {activeFilterCount > 0 && (
                <span className="bg-[#1B7A3E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Layout toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 transition-colors ${layout === "grid" ? "bg-[#1B7A3E] text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 transition-colors ${layout === "list" ? "bg-[#1B7A3E] text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.city !== "all" && (
              <span className="flex items-center gap-1 bg-[#e8f5ee] text-[#1B7A3E] text-[11px] font-semibold px-3 py-1 rounded-full">
                <MapPin size={10} /> {filters.city}
                <button onClick={() => setFilters((f) => ({ ...f, city: "all" }))} className="ml-1"><X size={10} /></button>
              </span>
            )}
            {filters.type !== "all" && (
              <span className="flex items-center gap-1 bg-[#e8f5ee] text-[#1B7A3E] text-[11px] font-semibold px-3 py-1 rounded-full">
                {TYPES.find((t) => t.value === filters.type)?.label}
                <button onClick={() => setFilters((f) => ({ ...f, type: "all" }))} className="ml-1"><X size={10} /></button>
              </span>
            )}
            {filters.priceMax !== Infinity && (
              <span className="flex items-center gap-1 bg-[#e8f5ee] text-[#1B7A3E] text-[11px] font-semibold px-3 py-1 rounded-full">
                {PRICE_RANGES.find((r) => r.min === filters.priceMin && r.max === filters.priceMax)?.label}
                <button onClick={() => setFilters((f) => ({ ...f, priceMin: 0, priceMax: Infinity }))} className="ml-1"><X size={10} /></button>
              </span>
            )}
            <button onClick={resetFilters} className="text-[11px] text-red-500 hover:underline font-medium px-1">
              Clear all
            </button>
          </div>
        )}

        {/* Body: sidebar + grid */}
        <div className="flex gap-6 items-start">

          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="relative ml-auto w-[300px] h-full bg-[#EDE8DF] overflow-y-auto p-4 shadow-xl">
                <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className={layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                : "flex flex-col gap-4"
              }>
                {[1,2,3,4,5,6].map((k) => <PropertyCardSkeleton key={k} layout={layout} />)}
              </div>
            ) : isError ? (
              <EmptyState
                icon={<Search size={28} />}
                title="Failed to load properties"
                subtitle="Something went wrong. Please try refreshing the page."
                action={<Btn onClick={() => window.location.reload()} variant="outline">Refresh</Btn>}
              />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<MapPin size={28} />}
                title="No properties found"
                subtitle="Try adjusting your filters or searching for a different area."
                action={<Btn onClick={resetFilters} variant="outline">Clear Filters</Btn>}
              />
            ) : (
              <div className={layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                : "flex flex-col gap-4"
              }>
                {filtered.map((p) => (
                  <MarketplacePropertyCard key={p._id} property={p} layout={layout} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
