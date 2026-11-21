import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PropertyDetailsRent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [leaseAgreementChecked, setLeaseAgreementChecked] = useState(true);

  // Sample rental property data
  const property = {
    id: id,
    title: "Single Room with Private Kitchen & Balcony",
    location: "Near Quantum University Gate 02, Roorkee-Chhutmalpur Highway, Saharanpur Corridor (UP)",
    monthlyRent: 3500,
    securityDeposit: 1750,
    electricityRate: 9,
    maintenanceCharges: 200,
    mealPlanMonthly: 2600,
    status: "Active & Ready",
    reraVerified: true,
    tags: ["Student & Executive Co-Living"],
    propertyId: "GHR-RNT-4921",
    views: 432,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD98UhFrrOMJ--lTB3bbm0LnwhnKQmXDDgPYBJ2M1YoGL8oi38imyBFO5qHAjQl6w4kMDdPmezkf4CmDgX0mhnEBs8jIzPO_HD0VPh3BXkHGPiZ-UjyDJkrHLceLf_isc61o9ox2PQq1cRUnm2NeIxeReiMPevwCVCvJ6nCtOKFzySDhzWWB7Z-gOZrQ5mjeb560z-8Buw4PAUwX9Ov1Uh-NKyJTjAaaeyvzloKubQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnxM0nmeJubNXwa_avTW0KQ8SfWslTxYQCFUdEERT5QNBRXntMABNj1FTreLevr5dhYYARJuCC3jnnVCWHriXwMHc0WAeuNw7k5MF0tzWTF6Sw8E2lAHR0cOXq2HSvjRK1Iqg8spe2-7YA9jUoAcSnHxzE5oTNsUnrF9OLowMiZDR2nJHjHXjJuKYghGJEJ1wS0Q28d8wq2FY74YgQPJPVwDMyixggTUNzh4VP318",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvMgse-ttyJWnJsiFpXbbFN-SqMnGThBkx19Bjca4NEeJR8bgeGnSWnRaPtUm9_jZRkgY53KnJIv2BlvDDRez_qjXFYd3vcZNFJS_uC4JEwYsepUv6llo7arkz8vVwOTn8Czxlt_vkdP2AgS1x_eUq_5B37rfqs4R_5hrPxMw3nSWr6hGWpdWLXdM5uaYXz_4tGHYXOhRzwMxA_Q0ZgoSqfiD5CSVaLNiSJYc6bMs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCubvSGYrfube6cumgir0pTldTgi7lsso_LaQUgUXoX3ftkFxTssw6IvU6sxsYkaB2MXPmL3GPBZ3zDviXpq29B_-xM8TgtNVFQzwBLC8sDq7xNTL4a8X6AW3eonVKnsSS-SjFmF1FAJFMpmNlEu2P8A9ywbn2_A0y0JUnfL8PXsqzT6HC2W60zwnmf0jBVW1CSikTmBNDpuYJa_yG6EeJ90pbseCnMx2jUYu5tqOs"
    ],
    thumbnails: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnxM0nmeJubNXwa_avTW0KQ8SfWslTxYQCFUdEERT5QNBRXntMABNj1FTreLevr5dhYYARJuCC3jnnVCWHriXwMHc0WAeuNw7k5MF0tzWTF6Sw8E2lAHR0cOXq2HSvjRK1Iqg8spe2-7YA9jUoAcSnHxzE5oTNsUnrF9OLowMiZDR2nJHjHXjJuKYghGJEJ1wS0Q28d8wq2FY74YgQPJPVwDMyixggTUNzh4VP318", label: "Study Nook" },
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvMgse-ttyJWnJsiFpXbbFN-SqMnGThBkx19Bjca4NEeJR8bgeGnSWnRaPtUm9_jZRkgY53KnJIv2BlvDDRez_qjXFYd3vcZNFJS_uC4JEwYsepUv6llo7arkz8vVwOTn8Czxlt_vkdP2AgS1x_eUq_5B37rfqs4R_5hrPxMw3nSWr6hGWpdWLXdM5uaYXz_4tGHYXOhRzwMxA_Q0ZgoSqfiD5CSVaLNiSJYc6bMs", label: "Modular Pantry" },
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCubvSGYrfube6cumgir0pTldTgi7lsso_LaQUgUXoX3ftkFxTssw6IvU6sxsYkaB2MXPmL3GPBZ3zDviXpq29B_-xM8TgtNVFQzwBLC8sDq7xNTL4a8X6AW3eonVKnsSS-SjFmF1FAJFMpmNlEu2P8A9ywbn2_A0y0JUnfL8PXsqzT6HC2W60zwnmf0jBVW1CSikTmBNDpuYJa_yG6EeJ90pbseCnMx2jUYu5tqOs", label: "Attached Bath" }
    ],
    specs: {
      bedrooms: "1 Private",
      bathrooms: "1 Attached",
      carpetArea: "350 sq.ft",
      balcony: "Balcony + Slab"
    },
    roomSpecs: {
      sharingType: "Private (Single)",
      preferredTenant: "Students / Working",
      electricityCharges: "₹9 / Unit",
      waterSupply: "Free / Included",
      internet: "Included (100 Mbps)",
      maintenance: "₹200 / Month"
    },
    features: [
      { icon: "desk", label: "Study Table & Chair", desc: "Solid teak desk" },
      { icon: "shelves", label: "Steel Almirah", desc: "Lock & safe locker" },
      { icon: "water_heater", label: "Geyser 15L", desc: "Instant winter water" },
      { icon: "electric_bolt", label: "Power Inverter", desc: "24/7 fan & lights" },
      { icon: "local_drink", label: "Commercial RO", desc: "TDS level monitored" },
      { icon: "videocam", label: "CCTV Coverage", desc: "Entry & bike parking" },
      { icon: "two_wheeler", label: "Bike Parking", desc: "Gated & locked at night" },
      { icon: "local_laundry_service", label: "Washing Machine", desc: "Shared terrace unit" }
    ],
    proximity: [
      { icon: "school", label: "Academic Block", distance: "3 Min Walk", sublabel: "Quantum Gate #2" },
      { icon: "medical_services", label: "Pharmacy & Clinic", distance: "2 Min Walk", sublabel: "Highway Chemist" },
      { icon: "ramen_dining", label: "Food Stalls", distance: "1 Min Walk", sublabel: "Cafes & stationery" },
      { icon: "directions_bus", label: "Bus Stand", distance: "500 Meters", sublabel: "Chhutmalpur Chowk" }
    ],
    mealPlan: {
      breakfast: "Poha, Paratha, Milk / Tea (7:30 - 9:30 AM)",
      lunch: "Tiffin delivery to Quantum gate or dining hall",
      dinner: "Dal, Roti, Seasonal Sabzi, Rice, Salad"
    }
  };

  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
  };

  const handleShareProperty = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handleBookOnWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi GharBazaar, I am interested in ${property.title} (₹${property.monthlyRent}/mo) near Quantum University`
    );
    window.open(`https://wa.me/919548283300?text=${message}`, '_blank');
  };

  const handleUnlockAccess = () => {
    alert('Initiating GharBazaar Escrow Access Gateway (₹999 + GST). You will be routed to direct landowner contact & tenancy verification checklist.');
  };

  return (
    <>
      <Helmet>
        <title>{property.title} | GharBazaar Rent</title>
        <meta name="description" content={`${property.title} - ₹${property.monthlyRent}/month in ${property.location}`} />
      </Helmet>

      <div className="w-full pt-36 bg-surface min-h-screen">
        {/* Top Context Navigation Bar */}
        <div className="w-full bg-surface-container-low py-2 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate('/rent-and-co-living')}
                className="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Rentals</span>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant">
                <button onClick={() => navigate('/')} className="hover:text-on-surface">Home</button>
                <span>/</span>
                <button onClick={() => navigate('/rent-and-co-living')} className="hover:text-on-surface">Rent & PG</button>
                <span>/</span>
                <span className="hover:text-on-surface">Saharanpur Corridor</span>
                <span>/</span>
                <span className="text-on-surface font-medium truncate max-w-xs">{property.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {property.reraVerified && (
                <span className="inline-flex items-center gap-1 bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> RERA Verified Listing
                </span>
              )}
              <span className="inline-flex items-center gap-1 bg-primary text-on-primary px-2.5 py-1 rounded-full text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping"></span> {property.status}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-10">
          {/* Title & Location Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider text-primary font-bold bg-primary-fixed/30 px-2 py-0.5 rounded">
                  {property.tags[0]}
                </span>
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-outline">visibility</span> {property.views} verified student visits
                </span>
                <span className="text-xs text-on-surface-variant">• ID: {property.propertyId}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
                {property.title}
              </h1>
              <p className="text-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span>{property.location}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={handleSaveProperty}
                className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container px-4 py-2 rounded-lg text-sm text-on-surface shadow-sm transition-colors"
              >
                <span className={`material-symbols-outlined text-[18px] ${isSaved ? 'text-red-600' : 'text-tertiary'}`}>
                  {isSaved ? 'favorite' : 'favorite_border'}
                </span>
                <span>{isSaved ? 'Saved in Wishlist' : 'Save Room'}</span>
              </button>
              <button
                onClick={handleShareProperty}
                className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container px-4 py-2 rounded-lg text-sm text-on-surface shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Gallery Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Thumbnail Column */}
            <div className="order-2 lg:order-1 lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-3 h-full">
              {property.thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index + 1)}
                  className="relative overflow-hidden rounded-xl bg-surface-container-high group cursor-pointer h-28 lg:h-36 shadow-sm"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={thumb.url}
                    alt={thumb.label}
                  />
                  <span className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-on-surface">
                    {thumb.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Main Showcase */}
            <div className="order-1 lg:order-2 lg:col-span-9 relative overflow-hidden rounded-2xl bg-surface-container-high shadow-md min-h-[380px] lg:min-h-[460px]">
              <img className="w-full h-full object-cover" src={property.images[currentImageIndex]} alt={property.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end justify-between p-4 lg:p-6 text-surface">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest bg-primary px-2.5 py-1 rounded text-on-primary">
                    <span className="material-symbols-outlined text-[13px]">photo_camera</span> 12 Verified HD Photos
                  </span>
                  <p className="text-lg font-bold text-surface">Alokik Student Residency • Room #204 (First Floor)</p>
                  <p className="text-sm text-surface-container-high">East Facing • Zero Disturbance Academic Zone • Cross Ventilation</p>
                </div>
                <button className="bg-surface/95 hover:bg-surface text-on-surface text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md transition-all">
                  <span className="material-symbols-outlined text-[18px] text-primary">view_in_ar</span> 360° Virtual Tour
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              {/* Snapshot Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                {Object.entries(property.specs).map(([key, value], index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        {key === 'bedrooms' ? 'single_bed' : key === 'bathrooms' ? 'bathtub' : key === 'carpetArea' ? 'square_foot' : 'balcony'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase">{key}</p>
                      <p className="font-bold text-on-surface">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <h2 className="text-xl font-bold text-on-surface">Space Narrative & Overview</h2>
                </div>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  Comfortable semi-furnished independent single room with a dedicated private cooking kitchenette counter and pristine attached bathroom, strategically situated just 350 meters from Quantum University Gate 2. Tailored purposefully for university scholars, research fellows, and young working professionals seeking a silent, self-governed, clean living environment without the rigid rules of typical hostels.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                    <span><strong>Strict No Brokerage:</strong> Deal verified directly via GharBazaar Escrow portal.</span>
                  </div>
                  <div className="flex items-start gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                    <span><strong>Separate Entry & Exit:</strong> Independent key provided with zero midnight curfew hassles.</span>
                  </div>
                  <div className="flex items-start gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                    <span><strong>Sub-metered Power:</strong> Exact government unit rates applied.</span>
                  </div>
                  <div className="flex items-start gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                    <span><strong>RBI Trustee Escrow:</strong> 50% deposit held securely.</span>
                  </div>
                </div>
              </div>

              {/* Room Specifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                    Property & Tenancy Parameters
                  </h3>
                  <span className="text-xs text-on-surface-variant">Last audited 3 days ago</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(property.roomSpecs).map(([key, value], index) => (
                    <div key={index} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-1">
                      <span className="text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-outline">
                          {key === 'sharingType' ? 'group' : key === 'preferredTenant' ? 'qr_code_2' : key === 'electricityCharges' ? 'bolt' : key === 'waterSupply' ? 'water_drop' : key === 'internet' ? 'wifi' : 'cleaning_services'}
                        </span>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p className="font-bold text-on-surface">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Plan */}
              <div className="bg-surface-container-low p-6 rounded-2xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">restaurant</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-on-surface">Mess & Dietary Provisions</h3>
                      <p className="text-sm text-on-surface-variant">Pure Vegetarian Home-Style Kitchen on Ground Floor</p>
                    </div>
                  </div>
                  <span className="bg-surface-container-lowest text-primary px-3 py-1 rounded-full text-sm shadow-sm">
                    Optional Subscription Available
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(property.mealPlan).map(([key, value], index) => (
                    <div key={index} className="bg-surface-container-lowest p-3 rounded-xl text-center space-y-1">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        {key === 'breakfast' ? 'bakery_dining' : key === 'lunch' ? 'lunch_dining' : 'dinner_dining'}
                      </span>
                      <p className="text-sm font-semibold text-on-surface capitalize">{key}</p>
                      <p className="text-[11px] text-on-surface-variant">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant">
                  * Monthly 3-meal full pass: ₹{property.mealPlanMonthly} / month. You may also cook yourself using the private pantry platform.
                </p>
              </div>

              {/* Room Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
                  Room Features & Infrastructure
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col items-center text-center space-y-2">
                      <span className="material-symbols-outlined text-[28px] text-primary">{feature.icon}</span>
                      <span className="text-sm font-semibold text-on-surface">{feature.label}</span>
                      <span className="text-[11px] text-on-surface-variant">{feature.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proximity Map */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">explore</span>
                    Geographic Proximity & Connectivity
                  </h3>
                  <span className="text-sm text-primary font-semibold">Chhutmalpur Hub</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm space-y-4">
                  {/* Map Placeholder */}
                  <div
                    className="w-full h-64 bg-cover bg-center rounded-xl relative overflow-hidden flex flex-col justify-end p-4 shadow-inner"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGVWHioku9Kq_ArIHGxVBEpv_70SNuwfkS-QGQNQOU3oQDiLRdg3Y_Zeg_dsR212s8qR8O6iHt2sSYpgjjV4aqzCf3LOtuyg62aU_EQ1NslDsDTp_1SJUFGcZRI8d9JOHLZEj2PMrxjaR0vTTGdNeY8Hqb6zJvgCjT8mAeVwESXQyi6B4JZf6C4CSBy9qWQubvvFiDWMv4drSR_TSQkvrZwMAWewk2VUJrTDG8PA8')"
                    }}
                  >
                    <div className="bg-surface/90 backdrop-blur-md p-3 rounded-lg max-w-sm shadow-md">
                      <p className="text-sm font-bold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">school</span> Quantum University Campus
                      </p>
                      <p className="text-xs text-on-surface-variant">350 meters • ~3 min leisurely walking path</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {property.proximity.map((place, index) => (
                      <div key={index} className="p-2 space-y-1">
                        <span className="text-xs text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-primary">{place.icon}</span> {place.label}
                        </span>
                        <p className="font-bold text-on-surface">{place.distance}</p>
                        <p className="text-[11px] text-on-surface-variant">{place.sublabel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Card (Sticky) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-36">
              {/* Main Booking Container */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md space-y-4">
                {/* Pricing Header */}
                <div className="flex items-start justify-between pb-3">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-on-surface text-primary">₹{property.monthlyRent}</span>
                      <span className="text-sm text-on-surface-variant">/ month</span>
                    </div>
                    <p className="text-xs text-primary font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">savings</span> 100% Zero Brokerage Listing
                    </p>
                  </div>
                  <span className="bg-primary-fixed/40 text-on-primary-fixed-variant px-2.5 py-1 rounded text-xs font-bold">
                    Direct Owner
                  </span>
                </div>

                {/* Escrow Trust Callout */}
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                    <span>Deposit Protection Guarantee</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Security Deposit is strictly fixed at <strong>50% of 1st month rent (₹{property.securityDeposit})</strong>, preserved in GharBazaar's escrow pool.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleBookOnWhatsApp}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Book on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setShowVisitModal(true)}
                    className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
                    <span>Schedule Physical Visit</span>
                  </button>
                </div>

                {/* Booking Fee Card */}
                <div className="bg-surface-container-high/60 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[18px]">key</span>
                      <span>Tenant Booking Fee</span>
                    </div>
                    <span className="text-xs bg-primary-container text-on-primary px-2 py-0.5 rounded">One-Time Fee</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xl font-bold text-primary">
                      ₹999 <span className="text-xs text-on-surface-variant font-normal">+ GST</span>
                    </span>
                    <span className="text-[11px] text-on-surface-variant uppercase font-medium tracking-wide">Not a Subscription</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-snug">
                    Directly unlocks landlord phone contact, instant lease token generation, room hold for 48 hours, and RBI escrow deposit shield.
                  </p>
                  <button
                    onClick={handleUnlockAccess}
                    className="w-full mt-2 bg-on-surface text-surface py-2 rounded-lg text-sm hover:bg-on-surface/90 transition-all shadow-sm"
                  >
                    Unlock Contact & Room Pass
                  </button>
                </div>

                {/* Lease Agreement Option */}
                <div className="p-3 bg-surface-container-lowest rounded-xl flex items-start gap-3 shadow-sm">
                  <input
                    checked={leaseAgreementChecked}
                    onChange={(e) => setLeaseAgreementChecked(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded text-primary accent-primary cursor-pointer"
                    type="checkbox"
                  />
                  <label className="cursor-pointer space-y-0.5">
                    <p className="text-sm font-semibold text-on-surface flex items-center justify-between">
                      <span>E-Stamped Rental Agreement</span>
                      <span className="text-primary font-bold">+₹200</span>
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      Govt compliant 11-month legal digital stamp agreement delivered within 3 hours on WhatsApp.
                    </p>
                  </label>
                </div>

                {/* Trust Signifiers */}
                <div className="space-y-1.5 pt-2 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">format_image_left</span>
                    <span>100% Refundable Booking token if property doesn't match</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">person_check</span>
                    <span>Verified caretaker: Shri Rakesh Sharma (On-premise)</span>
                  </div>
                </div>
              </div>

              {/* Move-in Requirements */}
              <div className="bg-surface-container-low p-4 rounded-xl space-y-1.5 shadow-sm">
                <p className="text-sm font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">info</span> Move-in Requirements
                </p>
                <p className="text-sm text-on-surface-variant">
                  Valid University Student ID card or Corporate Employer Proof along with Aadhaar Card mandatory during check-in.
                </p>
              </div>
            </div>
          </div>

          {/* Similar Properties Placeholder */}
          <div className="w-full space-y-4 mt-10 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Similar Verified Rooms & PGs Nearby</h3>
                <p className="text-sm text-on-surface-variant">Curated matching student living units within 1 km radius</p>
              </div>
              <button
                onClick={() => navigate('/rent-and-co-living')}
                className="text-primary text-sm font-semibold hover:underline flex items-center gap-1"
              >
                <span>View All 38 Options</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="text-center py-10 bg-surface-container-low rounded-xl">
              <p className="text-on-surface-variant">Similar rental properties will be loaded here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Booking Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-primary font-bold">Physical Inspection</span>
              <h3 className="text-xl font-bold text-on-surface">Book Verified Room Visit</h3>
              <p className="text-sm text-on-surface-variant">Room #204, Alokik Residency • Meet on-site coordinator</p>
            </div>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Visit scheduled successfully! Our local coordinator will call you to confirm the time.');
                setShowVisitModal(false);
              }}
            >
              <div>
                <label className="block text-xs text-on-surface font-semibold mb-1">Your Full Name</label>
                <input
                  className="w-full bg-surface-container px-4 py-2.5 rounded-lg text-sm text-on-surface outline-none"
                  placeholder="e.g. Ajay Sharma"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface font-semibold mb-1">WhatsApp Mobile Number</label>
                <input
                  className="w-full bg-surface-container px-4 py-2.5 rounded-lg text-sm text-on-surface outline-none"
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1">Preferred Date</label>
                  <input
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-sm text-on-surface outline-none"
                    required
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1">Preferred Time</label>
                  <select className="w-full bg-surface-container px-3 py-2.5 rounded-lg text-sm text-on-surface outline-none">
                    <option>10:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 05:00 PM</option>
                    <option>05:00 PM - 07:30 PM</option>
                  </select>
                </div>
              </div>
              <button
                className="w-full mt-2 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-semibold transition-colors shadow-sm"
                type="submit"
              >
                Confirm Free Site Inspection
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsRent;
