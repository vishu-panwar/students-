import { useState } from "react";

export default function BecomePartner() {
  const [formData, setFormData] = useState({
    businessName: "Shree Krishna Properties & Construction",
    tagline: "Real Estate Broker & Construction Material Supplier",
    description: "Helping customers discover quality residential & commercial properties and reliable branded construction materials with 100% transparent documentation, competitive bulk pricing, and trusted doorstep delivery.",
    businessModels: ["realEstate", "materialWholesaler"],
    specializationTags: [
      "Residential Plots",
      "Villas & Flats",
      "Commercial Retail",
      "OPC / PPC Cement",
      "TMT Steel Rebars (Fe 550D)",
      "Red Clay Bricks & Aggregates"
    ],
    serviceHub: "Mathura, UP (Serving Mathura, Vrindavan, Goverdhan & Agra)",
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM (Sun by Appointment)",
    officeAddress: "Plot 42, Krishna Nagar Main Road, Near Highway Plaza, Mathura, Uttar Pradesh - 281004",
    reraId: "UPRERAAGT19842",
    gstin: "09AAACS8492K1Z5",
    fastResponseSLA: true,
    escrowEnabled: true,
    paymentMethods: ["RTGS / NEFT Direct Transfer", "Corporate UPI QR", "Verified Bank Cheque", "Trade Credit for Pre-Approved Builders (30 Days)"],
    conciergeRouting: true,
    liveMandi: true
  });

  const [profileStrength, setProfileStrength] = useState(85);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Update preview in real-time
    const previewElement = document.getElementById(`preview-${field}`);
    if (previewElement) {
      previewElement.textContent = value;
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      specializationTags: formData.specializationTags.filter(t => t !== tag)
    });
  };

  return (
    <div className="min-h-screen bg-surface pb-12">
      {/* Top Section: Breadcrumb, Titles, Actions & Completion Ribbon */}
      <div className="w-full flex flex-col gap-6 mb-8">
        {/* Breadcrumb & Status Badge */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-secondary">
            <span>Merchant Workspace</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span>Business Profile</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-semibold text-primary">Setup & Edit Profile</span>
          </nav>
          
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-on-surface-variant text-[11px] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Public Directory Sync: <strong className="text-on-surface">Auto-saved 2 mins ago</strong></span>
          </div>
        </div>

        {/* Title & Action CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Business Storefront Profile Builder</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide">STAGE 4/4</span>
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              Configure your public merchant storefront on GharBazaar. Verified credentials, inventory display, and direct inquiry routing.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              className="px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface text-sm shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-2"
              href="#"
            >
              <span className="material-symbols-outlined text-lg">visibility</span>
              <span>Preview Public Storefront</span>
            </a>
            <button
              className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-sm hover:bg-surface-container-high transition-all flex items-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">draft</span>
              <span>Save Draft</span>
            </button>
            <button
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold shadow-md hover:bg-primary/90 transition-all flex items-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
              <span>Save & Publish Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Strength Banner Card */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle className="text-surface-container" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="18.8" strokeLinecap="round" strokeWidth="4"></circle>
              </svg>
              <span className="absolute text-base font-bold text-primary">{profileStrength}%</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-on-surface">Profile Strength: Exceptional</span>
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <span className="text-xs text-secondary">Complete the remaining step to unlock GharBazaar Diamond Merchant badge and prime positioning.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg text-primary text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>RERA & GST Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg text-primary text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Storefront Branding</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg text-primary text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Active Catalogs Linked</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg text-tertiary-container text-[11px] font-semibold shrink-0 cursor-pointer hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined text-sm">radio_button_unchecked</span>
              <span>Verify Trade Escrow (+15%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Structured Customizer Form (65% / 8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* SECTION A: Brand & Identity */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">branding_watermark</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">A. Brand & Identity (Basic Information)</h2>
                  <p className="text-xs text-secondary">Establish your public commercial name, brand statement and insignia</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-secondary text-[11px] font-semibold">Step 1 of 5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
                  Business / Company Legal Name
                  <span className="text-error">*</span>
                </label>
                <input
                  className="h-11 px-3.5 rounded-lg bg-surface text-sm text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  id="input-biz-name"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                />
                <span className="text-[11px] text-secondary">Official trade name matching GST and RERA registrations</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
                  Storefront Tagline / Designation
                </label>
                <input
                  className="h-11 px-3.5 rounded-lg bg-surface text-sm text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  id="input-tagline"
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                />
                <span className="text-[11px] text-secondary">Concise summary visible in marketplace card sub-headings</span>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
                  Business Description / About Us
                  <span className="text-error">*</span>
                </label>
                <span className="text-[11px] text-secondary">{formData.description.length} / 500 characters</span>
              </div>
              <textarea
                className="p-3.5 rounded-lg bg-surface text-sm text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm leading-relaxed resize-none"
                id="input-desc"
                rows="3"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              ></textarea>
            </div>

            {/* Visual Media Uploaders */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
              {/* Logo Uploader (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface">Brand Emblem / Logo</label>
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-primary/10 shadow-md flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFGe2M9Tw3YWmKXTwjsBmoWZqpb3rcps9TXYikSQdJt_rCm-iivEzcpEDwGA_B2lnR-BRpsPQ0tnRyXBanoLDl_48TuDGCMRK11oxa3kZlYnjvGPhAYH9kVvGTbB0Gu-MS_Pc66w0u4O-chdmxm-epDma5I-EBnipvyXt3nXQqWn9m84JhHZzSFfEgUucjiQelV3waZf8wPzyaKefUZQOF-sWKPzHJb7L-mcL0aDg"
                      alt="Logo"
                    />
                    <div className="absolute inset-0 bg-inverse-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-surface-bright text-[22px]">photo_camera</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button className="text-xs text-primary font-bold hover:underline" type="button">Change Brand Logo</button>
                    <span className="text-[11px] text-secondary">Square PNG or SVG. Max 2 MB</span>
                  </div>
                </div>
              </div>

              {/* Cover Banner Uploader (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface">Storefront Architectural Cover Banner</label>
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center relative overflow-hidden group h-36">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmyLyHc4m2IVB-DFtRGPaQ5wZN22U8API8RjaqoaIKE8q6h_JkfwIQ5FimL7rTM5B3ylWuaFigvEBdPHYx3d91KXvFEhrkuJ54Vpc5ZlxkuwMWpBswdvOAsANp1DMLaA6TlZO3fo-Jgg14pLOzYLQFRDymdxlQcW4v7lhqKww_LJKvCqyFbxyMHZUi4iUF1KZ1Z-8sTYhG9S9mARRXLd1Sk6487-Aiw_28MSrMDUA')" }}
                  ></div>
                  <div className="absolute inset-0 bg-inverse-surface/30 group-hover:bg-inverse-surface/50 transition-all flex flex-col items-center justify-center text-surface-bright p-3 gap-1">
                    <span className="material-symbols-outlined text-2xl">panorama</span>
                    <span className="text-xs font-semibold text-surface-bright">Click to replace 16:9 banner</span>
                    <span className="text-[11px] text-surface-bright/80">Recommended 1920 × 480 px (Up to 5MB)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION B: Category & Business Nature */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">category</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">B. Category & Business Nature</h2>
                  <p className="text-xs text-secondary">Define your operating channels and specialty tags on GharBazaar search algorithms</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-secondary text-[11px] font-semibold">Step 2 of 5</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface">Primary Business Model (Select all applicable)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Option 1: Selected */}
                <label className="p-3.5 rounded-xl bg-primary/5 cursor-pointer flex items-start gap-3 transition-all hover:bg-primary/10">
                  <input checked readOnly className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Real Estate Agency</span>
                    <span className="text-xs text-secondary">Brokering, buyer advisory & land sales</span>
                  </div>
                </label>

                {/* Option 2: Selected */}
                <label className="p-3.5 rounded-xl bg-primary/5 cursor-pointer flex items-start gap-3 transition-all hover:bg-primary/10">
                  <input checked readOnly className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Material Wholesaler</span>
                    <span className="text-xs text-secondary">Bulk stockist & direct distributor</span>
                  </div>
                </label>

                {/* Option 3: Unchecked */}
                <label className="p-3.5 rounded-xl bg-surface-container-low cursor-pointer flex items-start gap-3 transition-all hover:bg-surface-container">
                  <input className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Turnkey Contractor</span>
                    <span className="text-xs text-secondary">Design-to-build civil construction</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Specialization Pills Tag Manager */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-semibold text-on-surface">Active Specialization Tags</label>
              <div className="flex flex-wrap gap-2 items-center">
                {formData.specializationTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary text-xs">
                    {tag}
                    <span
                      className="material-symbols-outlined text-sm cursor-pointer hover:opacity-80"
                      onClick={() => handleRemoveTag(tag)}
                    >close</span>
                  </span>
                ))}
                <button
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-xs text-secondary hover:bg-surface-container-high transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">add</span> Add Tag
                </button>
              </div>
            </div>
          </section>

          {/* SECTION C: Location, Reach & Operational SLA */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">pin_drop</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">C. Location, Reach & Operational Hours</h2>
                  <p className="text-xs text-secondary">Physical office coordinates, coverage clusters and buyer response SLA commitments</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-secondary text-[11px] font-semibold">Step 3 of 5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface flex items-center gap-1">
                  Primary Service Hub & Territory
                  <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    type="text"
                    value={formData.serviceHub}
                    onChange={(e) => setFormData({ ...formData, serviceHub: e.target.value })}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-lg text-secondary">location_city</span>
                </div>
                <span className="text-[11px] text-secondary">4 Key active municipal regions registered</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface">Operating Working Hours</label>
                <div className="relative">
                  <input
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-lg text-secondary">schedule</span>
                </div>
                <span className="text-[11px] text-secondary">Shown to buyers scheduling site inspections</span>
              </div>
            </div>

            {/* Address Field & Mini Map Representation */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface">Registered Office Address</label>
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 flex flex-col justify-between p-3.5 rounded-lg bg-surface gap-2 shadow-sm">
                  <p className="text-sm text-on-surface">{formData.officeAddress}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-semibold">GPS Verified Office</span>
                    <span className="text-secondary text-[11px]">27.4924° N, 77.6737° E</span>
                  </div>
                </div>

                {/* Interactive Static Map Placeholder */}
                <div
                  className="w-full md:w-48 h-28 rounded-lg bg-cover bg-center shrink-0 shadow-sm relative overflow-hidden"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqz9AwSQmoWfa8no683SgmN9L8w-g_4bcvz617B0sm4kumEdAu5-wU7GGCDXwVzzOgie6ESWId2dTVk3xWxG63TtKvUfqlvF1myLcBELw-_HWQNpHNDJZ3Tyh0fBFtuDS93_4grdLigDESP9te9yM9jQbQ4ES7f9675AOHh0U5BFnd6MbkyRyGyeHP7alyue5CoWMro_Bokqw6T5OgwZqZhuao84iUhds1-ew2IXU')" }}
                >
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface/90 backdrop-blur text-[11px] text-on-surface flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs text-primary">navigation</span>
                    <span>Highway Plaza Hub</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High Response SLA Toggle Box */}
            <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-surface">Guaranteed Response Time SLA (&lt; 15 mins)</span>
                  <span className="text-xs text-secondary">Commit to immediate lead callbacks to earn the 'Fast Responder' badge on WhatsApp & Concierge.</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input checked={formData.fastResponseSLA} onChange={(e) => setFormData({ ...formData, fastResponseSLA: e.target.checked })} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          {/* SECTION D: Compliance, Trust Desk & Verification Credentials */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">D. Compliance, Trust Desk & Verification Credentials</h2>
                  <p className="text-xs text-secondary">Mandatory RERA legal registration numbers, GST compliance, and audited documents</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-secondary text-[11px] font-semibold">Step 4 of 5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RERA ID Card Input */}
              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface">UP RERA Agent Registration</label>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span> VERIFIED
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full bg-surface-container-lowest h-9 px-3 rounded font-mono text-sm text-on-surface focus:outline-none"
                    type="text"
                    value={formData.reraId}
                    readOnly
                  />
                  <button className="p-2 rounded bg-surface-container text-secondary hover:text-on-surface" title="Re-validate against RERA portal" type="button">
                    <span className="material-symbols-outlined text-lg">sync</span>
                  </button>
                </div>
                <span className="text-[11px] text-secondary">Authorized Real Estate Brokerage License</span>
              </div>

              {/* GSTIN Card Input */}
              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface">GSTIN Tax Identifier</label>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span> ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full bg-surface-container-lowest h-9 px-3 rounded font-mono text-sm text-on-surface focus:outline-none"
                    type="text"
                    value={formData.gstin}
                    readOnly
                  />
                  <button className="p-2 rounded bg-surface-container text-secondary hover:text-on-surface" title="Re-check GST status" type="button">
                    <span className="material-symbols-outlined text-lg">sync</span>
                  </button>
                </div>
                <span className="text-[11px] text-secondary">Standard 18% / 28% GST invoice generation enabled</span>
              </div>
            </div>

            {/* Verification Documents Checklist */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface">Audited Documents on File</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[22px]">description</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-on-surface">trade_license_2024.pdf</span>
                      <span className="text-[11px] text-secondary">Municipal Corp Mathura • 1.4 MB</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-on-surface">proprietor_pan_verified.pdf</span>
                      <span className="text-[11px] text-secondary">Income Tax Dept • 420 KB</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                </div>
              </div>
            </div>

            {/* Centralized Escrow Toggle */}
            <div className="p-4 rounded-xl bg-primary/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">GharBazaar Centralized Escrow & Coordinated Delivery Facilitation</span>
                  <span className="text-xs text-secondary">Enable buyers to pay via safe milestone escrow. Protects both supplier and buyer on bulk building orders.</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input checked={formData.escrowEnabled} onChange={(e) => setFormData({ ...formData, escrowEnabled: e.target.checked })} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Accepted Payment Methods */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface">Accepted Payment Settlement Channels</label>
              <div className="flex flex-wrap gap-3">
                {formData.paymentMethods.map((method) => (
                  <label key={method} className="px-3.5 py-2 rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer text-xs text-on-surface">
                    <input checked readOnly className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" type="checkbox" />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION E: Showcase Inventory & Catalog Links */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">inventory_2</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">E. Showcase Inventory & Catalog Highlights</h2>
                  <p className="text-xs text-secondary">Manage what prospective clients explore upon opening your merchant profile</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-secondary text-[11px] font-semibold">Step 5 of 5</span>
            </div>

            {/* Live Inventory Auto-Sync Counter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-surface flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-on-surface">12</span>
                  <span className="text-xs text-secondary">Properties Listed</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]">villa</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-on-surface">24</span>
                  <span className="text-xs text-secondary">Materials in Catalog</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]">handyman</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">36 Active</span>
                  <span className="text-xs text-secondary">Total Inventory Items</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>published_with_changes</span>
              </div>
            </div>

            {/* Featured Pinned Selection Preview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface">Pinned Showcase Highlights (3 Properties, 3 Materials)</label>
                <a className="text-[11px] text-primary font-bold hover:underline" href="#">Reorder / Select More</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3tX7Ko97Q77oOzbqPO9bg7TDbxQu3VBN6lv5eXrzRv8M8YdtsXgdlvDh1YE3AhT75oFoaxHgxF0QGXTINjC8YxCBLM0tWsyLWk-TuGMPPgSDMruKM0Qj4iZPHiGncBN1yfCwyW2wUK1eeD_P9zkKM87fbUPfMqLU8fms5UQYAhOB72g4PyE7rgAxhJPHObtWKrgy_B-HcgtcxeLnbajzXwx5UnbCm5tpS9Nv3wUo" alt="Villa" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">Krishna Valley Villas</span>
                    <span className="text-xs text-secondary">₹68 Lakhs • 4 BHK</span>
                    <span className="text-[11px] text-primary font-semibold">Pinned Hero 1</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdRx2cShvjzOZhhRRvBSL9msNi0Enh1fhf2u88tdyBWo9jqnz7zW2y6vJItMqGa7wSGEWYvd2g-VFzd8AWa1qc1hn8_lzHC7nCwcgGeB6oHTOq1nDlBrvC70p4JBXUYbDsvPcclzdcvxsPAVcbnMVxedJdxc167LLgiMqRPDnjQ7wLfypDboIkO5rO7OhafI02kcsEAMwY75yNtIFObYKGnBonGnfKuxmvWUxxmd0" alt="Cement" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">UltraTech PPC 50kg</span>
                    <span className="text-xs text-secondary">₹385/Bag • In Stock</span>
                    <span className="text-[11px] text-primary font-semibold">Pinned Hero 2</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD1VnxGwvsnFd2ud9-lqFyXzLX7x064b7PtkGgawEBKqfXpByhbqzk4bek7SSsaxXH1VjJBQ9TOu8eJFhm5ez0i5WLvkSkXM7BfjmKjDPwsodqSQfNPAciuRMXhJG9t4HdCUCA8Ulf8zvUEFDIxO2Tj7UvkMxAIKq8Qq2PvqUN4n1jNgUL8Lmaq_KBgB_cppA_ZNr7fmA-EM2Ywb7oAWc9b_v7AUMBpCDIseEGc4Y" alt="Steel" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">Tata Tiscon Fe550D</span>
                    <span className="text-xs text-secondary">₹54,200/Ton • Certified</span>
                    <span className="text-[11px] text-primary font-semibold">Pinned Hero 3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Showcase Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Direct GharBazaar Concierge Routing</span>
                  <span className="text-xs text-secondary">Filter buyer inquiries through trained pre-qualifiers</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input checked={formData.conciergeRouting} onChange={(e) => setFormData({ ...formData, conciergeRouting: e.target.checked })} className="sr-only peer" type="checkbox" />
                  <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Display Live Mandi Benchmark Rates</span>
                  <span className="text-xs text-secondary">Show real-time regional steel & cement price indexes</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input checked={formData.liveMandi} onChange={(e) => setFormData({ ...formData, liveMandi: e.target.checked })} className="sr-only peer" type="checkbox" />
                  <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Bottom Form Actions Ribbon */}
          <div className="flex items-center justify-between p-5 rounded-xl bg-surface-container-lowest shadow-sm mb-4">
            <div className="flex items-center gap-2 text-secondary text-xs">
              <span className="material-symbols-outlined text-lg">info</span>
              <span>Publishing instantly refreshes your profile on GharBazaar Directory & Map Discovery.</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface-variant text-xs hover:bg-surface-container-high transition-all" type="button">
                Discard Unsaved
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-md hover:bg-primary/90 transition-all flex items-center gap-2" type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                <span>Save & Publish Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Live Profile Card Preview (35% / 4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
          {/* Preview Header Card */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span className="text-sm font-bold uppercase tracking-wider text-on-surface">Live Public View</span>
            </div>
            <span className="text-[11px] text-secondary bg-surface-container px-2 py-0.5 rounded">Desktop & Mobile</span>
          </div>

          {/* Live Mocked Profile Preview Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden flex flex-col transition-all">
            {/* Hero Header Graphic in Preview */}
            <div className="h-32 w-full relative bg-surface-container-high overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEAjVgPZhXH7INCxZCJrcqO8aQ7Lgi1qZal7V3EulxUz-Tv9z4LDoOPmjnZ3160mSaYvjyyqV9I9VxgDbfY914HCi51lxqlPHaioUgdYj-KRk-VjR2tf0l4792yA5BP7AW3NIH785bUlVXH2MFLq2ofHW5MjIJY5wCBifeeESN_0p1gMx0kImPwgiBCvEmaedHRZzUTV2121oFQCj96nGUm0gDRem1Lcw8-hpwoys')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded-full text-primary text-[11px] font-bold shadow-sm">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span>RERA VERIFIED</span>
              </div>
            </div>

            {/* Overlapping Profile Avatar & Main Info */}
            <div className="px-5 pb-5 pt-0 flex flex-col gap-4">
              <div className="flex justify-between items-end -mt-10 mb-1">
                <div className="w-20 h-20 rounded-full bg-surface-container-lowest p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRIYWAHH2EaO4sFWCI1QN8l76hI-dliNQa9mnnW5kagTb1-ePMnl48Fx-OIJfMOFOvfgvFyZkvilRb0rZr_mOQymH9AEfAJrE08llug4a8fPY-lWKVxPaj9E2mkR7wuUchbYbKRPVoN2C0tY5kdwueNx2JL67xUdEshQ0dSnyEWH2RupjqyQ1FEMe9p-6E7JrEQ9dNSKmnMt_cc9mmVo-BdK68RJzCR8uQI-j8YdI"
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pb-1">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-tertiary">star</span> 4.9 (184 reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-on-surface leading-tight" id="preview-businessName">{formData.businessName}</h3>
                  <span className="material-symbols-outlined text-primary text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <p className="text-xs text-secondary font-medium" id="preview-tagline">{formData.tagline}</p>
              </div>

              {/* Badges / Metadata row */}
              <div className="flex flex-wrap gap-2 text-secondary text-[11px]">
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                  <span>Mathura, UP</span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <span>Member Since 2024</span>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>&lt; 15 mins Response</span>
                </div>
              </div>

              {/* About Us Snippet */}
              <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed bg-surface-container-low p-3 rounded-lg" id="preview-description">
                {formData.description}
              </p>

              {/* Metric Counter Pills in Preview */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center">
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-base font-bold text-on-surface">12</div>
                  <div className="text-[11px] text-secondary">Properties</div>
                </div>
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-base font-bold text-on-surface">24</div>
                  <div className="text-[11px] text-secondary">Materials</div>
                </div>
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-base font-bold text-primary">45+</div>
                  <div className="text-[11px] text-secondary">Localities</div>
                </div>
              </div>

              {/* Direct CTA buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>Connect Through GharBazaar</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="py-2 rounded-lg bg-surface-container text-[11px] text-on-surface-variant font-semibold hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">share</span> Share Profile
                  </button>
                  <button
                    className="py-2 rounded-lg bg-surface-container text-[11px] text-on-surface-variant font-semibold hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">download</span> PDF Catalog
                  </button>
                </div>
              </div>

              {/* Trust Note */}
              <div className="p-2.5 rounded-lg bg-surface-container flex items-start gap-2 text-secondary text-[11px] leading-tight mt-1">
                <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5">verified_user</span>
                <span>All site visits, enquiries & wholesale quotes are facilitated centrally via GharBazaar Trust Desk.</span>
              </div>
            </div>
          </div>

          {/* Quick Guidance & Conversion Tip Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-tertiary-container text-base font-bold">
              <span className="material-symbols-outlined text-xl">trending_up</span>
              <span>Why a 100% Verified Profile Matters</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Merchants who complete their legal verification and pin catalog highlights receive <strong className="text-on-surface">3.8x more verified buyer inquiries</strong>, automated inclusion in weekly Builder newsletters, and top placement in search.
            </p>
            <div className="pt-1 flex items-center gap-2 text-primary text-xs font-bold cursor-pointer hover:underline">
              <span>Read Verification Guidelines</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Merchant Help Desk Card */}
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Need Help Customizing?</span>
              <span className="text-xs text-secondary">Merchant Concierge is active now</span>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-[11px] font-bold shadow-sm hover:bg-surface-container transition-all"
              type="button"
            >
              Call RM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
