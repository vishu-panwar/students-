import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyListings() {
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock data - replace with actual API call
  const listings = [
    {
      id: 1,
      title: "Shree Radhe Executive PG & Student Hostel",
      type: "rent-pg",
      status: "active",
      price: "₹6,500",
      priceUnit: "/mo / bed",
      location: "NH-19 Chhatikara Corridor, Near Sanskriti University, Mathura",
      beds: null,
      baths: null,
      area: null,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
      postedDate: "Posted 3 Days Ago",
      views: 342,
      inquiries: 14,
      featured: true,
      occupancy: "6 / 24 Beds Vacant",
      occupancyPercent: "75%",
      tags: ["High Speed WiFi", "Pure Veg Mess", "24x7 Power Backup", "+6 more"],
      listingId: "GB-PG-802"
    },
    {
      id: 2,
      title: "Ultra-Modern 3BHK Corner Penthouse with Braj View",
      type: "sale",
      status: "active",
      price: "₹88,00,000",
      priceUnit: "₹4,756 / sq.ft",
      location: "Plot 42-B, Sector 8, Near Radha Madhav Mandir, Krishna Nagar, Mathura",
      beds: 3,
      baths: 3,
      area: "1,520 sq.ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      postedDate: "Posted 1 Week Ago",
      views: 580,
      inquiries: 21,
      featured: true,
      tags: ["0% Direct Brokerage", "Token ₹2,00,000", "2 Covered Parking", "Vastu Compliant"],
      listingId: "GB-RES-104",
      reraApproved: true
    },
    {
      id: 3,
      title: "Tata Tiscon Fe 550D TMT Rebars (10mm - 25mm)",
      type: "wholesale",
      status: "active",
      price: "₹54,500",
      priceUnit: "/ Metric Ton",
      location: "Godown Dispatch from Mathura Industrial Area, UP",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
      postedDate: "Posted 2 Days Ago",
      views: 215,
      inquiries: 7,
      stock: "150 Metric Tons",
      moq: "10 MT (MOQ)",
      tags: ["BIS IS 1786 Certified", "Test Certificate with Dispatch", "Weighbridge Slips"],
      listingId: "TATA-550D-MTH"
    },
    {
      id: 4,
      title: "3 BHK Furnished Independent Villa in Krishna Greens",
      type: "rent",
      status: "active",
      price: "₹24,000",
      priceUnit: "/month",
      location: "Krishna Greens Phase 2, Near Sanskriti University, Mathura",
      beds: 3,
      baths: 3,
      area: "1,850 sq.ft",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
      postedDate: "Posted 5 Days Ago",
      views: 112,
      inquiries: 5,
      tags: ["Security Deposit: ₹24,000 (1 Mo)", "Private Terrace", "Modular Kitchen"],
      listingId: "GB-RNT-441"
    },
    {
      id: 5,
      title: "Commercial SCO Office Space on NH-19 Highway",
      type: "sale",
      status: "draft",
      price: "~₹1.45 Cr",
      priceUnit: "",
      location: "Near Highway Plaza, NH-19 Corridor, Mathura",
      beds: null,
      baths: null,
      area: "2,400 sq.ft",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500",
      postedDate: "Draft • Saved 2 mins ago",
      views: 0,
      inquiries: 0,
      draftProgress: 65,
      tags: [],
      listingId: "DRAFT-2024-09"
    },
    {
      id: 6,
      title: "2 BHK Builder Floor - Radhe Krishna Enclave",
      type: "rent",
      status: "closed",
      price: "₹12,000",
      priceUnit: "/month",
      location: "Near Refinery Township, Mathura",
      beds: 2,
      baths: 2,
      area: "1,100 sq.ft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
      postedDate: "Closed on 14 Nov 2024",
      views: 0,
      inquiries: 38,
      completed: true,
      tags: [],
      listingId: "GB-RNT-019",
      agreementId: "#AGR-8831"
    }
  ];

  const stats = [
    { label: "Total Listings", value: "6", sublabel: "4 Active • 1 Draft • 1 Closed", icon: "domain" },
    { label: "Active & Published", value: "4", sublabel: "Live on GharBazaar Marketplace", icon: "check_circle", color: "primary" },
    { label: "Drafts Saved", value: "1", sublabel: "Pending completion (65% filled)", icon: "edit_note", color: "tertiary" },
    { label: "Total Views & Leads", value: "1,248", sublabel: "Views • 42 Leads", subvalue: "42", icon: "trending_up" }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-primary-container text-on-primary",
      draft: "bg-tertiary-container text-on-tertiary",
      closed: "bg-secondary text-on-secondary"
    };
    const labels = {
      active: "Active",
      draft: "Draft • Saved 2 mins ago",
      closed: "Deal Closed / Leased"
    };
    return { style: styles[status], label: labels[status] };
  };

  const getCategoryIcon = (type) => {
    const icons = {
      "sale": "apartment",
      "rent": "bed",
      "rent-pg": "bed",
      "wholesale": "inventory_2"
    };
    return icons[type] || "domain";
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-5 text-xs text-secondary">
        <span className="hover:text-primary cursor-pointer transition-colors">Seller Portal</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="hover:text-primary cursor-pointer transition-colors">Merchant Workspace</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface font-semibold">My Listings</span>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold text-on-surface">My Listings</h1>
            <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[11px] font-bold rounded">6 Total</span>
          </div>
          <p className="text-xs text-secondary">
            Manage, track performance, boost, and edit all your published properties, rental PGs, wholesale products, and saved drafts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3.5 rounded-lg bg-white hover:bg-surface-container-low text-on-surface text-xs font-medium transition-colors border border-outline-variant/20 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">file_download</span>
            <span>Export CSV</span>
          </button>
          <Link
            to="/seller/dashboard/property/create-listing"
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Add New Listing</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-3.5 border border-outline-variant/10 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wide text-secondary font-semibold block mb-1">{stat.label}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-on-surface">{stat.value}</span>
                  {stat.subvalue && (
                    <>
                      <span className="text-xs text-secondary">•</span>
                      <span className="text-lg font-bold text-primary">{stat.subvalue}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-lg ${stat.color === 'primary' ? 'bg-primary/10 text-primary' : stat.color === 'tertiary' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container text-secondary'} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-lg">{stat.icon}</span>
              </div>
            </div>
            <span className="text-[10px] text-secondary">{stat.sublabel}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar - Single Row */}
      <div className="bg-white rounded-lg p-3 border border-outline-variant/10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-secondary">search</span>
            <input
              type="text"
              placeholder="Search by title, locality, city, SKU or Listing ID (e.g. GB-MATHURA-802)..."
              className="w-full h-9 pl-9 pr-3 bg-surface-container-low text-on-surface text-xs rounded-lg outline-none placeholder:text-secondary/70 focus:bg-white focus:ring-1 focus:ring-primary/30 transition-all border border-transparent focus:border-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select className="h-9 pl-3 pr-8 bg-surface-container-low hover:bg-surface-container text-on-surface text-xs rounded-lg appearance-none cursor-pointer outline-none border border-transparent focus:border-primary/20 focus:ring-1 focus:ring-primary/30 transition-all">
              <option>All Statuses (Active, Draft, Closed)</option>
              <option>Active Only (4)</option>
              <option>Drafts Only (1)</option>
              <option>Closed / Archived (1)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-lg">expand_more</span>
          </div>

          {/* Sort */}
          <div className="relative">
            <select className="h-9 pl-3 pr-8 bg-surface-container-low hover:bg-surface-container text-on-surface text-xs rounded-lg appearance-none cursor-pointer outline-none border border-transparent focus:border-primary/20 focus:ring-1 focus:ring-primary/30 transition-all">
              <option>Sort by: Newest First</option>
              <option>Sort by: Most Views</option>
              <option>Sort by: Most Inquiries</option>
              <option>Sort by: Price: High to Low</option>
              <option>Sort by: Price: Low to High</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-lg">sort</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-on-surface"}`}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-on-surface"}`}
            >
              <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
            </button>
          </div>

          {/* Filter Icon */}
          <button className="h-9 w-9 bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface rounded-lg transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>

        {/* Category Pills - Compact */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${activeCategory === "all" ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
          >
            All Categories (6)
          </button>
          <button
            onClick={() => setActiveCategory("sale")}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${activeCategory === "sale" ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-sm">apartment</span>
            Property Sale (2)
          </button>
          <button
            onClick={() => setActiveCategory("rent")}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${activeCategory === "rent" ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-sm">bed</span>
            Rent & PG (2)
          </button>
          <button
            onClick={() => setActiveCategory("wholesale")}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${activeCategory === "wholesale" ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            Wholesale (1)
          </button>
          <button
            onClick={() => setActiveCategory("draft")}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${activeCategory === "draft" ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-sm">drafts</span>
            Drafts (1)
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-outline-variant/10 flex flex-col group">
            {/* Image Section with Overlay Info */}
            <div className="relative h-48 overflow-hidden">
              {/* Status Badge - Top Left */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
                {listing.status === "active" && (
                  <span className="px-2.5 py-1 bg-primary text-white text-[11px] font-bold rounded-md shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Active
                  </span>
                )}
                {listing.status === "draft" && (
                  <span className="px-2.5 py-1 bg-tertiary text-white text-[11px] font-bold rounded-md shadow-lg">
                    Draft
                  </span>
                )}
                {listing.status === "closed" && (
                  <span className="px-2.5 py-1 bg-error text-white text-[11px] font-bold rounded-md shadow-lg uppercase">
                    Closed
                  </span>
                )}
                
                <span className="px-2.5 py-1 bg-white/95 backdrop-blur text-on-surface text-[11px] font-semibold rounded-md shadow-lg">
                  {listing.type === "sale" ? "Sale / Residential" : listing.type === "rent" ? "Rent" : listing.type === "rent-pg" ? "PG/Hostel" : "Wholesale"}
                </span>
              </div>

              {/* Special Badges - Top Right */}
              <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 items-end">
                {listing.reraApproved && (
                  <span className="px-2 py-0.5 bg-primary/90 text-white text-[10px] font-bold rounded flex items-center gap-0.5 shadow-lg">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    RERA
                  </span>
                )}
                {listing.occupancy && (
                  <span className="px-2 py-0.5 bg-tertiary text-white text-[10px] font-bold rounded shadow-lg">
                    {listing.occupancy}
                  </span>
                )}
              </div>

              {/* Main Image */}
              <img
                src={listing.image}
                alt={listing.title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${listing.status === "closed" ? "grayscale opacity-60" : ""}`}
              />

              {/* Price Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pb-2.5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider font-semibold block mb-0.5">
                      {listing.type === "sale" ? "Asking Price" : listing.type.includes("rent") ? "Monthly Rent" : "Per Metric Ton"}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-white text-xl font-bold">{listing.price}</span>
                      {listing.priceUnit && <span className="text-white/70 text-[10px]">{listing.priceUnit}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur px-2 py-1 rounded">
                    <span className="text-white text-[11px] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      {listing.views}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white text-[11px] flex items-center gap-0.5 font-semibold">
                      <span className="material-symbols-outlined text-sm">person</span>
                      {listing.inquiries}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-3 flex-1">
              {/* Title, Location & ID */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-on-surface line-clamp-2 leading-tight flex-1">
                    {listing.title}
                  </h3>
                  <span className="text-[10px] text-secondary font-mono bg-surface-container-low px-1.5 py-0.5 rounded shrink-0">
                    {listing.listingId}
                  </span>
                </div>
                <p className="text-[11px] text-secondary flex items-start gap-1 line-clamp-1 leading-tight">
                  <span className="material-symbols-outlined text-xs shrink-0 mt-0.5">location_on</span>
                  <span>{listing.location}</span>
                </p>
              </div>

              {/* Property Details - 4 Column Grid */}
              <div className="grid grid-cols-4 gap-2 py-2.5 px-2 bg-surface-container-lowest rounded-lg">
                {listing.type === "rent-pg" || listing.occupancy ? (
                  <>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">meeting_room</span>
                      <span className="text-xs font-bold text-on-surface block">24</span>
                      <span className="text-[9px] text-secondary uppercase">Rooms</span>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">single_bed</span>
                      <span className="text-xs font-bold text-on-surface block">48</span>
                      <span className="text-[9px] text-secondary uppercase">Beds</span>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-tertiary text-lg block mb-0.5">person</span>
                      <span className="text-xs font-bold text-tertiary block">18</span>
                      <span className="text-[9px] text-secondary uppercase">Filled</span>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">door_open</span>
                      <span className="text-xs font-bold text-on-surface block">6</span>
                      <span className="text-[9px] text-secondary uppercase">Vacant</span>
                    </div>
                  </>
                ) : listing.type === "wholesale" || listing.stock ? (
                  <>
                    <div className="text-center col-span-2">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">inventory_2</span>
                      <span className="text-xs font-bold text-on-surface block">{listing.stock || "150 MT"}</span>
                      <span className="text-[9px] text-secondary uppercase">Stock</span>
                    </div>
                    <div className="text-center col-span-2">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">local_shipping</span>
                      <span className="text-xs font-bold text-on-surface block">{listing.moq || "10 MT"}</span>
                      <span className="text-[9px] text-secondary uppercase">MOQ</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">bed</span>
                      <span className="text-xs font-bold text-on-surface block">{listing.beds || 0}</span>
                      <span className="text-[9px] text-secondary uppercase">Beds</span>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">bathtub</span>
                      <span className="text-xs font-bold text-on-surface block">{listing.baths || 0}</span>
                      <span className="text-[9px] text-secondary uppercase">Baths</span>
                    </div>
                    <div className="text-center col-span-2">
                      <span className="material-symbols-outlined text-primary text-lg block mb-0.5">square_foot</span>
                      <span className="text-xs font-bold text-on-surface block">{listing.area || "N/A"}</span>
                      <span className="text-[9px] text-secondary uppercase">Area</span>
                    </div>
                  </>
                )}
              </div>

              {/* Key Features - Compact Tags */}
              {listing.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {listing.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-md border border-primary/20">
                      {tag}
                    </span>
                  ))}
                  {listing.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-surface-container text-secondary text-[10px] font-medium rounded-md">
                      +{listing.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Status-Specific Info */}
              {listing.draftProgress && (
                <div className="p-2 bg-tertiary/10 rounded-lg border border-tertiary/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wide">Completion Status</span>
                    <span className="text-xs font-bold text-tertiary">{listing.draftProgress}%</span>
                  </div>
                  <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary transition-all duration-300" style={{ width: `${listing.draftProgress}%` }}></div>
                  </div>
                  <p className="text-[10px] text-secondary mt-1.5">Next: Upload property photos</p>
                </div>
              )}

              {listing.completed && listing.agreementId && (
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-[11px] text-primary font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Successfully Leased • {listing.agreementId}
                  </p>
                  <p className="text-[10px] text-secondary mt-1">Closed on {listing.postedDate.replace("Closed on ", "")}</p>
                </div>
              )}

              {/* Posted Date & Stats */}
              <div className="pt-2 border-t border-outline-variant/10">
                <div className="flex items-center justify-between text-[10px] text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {listing.postedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">visibility</span>
                      {listing.views}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-primary font-semibold">
                      <span className="material-symbols-outlined text-xs">mail</span>
                      {listing.inquiries} leads
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 pt-0 border-t border-outline-variant/5">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {listing.status === "draft" ? (
                  <>
                    <button className="col-span-2 h-9 bg-tertiary hover:bg-tertiary/90 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-base">edit</span>
                      Resume & Publish
                    </button>
                    <button className="h-9 bg-error/10 hover:bg-error/20 text-error text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </>
                ) : listing.type === "rent-pg" ? (
                  <>
                    <button className="col-span-3 h-9 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-base">meeting_room</span>
                      Manage Rooms
                      <span className="px-1.5 py-0.5 bg-white/25 rounded-md text-[10px] font-bold">{listing.occupancy?.split(" ")[0] || "0"}</span>
                    </button>
                  </>
                ) : listing.completed ? (
                  <>
                    <button className="col-span-2 h-9 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-base">autorenew</span>
                      Relist Property
                    </button>
                    <button className="h-9 bg-surface-container-low hover:bg-surface-container text-secondary text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-base">download</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="col-span-3 h-9 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-base">speed</span>
                      Boost Listing
                    </button>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 h-8 bg-surface-container-low hover:bg-surface-container text-primary text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Edit
                </button>
                <button className="flex-1 h-8 bg-surface-container-low hover:bg-surface-container text-on-surface text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share
                </button>
                <button className="flex-1 h-8 bg-surface-container-low hover:bg-surface-container text-on-surface text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">more_vert</span>
                  More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between mb-6">
        <span className="text-sm text-secondary">
          Showing <strong className="text-on-surface">1 - 6</strong> of <strong className="text-on-surface">6</strong> listings
        </span>
        <div className="flex items-center gap-1">
          <button className="p-2 text-outline-variant cursor-not-allowed rounded" disabled>
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center">
            1
          </button>
          <button className="p-2 text-outline-variant cursor-not-allowed rounded" disabled>
            <span className="material-symbols-outlined text-xl">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Support Banner */}
      <div className="bg-surface-container-low p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined text-3xl">support_agent</span>
          </div>
          <div>
            <span className="text-base font-bold text-on-surface">GharBazaar Merchant Desk & Relationship Manager</span>
            <p className="text-xs text-secondary mt-0.5">
              Need help optimizing listing visibility, configuring bulk steel MOQ, or resolving student tenant agreements?
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:+919839122840"
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-primary-container text-xl">phone</span>
            <span>+91 9839122840</span>
          </a>
          <button className="px-4 py-2.5 bg-primary-container text-on-primary text-sm font-semibold rounded-lg shadow-sm hover:bg-primary transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg">chat</span>
            <span>WhatsApp Concierge</span>
          </button>
        </div>
      </div>
    </div>
  );
}
