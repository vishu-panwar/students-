import { useState } from "react";

export default function PricingVendors() {
  const [orderValue, setOrderValue] = useState(100000);
  const [materialCategory, setMaterialCategory] = useState('TMT Rebars (Tata Tiscon / Jindal Panther / Kamdhenu)');

  const calculateBreakdown = () => {
    const commission = orderValue * 0.05;
    const gst = commission * 0.18;
    const netPayout = orderValue - commission - gst;
    
    return {
      gross: orderValue,
      commission: commission,
      gst: gst,
      net: Math.round(netPayout)
    };
  };

  const breakdown = calculateBreakdown();

  const formatInr = (val) => {
    return '₹ ' + Number(val).toLocaleString('en-IN');
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* Top Hero & Context Strip */}
      <section className="w-full bg-surface-container-low py-space-xl relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          
          {/* Breadcrumb & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-2 font-label-md text-label-md text-secondary">
              <a className="hover:text-primary transition-colors" href="#">B2B Material Exchange</a>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold">Vendor Monetization &amp; Commission Model</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              Institutional Supplier Portal • RERA &amp; GST Compliant
            </div>
          </div>

          {/* Main Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7 space-y-space-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                Industrial Procurement • Western UP &amp; NCR Corridor
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface leading-tight tracking-tight">
                Sell Construction Materials in B2B &amp; B2C with <span className="text-primary">Zero Upfront Cost</span>
              </h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
                Connect directly with verified builders, civil contractors, and self-build home builders. 
                No subscription barrier, no listing extortion. Pay strictly upon successful onsite weighbridge verification.
              </p>

              {/* Quick Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
                <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                  <span className="font-headline-md text-headline-md text-primary font-bold">₹0</span>
                  <p className="font-label-sm text-label-sm text-secondary uppercase">Setup or Listing Fee</p>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                  <span className="font-headline-md text-headline-md text-primary font-bold">5.0%</span>
                  <p className="font-label-sm text-label-sm text-secondary uppercase">Pure Pay-on-Delivery</p>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                  <span className="font-headline-md text-headline-md text-primary font-bold">24h</span>
                  <p className="font-label-sm text-label-sm text-secondary uppercase">Escrow Bank Release</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <a className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-3 rounded-xl shadow-sm inline-flex items-center gap-2 transition-all" href="#vendor-register">
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  Register as Material Supplier
                </a>
                <a className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg px-space-md py-3 rounded-xl shadow-sm inline-flex items-center gap-2 transition-all" href="#calculator">
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  Calculate Your Net Payout
                </a>
              </div>
            </div>

            {/* Visual Hero Badge Unit */}
            <div className="lg:col-span-5 relative">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl"></div>
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-highest mb-space-md">
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Monetization Standard</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">Active Policy FY25</span>
                </div>

                {/* Big Stat Showcase matching visual slide */}
                <div className="flex flex-col items-center justify-center py-space-md bg-surface-container-low rounded-xl text-center">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-widest mb-1">Standard Wholesale Cut</span>
                  <div className="font-display-lg text-display-lg text-primary font-bold tracking-tight">5%</div>
                  <span className="inline-block mt-2 px-4 py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md">
                    5% of total amount as commission
                  </span>
                </div>

                <div className="mt-space-md space-y-2 text-secondary font-body-sm text-body-sm">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    <span>GST is charged at 18% purely on the retained 5% commission amount.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    <span>Pre-funded institutional buyer escrow prevents unpaid dispatch bad debt.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    <span>Zero charge if transaction cancelled or rejected at weighbridge.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pricing & Assumptions Breakdown */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Audited Rate Master</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Material Commission &amp; Settlement Architecture</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary max-w-md">
              Transparent transaction ledger governing bulk TMT bars, cement loads, aggregates, and architectural fixtures.
            </p>
          </div>

          {/* Comparison / Price Table Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="p-space-md bg-surface-container-high flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">table_chart</span>
                <span className="font-title-md text-title-md text-on-surface">GharBazaar Material Supplier Schedule (Price Master Extract)</span>
              </div>
              <span className="text-secondary font-body-sm text-body-sm">GST SAC Code: 9961 / 9962 (Wholesale Brokerage)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-body-md">
                <thead>
                  <tr className="bg-surface-container-low text-secondary font-label-md text-label-md uppercase tracking-wider">
                    <th className="py-3.5 px-space-md">Vertical &amp; Plan</th>
                    <th className="py-3.5 px-space-md">Base Listing / Setup</th>
                    <th className="py-3.5 px-space-md">Commission Rate</th>
                    <th className="py-3.5 px-space-md">GST Application</th>
                    <th className="py-3.5 px-space-md">Settlement Trigger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-space-md px-space-md">
                      <div className="font-title-md text-title-md text-on-surface">Construction Material Commission</div>
                      <div className="font-body-sm text-body-sm text-secondary">TMT Steel, Bulk Portland Cement, RMC, Red Bricks</div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex px-2.5 py-1 rounded bg-surface-container font-semibold text-primary">₹0.00 (Zero Upfront)</span>
                    </td>
                    <td className="py-space-md px-space-md font-bold text-primary">
                      5.0% <span className="font-normal text-secondary text-body-sm">of eligible order value</span>
                    </td>
                    <td className="py-space-md px-space-md text-secondary font-body-sm">
                      18.0% GST on 5% platform fee only
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Weighbridge &amp; Site Dispatch Signoff
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-space-md px-space-md">
                      <div className="font-title-md text-title-md text-on-surface">Architectural &amp; Hardware Products</div>
                      <div className="font-body-sm text-body-sm text-secondary">Vitrified Tiles, Bathroom Ceramics, Smart Locks, Modular Lights</div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex px-2.5 py-1 rounded bg-surface-container font-semibold text-primary">₹0.00 (Zero Upfront)</span>
                    </td>
                    <td className="py-space-md px-space-md font-bold text-primary">
                      5.0% <span className="font-normal text-secondary text-body-sm">of eligible invoice value</span>
                    </td>
                    <td className="py-space-md px-space-md text-secondary font-body-sm">
                      18.0% GST on 5% platform fee only
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Unbroken Crate Handover OTP
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors bg-surface-container-lowest">
                    <td className="py-space-md px-space-md">
                      <div className="font-title-md text-title-md text-on-surface">Enterprise Logistics Transit Desk</div>
                      <div className="font-body-sm text-body-sm text-secondary">Dedicated tri-axle tipper &amp; trailer dispatch facilitation</div>
                    </td>
                    <td className="py-space-md px-space-md text-secondary">
                      Optional Add-on
                    </td>
                    <td className="py-space-md px-space-md font-medium text-secondary">
                      At actual carrier cost
                    </td>
                    <td className="py-space-md px-space-md text-secondary font-body-sm">
                      18.0% GST on transport invoice
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary">
                        Bill of Lading / GPS Delivery Gate
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Official Policy Note box */}
            <div className="p-space-md bg-surface-container-low text-secondary font-body-sm text-body-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
              <div>
                <span className="font-semibold text-on-surface">Official Master Price Assumption (Rule P-10):</span>
                "Commission = 5% of order value. GST = 18% of commission amount. This model assumes GST is paid from retained commission unless contract/invoice separately charges it."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Commission & Payout Calculator */}
      <section className="w-full py-space-xl bg-surface-container-low" id="calculator">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            
            {/* Interactive Inputs */}
            <div className="lg:col-span-6 space-y-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Vendor Simulation Engine</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Calculate Your Exact Disbursal</h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Input your consignment invoice value to view the exact 5% commission retention, 18% GST allocation, and final net payout.
                </p>
              </div>

              <div className="space-y-space-sm pt-space-xs">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="materialCategory">Material Classification</label>
                  <select 
                    className="w-full bg-surface-container-low text-on-surface px-3 py-2.5 rounded-lg font-body-md text-body-md outline-none" 
                    id="materialCategory"
                    value={materialCategory}
                    onChange={(e) => setMaterialCategory(e.target.value)}
                  >
                    <option value="TMT Rebars (Tata Tiscon / Jindal Panther / Kamdhenu)">TMT Steel Rebars Fe-550D / Fe-500D</option>
                    <option value="Bulk Cement (UltraTech / ACC / Ambuja 53 Grade)">Bulk Portland Cement (PPC / OPC 53)</option>
                    <option value="Aggregates &amp; Red Clay Bricks">Aggregates (10mm/20mm) &amp; Kiln-Fired Bricks</option>
                    <option value="Vitrified Floor Tiles &amp; Marbles">Vitrified Porcelain Tiles &amp; Natural Granite</option>
                    <option value="Electrical Conduits &amp; Smart Automation">Modular Switches, Wires &amp; Automation</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="orderSlider">Consignment Order Value (₹)</label>
                    <span className="font-title-md text-title-md text-primary font-bold">{formatInr(orderValue)}</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                    id="orderSlider" 
                    max="2500000" 
                    min="20000" 
                    step="10000" 
                    type="range" 
                    value={orderValue}
                    onChange={(e) => setOrderValue(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-label-sm text-label-sm text-secondary mt-1">
                    <span>₹20,000 (Min Cart)</span>
                    <span>₹10,00,000</span>
                    <span>₹25,00,000 (Bulk Train)</span>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container rounded-lg space-y-1">
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Payment Settlement SLA</span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    T+1 Day automated NEFT/RTGS settlement to your verified nodal corporate bank account upon weighbridge verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Output Card / Ledger Breakup */}
            <div className="lg:col-span-6">
              <div className="bg-primary text-on-primary rounded-xl p-space-lg shadow-xl relative overflow-hidden space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
                    <span className="font-title-md text-title-md font-semibold">Settlement Summary</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wide">
                    Escrow Guaranteed
                  </span>
                </div>

                <div className="space-y-space-sm bg-primary-container p-space-md rounded-xl">
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-primary-container">
                    <span>Gross Order Value</span>
                    <span className="font-title-md text-title-md font-semibold text-on-primary">{formatInr(breakdown.gross)}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-primary-container">
                    <span>Platform Commission (5%)</span>
                    <span className="font-semibold text-on-primary">- {formatInr(breakdown.commission)}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-sm text-body-sm text-on-primary-container/80">
                    <span className="pl-2">• GST on Commission (18% of ₹{breakdown.commission.toLocaleString('en-IN')})</span>
                    <span>- {formatInr(breakdown.gst)}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-sm text-body-sm text-on-primary-container/80">
                    <span className="pl-2">• Setup, Listing &amp; Catalog Cost</span>
                    <span className="font-semibold text-on-primary">₹ 0 (Free)</span>
                  </div>
                </div>

                <div className="pt-space-xs border-t border-on-primary-container/20 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">Net Vendor Bank Credit</span>
                    <div className="font-headline-lg text-headline-lg font-bold text-on-primary tracking-tight">{formatInr(breakdown.net)}</div>
                  </div>
                  <a className="bg-surface-container-lowest text-primary hover:bg-surface-bright font-label-lg text-label-lg px-space-md py-2.5 rounded-lg text-center shadow-md transition-all" href="#vendor-register">
                    Claim Supplier Onboarding
                  </a>
                </div>

                <p className="font-label-sm text-label-sm text-on-primary-container/70">
                  * Funds remain locked in GharBazaar ICICI Institutional Escrow prior to lorry departure. Bad debt liability is zero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison Section */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Architectural Marketplace Governance</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Why Building Material Vendors Prefer GharBazaar</h2>
            <p className="font-body-md text-body-md text-secondary">
              Traditional classifieds sell your telephone number to aggressive cold callers. GharBazaar provides institutional commerce escrow, RERA verification, and logistical safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-5xl mx-auto items-stretch">
            
            {/* Negative Card: Traditional Platforms */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm space-y-space-md flex flex-col justify-between">
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm pb-space-sm border-b border-surface-container-highest">
                  <div className="w-9 h-9 rounded-full bg-error-container text-error flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">Traditional Platforms &amp; Portals</h3>
                </div>

                <div className="space-y-space-sm">
                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                    <div className="w-7 h-7 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">database</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Sell your private supplier data</div>
                      <p className="font-body-sm text-body-sm text-secondary">Your pricing margins and manufacturer invoices are leaked to competitors.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                    <div className="w-7 h-7 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">phone_disabled</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Flood your phone with spam calls</div>
                      <p className="font-body-sm text-body-sm text-secondary">Unqualified retail inquiries and bot traffic exhaust your sales desk.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                    <div className="w-7 h-7 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">article</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Leave you to figure out legal paperwork</div>
                      <p className="font-body-sm text-body-sm text-secondary">No GST e-way bill reconciliation, site contract models, or dispute indemnity.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                    <div className="w-7 h-7 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">No support for material procurement</div>
                      <p className="font-body-sm text-body-sm text-secondary">If a builder defaults after lorry unloading, you bear 100% bad debt loss.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-error-container/30 text-on-surface font-label-sm text-label-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                High default risk, upfront subscriptions, unverified contractors.
              </div>
            </div>

            {/* Positive Card: GharBazaar */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md flex flex-col justify-between">
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm pb-space-sm border-b border-surface-container-highest">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-primary">GharBazaar Private Limited</h3>
                    <span className="font-label-sm text-label-sm text-secondary uppercase">Verified Wholesale Clearinghouse</span>
                  </div>
                </div>

                <div className="space-y-space-sm">
                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                    <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Complete verification (Buyers &amp; Builders)</div>
                      <p className="font-body-sm text-body-sm text-secondary">Every procurement request requires active RERA registration or KYC validation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                    <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Mask your identity &amp; keep pricing secure</div>
                      <p className="font-body-sm text-body-sm text-secondary">Negotiate bulk commercial volumes without predatory rate disclosure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                    <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Secure your legal contracts &amp; Escrow</div>
                      <p className="font-body-sm text-body-sm text-secondary">Builder payments pre-funded into neutral escrow prior to weighbridge release.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                    <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Deliver wholesale raw materials directly</div>
                      <p className="font-body-sm text-body-sm text-secondary">Integrated transit desks, tollway logistics routing, and weighbridge verification.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-primary-fixed/40 text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                Unified Ecosystem: Properties, raw materials &amp; services in one platform.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Material Catalogs Grid */}
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Active Procurement Categories</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Materials Ready for Immediate Listing</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary max-w-sm">
              High volume demand across Saharanpur, Meerut, Muzaffarnagar, Noida, and NCR development projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
            {/* Category Cards */}
            {[
              {
                title: 'Cement & Ready-Mix',
                desc: 'UltraTech, ACC, Ambuja, Bangur. PPC & OPC 53 Grade consignments.',
                avg: '₹4.8L',
                trigger: 'T+1 Release',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjPpRn4OcelEnx4Lk-CGqlyZ9wu_2UtnBQI27gM5jo-hYUY9aNSGDiSW2iFq160gW80C5BTgC93znLDFO47k72QfHqCM0NvP08kv5HD9Y5xfvhk4jKQHwyhwpP4QxCLzq4-8vTz5fvVJXqgi9WrHyCTgsVc9YvtJk7c4DtLisOBR9y1bK-Q25txfnSjelLMHOYNXivoP7EV3fCegGr21tpr0juIJF-XdDXYSPUUfA'
              },
              {
                title: 'TMT Steel Rebars',
                desc: 'Tata Tiscon, Jindal Panther, Kamdhenu Fe-550D primary mills.',
                avg: '₹8.5L',
                trigger: 'Weighbridge Auth',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCciZSH2-DaF9uUMgUBBs5AZIe8HIhRklTN6QFdPEpBeJln3A3XLEq21PyX4v6XP0kiFa6WsylmgRkOZcLM8AjvIpcPBSw5XVxg1DaG--G41nf57kx1kuZVtc-7QQvrISky7KLs9Y8Q-pxyjy2Oj1qFQNTRCAFXhWM2W-i-xA8HwBdG7o6ZRnq_vcBzJhkEekuFMAtWEiBTlGUq-UmId6OI9kL3zzfydQ14qngHq2o'
              },
              {
                title: 'Bricks & Aggregates',
                desc: 'Kiln red bricks, fly-ash blocks, 10mm & 20mm coarse river grit.',
                avg: '₹2.2L',
                trigger: 'Direct Tipper',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADPQI7iec5vxqtdG4dxz_xr5jJre7vQgiOabFYJ3-kfAWEhBLgUzdLIsGh3XZwmWM1EML9dA6vvEWUChyFOuNSv6tXO4CHVilxZzrRJpFXVVOuqMo9ZqrWa6Am9LJWnSJa_2zuaRNXd5KDxdUqYFq2A4BdrY4xdKifvHKCf7pUTA0LwQ3fDUy0be5EzZys7Kh4nX72OIwomh6SKQgVYq4hswHR0Ht_3RMi77QbLCA'
              },
              {
                title: 'Tiles & Sanitaryware',
                desc: 'Vitrified slabs, ceramic wall tiles, granite, premium bath fittings.',
                avg: '₹3.6L',
                trigger: 'Crate Handover',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRLEb61FgtrMp6j2NIzVEebD0Lk-g6amy_Q0JlLeOq1jX9xgMllC_wUzd4CVaeOa9u1qBPlNTYCL_IpGo3lHwls-xUoNhDh7SZ1Iq0R28h0iJwxFqWYD6-fpEYHnVZwQqORHSnMcLoROLFr7H3TlCtRienPX_e4Inhi2Hmg3Ga3-0L6FO91GOrpbV_zT_xZ2XHdH3tu4WzHtW5Wos2X1k1E42SvuWmlo7LVBBr87E'
              },
              {
                title: 'Electricals & Hardware',
                desc: 'Modular switches, copper wiring, smart security locks & tools.',
                avg: '₹1.4L',
                trigger: 'OTP Verification',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo2jYM6pQPX9131lQ0YlKbyFv0_oAFvJN6G56MvnFPSZo_UynEYP6KDK7m7tjo-vka33iWAgR0KBNQBLW8vOZpu0e7Y9GCNMgx3xVu16Tc18p9-rg3_cynrn1Qaol3Ig_mGml9O3NpGvUwWzFtxLzChm5jsHCoLswaB69IZsMZ2JdNDYaMO0CAFU8UHzRRc8s6Op3nFghLGobQv2_TpDnUbtYpRtVlP_H_CrtY-3Q'
              }
            ].map((cat, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <div className="w-full h-32 rounded-lg bg-surface-container overflow-hidden relative">
                    <img className="w-full h-full object-cover" src={cat.img} alt={cat.title} />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm font-semibold text-primary">5% Fee</span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface">{cat.title}</h4>
                  <p className="font-body-sm text-body-sm text-secondary">{cat.desc}</p>
                </div>
                <div className="pt-space-sm mt-space-sm border-t border-surface-container flex items-center justify-between text-secondary font-label-sm text-label-sm">
                  <span>Avg Order: {cat.avg}</span>
                  <span className="text-primary font-semibold">{cat.trigger}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escrow Workflow Safeguard Section */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Risk Mitigation Framework</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">The 4-Step Escrow Guarantee</h2>
            <p className="font-body-md text-body-md text-secondary">
              How GharBazaar protects material suppliers against builder non-payment, check bounces, and freight diversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
            {[
              {
                num: '01',
                icon: 'account_balance',
                title: 'Escrow Pre-Funding',
                desc: 'Before your trucks are loaded, the builder deposits 100% of the invoice into the neutral GharBazaar banking escrow.'
              },
              {
                num: '02',
                icon: 'local_shipping',
                title: 'Transit & E-Way Bill',
                desc: 'Consignment dispatches under authenticated GST invoice with GharBazaar digital dispatch pass and live GPS carrier ping.'
              },
              {
                num: '03',
                icon: 'scale',
                title: 'Weighbridge Verification',
                desc: 'Net payload weight confirmed via gross/tare weighbridge slips or crate bar-code scan directly at civil site gate.'
              },
              {
                num: '04',
                icon: 'payments',
                title: '24h Direct NEFT Disbursal',
                desc: 'Platform deducts the 5% success commission (+ 18% GST on commission) and immediately wires the remaining 94.1% to you.'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm relative">
                <span className="font-display-lg text-display-lg font-bold text-surface-container-highest absolute right-4 top-2">{step.num}</span>
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-surface">{step.title}</h4>
                <p className="font-body-sm text-body-sm text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Application Form Strip */}
      <section className="w-full py-space-xl bg-surface-container-low" id="vendor-register">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg p-space-lg lg:p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-5 space-y-space-md">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Express Supplier Onboarding</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">List Your Inventory in Western UP &amp; NCR</h2>
              <p className="font-body-md text-body-md text-secondary">
                Activate your verified merchant account today. Our Saharanpur central nodal desk verifies GSTIN and trade credentials within 4 business hours.
              </p>

              <div className="space-y-space-sm pt-space-xs font-body-sm text-body-sm text-secondary">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>Zero setup fees, cataloging assisted by GharBazaar team</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>Direct access to institutional civil developers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>Direct Helpline: +91 9548283300 (Wholesale Desk)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form className="space-y-space-sm" onSubmit={(e) => { e.preventDefault(); alert('Application recorded! Our wholesale onboarding manager will contact you for catalog sync.'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">Company / Firm Legal Name</label>
                    <input className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-lg font-body-md text-body-md outline-none" placeholder="e.g. Sharma Building Materials Pvt Ltd" required type="text" />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">GSTIN Number</label>
                    <input className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-lg font-body-md text-body-md outline-none uppercase" placeholder="09AAAAA0000A1Z5" required type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">Primary Material Vertical</label>
                    <select className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-lg font-body-md text-body-md outline-none">
                      <option>Cement & Ready-Mix Concrete</option>
                      <option>TMT Rebars & Structural Steel</option>
                      <option>Bricks, AAC Blocks & Aggregates</option>
                      <option>Tiles, Marble & Sanitaryware</option>
                      <option>Electricals, Conduits & Hardware</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">Direct Mobile (Nodal Executive)</label>
                    <input className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-lg font-body-md text-body-md outline-none" placeholder="+91 98XXXXXXXX" required type="tel" />
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Stockyard / Warehouse Location</label>
                  <input className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-lg font-body-md text-body-md outline-none" placeholder="e.g. Delhi Road Industrial Area, Saharanpur, UP" required type="text" />
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low font-body-sm text-body-sm text-secondary">
                  By submitting, you agree to the 5% success-only commission structure and the GharBazaar Escrow Handover Protocol.
                </div>

                <div className="flex items-center justify-between pt-space-xs">
                  <button className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-2.5 rounded-lg shadow-sm transition-all" type="submit">
                    Submit Supplier Application
                  </button>
                  <span className="font-label-sm text-label-sm text-secondary">Approval within 4 Hours</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed FAQ Section */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="max-w-2xl">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Supplier Clarity</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {[
              {
                q: 'Are there any monthly listing or subscription fees?',
                a: 'No. GharBazaar does not charge any upfront onboarding fee, subscription fee, or per-listing charge for building material vendors. You pay flat 5% strictly on confirmed, delivered, and accepted orders.'
              },
              {
                q: 'How is the 18% GST calculated on the transaction?',
                a: 'Per the GharBazaar Price Master guidelines: GST of 18% applies exclusively to our 5% commission amount (service SAC), not the gross value of your raw materials. You generate your normal GST invoice to the buyer for the goods.'
              },
              {
                q: 'What happens if the buyer rejects material at the site?',
                a: 'If material is demonstrably defective or does not match specified test certificates (MTC), the consignment returns to the vendor and no commission is charged. GharBazaar site executives inspect quality disputes.'
              },
              {
                q: 'Who manages freight and logistics?',
                a: 'Vendors can utilize their own fleet or book verified tippers and tri-axle trailers through GharBazaar Logistics Desk at actual rates with integrated weighbridge documentation.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-2">
                <h4 className="font-title-md text-title-md text-on-surface">{faq.q}</h4>
                <p className="font-body-md text-body-md text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
