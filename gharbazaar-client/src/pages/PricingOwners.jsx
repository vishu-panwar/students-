import { useState } from "react";

export default function PricingOwners() {
  const [rentAmount, setRentAmount] = useState(45000);

  const calculateROI = () => {
    const isPremium = rentAmount >= 60000;
    let platformFee = 0;
    
    if (!isPremium) {
      platformFee = rentAmount * 0.10;
    } else {
      platformFee = 3999 + (rentAmount * 0.02);
    }
    
    const gst = platformFee * 0.18;
    const totalDeduction = platformFee + gst;
    const netRent = Math.max(0, rentAmount - totalDeduction);
    const netPercent = rentAmount > 0 ? Math.min(100, Math.max(0, (netRent / rentAmount) * 100)) : 100;
    const feePercent = 100 - netPercent;
    
    return {
      grossRent: rentAmount,
      platformFee,
      gst,
      netRent,
      netPercent,
      feePercent,
      isPremium
    };
  };

  const roi = calculateROI();

  return (
    <div className="flex flex-col w-full">
      {/* Page Hero Banner */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile lg:px-margin">
        <div className="max-w-[1360px] mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-sm shadow-sm">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            Institutional Grade Real Estate Platform
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl tracking-tight mb-space-sm">
            Transparent Pricing for Property Owners &amp; Landlords
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            List verified properties, automate tenant management, and boost occupancy with zero spam calls and full legal protection across India.
          </p>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-space-lg pt-space-lg font-label-md text-label-md text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
              <span>100% RERA &amp; E-Stamp Legal Compliance</span>
            </div>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">phonelink_lock</span>
              <span>Phone Masking &amp; Zero Cold Calls</span>
            </div>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span>Institution-Grade KYC Vetted Tenants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Matrix: Traditional vs GharBazaar */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin max-w-[1360px] mx-auto">
        <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg lg:p-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Why GharBazaar Architecture</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">The High-Trust Paradigm Shift</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary max-w-md">
              Unlike legacy listing directories that sell your personal cell to hundreds of aggressive agents, GharBazaar keeps your asset sovereign.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
            {/* Legacy Channels */}
            <div className="rounded-lg bg-surface-container p-space-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                  <span className="font-title-md text-title-md text-error flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    Traditional Portals &amp; Unregulated Brokers
                  </span>
                  <span className="font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full">Legacy Friction</span>
                </div>
                <ul className="space-y-space-sm font-body-md text-body-md text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5">remove_circle_outline</span>
                    <span><strong>Data Brokerage:</strong> Your personal contact phone number is leaked to dozens of brokers, generating 40+ unsolicited telemarketing calls daily.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5">remove_circle_outline</span>
                    <span><strong>Zero Accountability:</strong> Tenant backgrounds are unvetted; landlords assume 100% legal, criminal, and default risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5">remove_circle_outline</span>
                    <span><strong>Opaque Brokerage Fees:</strong> Demands 1 to 2 months rent upfront with zero formal dispute resolution framework.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-sm text-body-sm font-body-sm text-secondary">
                Result: Privacy breach, prolonged vacancy cycles, and zero legal safeguards.
              </div>
            </div>

            {/* GharBazaar Protocol */}
            <div className="rounded-lg bg-primary-container text-on-primary p-space-md flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                  <span className="font-title-md text-title-md text-on-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-inverse-primary">check_circle</span>
                    GharBazaar Sovereign Protocol
                  </span>
                  <span className="font-label-sm text-label-sm text-on-primary-container bg-primary px-2 py-0.5 rounded-full">Institutional Shield</span>
                </div>
                <ul className="space-y-space-sm font-body-md text-body-md text-on-primary/90">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-inverse-primary text-[18px] mt-0.5">verified_user</span>
                    <span><strong>Masked Communication:</strong> AI-powered virtual PBX masks your identity. Chat and connect securely without publishing your mobile number.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-inverse-primary text-[18px] mt-0.5">verified_user</span>
                    <span><strong>Bank-Grade KYC &amp; Verification:</strong> CIBIL score checks, Aadhaar/PAN validation, and direct employer verification before any physical site visit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-inverse-primary text-[18px] mt-0.5">verified_user</span>
                    <span><strong>Binding Legal Backing:</strong> E-stamped biometric agreements, digital rent ledger, and access to panel arbitration lawyers.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-sm text-body-sm font-body-sm text-on-primary-container">
                Result: Instant liquidity, zero telemarketing harassment, guaranteed compliance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Pricing Section */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface-container-lowest">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Rate Master &amp; Assumptions</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Direct Landlord Tiers</h2>
            <p className="font-body-md text-body-md text-secondary mt-2">
              Transparent schedules audited by Indian chartered accountancy standards. No hidden convenience fees.
            </p>
          </div>

          {/* Bento Grid for Pricing Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {/* Module A: Profile & Listing Activation */}
            <div className="rounded-xl bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Gateway Pass</span>
                  <span className="material-symbols-outlined text-primary text-[24px]">vpn_key</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Listing Activation</h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  One-time entry fee for direct property owners listing residential or commercial units.
                </p>
                <div className="my-space-md py-space-sm bg-surface-container-lowest rounded-lg px-space-md">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display-lg text-display-lg text-on-surface font-bold">₹999</span>
                    <span className="font-body-sm text-body-sm text-secondary">one-time</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Total ₹1,178.82 incl. 18% GST (SAC: 998314)
                  </p>
                </div>
                <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    Identity masking &amp; virtual phone routing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    Verified tenant matching algorithm
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    RERA legal compliance pre-audit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    30 days uninterrupted active visibility
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-sm bg-surface-container rounded-lg p-3">
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface">
                  <span>Annual Portfolio Renewal</span>
                  <span className="font-bold text-primary">₹1,599/yr</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary text-[11px] mt-0.5">
                  For multi-year tenant churn &amp; asset re-listing
                </p>
                <button className="mt-3 block text-center w-full py-2 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg transition-colors">
                  Activate Profile (₹999)
                </button>
              </div>
            </div>

            {/* Module B: Full Property Management */}
            <div className="rounded-xl bg-surface-container-high p-space-lg flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-bl-lg font-medium">
                Full Hands-Off
              </div>
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">End-to-End Governance</span>
                  <span className="material-symbols-outlined text-primary text-[24px]">corporate_fare</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Asset Management</h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  Zero effort. Let GharBazaar manage tenant sourcing, rent realization, and inspections.
                </p>
                <div className="my-space-md space-y-2">
                  {/* Tier 1 */}
                  <div className="p-3 bg-surface-container-lowest rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-title-md text-on-surface">Standard Plan</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">10%</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">Rent below ₹60,000/mo • ₹0 Upfront</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                      Deducted only upon monthly rent realization
                    </span>
                  </div>
                  {/* Tier 2 */}
                  <div className="p-3 bg-surface-container-lowest rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-title-md text-on-surface">Premium Plus</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">₹3,999 + 2%</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">Rent above ₹60,000/mo • Dedicated Desk</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                      Dedicated RM &amp; quarterly civil audit
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    Complete background &amp; police verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    Guaranteed automated rent reconciliation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_small</span>
                    Emergency maintenance concierge
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-sm">
                <button className="block text-center w-full py-2 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg transition-colors">
                  Request Management Audit
                </button>
              </div>
            </div>

            {/* Module C: Listing Booster Accelerators */}
            <div className="rounded-xl bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Fast-Track Occupancy</span>
                  <span className="material-symbols-outlined text-primary text-[24px]">rocket_launch</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Listing Boosters</h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  Amplify reach and cut vacancy timelines from 45 days to under 7 days.
                </p>
                <div className="my-space-md space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-lg">
                    <div>
                      <span className="font-title-md text-title-md text-on-surface">1 Month Booster</span>
                      <p className="font-label-sm text-label-sm text-secondary">3x Reach • WhatsApp Alert</p>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹599</span>
                      <span className="block font-label-sm text-label-sm text-outline">+18% GST (₹706.82)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-lg">
                    <div>
                      <span className="font-title-md text-title-md text-on-surface">2 Month Booster</span>
                      <p className="font-label-sm text-label-sm text-secondary">5x Reach • Category Pin</p>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹1,199</span>
                      <span className="block font-label-sm text-label-sm text-outline">+18% GST (₹1,414.82)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-lg">
                    <div>
                      <span className="font-title-md text-title-md text-on-surface">3 Month Booster</span>
                      <p className="font-label-sm text-label-sm text-secondary">8x Reach • AI Matching</p>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹1,799</span>
                      <span className="block font-label-sm text-label-sm text-outline">+18% GST (₹2,122.82)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-space-sm pt-space-xs">
                <button className="block text-center w-full py-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg rounded-lg shadow-sm transition-colors">
                  Select Booster Duration
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancillary Legal Services */}
      <section className="w-full py-space-lg px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto">
          <div className="rounded-xl bg-surface-container-lowest p-space-md lg:p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">description</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">
                    Digital Rental Agreement E-Stamping
                  </h4>
                  <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                    Legal Enforceability
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary max-w-xl">
                  Biometrically signed, government-compliant digital tenancy contracts delivered straight to WhatsApp &amp; DigiLocker.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹200</span>
                <span className="block font-label-sm text-label-sm text-secondary">service charge / contract</span>
              </div>
              <button className="bg-primary text-on-primary hover:bg-primary-container px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-colors shadow-sm">
                Generate Agreement
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-5 space-y-space-md">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Financial Clarity</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Calculate Your Net Realized Rental Yield</h2>
              <p className="font-body-md text-body-md text-secondary">
                Input your expected monthly rental amount to simulate operational deductions, automated tax breakdowns, and net credited revenue.
              </p>
              <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm space-y-space-sm">
                <label className="block font-label-md text-label-md text-on-surface">Target Monthly Rent (₹)</label>
                <div className="flex items-center gap-space-sm">
                  <span className="text-secondary font-headline-sm">₹</span>
                  <input
                    className="w-full bg-surface-container p-2 rounded-lg font-headline-sm text-headline-sm text-on-surface outline-none"
                    type="number"
                    min="10000"
                    max="300000"
                    step="5000"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(Number(e.target.value))}
                  />
                </div>
                <input
                  className="w-full accent-primary cursor-pointer"
                  type="range"
                  min="10000"
                  max="250000"
                  step="2500"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                />
                <div className="flex justify-between font-label-sm text-label-sm text-secondary">
                  <span>₹10,000</span>
                  <span>₹1,25,000</span>
                  <span>₹2,50,000+</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                <div className="flex items-center justify-between pb-space-sm mb-space-md">
                  <span className="font-title-md text-title-md text-on-surface">Dynamic Yield Breakdown</span>
                  <span className="bg-surface-container font-label-sm text-label-sm px-2.5 py-1 rounded-full text-primary font-semibold">
                    {roi.isPremium ? 'Premium Plus Tier (≥ ₹60k)' : 'Standard Management Tier (< ₹60k)'}
                  </span>
                </div>

                {/* Visualization Bar */}
                <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden flex mb-space-md">
                  <div 
                    className="bg-primary h-full transition-all duration-300" 
                    style={{width: `${roi.netPercent}%`}}
                  ></div>
                  <div 
                    className="bg-tertiary h-full transition-all duration-300" 
                    style={{width: `${roi.feePercent}%`}}
                  ></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-sm">
                  <div className="p-3 bg-surface-container-low rounded-lg">
                    <span className="font-label-sm text-label-sm text-secondary uppercase">Gross Rent</span>
                    <p className="font-title-lg text-title-lg text-on-surface font-bold mt-1">
                      ₹{Math.round(roi.grossRent).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg">
                    <span className="font-label-sm text-label-sm text-secondary uppercase">Platform Fee</span>
                    <p className="font-title-lg text-title-lg text-secondary font-bold mt-1">
                      ₹{Math.round(roi.platformFee).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg">
                    <span className="font-label-sm text-label-sm text-secondary uppercase">GST (18%)</span>
                    <p className="font-title-lg text-title-lg text-secondary font-bold mt-1">
                      ₹{Math.round(roi.gst).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-3 bg-primary-container text-on-primary rounded-lg shadow-sm">
                    <span className="font-label-sm text-label-sm text-on-primary-container uppercase">Net In Pocket</span>
                    <p className="font-title-lg text-title-lg text-on-primary font-bold mt-1">
                      ₹{Math.round(roi.netRent).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="mt-space-md p-space-sm bg-surface-container rounded-lg flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
                  <p className="font-body-sm text-body-sm text-secondary">
                    {roi.isPremium 
                      ? 'Premium Plus tier applies to rent above ₹60,000. Surcharge is ₹3,999 + 2% commission, including a Dedicated Relationship Manager & quarterly civil check.'
                      : 'Standard tier applies to rental incomes below ₹60,000. Platform charge is 10% on realization with ₹0 upfront cost.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landlord Guarantee Banner */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-space-lg lg:p-space-xl flex flex-col justify-center space-y-space-md">
            <div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">security</span>
              GharBazaar Legal Shield
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              Institutional Tenancy Protection Built for India
            </h3>
            <p className="font-body-md text-body-md text-secondary">
              Every rupee transacted on GharBazaar is protected by automated tenant KYC, RERA grievance adherence, and digital escrow protocols. We handle the paperwork, dispute notices, and renewals so your property functions as true passive income.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs font-body-sm text-body-sm text-on-surface">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
                <span>Aadhaar + PAN Biometric Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
                <span>Legal Notice Generation &amp; Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
                <span>Direct Escrow Bank Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
                <span>Zero Unverified Walk-ins</span>
              </div>
            </div>
            <div className="pt-space-sm">
              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-space-lg py-3 rounded-lg font-label-lg text-label-lg transition-colors shadow-sm">
                <span>List Property with Verification</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-80 lg:h-auto relative bg-surface-container">
            <div 
              className="bg-cover bg-center w-full h-full min-h-[320px]" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXl9i0vfzFmcaZ-C-tteuomUUAe0cDDYqeS_lrr8v16_4DuNeACvRp6vYzFaTdrMa1MbCZTY_l6D85-SYKEFbeoGGw1VXwsCBSuwrZJOy3VM2cOYwjwWWWF38ll0kzLsYpMollN95RkL8aNDpGvOZdEsBHbsRTcyvTqUZy9n8kwSE8YLPikc72BbkQbxEgsvLN8_MOfGpapcS9sGA2NTHBCq9HFwKqr5aAUo2stRE')"}}
            ></div>
            <div className="absolute bottom-4 left-4 right-4 p-space-sm rounded-lg bg-surface/90 backdrop-blur-md shadow-md flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <p className="font-title-md text-title-md text-on-surface font-semibold">Over 14,200 Properties Vetted</p>
                <p className="font-body-sm text-body-sm text-secondary">Zero illegal subletting reports across managed units</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface-container-low">
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-space-xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Transparency Desk</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Frequently Asked Questions</h2>
            <p className="font-body-md text-body-md text-secondary mt-2">
              Everything you need to know about our fee structure, GST invoices, and platform operations.
            </p>
          </div>
          <div className="space-y-space-sm">
            {[
              {
                q: "Why is there a ₹999 Profile Activation fee?",
                a: "The ₹999 activation fee filters out rogue brokers and fake duplicate listings. It finances phone number masking infrastructure, instant title verification, and direct tenant screening so real owners get 100% spam-free, serious inquiries."
              },
              {
                q: "When does the 10% or 2% Management Commission get charged?",
                a: "Never upfront. Management commissions are charged strictly on realization—only when rent is successfully collected and transferred to your bank account. If a unit is vacant, no management fee is levied."
              },
              {
                q: "Can I claim GST input tax credit (ITC) on these charges?",
                a: "Yes. All GharBazaar invoices carry full SAC code disclosures (998314 for real estate services) along with our valid GSTIN. If you maintain a registered business entity or GST registration, you can claim full 18% Input Tax Credit."
              },
              {
                q: "How does the Digital Rental Agreement for ₹200 work?",
                a: "Our platform connects directly with state e-stamping portals. Both landlord and tenant sign using Aadhaar OTP authentication, generating a legally valid agreement recognized in all Indian civil courts without having to visit the registrar office."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <h4 className="font-title-md text-title-md text-on-surface font-semibold flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">expand_more</span>
                </h4>
                <p className="font-body-md text-body-md text-secondary mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto rounded-xl bg-primary text-on-primary p-space-lg lg:p-space-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-2">
            <h3 className="font-headline-lg text-headline-lg text-on-primary">Ready to Lease Your Property Safely?</h3>
            <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
              Get activated in 3 minutes. Zero spam calls, RERA compliance check included, and immediate access to vetted corporate tenants.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full md:w-auto">
            <button className="w-full sm:w-auto text-center px-space-lg py-3 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container font-label-lg text-label-lg transition-colors shadow-sm font-semibold">
              Activate Listing (₹999)
            </button>
            <a 
              href="tel:+919548283300"
              className="w-full sm:w-auto text-center px-space-md py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Landlord Concierge
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
