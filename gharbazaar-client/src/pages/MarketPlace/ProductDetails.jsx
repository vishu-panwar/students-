import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pincode, setPincode] = useState('247662');
  const [showRFQModal, setShowRFQModal] = useState(false);

  // Sample product data - replace with API call
  const product = {
    id: id,
    sku: 'WPC-BIRLA-1KG-IND',
    title: 'White Original Portland Cement 1kg – Multipurpose Waterproof White Cement',
    description: 'Manufactured by Birla White / UltraTech standard. Formulated for tile grouting, architectural wall finishes, marble crack bonding, and surface repair under Indian humid climate conditions.',
    price: 120,
    originalPrice: 180,
    discount: 33,
    wholesalePrice: 95,
    wholesaleMinQty: 100,
    bulkPrice: 4500,
    bulkMinQty: '5+ MT',
    rating: 4.8,
    reviews: 132,
    stock: 1840,
    location: 'Saharanpur Yard',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFOyPVc_axKPLb9o4QT1WvA9ssIvKwY5cBhXT6ffHE9TRyGpRHRov0IiEBJ_e8NHZYD-R91Vcwoe8IZImtXnu7BmlZ6AgfhbvqZbbQNFgMG_xIHbgkZIsXEfY3ukMsLlLUJbMEC4dL5kA6f5mjlc7KRMUDfeBaNnpOYR2r_25O1be1sRXPrAIa2YZtYhLhTmU0fxctKAhTdiatBdzHE2gegAFoU5ODObcaM60r9yg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5qpqvqVkeqa7m6GJwK7Jh1Het6PhIID-1i9xWQFm_9Oy9c1S7EGf7c2mY95NHSDzjSf5I0sadK5rwP-Lhnvbih8AOm9z8sBE1UGMZ7YR4ofPnqwPuncvgSWs02nptDJ-b6XSm_novWKWWKWOdyjyeMd9oP8UE6idWYDKQBVp7Y1kOWpOznhoPmnlZPgSSwFb-38wquuv-sW0yANIn3xpVTfYF0FBTun2hCHpXD8k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATIo0n66HmYgajeojFWJ1m7SCKLdLvd3KmYCXkvEH71d6yJC4RfSpdxg2yQmv03AVhXSrCmwNN4uhYe3iGdBR7sNUiBx2TcEyydClNCYgHosSFz_YJkJ_AEgoTiZK8OJQeaWe515LNDSxdr49Ms0uzOSY11A71iZwEWeesVZtdevLEVni35xKvAmzwPXpWMDVJe7a6hBeZsyXtQmlNhSYZMlHRAfi4xKt4ZVbTw14',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk7hlJkQ_wgdG2z8qPgXqn97qIfm_lVvTDPHKWu37GiXFzuyEc5oADQ6GAH-Lo-R4m1jrBVmsLi0JVltZhHDnknvZYOxa7376gNQoH1UyEHY-k4azfQTBs0w6tccgNWa1WeSkwYwUC7txc2V11RF2r3A7wQLEEOhE_4W87mwCJTYvvF3JO2ShbEgTWOquNO6I2Mksvokg3BjiDG07EkvJgN5zDGuPMNvLSndFA23k'
    ],
    specifications: {
      brand: 'Birla White Grade',
      materialClass: 'White Portland Cement',
      whiteness: '> 89% Index',
      weight: '1 kg (Waterproof Poly)',
      initialSetting: '35 ± 5 Minutes',
      finalSetting: '≤ 380 Minutes',
      compressiveStrength: '53 MPa (28 Days)',
      waterproofing: 'Hydrophobic Poly Additive',
      shelfLife: '12 Months (Moisture Safe)'
    },
    applications: [
      'Tile Joint Grouting',
      'Marble & Granite Setting',
      'Plaster Hairline Crack Sealing',
      'Terrazzo Floor Casting',
      'Architectural Precast Elements'
    ],
    seller: {
      name: 'Indian Cement Store & Traders',
      rating: 4.8,
      totalOrders: 132,
      location: 'Chhutmalpur Highway Hub, Saharanpur (UP)',
      gstin: '09AAACI8908Q1Z1',
      fleetSize: '6 Eicher 14T Trucks',
      leadTime: 'Same-day loading within 4 hours'
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'plus') {
      setQuantity(prev => prev + 1);
    } else if (type === 'minus' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    alert('Added to cart!');
  };

  const handleWhatsAppBooking = () => {
    const message = `I am interested in ${product.title} (SKU: ${product.sku})`;
    window.open(`https://wa.me/919548283300?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAutoLocate = () => {
    setPincode('201301');
  };

  return (
    <>
      <Helmet>
        <title>{product.title} | GharBazaar Marketplace</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="w-full pt-36 bg-surface min-h-screen">
        {/* Top Context Ribbon */}
        <section className="w-full bg-surface-container-low py-3 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/marketplace')}
                className="inline-flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-1.5 rounded-lg shadow-sm text-sm hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Catalog
              </button>
              <nav className="hidden md:flex items-center gap-2 text-sm text-on-surface-variant">
                <button onClick={() => navigate('/marketplace')} className="hover:text-primary transition-colors">Marketplace</button>
                <span className="text-outline">/</span>
                <span className="hover:text-primary transition-colors">Building Materials</span>
                <span className="text-outline">/</span>
                <span className="text-on-surface font-semibold truncate max-w-xs">{product.title}</span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed text-xs px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">verified</span> BIS IS:8042 Certified
              </span>
              <span className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary text-xs px-3 py-1 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span> 24h Transit Saharanpur-NCR
              </span>
            </div>
          </div>
        </section>

        {/* Main Product Detail */}
        <main className="w-full max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Gallery */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative bg-surface-container-lowest rounded-xl p-6 shadow-sm overflow-hidden flex items-center justify-center min-h-[440px]">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="bg-primary text-on-primary text-xs px-2.5 py-1 rounded">100% Genuine</span>
                  <span className="bg-surface-container-high text-tertiary-container text-xs px-2 py-0.5 rounded">Whiteness &gt;89%</span>
                </div>
                <button
                  onClick={() => alert('Share functionality')}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-surface-container-low hover:bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
                <img
                  className="w-full max-w-sm h-auto object-contain transition-transform duration-300 hover:scale-105"
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-surface-container-lowest rounded-lg p-2 shadow-sm transition-all ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : 'hover:bg-surface-container-low'
                    }`}
                  >
                    <img className="w-full h-full object-contain" src={img} alt={`Product ${index + 1}`} />
                  </button>
                ))}
              </div>

              {/* B2B Wholesale Banner */}
              <div className="bg-surface-container-high rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-primary font-bold">Wholesale Channel Benefit</span>
                    <h4 className="font-semibold text-on-surface">Product Selling in B2B / B2C</h4>
                    <p className="text-sm text-on-surface-variant">Zero upfront listing fees for bulk dealers. Flat 5% platform commission on confirmed weighbridge delivery.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-surface-container-lowest px-4 py-3 rounded-xl shadow-sm shrink-0 min-w-[90px]">
                    <span className="text-3xl font-bold text-primary leading-none">5%</span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold mt-1">Platform Fee</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 flex items-center justify-between text-on-surface text-xs">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span> 100% Escrow Protected
                  </span>
                  <button onClick={() => navigate('/pricing')} className="text-primary hover:underline font-semibold">
                    Dealer Terms →
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Details & Purchase */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Header Info */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-on-surface-variant tracking-wider uppercase">Item SKU: {product.sku}</span>
                  <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full">
                    <div className="flex text-tertiary-container">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: i < Math.floor(product.rating) ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {i < Math.floor(product.rating) ? 'star' : 'star_half'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-on-surface">{product.rating}</span>
                    <span className="text-xs text-on-surface-variant">({product.reviews} Contractor Verified)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-on-surface">{product.title}</h1>
                <p className="text-sm text-on-surface-variant">{product.description}</p>

                {/* Pricing */}
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-primary tracking-tight">₹{product.price}</span>
                      <span className="text-xl text-on-surface-variant line-through">₹{product.originalPrice}</span>
                      <span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-0.5 rounded font-semibold">{product.discount}% OFF</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">Inclusive of all local GST taxes & weighbridge invoice</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-primary font-bold uppercase tracking-wide">B2B Wholesale Lot Available</span>
                    <p className="font-bold text-on-surface">
                      ₹{product.wholesalePrice} / bag <span className="text-sm font-normal text-on-surface-variant">(Min {product.wholesaleMinQty} bags)</span>
                    </p>
                    <p className="text-sm text-tertiary-container font-semibold">₹{product.bulkPrice} / ton (Bulk {product.bulkMinQty})</p>
                  </div>
                </div>

                {/* Pincode Check */}
                <div className="space-y-2">
                  <label className="text-sm text-on-surface font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">pin_drop</span>
                    Check Dispatch Availability & Transit Hubs
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-surface-container-lowest rounded-lg shadow-sm flex items-center px-4 py-2">
                      <span className="material-symbols-outlined text-outline text-[20px] mr-2">location_on</span>
                      <input
                        className="w-full bg-transparent border-0 outline-none text-sm text-on-surface"
                        placeholder="Enter delivery pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <button className="bg-surface-container-high hover:bg-surface-variant text-on-surface text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors whitespace-nowrap">
                      Check SLA
                    </button>
                    <button
                      onClick={handleAutoLocate}
                      className="bg-primary hover:bg-primary-container text-on-primary text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">my_location</span> Auto Locate
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary pt-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    In Stock at {product.location} & Greater Noida Central Corridors. Next-day dispatch guaranteed.
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="pt-3 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-on-surface font-semibold">Quantity (Bags):</span>
                      <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange('minus')}
                          className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-variant flex items-center justify-center font-bold text-on-surface transition-colors shadow-sm"
                        >
                          −
                        </button>
                        <input
                          className="w-14 text-center bg-transparent border-0 outline-none font-bold text-on-surface"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        />
                        <button
                          onClick={() => handleQuantityChange('plus')}
                          className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-variant flex items-center justify-center font-bold text-on-surface transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary bg-primary-fixed/40 px-3 py-1.5 rounded-full">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                      Ready Stock: {product.stock} Bags in {product.location}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_cart</span> Add to Sourcing Cart
                    </button>
                    <button
                      onClick={handleWhatsAppBooking}
                      className="w-full bg-primary-container hover:bg-primary text-on-primary py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span> Book via WhatsApp Desk
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowRFQModal(true)}
                      className="w-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-tertiary-container">request_quote</span>
                      Request Bulk Quotation (RFQ)
                    </button>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {isFavorite ? 'favorite' : 'favorite_border'}
                      </span>
                      Save to Project BoQ
                    </button>
                  </div>

                  {/* Escrow Note */}
                  <div className="bg-surface-container-low rounded-lg p-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified_user</span>
                    <p className="text-sm text-on-surface-variant">
                      <span className="font-bold text-on-surface">GharBazaar Escrow Handover:</span> Payment remains securely sequestered in nodal escrow and is settled with the merchant only after weighbridge digital scale certificate and intact delivery OTP are confirmed at your project site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface">Material Specification Matrix</h3>
                  <span className="text-xs text-outline uppercase tracking-wider">BIS IS:8042 standard</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="bg-surface-container-low p-3 rounded-lg">
                      <span className="text-xs text-on-surface-variant block capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-on-surface">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Applications */}
                <div className="pt-2 space-y-2">
                  <span className="text-sm text-on-surface font-semibold block">Recommended Site Applications:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, index) => (
                      <span key={index} className="bg-surface-container text-on-surface px-2.5 py-1 rounded-full text-xs">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seller & Reviews Section - Placeholder */}
          <div className="mt-10 text-center py-10 bg-surface-container-low rounded-xl">
            <p className="text-on-surface-variant">Seller information and reviews section will be loaded here</p>
          </div>
        </main>
      </div>

      {/* RFQ Modal */}
      {showRFQModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-xl relative space-y-4">
            <button
              onClick={() => setShowRFQModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary uppercase">Institutional Procurement</span>
              <h3 className="text-xl font-bold text-on-surface">Request Wholesale RFQ Quote</h3>
              <p className="text-sm text-on-surface-variant">
                For projects requiring &gt; 5 Metric Tons or recurring site supplies with custom logistics.
              </p>
            </div>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('RFQ Submitted!'); setShowRFQModal(false); }}>
              <div>
                <label className="text-xs text-on-surface font-semibold block mb-1">Company / Contractor Name</label>
                <input
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border-0 outline-none text-sm text-on-surface"
                  placeholder="e.g. Skyline Infrastructure Ltd."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-on-surface font-semibold block mb-1">Estimated Requirement</label>
                  <input
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border-0 outline-none text-sm text-on-surface"
                    placeholder="e.g. 500 Bags / 25 MT"
                  />
                </div>
                <div>
                  <label className="text-xs text-on-surface font-semibold block mb-1">Delivery Destination</label>
                  <input
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border-0 outline-none text-sm text-on-surface"
                    placeholder="City or Site Pin"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-on-surface font-semibold block mb-1">Mobile / WhatsApp Number</label>
                <input
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border-0 outline-none text-sm text-on-surface"
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                />
              </div>
              <div className="pt-2">
                <button
                  className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg text-sm font-bold shadow-sm transition-colors"
                  type="submit"
                >
                  Generate Formal Proforma Invoice
                </button>
              </div>
            </form>
            <p className="text-[11px] text-on-surface-variant text-center">
              GharBazaar Central B2B Desk responds with official vendor quotations within 2 hours.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
