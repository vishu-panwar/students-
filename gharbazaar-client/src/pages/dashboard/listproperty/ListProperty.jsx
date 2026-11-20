import { useState } from 'react';

export default function ListProperty() {
  const [currentChannel, setCurrentChannel] = useState('sell');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [boosterPlan, setBoosterPlan] = useState('1199');
  const [ownerManagementPlan, setOwnerManagementPlan] = useState('standard');
  const [rentCategory, setRentCategory] = useState('residential');
  const [formData, setFormData] = useState({
    ownerMobile: '98391 22840',
    ownerWhatsapp: '98391 22840',
    callingTime: 'Anytime (10:00 AM - 7:00 PM)',
    listingTitle: 'Ultra-Modern 3BHK Corner Penthouse with Braj View, Krishna Nagar',
    assetCategory: 'Residential Real Estate',
    subType: 'Penthouse / Duplex',
    reraNo: 'UPRERAAGT10294',
    possession: 'Ready to Move (Immediate)',
    rentTitle: 'Premium 2BHK Furnished Apartment with Balcony, Near GLA University',
    tenancyProfile: 'Family Preferred',
    noticePeriod: '30 Days (Standard Notice)',
    leaseDuration: '11-Month Standard Draft (Auto e-Sign)',
    materialName: 'UltraTech Super OPC 53 Grade High Performance Cement',
    materialCategory: 'Cement (OPC / PPC)',
    brand: 'UltraTech Cement Ltd.',
    grade: 'PPC 53 Grade - IS 12269 Certified',
    moq: '100',
    superBuiltUp: '1850',
    carpetArea: '1520',
    facing: 'North-East (Ishan Corner)',
    floor: '4th of 12 Floors',
    parking: '2 Reserved Basement Slots',
    furnishing: 'Semi-Furnished (Wardrobes &amp; Modular Kitchen)',
    roomSharing: 'Single Private Room',
    meals: 'Pure Vegetarian (Breakfast + Dinner)',
    curfew: '10:30 PM Curfew (Biometric Entry)',
    packaging: 'Per 50kg HDPE Moisture-Proof Bag',
    stockAvailability: '2,400 Bags in Godown',
    loading: 'Forklift Mechanized Loading Included',
    qualityCert: 'BIS IS:12269 / 2024 Lab Passed',
    salePrice: '88,00,000',
    bookingToken: '2,00,000',
    monthlyRent: '28,000',
    wholesalePrice: '385.00',
    deliveryRadius: 'Within 25 km of Godown (Express 24h)',
    dispatchLeadTime: 'Within 24 Hours (Immediate Fleet Dispatch)',
    freightCost: 'Free Delivery on Full Truck Load (500+ Bags)',
    streetAddress: 'Plot 42-B, Sector 8, Near Radha Madhav Mandir, Krishna Nagar',
    city: 'Mathura',
    pincode: '281004',
    zone: 'Krishna Nagar / Township Corridor'
  });

  const switchChannel = (channel) => {
    setCurrentChannel(channel);
    if (channel === 'rent') {
      adjustSecurityDepositRule();
    }
  };

  const adjustSecurityDepositRule = () => {
    const rent = parseFloat(formData.monthlyRent.replace(/,/g, '')) || 28000;
    let multiplier = 1.0;
    if (rentCategory === 'pg') {
      multiplier = 0.5;
    } else if (rentCategory === 'commercial') {
      multiplier = 1.5;
    }
    return Math.round(rent * multiplier);
  };

  const escrowDeposit = adjustSecurityDepositRule();

  const getDepositFormulaTag = () => {
    if (rentCategory === 'pg') return '50% 1st Month (PG / Hostel)';
    if (rentCategory === 'commercial') return '1.5 Months Rent (Commercial)';
    return '1 Month Rent (Residential)';
  };

  const triggerPublishSuccess = () => {
    if (!formData.ownerMobile || !formData.ownerMobile.trim()) {
      alert('Please enter the mandatory Owner / Representative Mobile Number for internal Deal Assist routing.');
      return;
    }
    alert("Listing published successfully into GharBazaar Verified Database!\n\n• Confidential Owner Phone shielded.\n• Trust Desk will conduct credential verification within 2 working hours.\n• Escrow & Deal Assist desk initiated.");
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex flex-col w-full">
      {/* TOP CONTEXT BANNER - Clean & Professional */}
      <div className="flex items-start justify-between gap-6 mb-6 pb-6 border-b border-outline-variant/10">
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-secondary mb-3">
            <span>Seller Workspace</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Listing Engine</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-medium">New Entry</span>
          </div>
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-on-surface mb-2">
            Unified Listing &amp; Catalog Portal
          </h1>
          <p className="text-sm text-secondary max-w-3xl">
            Seamlessly publish verified properties for outright sale, manage rentals &amp; PG accommodations with digital e-Agreements &amp; Escrow, or list bulk wholesale construction inventories.
          </p>
        </div>
        
        {/* Seller Trust Profile Pill - Clean */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-outline-variant/20 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-on-surface">Shree Krishna Properties &amp; Infra</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                GSTIN Active
              </span>
            </div>
            <p className="text-xs text-secondary">
              UPRERAAST19842 • Mathura Cluster (Zone 04)
            </p>
          </div>
        </div>
      </div>

      {/* MASTER CHANNEL SELECTOR - Clean Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Property Sale */}
          <button
            className={`text-left p-5 rounded-xl transition-all border ${
              currentChannel === 'sell' 
                ? 'bg-white border-primary shadow-sm' 
                : 'bg-white border-outline-variant/20 hover:border-outline-variant/40'
            }`}
            onClick={() => switchChannel('sell')}
            type="button"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentChannel === 'sell' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'
              }`}>
                <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                currentChannel === 'sell' ? 'bg-primary/10 text-primary' : 'bg-surface-container-low text-secondary'
              }`}>
                Channel 01
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-on-surface">Property Sale</h3>
                {currentChannel === 'sell' && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                )}
              </div>
              <p className="text-xs text-secondary leading-relaxed mb-3">
                Outright sale for Residential Villas, Apartments, Commercial Spaces, Industrial Sheds &amp; Freehold Plots.
              </p>
              <div className="flex items-center gap-3 text-xs text-secondary pt-3 border-t border-outline-variant/10">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">speed</span> 
                  Fast Track Boost
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">gavel</span> 
                  RERA Ready
                </span>
              </div>
            </div>
          </button>

          {/* Option 2: Rent & Co-Living */}
          <button
            className={`text-left p-5 rounded-xl transition-all border ${
              currentChannel === 'rent' 
                ? 'bg-white border-primary shadow-sm' 
                : 'bg-white border-outline-variant/20 hover:border-outline-variant/40'
            }`}
            onClick={() => switchChannel('rent')}
            type="button"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentChannel === 'rent' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'
              }`}>
                <span className="material-symbols-outlined text-[20px]">key</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                currentChannel === 'rent' ? 'bg-primary/10 text-primary' : 'bg-surface-container-low text-secondary'
              }`}>
                Channel 02
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-on-surface">Rent &amp; Co-Living</h3>
                {currentChannel === 'rent' && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                )}
              </div>
              <p className="text-xs text-secondary leading-relaxed mb-3">
                Flats, PGs, Independent Houses &amp; Commercial Leases with digital Aadhaar Agreements &amp; Escrow Security.
              </p>
              <div className="flex items-center gap-3 text-xs text-secondary pt-3 border-t border-outline-variant/10">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">shield_person</span> 
                  Escrow Deposit
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">contract</span> 
                  ₹200 e-Agreement
                </span>
              </div>
            </div>
          </button>

          {/* Option 3: Wholesale Materials */}
          <button
            className={`text-left p-5 rounded-xl transition-all border ${
              currentChannel === 'products' 
                ? 'bg-white border-primary shadow-sm' 
                : 'bg-white border-outline-variant/20 hover:border-outline-variant/40'
            }`}
            onClick={() => switchChannel('products')}
            type="button"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentChannel === 'products' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'
              }`}>
                <span className="material-symbols-outlined text-[20px]">pallet</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                currentChannel === 'products' ? 'bg-primary/10 text-primary' : 'bg-surface-container-low text-secondary'
              }`}>
                Channel 03
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-on-surface">Wholesale Materials</h3>
                {currentChannel === 'products' && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                )}
              </div>
              <p className="text-xs text-secondary leading-relaxed mb-3">
                Bulk Cement, TMT Steel, Red Kiln Bricks, River Sand &amp; Tiles with direct Vendor-Managed Site Logistics.
              </p>
              <div className="flex items-center gap-3 text-xs text-secondary pt-3 border-t border-outline-variant/10">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">percent</span> 
                  5% Platform Fee
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">local_shipping</span> 
                  Vendor Delivery
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* DYNAMIC WORKBENCH */}
      <form className="flex flex-col gap-6 pb-16" onSubmit={(e) => e.preventDefault()}>
        {/* 0. OWNER CONTACT */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header - Clean & Minimal */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-on-surface">
                    Owner Verification &amp; Mandatory Deal Assist Routing
                  </h2>
                  <p className="text-xs text-secondary mt-0.5">
                    Required internal contact for verified buyer matching, inspection passes, and deal closure desk
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/5 border border-error/20">
                <span className="material-symbols-outlined text-[14px] text-error">lock</span>
                <span className="text-xs font-medium text-error">Strictly Confidential</span>
              </div>
            </div>
          </div>
          
          {/* Confidential Banner - Minimal */}
          <div className="mx-6 mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">shield</span>
              <div className="text-xs text-on-surface/80 leading-relaxed">
                <span className="font-semibold text-primary">Privacy Shield Active:</span> Your personal mobile number is never published on the GharBazaar app or website. It is kept strictly for internal Deal Assist coordination.
              </div>
            </div>
          </div>
          
          {/* Form Fields Grid - Clean & Spacious */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Owner Mobile */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-on-surface mb-2">
                Owner / Primary Representative Mobile Number <span className="text-error">*</span>
              </label>
              <div className="flex rounded-lg border border-outline-variant/30 overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="inline-flex items-center px-3 bg-surface-container-low text-secondary text-sm font-medium border-r border-outline-variant/30">
                  +91
                </span>
                <input
                  className="flex-1 h-11 px-3 bg-white text-on-surface text-sm focus:outline-none"
                  id="ownerMobile"
                  placeholder="98765 43210"
                  required
                  type="tel"
                  value={formData.ownerMobile}
                  onChange={(e) => updateFormData('ownerMobile', e.target.value)}
                />
              </div>
              <p className="text-xs text-secondary mt-1.5">Direct owner line for KYC verification</p>
            </div>

            {/* WhatsApp */}
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-on-surface mb-2">
                Verified WhatsApp Desk <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <div className="flex rounded-lg border border-outline-variant/30 overflow-hidden focus-within:border-[#25D366] focus-within:ring-1 focus-within:ring-[#25D366] transition-all">
                <span className="inline-flex items-center px-3 bg-surface-container-low border-r border-outline-variant/30">
                  <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                </span>
                <input
                  className="flex-1 h-11 px-3 bg-white text-on-surface text-sm focus:outline-none"
                  placeholder="Same as primary number"
                  type="tel"
                  value={formData.ownerWhatsapp}
                  onChange={(e) => updateFormData('ownerWhatsapp', e.target.value)}
                />
              </div>
              <p className="text-xs text-secondary mt-1.5">Receive qualified visit requests</p>
            </div>

            {/* Calling Time */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-on-surface mb-2">
                Preferred Calling Time
              </label>
              <div className="relative">
                <select
                  className="w-full h-11 px-3 pr-10 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                  value={formData.callingTime}
                  onChange={(e) => updateFormData('callingTime', e.target.value)}
                >
                  <option>Anytime (10 AM - 7 PM)</option>
                  <option>Morning (10 AM - 1 PM)</option>
                  <option>Afternoon (2 PM - 5 PM)</option>
                  <option>Evening (5 PM - 8 PM)</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-secondary pointer-events-none">
                  expand_more
                </span>
              </div>
              <p className="text-xs text-secondary mt-1.5">Executive calling slot</p>
            </div>
          </div>
        </div>

        {/* 1. PRIMARY LISTING TAXONOMY */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-on-surface">Primary Listing Taxonomy</h2>
                  <p className="text-xs text-secondary mt-0.5">Specify the public identity, transaction scope and regulatory tags</p>
                </div>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">sell</span>
                <span>
                  {currentChannel === 'sell' && 'Channel 01: Property Sale Active'}
                  {currentChannel === 'rent' && 'Channel 02: Rent & Co-Living Active'}
                  {currentChannel === 'products' && 'Channel 03: Wholesale Materials Active'}
                </span>
              </span>
            </div>
          </div>

          {/* TAXONOMY SELL */}
          {currentChannel === 'sell' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Listing Title */}
              <div className="md:col-span-8">
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Listing Title / Headline <span className="text-error">*</span>
                </label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g., Ultra-Modern 3BHK Corner Penthouse with Braj View, Krishna Nagar"
                  type="text"
                  value={formData.listingTitle}
                  onChange={(e) => updateFormData('listingTitle', e.target.value)}
                />
                <p className="text-xs text-secondary mt-1.5">A clear headline attracts up to 38% more verified buyer inquiries.</p>
              </div>
              
              {/* Asset Category */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Asset Category <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full h-11 px-3 pr-10 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    value={formData.assetCategory}
                    onChange={(e) => updateFormData('assetCategory', e.target.value)}
                  >
                    <option>Residential Real Estate</option>
                    <option>Commercial Space &amp; Offices</option>
                    <option>Industrial Shed &amp; Warehousing</option>
                    <option>Agricultural / Freehold Plot</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-secondary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              
              {/* Sub-Type */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Sub-Type</label>
                <div className="relative">
                  <select
                    className="w-full h-11 px-3 pr-10 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    value={formData.subType}
                    onChange={(e) => updateFormData('subType', e.target.value)}
                  >
                    <option>Penthouse / Duplex</option>
                    <option>3BHK Apartment</option>
                    <option>Gated Villa</option>
                    <option>SCO Commercial Plot</option>
                    <option>Industrial Warehouse</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-secondary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              
              {/* RERA No */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">RERA Sanction / Registration No.</label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. UPRERAAGT10294"
                  type="text"
                  value={formData.reraNo}
                  onChange={(e) => updateFormData('reraNo', e.target.value)}
                />
              </div>
              
              {/* Possession */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Possession / Construction Stage</label>
                <div className="relative">
                  <select
                    className="w-full h-11 px-3 pr-10 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    value={formData.possession}
                    onChange={(e) => updateFormData('possession', e.target.value)}
                  >
                    <option>Ready to Move (Immediate)</option>
                    <option>Under Construction (Ready in 3 Months)</option>
                    <option>Under Construction (Ready in 12 Months)</option>
                    <option>New Launch / Booking Phase</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-secondary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAXONOMY RENT */}
          {currentChannel === 'rent' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-1">
                  <span>Rent Listing Title / Unit Headline</span>
                  <span className="text-error">*</span>
                </label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm placeholder:text-secondary/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g., Premium 2BHK Furnished Apartment with Balcony, Near GLA University"
                  type="text"
                  value={formData.rentTitle}
                  onChange={(e) => updateFormData('rentTitle', e.target.value)}
                />
                <span className="text-xs text-secondary mt-1">Specify furnishing and proximity to major hubs or universities.</span>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-1">
                  <span>Rental Category</span>
                  <span className="text-error">*</span>
                </label>
                <select
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={rentCategory}
                  onChange={(e) => setRentCategory(e.target.value)}
                >
                  <option value="residential">Residential Flat / House (1 Mo. Deposit)</option>
                  <option value="pg">PG / Student Hostel (0.5 Mo. Deposit)</option>
                  <option value="commercial">Commercial Office / Shop (1.5 Mo. Deposit)</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Preferred Tenancy Profile</label>
                <select
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={formData.tenancyProfile}
                  onChange={(e) => updateFormData('tenancyProfile', e.target.value)}
                >
                  <option>Family Preferred</option>
                  <option>Bachelors (Male / Female)</option>
                  <option>Students &amp; Interns</option>
                  <option>Co-ed / Any Working Professional</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Notice Period</label>
                <select
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={formData.noticePeriod}
                  onChange={(e) => updateFormData('noticePeriod', e.target.value)}
                >
                  <option>30 Days (Standard Notice)</option>
                  <option>15 Days (Short Term / Flexible PG)</option>
                  <option>60 Days (Commercial Lease Standard)</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Lease Duration Agreement</label>
                <select
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={formData.leaseDuration}
                  onChange={(e) => updateFormData('leaseDuration', e.target.value)}
                >
                  <option>11-Month Standard Draft (Auto e-Sign)</option>
                  <option>22-Month Renewable Tenancy</option>
                  <option>3 to 5-Year Multi-Year Commercial Lease</option>
                </select>
              </div>
            </div>
          )}

          {/* TAXONOMY PRODUCTS */}
          {currentChannel === 'products' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-1">
                  <span>Material / Product Name</span>
                  <span className="text-error">*</span>
                </label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm placeholder:text-secondary/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. UltraTech Super OPC 53 Grade High Performance Cement"
                  type="text"
                  value={formData.materialName}
                  onChange={(e) => updateFormData('materialName', e.target.value)}
                />
                <span className="text-xs text-secondary mt-1">Accurate manufacturer names improve wholesale quote conversion.</span>
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-1">
                  <span>Material Category</span>
                  <span className="text-error">*</span>
                </label>
                <select
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={formData.materialCategory}
                  onChange={(e) => updateFormData('materialCategory', e.target.value)}
                >
                  <option>Cement (OPC / PPC)</option>
                  <option>TMT Steel Rebars</option>
                  <option>Red Kiln Bricks &amp; AAC Blocks</option>
                  <option>Yamuna River Sand &amp; Aggregates</option>
                  <option>Vitrified Floor Tiles &amp; Ceramics</option>
                  <option>Plumbing &amp; Sanitary Wholesale</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Brand / Manufacturer</label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. UltraTech, Tata Tiscon, Jindal Panther"
                  type="text"
                  value={formData.brand}
                  onChange={(e) => updateFormData('brand', e.target.value)}
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Grade / Technical Specification</label>
                <input
                  className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. PPC 53 Grade, Fe 550D Rebars, Wire Cut 9-inch"
                  type="text"
                  value={formData.grade}
                  onChange={(e) => updateFormData('grade', e.target.value)}
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-on-surface mb-2">Minimum Order Quantity (MOQ)</label>
                <div className="relative">
                  <input
                    className="w-full h-11 px-3 pr-24 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="50"
                    type="number"
                    value={formData.moq}
                    onChange={(e) => updateFormData('moq', e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">50kg Bags</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. SPATIAL / MATERIAL SPECIFICATIONS */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h2 className="text-base font-semibold text-on-surface">
                  {currentChannel === 'products' ? 'Wholesale Material Specifications' : 
                   currentChannel === 'rent' ? 'Rental & Tenancy Spatial Details' : 
                   'Property Spatial Specifications'}
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  {currentChannel === 'products' ? 'Grade, packaging unit, minimum order quantities & depot dispatch' : 
                   currentChannel === 'rent' ? 'Furnishing, PG bed configurations, meal options & house rules' : 
                   'Carpet area, rooms, vastu orientation and structural elements'}
                </p>
              </div>
            </div>
          </div>

          {/* PROPERTY SPECS (SELL & RENT) */}
          {currentChannel !== 'products' && (
            <div className="p-6">
              {/* Bedrooms & Bathrooms Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Bedrooms</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, '4+'].map((num) => (
                      <button
                        key={num}
                        className={`flex-1 h-10 rounded-lg font-medium text-sm transition-all ${
                          bedrooms === (num === '4+' ? 4 : num) ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                        type="button"
                        onClick={() => setBedrooms(num === '4+' ? 4 : num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Bathrooms</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className={`flex-1 h-10 rounded-lg font-medium text-sm transition-all ${
                          bathrooms === num ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                        type="button"
                        onClick={() => setBathrooms(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Super Built-up Area */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Super Built-up Area</label>
                  <div className="relative">
                    <input
                      className="w-full h-11 px-3 pr-14 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="1850"
                      type="number"
                      value={formData.superBuiltUp}
                      onChange={(e) => updateFormData('superBuiltUp', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">sq.ft</span>
                  </div>
                </div>
                
                {/* Carpet Area */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Carpet Area</label>
                  <div className="relative">
                    <input
                      className="w-full h-11 px-3 pr-14 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="1520"
                      type="number"
                      value={formData.carpetArea}
                      onChange={(e) => updateFormData('carpetArea', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">sq.ft</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Facing / Vastu</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.facing}
                    onChange={(e) => updateFormData('facing', e.target.value)}
                  >
                    <option>North-East (Ishan Corner)</option>
                    <option>East Facing (Surya Mandalam)</option>
                    <option>North Facing (Kuber Corner)</option>
                    <option>West Facing</option>
                    <option>South Facing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Floor Number</label>
                  <input
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="4th of 12 Floors"
                    type="text"
                    value={formData.floor}
                    onChange={(e) => updateFormData('floor', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Covered Parking</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.parking}
                    onChange={(e) => updateFormData('parking', e.target.value)}
                  >
                    <option>2 Reserved Basement Slots</option>
                    <option>1 Covered Ground Slot</option>
                    <option>Open Dedicated Stilt</option>
                    <option>None / Street Parking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Furnishing Grade</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.furnishing}
                    onChange={(e) => updateFormData('furnishing', e.target.value)}
                  >
                    <option>Semi-Furnished (Wardrobes &amp; Modular Kitchen)</option>
                    <option>Fully Furnished (Luxury Grade)</option>
                    <option>Raw / Bare Shell</option>
                  </select>
                </div>
              </div>
              {/* PG Extra Specs */}
              {currentChannel === 'rent' && (
                <div className="mt-5 p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-lg text-primary">bed</span>
                    <span className="text-sm font-semibold text-primary">Co-Living &amp; PG Accommodation Provisions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-2">Room Sharing Type</label>
                      <select
                        className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={formData.roomSharing}
                        onChange={(e) => updateFormData('roomSharing', e.target.value)}
                      >
                        <option>Single Private Room</option>
                        <option>Twin Sharing (2 Beds)</option>
                        <option>Triple Sharing (3 Beds)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-2">Meal / Mess Inclusions</label>
                      <select
                        className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={formData.meals}
                        onChange={(e) => updateFormData('meals', e.target.value)}
                      >
                        <option>Pure Vegetarian (Breakfast + Dinner)</option>
                        <option>3 Times Meal (Veg + Egg Sundays)</option>
                        <option>Self-Cooking Kitchen Allowed</option>
                        <option>No Meals Included</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-2">Gate Curfew &amp; Visitors</label>
                      <select
                        className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={formData.curfew}
                        onChange={(e) => updateFormData('curfew', e.target.value)}
                      >
                        <option>10:30 PM Curfew (Biometric Entry)</option>
                        <option>Flexible 24x7 Keycard Access</option>
                        <option>Strict 10:00 PM (Female Only PG)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PRODUCT SPECS */}
          {currentChannel === 'products' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Packaging / Unit of Sale</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.packaging}
                    onChange={(e) => updateFormData('packaging', e.target.value)}
                  >
                    <option>Per 50kg HDPE Moisture-Proof Bag</option>
                    <option>Per Metric Ton (MT - 20 Bags)</option>
                    <option>Per 1,000 Bricks Trolley</option>
                    <option>Per Cubic Foot (cft)</option>
                    <option>Per Box (16 sq.ft Tiles)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Godown Stock Availability</label>
                  <input
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="e.g. 1,500 Bags Ready"
                    type="text"
                    value={formData.stockAvailability}
                    onChange={(e) => updateFormData('stockAvailability', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Loading &amp; Pallet Handling</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.loading}
                    onChange={(e) => updateFormData('loading', e.target.value)}
                  >
                    <option>Forklift Mechanized Loading Included</option>
                    <option>Manual Labor Loading (Included)</option>
                    <option>Unloading at Site Extra (Vendor Fleet)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Standard Batch Quality Cert</label>
                  <input
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="e.g. IS:12269:2013"
                    type="text"
                    value={formData.qualityCert}
                    onChange={(e) => updateFormData('qualityCert', e.target.value)}
                  />
                </div>
              </div>
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-xl">warehouse</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-on-surface">Dispatch Depot &amp; Vendor Godown Address</span>
                    <span className="block text-xs text-secondary mt-0.5">Shree Krishna Central Godown, Mathura-Vrindavan Bypass, NH-19 Plot 12</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white text-on-surface text-sm font-medium shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/30" type="button">
                  Attach Mill Test Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. PRICING */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-on-surface">
                    {currentChannel === 'products' ? 'Wholesale Pricing & 5% Platform Fee Commercials' : 
                     currentChannel === 'rent' ? 'Rental Pricing, Escrow Deposit & Management' : 
                     'Pricing, Revenue & Platform Commercials'}
                  </h2>
                  <p className="text-xs text-secondary mt-0.5">
                    {currentChannel === 'products' ? 'Vendor-managed direct site dispatch with 5% marketplace coordination fee' : 
                     currentChannel === 'rent' ? 'GharBazaar escrow-protected security deposit and dispute resolution rules' : 
                     'Configured in accordance with official GharBazaar merchant fee schedule'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium bg-tertiary/5 text-tertiary px-3 py-1.5 rounded-lg border border-tertiary/20">
                <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                <span>GST 18.0% separate from platform revenue</span>
              </div>
            </div>
          </div>

          {/* PRICING SELL */}
          {currentChannel === 'sell' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Expected Outright Price
                    <span className="text-primary font-semibold ml-2">₹ 4,756 / sq.ft</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-semibold">₹</span>
                    <input
                      className="w-full h-11 pl-8 pr-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface font-semibold text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={formData.salePrice}
                      onChange={(e) => updateFormData('salePrice', e.target.value)}
                    />
                  </div>
                  <span className="text-xs text-secondary mt-1">Eighty-Eight Lakh Rupees (Negotiable)</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Booking Token Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-semibold">₹</span>
                    <input
                      className="w-full h-11 pl-8 pr-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface font-semibold text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={formData.bookingToken}
                      onChange={(e) => updateFormData('bookingToken', e.target.value)}
                    />
                  </div>
                  <span className="text-xs text-secondary mt-1">Escrow protected via GharBazaar Trust Desk</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Platform Brokerage</label>
                  <div className="h-11 px-3 bg-white border border-outline-variant/30 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">0.0% Direct Seller Rate</span>
                    <span className="text-xs font-semibold text-primary">Zero Commission</span>
                  </div>
                  <span className="text-xs text-secondary mt-1">Direct buyer connect with phone shielding</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/10">
                <label className="block text-sm font-semibold text-on-surface mb-4">Select Listing Booster Plan (Optional)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <label className={`relative p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    boosterPlan === '599' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="sellBooster"
                      type="radio"
                      value="599"
                      checked={boosterPlan === '599'}
                      onChange={(e) => setBoosterPlan(e.target.value)}
                    />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-on-surface">Listing Basic</span>
                        <span className="text-sm font-bold text-primary">₹599.00</span>
                      </div>
                      <p className="text-xs text-secondary mb-3">1 month paid booster plan on search index</p>
                      <div className="text-xs text-secondary">
                        +18% GST (₹107.82) • Commission 0.0%
                      </div>
                    </div>
                    <div className={`mt-4 w-5 h-5 rounded-full self-end flex items-center justify-center transition-all ${
                      boosterPlan === '599' ? 'bg-primary' : 'border-2 border-outline-variant/40'
                    }`}>
                      {boosterPlan === '599' && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                    </div>
                  </label>
                  <label className={`relative p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    boosterPlan === '1199' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="sellBooster"
                      type="radio"
                      value="1199"
                      checked={boosterPlan === '1199'}
                      onChange={(e) => setBoosterPlan(e.target.value)}
                    />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-on-surface">Listing Standard</span>
                        <span className="text-sm font-bold text-primary">₹1,199.00</span>
                      </div>
                      <p className="text-xs text-secondary mb-3">2 months paid booster plan with WhatsApp alert push</p>
                      <div className="text-xs text-secondary">
                        +18% GST (₹215.82) • Popular Seller Choice
                      </div>
                    </div>
                    <div className={`mt-4 w-5 h-5 rounded-full self-end flex items-center justify-center transition-all ${
                      boosterPlan === '1199' ? 'bg-primary' : 'border-2 border-outline-variant/40'
                    }`}>
                      {boosterPlan === '1199' && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                    </div>
                  </label>
                  <label className={`relative p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    boosterPlan === '1799' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="sellBooster"
                      type="radio"
                      value="1799"
                      checked={boosterPlan === '1799'}
                      onChange={(e) => setBoosterPlan(e.target.value)}
                    />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-on-surface">Listing Premium</span>
                        <span className="text-sm font-bold text-primary">₹1,799.00</span>
                      </div>
                      <p className="text-xs text-secondary mb-3">3 months paid booster with dedicated Trust Desk Rep</p>
                      <div className="text-xs text-secondary">
                        +18% GST (₹323.82) • Highest Leads
                      </div>
                    </div>
                    <div className={`mt-4 w-5 h-5 rounded-full self-end flex items-center justify-center transition-all ${
                      boosterPlan === '1799' ? 'bg-primary' : 'border-2 border-outline-variant/40'
                    }`}>
                      {boosterPlan === '1799' && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PRICING RENT */}
          {currentChannel === 'rent' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Target Monthly Rent</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-semibold">₹</span>
                    <input
                      className="w-full h-11 pl-8 pr-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface font-semibold text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={formData.monthlyRent}
                      onChange={(e) => updateFormData('monthlyRent', e.target.value)}
                    />
                  </div>
                  <span className="text-xs text-secondary mt-1">Per calendar month (exclusive of metered electricity &amp; water)</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2 flex items-center justify-between">
                    <span>GharBazaar Escrow Security Deposit</span>
                    <span className="text-xs text-primary font-semibold">{getDepositFormulaTag()}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-semibold">₹</span>
                    <input
                      className="w-full h-11 pl-8 pr-32 bg-primary/5 border border-primary/20 rounded-lg text-on-surface font-bold text-base focus:outline-none"
                      readOnly
                      type="text"
                      value={escrowDeposit.toLocaleString('en-IN')}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">lock</span> Escrow Held
                    </span>
                  </div>
                  <span className="text-xs text-secondary mt-1">Auto-calculated based on property category &amp; held in RBI-compliant escrow.</span>
                </div>
              </div>
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">verified_user</span>
                    </div>
                    <h4 className="text-sm font-semibold text-on-surface">
                      GharBazaar Escrow Protected Security Deposit (100% Refundable to Tenant)
                    </h4>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary text-white font-semibold">
                    Zero Landlord Withholding Risk
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-white rounded-lg border border-outline-variant/20 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">bed</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">PG / Co-Living Hostels</p>
                      <p className="text-lg font-bold text-primary">50%</p>
                      <p className="text-xs text-secondary">of 1st Month's Rent as deposit</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-primary/40 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">apartment</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Residential Flats &amp; Villas</p>
                      <p className="text-lg font-bold text-primary">1 Month</p>
                      <p className="text-xs text-secondary">Rent as refundable security</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-outline-variant/20 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">storefront</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Commercial Shops &amp; SCOs</p>
                      <p className="text-lg font-bold text-primary">1.5 Months</p>
                      <p className="text-xs text-secondary">Rent as security deposit</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white text-xs text-secondary border border-outline-variant/20 flex items-start gap-2">
                  <span className="material-symbols-outlined text-lg text-primary flex-shrink-0 mt-0.5">gavel</span>
                  <p>
                    <strong className="text-on-surface font-semibold">GharBazaar Neutral Mediation &amp; Dispute Protection:</strong>
                    Security money is held safely by GharBazaar in trust escrow for dispute resolution. If any property damage, abrupt notice breach, or unpaid electricity/water utility dispute occurs upon checkout, GharBazaar physically inspects the premises, mediates impartially, and fairly settles legitimate landlord deductions. If the tenancy completes smoothly without disputes, <strong className="text-primary font-semibold">100% of the deposit is refunded directly to the tenant's bank account within 24 hours</strong>.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Official Owner Management Rate Card</h3>
                    <p className="text-xs text-secondary">Select property onboarding and management supervision package</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-surface-container-low text-secondary">Ref: Rate Card v4.2</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <label className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    ownerManagementPlan === 'activation' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="ownerManagementPlan"
                      type="radio"
                      value="activation"
                      checked={ownerManagementPlan === 'activation'}
                      onChange={(e) => setOwnerManagementPlan(e.target.value)}
                    />
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface-container-low text-secondary uppercase font-semibold">One-time Fee</span>
                      <h4 className="text-sm font-semibold text-on-surface mt-2">Owner Activation</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-on-surface">₹999.00</span>
                        <span className="text-xs text-secondary">+ 18% GST</span>
                      </div>
                      <div className="mt-3 text-xs text-secondary flex flex-col gap-1">
                        <span>• Commission Rate: <strong className="text-on-surface">0.0%</strong></span>
                        <span>• Full KYC tenant background verification</span>
                        <span>• Direct rent collection by owner</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-primary font-semibold flex items-center gap-1">
                      <span>Select Activation</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </label>
                  <label className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between relative border-2 ${
                    ownerManagementPlan === 'standard' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="ownerManagementPlan"
                      type="radio"
                      value="standard"
                      checked={ownerManagementPlan === 'standard'}
                      onChange={(e) => setOwnerManagementPlan(e.target.value)}
                    />
                    {ownerManagementPlan === 'standard' && (
                      <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-semibold">
                        Recommended
                      </div>
                    )}
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary uppercase font-semibold">Below ₹60,000 Rent</span>
                      <h4 className="text-sm font-semibold text-on-surface mt-2">Owner Management Standard</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-on-surface">₹0.00 Base</span>
                        <span className="text-xs text-secondary">+ 10.0% Comm.</span>
                      </div>
                      <div className="mt-3 text-xs text-secondary flex flex-col gap-1">
                        <span>• Commission Rate: <strong className="text-on-surface">10.0%</strong> of rent</span>
                        <span>• End-to-end tenant rent servicing</span>
                        <span>• On-demand repair &amp; plumbing desk</span>
                        <span>• Escrow deposit mediation included</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-primary font-semibold flex items-center gap-1">
                      <span>Selected Plan</span>
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    </div>
                  </label>
                  <label className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    ownerManagementPlan === 'premium_plus' ? 'border-primary bg-primary/5' : 'border-outline-variant/20 bg-white hover:border-outline-variant/40'
                  }`}>
                    <input
                      className="sr-only"
                      name="ownerManagementPlan"
                      type="radio"
                      value="premium_plus"
                      checked={ownerManagementPlan === 'premium_plus'}
                      onChange={(e) => setOwnerManagementPlan(e.target.value)}
                    />
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface-container-low text-secondary uppercase font-semibold">Above ₹60,000 Rent</span>
                      <h4 className="text-sm font-semibold text-on-surface mt-2">Management Premium Plus</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-on-surface">₹3,999.00</span>
                        <span className="text-xs text-secondary">+ 2.0% Comm.</span>
                      </div>
                      <div className="mt-3 text-xs text-secondary flex flex-col gap-1">
                        <span>• Commission Rate: <strong className="text-on-surface">2.0%</strong></span>
                        <span>• Dedicated estate concierge officer</span>
                        <span>• Quarterly audited physical inspections</span>
                        <span>• GST 18% additional on base &amp; comm.</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-secondary font-semibold flex items-center gap-1">
                      <span>Select High-Yield</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PRICING PRODUCTS */}
          {currentChannel === 'products' && (
            <div className="p-6">
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                  </div>
                  <h4 className="text-sm font-semibold text-on-surface">
                    Vendor-Managed Direct Site Delivery &amp; Logistics Policy
                  </h4>
                </div>
                <p className="text-xs text-secondary">
                  <strong className="text-on-surface font-semibold">GharBazaar does NOT supply, stock, or haul physical materials to customer construction sites.</strong> All logistics, vehicular transportation, driver transit e-Way bills, loading/unloading, and on-site delivery are completely fulfilled by the registered Vendor / Merchant through their own private fleet or dedicated transport partners.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Wholesale Unit Price (Ex-Godown)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-semibold">₹</span>
                    <input
                      className="w-full h-11 pl-8 pr-16 bg-white border border-outline-variant/30 rounded-lg text-on-surface font-semibold text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={formData.wholesalePrice}
                      onChange={(e) => updateFormData('wholesalePrice', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">/ Bag</span>
                  </div>
                  <span className="text-xs text-secondary mt-1">Base rate excluding transport freight charges</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">GharBazaar Marketplace Platform Fee</label>
                  <div className="h-11 px-3 bg-white border border-outline-variant/30 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">Flat 5.0% Coordination Fee</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Digital Escrow</span>
                  </div>
                  <span className="text-xs text-secondary mt-1">Covers matchmaking, digital billing escrow &amp; delivery confirmation</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Vendor Delivery Radius</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.deliveryRadius}
                    onChange={(e) => updateFormData('deliveryRadius', e.target.value)}
                  >
                    <option>Within 25 km of Godown (Express 24h)</option>
                    <option>Within 50 km (Mathura, Agra, Hathras)</option>
                    <option>Regional NCR &amp; Western UP (48-72h)</option>
                    <option>Customer Pickup Only (Ex-Godown Depot)</option>
                  </select>
                  <span className="text-xs text-secondary mt-1">Vendor direct fleet delivery coverage</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Estimated Dispatch Lead Time</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.dispatchLeadTime}
                    onChange={(e) => updateFormData('dispatchLeadTime', e.target.value)}
                  >
                    <option>Within 24 Hours (Immediate Fleet Dispatch)</option>
                    <option>Within 24-48 Hours (Scheduled Batch Delivery)</option>
                    <option>Custom Bulk Pre-order (3 to 5 Days)</option>
                  </select>
                  <span className="text-xs text-secondary mt-1">Promised timeline to unload materials at buyer's foundation site</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Delivery Transport Freight Cost</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.freightCost}
                    onChange={(e) => updateFormData('freightCost', e.target.value)}
                  >
                    <option>Free Delivery on Full Truck Load (500+ Bags)</option>
                    <option>Fixed Flat Rate (₹15 / Bag Freight)</option>
                    <option>At Actuals (Billed directly to buyer upon delivery)</option>
                  </select>
                  <span className="text-xs text-secondary mt-1">Transparent logistics cost billed on merchant dispatch invoice</span>
                </div>
              </div>
              <div className="mt-5 p-5 bg-tertiary/5 rounded-xl border border-tertiary/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-xl text-tertiary mt-0.5">info</span>
                <div className="text-xs text-secondary">
                  <strong className="text-on-surface">GharBazaar 5% Marketplace Platform Fee Role:</strong> GharBazaar facilitates the end-to-end digital transaction: publishing inventory, routing verified contractor quotes, collecting advance payments in secure escrow, digital GPS tracking of delivery confirmations, and mediating quality batch disputes. The vendor directly coordinates and executes the site hauling. GharBazaar retains 5% of order value (+ 18% GST on fee).
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. DIGITAL RENTAL AGREEMENT (RENT ONLY) */}
        {currentChannel === 'rent' && (
          <div className="bg-white rounded-xl border border-outline-variant/20">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-outline-variant/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-on-surface">Digital 11-Month Rental e-Agreement Protocol</h2>
                    <p className="text-xs text-secondary mt-0.5">Standard legally enforceable agreement backed by Aadhaar e-Sign</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary rounded-lg text-xs font-semibold border border-primary/20">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  ₹200.00 / Agreement Fee
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <span className="material-symbols-outlined text-lg">fingerprint</span>
                    <span className="text-sm">Aadhaar e-KYC Enforced</span>
                  </div>
                  <p className="text-xs text-secondary">
                    Prospective tenant must complete UIDAI biometric or OTP verification prior to key handover.
                  </p>
                </div>
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <span className="material-symbols-outlined text-lg">gavel</span>
                    <span className="text-sm">UP Urban Tenancy Act 2021</span>
                  </div>
                  <p className="text-xs text-secondary">
                    Draft includes legally verified eviction terms, standard 5% escalation clause, and lock-in period.
                  </p>
                </div>
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <span className="material-symbols-outlined text-lg">electric_meter</span>
                    <span className="text-sm">Metered Utility Settlement</span>
                  </div>
                  <p className="text-xs text-secondary">
                    Default clause for sub-meter readings: ₹9.00/unit power and maintenance charges clear cutoff.
                  </p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input defaultChecked className="w-5 h-5 rounded text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm text-on-surface">
                    Auto-generate GharBazaar standard e-Agreement on successful tenant escrow deposit match.
                  </span>
                </label>
                <button className="text-xs text-primary hover:underline flex items-center gap-1 font-medium" type="button" onClick={() => alert('Viewing GharBazaar Legal Standard 11-Month Rental Draft (Bilingual Hindi/English)')}>
                  <span>Preview Agreement Draft</span>
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. LOCATION (Dynamic numbering: 4 for sell/products, 5 for rent) */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{currentChannel === 'rent' ? '5' : '4'}</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-on-surface">
                    {currentChannel === 'products' ? 'Vendor Godown & Dispatch Depot Mapping' : 'Location & Dispatch Cadastral Mapping'}
                  </h2>
                  <p className="text-xs text-secondary mt-0.5">
                    {currentChannel === 'products' ? 'Origin facility location for fleet routing and dispatch coverage' : 'Exact geocode pins ensure verified site-visit navigation and vendor dispatch logistics'}
                  </p>
                </div>
              </div>
              <span className="text-xs text-primary font-medium flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-sm">my_location</span>
                GPS: 27.4924° N, 77.6737° E
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Street Address / Landmark</label>
                  <input
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    type="text"
                    placeholder="Plot 42-B, Sector B, Near Radha Mandir"
                    value={formData.streetAddress}
                    onChange={(e) => updateFormData('streetAddress', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">City / Tehsils</label>
                    <input
                      className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      placeholder="Mathura"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Postal PIN Code</label>
                    <input
                      className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      placeholder="281001"
                      value={formData.pincode}
                      onChange={(e) => updateFormData('pincode', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Zone / Micro-Market</label>
                  <select
                    className="w-full h-11 px-3 bg-white border border-outline-variant/30 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={formData.zone}
                    onChange={(e) => updateFormData('zone', e.target.value)}
                  >
                    <option>Krishna Nagar / Township Corridor</option>
                    <option>NH-19 Expressway Hub</option>
                    <option>Vrindavan Parikrama Marg</option>
                    <option>Refinery Township Sector</option>
                  </select>
                </div>
              </div>
              <div className="md:col-span-6">
                <div className="w-full h-full min-h-[280px] rounded-xl bg-surface-container-low relative overflow-hidden flex flex-col justify-between p-4 border border-outline-variant/30" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUdeCRF6zqVLti25jiY8Cq_KaRUS2uw1OkD9U5c_C6Ocw8o3C320fcav6E-qH5fkyyUIhTdPguQ5gzCbzZdUVuxnFr8ScjX9MyF5p7QSbFhqHWxyKvLNBp_jdLulYqJrAjtjZlHqugj319ryRTDoZmx1H-1ul5GMqDk21Oqx-RhHgwGFL2yaflBTmBtoXEyB85SJo3V0LJIhonjTl7svDZkTwp9HdqxBYAq-v9r_I')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                  <div className="self-start px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur text-xs font-semibold text-on-surface flex items-center gap-1.5 shadow-sm border border-outline-variant/20">
                    <span className="material-symbols-outlined text-sm text-primary">pin_drop</span>
                    <span>Cadastral Plot Verified</span>
                  </div>
                  <button className="self-end px-4 py-2 rounded-lg bg-surface/90 hover:bg-surface text-on-surface text-xs font-medium backdrop-blur shadow-sm border border-outline-variant/30 transition-colors" type="button">
                    Click to refine precision marker
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. MEDIA UPLOAD (Dynamic numbering: 5 for sell/products, 6 for rent) */}
        <div className="bg-white rounded-xl border border-outline-variant/20">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{currentChannel === 'rent' ? '6' : '5'}</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-on-surface">High-Resolution Visual Assets &amp; Proofs</h2>
                  <p className="text-xs text-secondary mt-0.5">Upload actual property photographs, layout floor plans, or factory warehouse inventory</p>
                </div>
              </div>
              <span className="text-xs text-secondary bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">Min 1080p • Max 25MB/file</span>
            </div>
          </div>

          <div className="p-6">
            <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-12 text-center hover:bg-surface-container-low/30 transition-colors cursor-pointer flex flex-col items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
              </div>
              <p className="text-sm font-semibold text-on-surface mb-1">Drag &amp; drop photos, floor plans, or inventory sheets</p>
              <p className="text-xs text-secondary mb-4">Supports JPG, PNG, WEBP, PDF for blueprints (Up to 15 files)</p>
              <button className="px-5 py-2.5 bg-white hover:bg-surface-container-low text-on-surface rounded-lg text-sm font-medium shadow-sm transition-colors border border-outline-variant/40" type="button">
                Browse Computer
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="relative group rounded-xl overflow-hidden shadow-sm aspect-video bg-surface-container border border-outline-variant/20">
                <img className="w-full h-full object-cover" alt="A bright sunlit modern Indian living room with warm sandstone accent wall, marble flooring, and minimalist wooden furniture in Krishna Nagar Mathura." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeTjOdvTDX21Xjxxjco2S3nj_kfaCqhfmaSbWdqVZ7CoVKZTe1oOs72CewFlAyqYEpfBsAjOcOi3PtpBKGY1YaHysYs6X6oDpZ-Hn9DbpcCQ5ktAceycQnkOzWHagQPmsjsmbzrpbJgj-ER_EeFAxDAGeJkoaRkdmOw4v-QPlpUmXxP0nRNtsBqBLqfPtGjrflGtW3mA-XbsNqCJxBCTrV6YWD-rFrLLM8WkyEB0" />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
                  Cover Shot
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="relative group rounded-xl overflow-hidden shadow-sm aspect-video bg-surface-container border border-outline-variant/20">
                <img className="w-full h-full object-cover" alt="A spacious master bedroom interior with warm neutral architectural plaster walls, large glass balcony window overlooking lush green trees, and sleek lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp6naZ4UupMmlvvWqUeSOmKK0uxYktk7sZ8mhb8T12ecE-yG789lKx9VQhYeNb-UvRaeU5vW_dSaLRDbZ6S0DsvIfwsMAFoX12OET2M0gOJorfzqoGOsGJ8C4L_lDvPR6vGO-J-WymJaeBJYYdOk82K7WC7kToYv_s8Rr_LhBr9Q6sdtDX_4ihg4SMfEmIJ-8cs4ZjJjoADd0-CVWzREYI3U3lDQX9K0riBX5tAJc" />
                <span className="absolute bottom-2 left-2 bg-black/75 text-white text-xs px-2.5 py-1 rounded-md">
                  Master Suite
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="relative group rounded-xl overflow-hidden shadow-sm aspect-video bg-surface-container border border-outline-variant/20">
                <img className="w-full h-full object-cover" alt="Architectural 2D detailed layout blueprint drawing showing room dimensions in square feet with clean vector lines on off-white paper." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs5_QTyvh6ZnT8Ro9F86uL5QgZrtq_r7KVQyq8eD0KQ5jXNmJw2XlytiMzsRZhC2yhVJR8gccIN_5f47LVIJYWVrzcE--dokllhjNalzV6QRkbNCNRyNYNLGdw3EcxNmIYAkhR_goS8IvoSmAMobzRJP8U5opmXlUkUkCh8nV9PyRPyqaB_3C2HVKFaIp480UML-wlGZDT-CaKR4Z6r7pez_aguk71qzoPID40lrg" />
                <span className="absolute bottom-2 left-2 bg-black/75 text-white text-xs px-2.5 py-1 rounded-md">
                  Floor Plan (2D)
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="relative group rounded-xl overflow-hidden shadow-sm aspect-video bg-surface-container border border-outline-variant/20">
                <img className="w-full h-full object-cover" alt="Exterior view of a newly constructed contemporary residential residential complex in Uttar Pradesh with terracotta terracotta tiles and modern balconies under clear sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPL1TvYWZ0FtunaAnzsat9FD0nOUs4ZxlUDaGwc29KCVftSrveR3Lom3KJGkVFEDiMe549wRF7zwgw6L42EGZ3-hQQnzlI1FoL3PTEUYZOCnF1AMbfYrbSZLYJXCWr0SV4O5A0AyN3yNVi4zkNvCiZqaOiF0Gv0NMHKd0ebf-XLh6rdRQAfKXNx0ps1aT7WSnpo421V8saIynDh_sc0k1I-awLnV6rLi-DB-EAEyY" />
                <span className="absolute bottom-2 left-2 bg-black/75 text-white text-xs px-2.5 py-1 rounded-md">
                  Building Exterior
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST SHIELD BANNER */}
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-xl">privacy_tip</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface">GharBazaar Centralized Privacy &amp; Anti-Spam Shield Active</h4>
              <p className="text-xs text-secondary mt-1">
                Your personal mobile number (+91 98391 22840) is completely shielded from public discovery. Qualified buyer calls, tenant visits, and wholesale material inquiries are strictly pre-screened via our Mathura Trust Desk.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary font-semibold whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-primary/20">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span>Deal Assist Desk Protected</span>
          </div>
        </div>
      </form>

      {/* FIXED BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.08)] border-t border-outline-variant/20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <div className="text-xs text-secondary">
              <span className="font-medium text-on-surface">
                {currentChannel === 'sell' && 'Krishna Nagar Penthouse (Draft #402)'}
                {currentChannel === 'rent' && '2BHK Krishna Nagar Rental (Draft #781)'}
                {currentChannel === 'products' && 'UltraTech Super 53 SKU (Draft #912)'}
              </span>
              <span className="hidden md:inline ml-2">• Saved just now</span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="px-4 py-2 rounded-lg bg-white hover:bg-surface-container-low text-on-surface text-sm font-medium transition-colors border border-outline-variant/30 shadow-sm" type="button">
              Save as Draft
            </button>
            <button className="px-4 py-2 rounded-lg bg-white hover:bg-surface-container-low text-on-surface text-sm font-medium transition-colors border border-outline-variant/30 shadow-sm flex items-center gap-1.5" type="button">
              <span className="material-symbols-outlined text-lg">visibility</span>
              <span>Preview</span>
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-[#005c29] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2" onClick={triggerPublishSuccess} type="button">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>
                {currentChannel === 'sell' && 'Publish • Pay Standard (₹1,414.82 Incl. GST)'}
                {currentChannel === 'rent' && 'Publish Rental • Standard Mgmt (10% Comm.)'}
                {currentChannel === 'products' && 'List Catalog SKU • 5% Platform Model'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
