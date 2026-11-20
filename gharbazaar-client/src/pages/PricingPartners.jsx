import { useState } from "react";

export default function PricingPartners() {
  const [gstIncluded, setGstIncluded] = useState(false);

  const getPrices = () => {
    if (gstIncluded) {
      return {
        agentYear1: '₹1,179',
        agentRenew: '₹1,887',
        boost1m: '₹707',
        boost2m: '₹1,415',
        boost3m: '₹2,123'
      };
    }
    return {
      agentYear1: '₹999',
      agentRenew: '₹1,599',
      boost1m: '₹599',
      boost2m: '₹1,199',
      boost3m: '₹1,799'
    };
  };

  const prices = getPrices();
  const gstNote = gstIncluded ? 'Includes 18% statutory GST (SAC 9983)' : '+ 18% GST applicable at checkout';

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full bg-surface-container-lowest py-space-xl px-margin-mobile lg:px-margin">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                UP-RERA Verified Portal • Mathura • Vrindavan • NCR
              </span>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container-low px-4 py-1.5 rounded-full">
              <span className="font-label-sm text-label-sm text-secondary">Verified Turnaround SLA:</span>
              <span className="font-label-md text-label-md text-primary font-bold">24-48 Hours Onboarding</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 space-y-space-sm">
              <span className="font-label-lg text-label-lg text-primary uppercase tracking-widest">
                Institutional Monetization &amp; Directory
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                Scale Your Real Estate Business with GharBazaar Verified Partner Network.
              </h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-3xl">
                Connect with thousands of active buyers and tenants across Mathura, Vrindavan, and NCR with verified high-intent leads. No shared leads, zero broker bidding wars, and institutional grade RERA governance.
              </p>
            </div>

            {/* GST Toggle */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-3">
                <span className="font-label-md text-label-md text-secondary">Base Price</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={gstIncluded}
                    onChange={(e) => setGstIncluded(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Incl. 18% GST</span>
              </div>
              <span className="font-body-sm text-body-sm text-secondary mt-1">Official master rates per financial ledger</span>
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md">
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">100%</div>
                <div className="font-body-sm text-body-sm text-secondary">RERA Audited Channel</div>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">group</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">14,800+</div>
                <div className="font-body-sm text-body-sm text-secondary">Monthly Braj Home Seekers</div>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">Direct</div>
                <div className="font-body-sm text-body-sm text-secondary">WhatsApp Client Chat</div>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">0%</div>
                <div className="font-body-sm text-body-sm text-secondary">Broker Deal Commission</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Activation Fees */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest font-semibold">
              Tier 1 Directory Authority
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              PROFILE ACTIVATION FEES
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Transparent upfront membership tariffs with no hidden renewals or arbitrary penalty structures.
            </p>
          </div>

          <div className="relative bg-surface-container-low p-space-lg lg:p-space-xl rounded-xl">
            {/* Center Node */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-surface-container-lowest ring-4 ring-primary flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold mt-1">
                  Verified Channel Entry
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg relative max-w-4xl mx-auto">
              {/* Year 1 Card */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-fixed text-on-primary-fixed px-3 py-1 font-label-sm text-label-sm rounded-bl-lg font-bold">
                  15-DAY FREE TRIAL
                </div>
                <div className="space-y-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">badge</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Annual Partner Directory</h3>
                      <span className="font-label-sm text-label-sm text-secondary">
                        Agent / Builder / Broker Page - Year 1
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl text-center">
                    <div className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                      {prices.agentYear1}
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary">{gstNote}</div>
                  </div>

                  <div className="flex justify-center">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full font-semibold shadow-sm">
                      Activation fees
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-2 font-body-sm text-body-sm text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Official <strong>'GharBazaar Verified Partner'</strong> green seal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Dedicated Storefront with custom branding, cover, bio, &amp; UP-RERA credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Permanent placement on regional Partner Directory (Mathura/Vrindavan/NCR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Unlimited buyer WhatsApp inquiries routed straight to your phone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Instant SMS &amp; App notifications when an inquiry matches your listings</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-space-md">
                  <button className="w-full block text-center bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-3 rounded-lg font-semibold transition-colors">
                    Start 15-Day Free Trial
                  </button>
                  <span className="block text-center font-body-sm text-body-sm text-secondary mt-2">
                    Zero initial deduction • Cancel anytime within trial
                  </span>
                </div>
              </div>

              {/* Renewal Card */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">autorenew</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Partner Page Renewal</h3>
                      <span className="font-label-sm text-label-sm text-secondary">Year 2 Onwards Maintenance Tariff</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl text-center">
                    <div className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                      {prices.agentRenew}
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary">{gstNote}</div>
                  </div>

                  <div className="flex justify-center">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full font-semibold shadow-sm">
                      Renew fees
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-2 font-body-sm text-body-sm text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Retain established domain authority and search-engine rank on GharBazaar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Lead Analytics Suite: view count, impressions, and click-to-call metric logs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Featured Partner Spotlight rotation on city landing hubs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Priority Helpdesk routing for escrow and transaction documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                      <span>Discounted property listing booster credits bundled upon renewal</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-space-md">
                  <button className="w-full block text-center bg-surface-container-high hover:bg-surface-container text-on-surface font-label-lg text-label-lg py-3 rounded-lg font-semibold transition-colors">
                    Renew Existing Partner ID
                  </button>
                  <span className="block text-center font-body-sm text-body-sm text-secondary mt-2">
                    Instant reactivation upon GST invoice issuance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boost Activation Fees */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest font-semibold">
              Inventory Speed &amp; Liquidity
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              BOOST ACTIVATION FEES
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Surge your properties to the top of Vrindavan, Mathura &amp; NH-19 searches with algorithmic prominence.
            </p>
          </div>

          <div className="relative bg-surface p-space-lg lg:p-space-xl rounded-xl">
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-surface-container-lowest ring-4 ring-primary flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold mt-1">
                  Multi-Tier Listing Multipliers
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg max-w-5xl mx-auto">
              {/* 1 Month */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-secondary">Listing Basic</span>
                    <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                      3x Inquiries
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl text-center">
                    <div className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                      {prices.boost1m}
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary">{gstNote}</div>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full font-semibold shadow-sm">
                      1 Month
                    </span>
                  </div>
                  <ul className="space-y-2 pt-2 font-body-sm text-body-sm text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                      <span>Highlighted amber card badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">touch_app</span>
                      <span>3x higher buyer impression quota</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
                      <span>Valid for 30 calendar days</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-space-md">
                  <button className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg py-2.5 rounded-lg font-semibold transition-colors">
                    Apply 1-Month Boost
                  </button>
                </div>
              </div>

              {/* 2 Months - Most Popular */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md ring-2 ring-primary flex flex-col justify-between relative transform -translate-y-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 font-label-sm text-label-sm rounded-full font-bold uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="space-y-space-md pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-primary font-semibold">Listing Standard</span>
                    <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold">
                      5x Inquiries
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl text-center">
                    <div className="font-display-lg text-display-lg text-primary font-bold tracking-tight">
                      {prices.boost2m}
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary">{gstNote}</div>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full font-semibold shadow-sm">
                      2 Month
                    </span>
                  </div>
                  <ul className="space-y-2 pt-2 font-body-sm text-body-sm text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
                      <span>Locality category pinned ranking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                      <span>Featured listing border emphasis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">sms</span>
                      <span>Priority WhatsApp lead dispersal</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-space-md">
                  <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-2.5 rounded-lg font-semibold transition-colors">
                    Apply 2-Month Boost
                  </button>
                </div>
              </div>

              {/* 3 Months */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-secondary">Listing Premium</span>
                    <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                      8x Inquiries
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl text-center">
                    <div className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                      {prices.boost3m}
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary">{gstNote}</div>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full font-semibold shadow-sm">
                      3 Month
                    </span>
                  </div>
                  <ul className="space-y-2 pt-2 font-body-sm text-body-sm text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">campaign</span>
                      <span>Homepage carousel banner rotation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">share</span>
                      <span>Dedicated GharBazaar social broadcast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">insights</span>
                      <span>Weekly inquiry performance reports</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-space-md">
                  <button className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg py-2.5 rounded-lg font-semibold transition-colors">
                    Apply 3-Month Boost
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto space-y-space-lg">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest font-semibold">
              The Sovereign Indian Marketplace Advantage
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Why Modern Brokers Refuse Legacy Real Estate Classifieds
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Compare the mathematical realities of traditional lead brokers against GharBazaar's audited direct transaction model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            {/* Legacy Portals */}
            <div className="bg-surface-container-high p-space-lg rounded-xl space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm">
                <div>
                  <span className="font-label-sm text-label-sm text-error uppercase font-bold tracking-wider">
                    Traditional Aggregators
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Legacy Property Portals</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-lg space-y-2">
                <span className="font-label-sm text-label-sm text-secondary uppercase">Annual Outflow</span>
                <div className="font-headline-md text-headline-md text-error font-bold">₹25,000 – ₹50,000+</div>
                <p className="font-body-sm text-body-sm text-secondary">
                  Upfront locked subscription packages required before receiving a single prospect.
                </p>
              </div>

              <ul className="space-y-3 font-body-sm text-body-sm text-secondary">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>
                  <span>
                    <strong>Shared Recycled Leads:</strong> Identical phone numbers dispatched concurrently to 8-10 rival brokers, turning every caller hostile.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>
                  <span>
                    <strong>Opaque Verification:</strong> Zero RERA registration checks, allowing fake plot dealers to dilute regional investor confidence.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>
                  <span>
                    <strong>High Friction Contact:</strong> Client contact gated behind call centers and virtual IVRs that drop 40% of inbound buyers.
                  </span>
                </li>
              </ul>
            </div>

            {/* GharBazaar */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md space-y-space-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center justify-between pb-space-sm">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    The Modern Sovereign Standard
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    GharBazaar Verified Partner
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-md rounded-lg space-y-2">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                  Annual Transparent Tariff
                </span>
                <div className="font-headline-md text-headline-md text-primary font-bold">
                  ₹999 / year{' '}
                  <span className="font-label-md text-label-md text-secondary font-normal">(15-Day Free Trial)</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">
                  Inclusive of verified listing profile, RERA stamp badge, and direct client WhatsApp links.
                </p>
              </div>

              <ul className="space-y-3 font-body-sm text-body-sm text-secondary">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
                  <span>
                    <strong>100% Exclusive Direct Inquiries:</strong> The buyer directly initiates chat or calls your phone. Leads are never resold or auctioned.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
                  <span>
                    <strong>Audited RERA Prestige:</strong> Your profile prominently displays valid UP-RERA registration numbers to institutional investors.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
                  <span>
                    <strong>Material &amp; Construction Cross-Traffic:</strong> In addition to residential listings, gain leads from developers sourcing bulk building materials.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full py-space-xl px-margin-mobile lg:px-margin bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Partner Inquiries &amp; Governance FAQs
            </h3>
            <p className="font-body-md text-body-md text-secondary">
              Clear answers regarding payment handling, GST invoicing, and regional listing integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md max-w-5xl mx-auto">
            {[
              {
                q: "How does the 15-day free trial work for brokers?",
                a: "When you sign up as an Agent, Builder, or Broker, your account and customized directory page go live for 15 full days without requiring upfront credit card or debit info. You only pay ₹999 + GST on Day 16 if satisfied with inquiry traction."
              },
              {
                q: "Do you charge brokerage commission on closed deals?",
                a: "Zero. GharBazaar is a pure architectural marketplace and technology directory. Any brokerage fee agreed between you and the property owner or buyer belongs 100% to your firm."
              },
              {
                q: "Can I list properties outside Mathura & Vrindavan?",
                a: "Yes. While our highest search density spans Mathura, Vrindavan, Govardhan, Barsana, and the Yamuna Expressway corridor, verified partners can list residential and commercial units across all NCR clusters."
              },
              {
                q: "Will I receive official tax invoices for input credit?",
                a: "Instantly. Every membership subscription and booster plan generates a compliant GST B2B invoice with your registered GSTIN for full 18% Input Tax Credit (ITC) reconciliation."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-surface-container-lowest p-space-md rounded-xl space-y-2">
                <h4 className="font-title-md text-title-md text-on-surface font-bold">{faq.q}</h4>
                <p className="font-body-sm text-body-sm text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-primary text-on-primary rounded-xl p-space-lg lg:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                Ready to claim your exclusive regional partner presence?
              </h4>
              <p className="font-body-md text-body-md text-primary-fixed">
                15-day free trial • ₹999/yr Year 1 activation • Direct client leads on WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <button className="bg-surface-container-lowest text-primary hover:bg-surface-container font-label-lg text-label-lg px-6 py-3 rounded-lg font-bold transition-colors">
                Register Partner ID
              </button>
              <a
                href="tel:+919548283300"
                className="border border-on-primary/30 text-on-primary hover:bg-on-primary/10 font-label-lg text-label-lg px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                +91 9548283300
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
