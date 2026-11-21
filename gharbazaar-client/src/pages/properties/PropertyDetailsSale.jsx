import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PropertyDetailsSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Sample property data - replace with actual API call
  const property = {
    id: id,
    title: "Ultra-Modern 3BHK Corner Penthouse with Braj View",
    location: "Plot 42-B, Sector 8, Near Radha Madhav Mandir, Krishna Nagar, Mathura, Uttar Pradesh 281004",
    price: 8800000,
    pricePerSqFt: 4756,
    negotiable: true,
    emiEstimate: 68450,
    status: "ACTIVE SALE",
    reraApproved: true,
    tags: ["Corner Unit 402", "100% Vastu Compliant", "Direct Owner Mandate"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNov8aUiCPWhQFCVtdDAEJUPU0rYw8dwGMO5m_Rh5Nh7GB_963EANrvuiIda8ftfwNbffXeGhCzy6lPyd-C8EcvSMcrh_UsqKbqIu9Pqnatqu8-LX6dnqMtmfLLgEM9SwURZOlIlIUHFuzRnlUmrgjTdRJpGWVqMK4RZrgtCT6OXCBHlajrok74v_xyVPhLd8ivwvP4UWABSIRpi_VgCz4tPniKUZ5cepjsOChem8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9joaVd9ZxhGH8YvrzHXpwrxI6nuXz9JL9TktUUZ1UOLW4gq_2E30mJMQFaAziugF2usybsZeLTZoq18BzYn32lf5LCJCJVEg3NMjmo9WRsqpVWTBuJEa55iZe1E79kjNhC1meYewaUAZeTUX3Yqxw5z2zQeczCMVpSgEjrKxGKEroU8ddaqk2b7JTCiUwpbzH9QOK3xN_VMCDKMfQP0g1_HPDr8MDQ0NjBL6GbyE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRFJ_4Ao4_03-Vvr-zf_8v5cqyny7FwF6XmKejuKgFUKffEOo4M4DjzGMCXQDQxul078muUiP9x_d6aZQRm9T_2N23aWK6yLJTWJKdSXXaM7IEsw2XBOGfYS4PI1_iQxtTxE9411EREZviGUm3jCWuqQPn-kMFs098du6o0zb4U3pMdWO1eUeBd3mcHe5QwRKR4h0d8JU48HBZXqg7V6uXo8x61bLzmOc4NGNuzU0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZLEOnIJOV1nWfzyjGpG34ScAuZ4Ijb7onvxX0wri8-ELt8nmobcPdS3ZO5PZ0Dd0QAdw85M8D_yQ9bg5g76z138I9DGFAgR2drGGe8a7JQ6W_cUqzdC7OqaBlK6SIJuOCM-no8wcGjz7rGzhqyB-1x9C3ZvqI2JWsTnbo44c5iw44AyJBs9y9xdBKGhduZLndA5DLqE6pIuCDJA1kMLc5HQ4pAcXsMVyKz6uG8Q"
    ],
    thumbnails: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9joaVd9ZxhGH8YvrzHXpwrxI6nuXz9JL9TktUUZ1UOLW4gq_2E30mJMQFaAziugF2usybsZeLTZoq18BzYn32lf5LCJCJVEg3NMjmo9WRsqpVWTBuJEa55iZe1E79kjNhC1meYewaUAZeTUX3Yqxw5z2zQeczCMVpSgEjrKxGKEroU8ddaqk2b7JTCiUwpbzH9QOK3xN_VMCDKMfQP0g1_HPDr8MDQ0NjBL6GbyE", label: "Living Area" },
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRFJ_4Ao4_03-Vvr-zf_8v5cqyny7FwF6XmKejuKgFUKffEOo4M4DjzGMCXQDQxul078muUiP9x_d6aZQRm9T_2N23aWK6yLJTWJKdSXXaM7IEsw2XBOGfYS4PI1_iQxtTxE9411EREZviGUm3jCWuqQPn-kMFs098du6o0zb4U3pMdWO1eUeBd3mcHe5QwRKR4h0d8JU48HBZXqg7V6uXo8x61bLzmOc4NGNuzU0", label: "Master Bed" },
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZLEOnIJOV1nWfzyjGpG34ScAuZ4Ijb7onvxX0wri8-ELt8nmobcPdS3ZO5PZ0Dd0QAdw85M8D_yQ9bg5g76z138I9DGFAgR2drGGe8a7JQ6W_cUqzdC7OqaBlK6SIJuOCM-no8wcGjz7rGzhqyB-1x9C3ZvqI2JWsTnbo44c5iw44AyJBs9y9xdBKGhduZLndA5DLqE6pIuCDJA1kMLc5HQ4pAcXsMVyKz6uG8Q", label: "Rooftop Garden" }
    ],
    specifications: {
      configuration: "3 BHK + 3 Baths",
      carpetArea: "1,520 sq.ft",
      superBuiltUp: "1,850 sq.ft",
      floor: "4th of 12 Floors",
      facing: "North-East (Ishan)",
      possession: "Immediate Ready",
      furnishing: "Semi-Furnished",
      parking: "2 Basement Slots",
      balconies: "3 Wraparound",
      propertyAge: "0-1 Year (Brand New)",
      waterSupply: "24/7 RO + Borewell",
      powerBackup: "100% Full Load DG"
    },
    features: [
      "Private Rooftop Garden Access",
      "Sound-dampened double glazing",
      "Grohe & Kohler Sanitary Fixtures",
      "Biometric Smart Digital Lock"
    ],
    amenities: [
      { icon: "elevator", label: "High-speed Otis Lifts (2)" },
      { icon: "shield", label: "24/7 Guarded Gated Access" },
      { icon: "videocam", label: "Full CCTV Perimeter" },
      { icon: "fitness_center", label: "Modern Gymnasium" },
      { icon: "park", label: "Landscaped Zen Lawn" },
      { icon: "water", label: "Rainwater Harvesting" }
    ],
    legalInfo: {
      reraId: "UPRERAAGT10294",
      titleStatus: "Freehold Registered Land",
      daApproval: "Sanctioned #MVDA-882",
      encumbrance: "Zero Encumbrance / Nil Dues",
      approvedBanks: ["State Bank of India", "HDFC Bank", "ICICI Home Loans", "Axis Bank"]
    },
    proximity: [
      { icon: "train", label: "Mathura Railway Junction", distance: "12 mins (4.2 km)" },
      { icon: "add_road", label: "Delhi-Agra NH-19 Highway", distance: "5 mins (1.8 km)" },
      { icon: "temple_hindu", label: "Shri Krishna Janmabhoomi", distance: "10 mins (3.5 km)" },
      { icon: "school", label: "Sanskriti University / Corridors", distance: "15 mins (6.1 km)" }
    ],
    seller: {
      name: "Shree Krishna Realty Desk",
      reraNumber: "10283",
      rating: 4.9,
      deals: 142,
      responseRate: "98%"
    },
    views: 1842
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

  const handleScheduleVisit = () => {
    alert('Schedule Visit functionality will be implemented');
  };

  const handleConnectDesk = () => {
    alert('Connect with Deal Assist Desk functionality will be implemented');
  };

  const handleBookToken = () => {
    alert('Book Token Advance functionality will be implemented');
  };

  return (
    <>
      <Helmet>
        <title>{property.title} | GharBazaar</title>
        <meta name="description" content={`${property.title} - ₹${property.price.toLocaleString('en-IN')} in ${property.location}`} />
      </Helmet>

      <div className="w-full pt-36 bg-surface min-h-screen">
        {/* Top Context Navigation Bar */}
        <div className="w-full bg-surface-container-low/70 py-2">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <button
                onClick={() => navigate('/properties')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back to Search</span>
              </button>
              <span className="text-outline">/</span>
              <button onClick={() => navigate('/properties')} className="hover:text-primary transition-colors">
                Properties
              </button>
              <span className="text-outline">/</span>
              <span className="text-on-surface">Mathura</span>
              <span className="text-outline">/</span>
              <span className="text-on-surface">Krishna Nagar</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold">Penthouse #402</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-primary text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {property.status}
              </span>
              {property.reraApproved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-primary-container text-xs font-semibold shadow-sm">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  UP RERA APPROVED
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6 w-full">
          {/* Header Titles & Quick Meta */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {property.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                {property.title}
              </h1>
              <p className="text-sm text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                {property.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveProperty}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm transition-colors shadow-sm"
              >
                <span className={`material-symbols-outlined text-[18px] ${isSaved ? 'text-red-600' : ''}`}>
                  {isSaved ? 'favorite' : 'favorite_border'}
                </span>
                <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
              </button>
              <button
                onClick={handleShareProperty}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Share</span>
              </button>
              <div className="h-8 w-px bg-surface-container-high hidden sm:block"></div>
              <div className="flex items-center gap-1 text-on-surface-variant text-xs bg-surface-container-low px-3 py-1.5 rounded">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>{property.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Gallery & Pricing Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
            {/* Media Stage (8 Cols) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Main Image */}
              <div className="relative w-full h-[440px] sm:h-[500px] rounded-xl overflow-hidden bg-surface-container shadow-md group">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-black/20 pointer-events-none"></div>

                {/* Media Quick Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">view_in_ar</span> 360° Virtual Tour
                  </span>
                  <span className="px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">floor</span> Cadastral Floor Plan
                  </span>
                  <span className="px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">wb_sunny</span> Sunset Braj Skyline
                  </span>
                </div>

                {/* Bottom Gallery Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-xs text-inverse-on-surface font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">photo_library</span> {currentImageIndex + 1} / {property.images.length} Photos
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">verified</span> GharBazaar Photographed
                    </span>
                  </div>
                  <button className="px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface hover:bg-surface-container-lowest text-xs font-semibold flex items-center gap-1 shadow transition-colors">
                    <span className="material-symbols-outlined text-[16px]">fullscreen</span> View Full Gallery
                  </button>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-4 gap-3">
                {property.thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index + 1)}
                    className={`h-24 rounded-lg overflow-hidden relative cursor-pointer ${currentImageIndex === index + 1 ? 'ring-2 ring-primary' : ''} shadow-sm bg-surface-container hover:opacity-90 transition-opacity`}
                  >
                    <img className="w-full h-full object-cover" src={thumb.url} alt={thumb.label} />
                    <span className="absolute bottom-1 left-1.5 text-[10px] font-semibold text-white bg-black/60 px-1 rounded">
                      {thumb.label}
                    </span>
                  </div>
                ))}
                <div className="h-24 rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container">
                  <span className="material-symbols-outlined text-[24px]">architecture</span>
                  <span className="text-xs font-semibold">2D Floor Plan</span>
                </div>
              </div>
            </div>

            {/* Pricing & Action Dock (4 Cols Sticky) */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-40">
              <div className="rounded-xl p-6 bg-surface-container-lowest shadow-md space-y-4">
                {/* Price Block */}
                <div className="space-y-2 pb-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-4xl font-bold text-on-surface text-primary tracking-tight">
                        ₹{(property.price / 100000).toFixed(2)}L
                      </span>
                      {property.negotiable && (
                        <span className="text-tertiary-container text-xs ml-1 font-semibold">Negotiable</span>
                      )}
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium">₹{property.pricePerSqFt} / sq.ft</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant text-sm bg-surface-container-low px-3 py-1.5 rounded">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">calculate</span> Estimated EMI:
                    </span>
                    <span className="font-semibold text-on-surface">
                      ₹{property.emiEstimate.toLocaleString('en-IN')}
                      <span className="text-sm font-normal text-on-surface-variant">/mo</span>
                    </span>
                  </div>
                </div>

                {/* Zero Brokerage Flag */}
                <div className="p-3 rounded-lg bg-emerald-50 text-primary-container flex items-start gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0">handshake</span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-primary">100% Zero Brokerage Transaction</p>
                    <p className="text-xs text-on-surface-variant">
                      Connect directly with verified property owner. Save up to ₹1,76,000 in agent fees.
                    </p>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleScheduleVisit}
                    className="w-full py-3 px-4 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    Schedule Physical Site Visit
                  </button>
                  <button
                    onClick={handleConnectDesk}
                    className="w-full py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">support_agent</span>
                    Connect with Deal Assist Desk
                  </button>
                </div>

                {/* Token Advance Escrow Lock Card */}
                <div className="p-4 rounded-lg bg-surface-container-low space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span> Escrow Token Protection
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">
                      100% Refundable
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Lock unit #402 for 7 days with a secured advance token of <strong className="text-on-surface font-semibold">₹2,00,000</strong> held strictly in GharBazaar Tri-Party Legal Escrow until title deed validation.
                  </p>
                  <button
                    onClick={handleBookToken}
                    className="w-full mt-1 py-2 px-4 rounded bg-surface-container-lowest hover:bg-surface text-primary font-bold shadow-sm transition-colors flex items-center justify-center gap-1 text-sm"
                  >
                    <span>Book Property Token Advance</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2 pt-1">
                  <span className="material-symbols-outlined text-[18px] text-outline shrink-0 mt-0.5">phonelink_lock</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    <strong className="text-on-surface font-semibold">Spam-Shield™ Protection:</strong> Direct phone numbers are encrypted to prevent persistent tele-marketing calls.
                  </p>
                </div>
              </div>

              {/* Seller Card */}
              <div className="rounded-xl p-4 bg-surface-container-lowest shadow-sm space-y-3">
                <span className="text-xs text-outline uppercase tracking-wider font-semibold">Listing Representative</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
                    SK
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="font-semibold text-on-surface truncate">{property.seller.name}</h4>
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0" title="RERA Certified">
                        verified
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">RERA Registered Advisory #{property.seller.reraNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-surface-container-low rounded-lg">
                  <div>
                    <p className="font-bold text-on-surface">{property.seller.rating} ★</p>
                    <p className="text-xs text-on-surface-variant">Rating</p>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{property.seller.deals}</p>
                    <p className="text-xs text-on-surface-variant">Direct Deals</p>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{property.seller.responseRate}</p>
                    <p className="text-xs text-on-surface-variant">Fast Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spatial Specification Matrix */}
          <div className="w-full space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Property Spatial Specifications</h2>
                <p className="text-sm text-on-surface-variant">
                  Architectural dimensions, directional orientation, and legal structural attributes.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded bg-surface-container-high text-on-surface-variant">
                Unit ID: GB-MTH-402P
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.entries(property.specifications).map(([key, value], index) => (
                <div key={index} className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {key === 'configuration' ? 'king_bed' :
                     key === 'carpetArea' ? 'square_foot' :
                     key === 'superBuiltUp' ? 'straighten' :
                     key === 'floor' ? 'layers' :
                     key === 'facing' ? 'explore' :
                     key === 'possession' ? 'key' :
                     key === 'furnishing' ? 'chair' :
                     key === 'parking' ? 'garage' :
                     key === 'balconies' ? 'balcony' :
                     key === 'propertyAge' ? 'history_edu' :
                     key === 'waterSupply' ? 'water_drop' :
                     'electrical_services'}
                  </span>
                  <p className="text-xs text-on-surface-variant capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-bold text-on-surface">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Legal Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            {/* Description (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Architectural Narrative & Layout Highlights
                </h3>
                <div className="text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Positioned on the 4th corner quadrant of Krishna Heights, this premium penthouse captures unhindered panoramic views across the sacred groves and horizon of Krishna Nagar. Designed with double-height vaulted ceiling sections and expansive North-East glazing, the residence enjoys exceptional daylight and morning cross-ventilation without intense afternoon thermal gain.
                  </p>
                  <p>
                    The residence incorporates Italian Statuario vitrified floor tiling throughout the grand reception and family dining salons. The master suite features handcrafted white-oak wood paneling, an en-suite walk-in wardrobe, and a private 220 sq.ft wrap-around veranda.
                  </p>
                  <div className="p-4 rounded-lg bg-surface-container-low space-y-2">
                    <span className="text-sm font-bold text-on-surface">Key Residence Features:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-on-surface-variant">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">pool</span>
                  Society & Gated Enclave Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low">
                      <span className="material-symbols-outlined text-primary text-[20px]">{amenity.icon}</span>
                      <span className="text-sm text-on-surface">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal Compliance (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Legal Due Diligence */}
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">gavel</span>
                    Legal & Regulatory Audit
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-primary text-xs font-bold">100% Cleared</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                    <span className="text-on-surface-variant">UP RERA Sanction ID</span>
                    <span className="font-mono text-on-surface font-semibold">{property.legalInfo.reraId}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                    <span className="text-on-surface-variant">Land Title Status</span>
                    <span className="font-semibold text-primary">{property.legalInfo.titleStatus}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                    <span className="text-on-surface-variant">DA Approval</span>
                    <span className="font-semibold text-on-surface">{property.legalInfo.daApproval}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                    <span className="text-on-surface-variant">Encumbrance Check</span>
                    <span className="font-semibold text-primary">{property.legalInfo.encumbrance}</span>
                  </div>
                </div>

                {/* Approved Banking Partners */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs text-on-surface-variant font-semibold">Pre-Approved Institutional Lenders:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {property.legalInfo.approvedBanks.map((bank, index) => (
                      <span key={index} className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface text-xs font-medium">
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location & Connectivity */}
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">near_me</span>
                    Transit & Key Hubs
                  </h3>
                  <span className="text-sm text-primary font-semibold">Krishna Nagar</span>
                </div>

                {/* Map Placeholder */}
                <div
                  className="w-full h-44 rounded-lg bg-cover bg-center shadow-inner relative flex items-end p-3"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAT7AbsPrt1WYUUa8v3lD2qjPqz804M7qZISbZE3DPUD766Qia7y4ekRTb-uOlBikHK8BQnNaxjMsRLU3pol3MkZEm1Z8i7MN39ESMu4VLnnB5NNplMaEWdjZ6gLMgHzb12RNlLBUcHXnLd2-1LM-n2u2FsKF6OBULB1EfJc6IFCtqCF5G9HPIABHDv4Qh6KsJrPcHwQ-XnrrnSF8F23p-YMr6hhHoH45NHUW4K_Ic')"
                  }}
                >
                  <div className="p-2 rounded bg-surface-container-lowest/95 backdrop-blur text-xs text-on-surface shadow flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">pin_drop</span>
                    <span>Near Radha Madhav Mandir, Sec 8</span>
                  </div>
                </div>

                {/* Proximity List */}
                <div className="space-y-2 text-sm">
                  {property.proximity.map((place, index) => (
                    <div key={index} className="flex items-center justify-between py-1 text-on-surface-variant">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-outline">{place.icon}</span>
                        {place.label}
                      </span>
                      <span className="font-semibold text-on-surface">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties Section */}
          <div className="w-full space-y-4 mt-10 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">Curated Matches</span>
                <h2 className="text-2xl font-bold text-on-surface">Similar Verified Properties in Mathura</h2>
              </div>
              <button
                onClick={() => navigate('/properties')}
                className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline"
              >
                View all 48 listings in Krishna Nagar
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Similar Properties Grid - Placeholder */}
            <div className="text-center py-10 bg-surface-container-low rounded-xl">
              <p className="text-on-surface-variant">Similar properties will be loaded here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsSale;
