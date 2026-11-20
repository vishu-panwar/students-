import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import PricingOwners from "./PricingOwners";
import PricingPartners from "./PricingPartners";
import PricingVendors from "./PricingVendors";

export default function Pricing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabFromUrl = searchParams.get('tab') || 'tenants';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  
  const [currentCalc, setCurrentCalc] = useState({
    basePrice: 999,
    escrowMult: 0.5
  });
  const [rent, setRent] = useState(10000);
  const [agreementChecked, setAgreementChecked] = useState(true);
  const [activeCategory, setActiveCategory] = useState('pg');

  // Update active tab when URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/pricing?tab=${tab}`);
  };

  const setCalcCategory = (cat, price, mult) => {
    setCurrentCalc({ basePrice: price, escrowMult: mult });
    setActiveCategory(cat);
  };

  const calculateValues = () => {
    const baseFee = currentCalc.basePrice;
    const gst = baseFee * 0.18;
    const agreement = agreementChecked ? 236 : 0;
    const escrow = rent * currentCalc.escrowMult;
    const total = baseFee + gst + agreement + escrow;

    return {
      baseFee,
      gst,
      agreement,
      escrow,
      total
    };
  };

  const values = calculateValues();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Pricing - GharBazaar</title>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </Helmet>

      <main className="w-full pt-28 bg-surface">
        {/* Tab Navigation */}
        <div className="w-full bg-surface-container-low border-b border-outline-variant">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <nav className="flex items-center gap-space-sm overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleTabChange('tenants')}
                className={`whitespace-nowrap px-4 py-3 font-label-lg text-label-lg transition-all relative ${
                  activeTab === 'tenants'
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Tenants &amp; Home Seekers
                {activeTab === 'tenants' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('owners')}
                className={`whitespace-nowrap px-4 py-3 font-label-lg text-label-lg transition-all relative ${
                  activeTab === 'owners'
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Owners &amp; Landlords
                {activeTab === 'owners' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('partners')}
                className={`whitespace-nowrap px-4 py-3 font-label-lg text-label-lg transition-all relative ${
                  activeTab === 'partners'
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Channel Partners &amp; Builders
                {activeTab === 'partners' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('vendors')}
                className={`whitespace-nowrap px-4 py-3 font-label-lg text-label-lg transition-all relative ${
                  activeTab === 'vendors'
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                B2B Materials &amp; Vendors
                {activeTab === 'vendors' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'tenants' ? (
        <div className="flex flex-col w-full">
          
          {/* Top Notice Banner */}
          <section className="w-full bg-surface-container-low py-space-sm px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  Institutional Tenant Safeguard: 100% RBI Escrow Protected Deposits &amp; Zero Spam Call Guarantee
                </span>
              </div>
              <div className="flex items-center gap-space-md text-secondary font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
                  256-bit Identity Masking
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">policy</span>
                  UP RERA Compliant Legal Drafts
                </span>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="w-full bg-surface py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 space-y-space-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[16px]">no_sim</span>
                  <span>Pay for Real Homes, Not Fake Leads</span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-background tracking-tight">
                  One-Time Booking Fee. <br/>
                  <span className="text-primary underline decoration-outline-variant underline-offset-8">
                    Never a Recurring Subscription.
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
                  GharBazaar's sovereign tenant network removes broker extortion and predatory deposits. Pay a single transparent booking fee to access 100% physically audited properties with our institutional dispute-safe security escrow.
                </p>
                
                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-space-md pt-space-sm max-w-lg">
                  <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                    <div className="font-headline-sm text-headline-sm text-primary">0</div>
                    <div className="font-label-sm text-label-sm text-secondary uppercase">Brokerage Fee</div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                    <div className="font-headline-sm text-headline-sm text-primary">100%</div>
                    <div className="font-label-sm text-label-sm text-secondary uppercase">RERA &amp; KYC Audited</div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                    <div className="font-headline-sm text-headline-sm text-primary">₹0</div>
                    <div className="font-label-sm text-label-sm text-secondary uppercase">Spam Call Risk</div>
                  </div>
                </div>
              </div>

              {/* Comparison Card */}
              <div className="lg:col-span-5">
                <div className="bg-surface-container-lowest rounded-xl shadow-lg p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between pb-space-sm">
                    <span className="font-title-lg text-title-lg text-on-surface">The Truth About Real Estate Tech</span>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Model Audit</span>
                  </div>
                  
                  {/* Traditional Red Box */}
                  <div className="bg-error-container/40 p-space-md rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-error">
                      <span className="material-symbols-outlined text-[20px]">cancel</span>
                      <span className="font-title-md text-title-md font-bold">Traditional Platforms</span>
                    </div>
                    <ul className="font-body-sm text-body-sm text-on-surface space-y-1.5 pl-6 list-disc">
                      <li>Sell your mobile number to 50+ local brokers</li>
                      <li>Flood your phone with relentless spam calls</li>
                      <li>Leave you alone to draft complex legal agreements</li>
                      <li>Owners hold your deposit hostage upon move-out</li>
                    </ul>
                  </div>

                  {/* GharBazaar Green Box */}
                  <div className="bg-primary/5 p-space-md rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      <span className="font-title-md text-title-md font-bold">GharBazaar Protection</span>
                    </div>
                    <ul className="font-body-sm text-body-sm text-on-surface space-y-1.5 pl-6 list-disc">
                      <li>Identity masked &amp; zero shared contact data</li>
                      <li>Complete physical inspection &amp; key-readiness checks</li>
                      <li>Government-stamped rental contract included (₹200)</li>
                      <li>Security held in neutral RBI-grade escrow account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3-Tier Pricing Cards */}
          <section className="w-full bg-surface-container py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto space-y-space-lg">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">One-Time Activation Fee</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Flat Access Charges. Full Independence.</h2>
                <p className="font-body-md text-body-md text-secondary">
                  Pay once to unlock direct verified owner communication, booking protection, and escrow arbitration. No periodic renewals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-stretch">
                {/* Tier 1: PG */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                  <div className="space-y-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-surface-container text-secondary font-label-md text-label-md">
                        Students &amp; Singles
                      </span>
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold">One-Time Fee</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">PG &amp; Co-Living</h3>
                      <p className="font-body-sm text-body-sm text-secondary pt-1">
                        Hostels, managed student rooms, single &amp; sharing suites.
                      </p>
                    </div>
                    <div className="pt-space-xs pb-space-sm">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg text-display-lg text-primary tracking-tight">₹999</span>
                        <span className="font-label-md text-label-md text-secondary">+ 18% GST</span>
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary mt-1">₹1,178.82 Total all-inclusive</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                      <span className="font-label-md text-label-md text-on-surface">
                        Security: <strong>50% of 1st Month Rent</strong>
                      </span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Included Deliverables:</div>
                      <ul className="space-y-2 font-body-sm text-body-sm text-on-surface">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Physical room reservation lock (5-day hold)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Verified food hygiene &amp; Wi-Fi speed audit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Zero warden / broker commission fee</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Direct landlord contact credentials</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-space-lg">
                    <button className="w-full py-3 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all text-center">
                      Unlock PG Listings
                    </button>
                  </div>
                </div>

                {/* Tier 2: Residential (Popular) */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-md relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm uppercase px-4 py-1 rounded-full shadow-sm">
                    Most Popular for Families
                  </div>
                  <div className="space-y-space-md pt-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-surface-container text-secondary font-label-md text-label-md">
                        Flats &amp; Villas
                      </span>
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold">One-Time Fee</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Residential Homes</h3>
                      <p className="font-body-sm text-body-sm text-secondary pt-1">
                        Gated societies, builder floors, duplexes &amp; independent houses.
                      </p>
                    </div>
                    <div className="pt-space-xs pb-space-sm">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg text-display-lg text-primary tracking-tight">₹1,999</span>
                        <span className="font-label-md text-label-md text-secondary">+ 18% GST</span>
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary mt-1">₹2,358.82 Total all-inclusive</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                      <span className="font-label-md text-label-md text-on-surface">
                        Security: <strong>Strictly 1 Month Rent</strong>
                      </span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Included Deliverables:</div>
                      <ul className="space-y-2 font-body-sm text-body-sm text-on-surface">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Unlimited verified homeowner direct connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Pre-screened legal tenancy documentation pack</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Accompanied physical visit coordination pass</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Escrow-guaranteed move-out deposit return</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-space-lg">
                    <button className="w-full py-3 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all text-center">
                      Book Residential Pass
                    </button>
                  </div>
                </div>

                {/* Tier 3: Commercial */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                  <div className="space-y-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-surface-container text-secondary font-label-md text-label-md">
                        Retail &amp; Offices
                      </span>
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold">One-Time Fee</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Commercial Spaces</h3>
                      <p className="font-body-sm text-body-sm text-secondary pt-1">
                        Shops, corporate offices, warehouses, godowns &amp; industrial plots.
                      </p>
                    </div>
                    <div className="pt-space-xs pb-space-sm">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg text-display-lg text-primary tracking-tight">₹2,999</span>
                        <span className="font-label-md text-label-md text-secondary">+ 18% GST</span>
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary mt-1">₹3,538.82 Total all-inclusive</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                      <span className="font-label-md text-label-md text-on-surface">
                        Security: <strong>1.5 Months Rent</strong>
                      </span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Included Deliverables:</div>
                      <ul className="space-y-2 font-body-sm text-body-sm text-on-surface">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Title deed &amp; commercial zoning clearance verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Customized commercial lease &amp; GST compliance terms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Institutional dispute mediation &amp; legal concierge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check</span>
                          <span>Fast-track fit-out and raw material supply access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-space-lg">
                    <button className="w-full py-3 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all text-center">
                      Access Commercial Spaces
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Deposit Vault Section */}
          <section className="w-full bg-surface py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto">
              <div className="bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                  <div className="lg:col-span-6 space-y-space-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
                      <span>Tripartite Escrow Mechanism</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Your Security Deposit is Never Trapped with Landlords.
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                      In conventional leases, arbitrary deductions for fresh paint or phantom damages destroy tenant trust. GharBazaar holds the security deposit as a neutral institutional escrow fiduciary. Funds are released strictly upon transparent checklist audits.
                    </p>
                    
                    <div className="space-y-space-sm pt-2">
                      <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">PG</div>
                          <span className="font-title-md text-title-md text-on-surface">Paying Guest / Hostels</span>
                        </div>
                        <div className="font-title-md text-title-md text-primary font-bold">50% of 1st Month Rent</div>
                      </div>
                      <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">RES</div>
                          <span className="font-title-md text-title-md text-on-surface">Residential Apartments</span>
                        </div>
                        <div className="font-title-md text-title-md text-primary font-bold">Strictly 1 Month Rent</div>
                      </div>
                      <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">COM</div>
                          <span className="font-title-md text-title-md text-on-surface">Commercial Showrooms &amp; Warehouses</span>
                        </div>
                        <div className="font-title-md text-title-md text-primary font-bold">1.5 Months Rent</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col gap-space-md">
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[28px]">shield</span>
                          <div>
                            <h4 className="font-title-lg text-title-lg text-on-surface font-bold">RBI Trustee-Backed Escrow</h4>
                            <span className="font-label-sm text-label-sm text-secondary">Zero-touch banking integration</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">Active Reserve</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center py-4 bg-surface-container-low rounded-xl">
                        <div className="space-y-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-surface-container-lowest flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[20px]">person</span>
                          </div>
                          <div className="font-label-md text-label-md text-on-surface">Tenant</div>
                          <div className="font-body-sm text-body-sm text-secondary">Deposits funds</div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-primary text-on-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">lock</span>
                          </div>
                          <div className="font-label-md text-label-md text-primary font-bold">GharBazaar Vault</div>
                          <div className="font-body-sm text-body-sm text-secondary">Secures capital</div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-[20px]">home_work</span>
                          </div>
                          <div className="font-label-md text-label-md text-on-surface">Owner</div>
                          <div className="font-body-sm text-body-sm text-secondary">Guaranteed rent</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-surface-container rounded-lg">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">sentiment_very_satisfied</span>
                        <p className="font-body-sm text-body-sm text-on-surface">
                          <strong>72-Hour Refund Guarantee:</strong> When you provide your standard 30-day notice and complete the digital handover checklist, 100% of your deposit is credited back to your bank account directly from the vault.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-space-md">
                      <div className="rounded-xl overflow-hidden shadow-xs h-36 bg-surface-container">
                        <img 
                          className="w-full h-full object-cover" 
                          alt="Modern apartment" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUWwC6lM-tedMNKkTCHn_dEqpwKPyKvHa9hQlnKnsiWx10NEj_-difwylZ57NUPZAFlsGRrCJYGIDbrTV5MQag0yO3r07w5TJmcfAmypmK8uPKkJdQK7G2GDxRv3B6M34lRnltfEy9Fz6NfgtpUv8h9y1FL-qQ_PWPk2eHSIzCIdybl1rCXKIup3HfFleGcpjyD0qzBezyDHubdEzkbue-uLqB0Lvc4qqXpVsEl70"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden shadow-xs h-36 bg-surface-container">
                        <img 
                          className="w-full h-full object-cover" 
                          alt="Student reviewing agreement" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGCC9d5xlUB8vrpMizZkNICafD5wobNl89_r9eJ0-018ALstthUVewl3hVh5V8eYEAHi60PAUoZoHutGoQj3jLdqMXw3cjIAVLVwFB6LImZCq-LAN_mKUlKALQOdMr8FwvBYidJpM4s9-n4UOeHUk4OGlIvLOjDfo-rqq3rsUxCEDhD_brI5YFil5MnT46MatF8-vGcKik2e3aDHZhO2JSV7M8gLTPffqe4Q655Es"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Add-On Services */}
          <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto space-y-space-lg">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
                <div>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Add-On Documentation Services</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Institutional Compliance at Cost Price</h2>
                </div>
                <p className="font-body-sm text-body-sm text-secondary max-w-md">
                  Say goodbye to predatory notaries, stamp duty gouging, and one-sided clauses. Our legal team automates bulletproof tenancy agreements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Standard Add-On</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-on-surface">Legal Tenancy Agreement</h4>
                    <p className="font-body-sm text-body-sm text-secondary">
                      RERA compliant bilingual contract drafted by property attorneys with digital e-Sign integration.
                    </p>
                    <div className="pt-2 flex items-baseline gap-1">
                      <span className="font-headline-md text-headline-md text-primary font-bold">₹200</span>
                      <span className="font-label-sm text-label-sm text-secondary">+ 18% GST / agreement</span>
                    </div>
                  </div>
                  <div className="pt-space-md">
                    <button className="w-full py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all text-center">
                      Add to Booking Cart
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">verified</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary uppercase">Safety Mandate</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-on-surface">Police Verification Concierge</h4>
                    <p className="font-body-sm text-body-sm text-secondary">
                      Complete digital KYC submission to local commissionerate portals without visiting stations.
                    </p>
                    <div className="pt-2 flex items-baseline gap-1">
                      <span className="font-headline-md text-headline-md text-primary font-bold">₹150</span>
                      <span className="font-label-sm text-label-sm text-secondary">+ 18% GST / tenant</span>
                    </div>
                  </div>
                  <div className="pt-space-md">
                    <button className="w-full py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all text-center">
                      Request Verification
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary uppercase">Logistics</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-on-surface">Move-In Sanitization Pass</h4>
                    <p className="font-body-sm text-body-sm text-secondary">
                      Pre-move chemical sanitization, fixture checking, and packing material assistance from our marketplace.
                    </p>
                    <div className="pt-2 flex items-baseline gap-1">
                      <span className="font-headline-md text-headline-md text-primary font-bold">₹799</span>
                      <span className="font-label-sm text-label-sm text-secondary">Starting flat</span>
                    </div>
                  </div>
                  <div className="pt-space-md">
                    <button className="w-full py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all text-center">
                      Explore Move-In Perks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculator */}
          <section className="w-full bg-surface py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-md">
                <div className="max-w-2xl space-y-2 mb-space-lg">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Interactive Transparency Tool</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Estimate Your Upfront Move-In Cost</h2>
                  <p className="font-body-md text-body-md text-secondary">
                    Input your estimated monthly rent to calculate exact one-time booking fee, escrow lock requirement, and 100% refundable sum.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                  <div className="lg:col-span-7 space-y-space-md">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">Select Property Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setCalcCategory('pg', 999, 0.5)}
                          className={`px-3 py-2.5 rounded-lg font-label-md text-label-md text-center transition-all ${
                            activeCategory === 'pg'
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                          }`}
                        >
                          PG / Hostel
                        </button>
                        <button
                          onClick={() => setCalcCategory('res', 1999, 1.0)}
                          className={`px-3 py-2.5 rounded-lg font-label-md text-label-md text-center transition-all ${
                            activeCategory === 'res'
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                          }`}
                        >
                          Residential Flat
                        </button>
                        <button
                          onClick={() => setCalcCategory('com', 2999, 1.5)}
                          className={`px-3 py-2.5 rounded-lg font-label-md text-label-md text-center transition-all ${
                            activeCategory === 'com'
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                          }`}
                        >
                          Commercial
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-label-lg text-label-lg text-on-surface">Monthly Rent (₹)</label>
                        <span className="font-title-md text-title-md text-primary font-bold">
                          ₹{rent.toLocaleString('en-IN')} / month
                        </span>
                      </div>
                      <input
                        type="range"
                        min="3000"
                        max="150000"
                        step="1000"
                        value={rent}
                        onChange={(e) => setRent(parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between font-label-sm text-label-sm text-secondary mt-1">
                        <span>₹3,000</span>
                        <span>₹75,000</span>
                        <span>₹1,50,000</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="calc-agreement"
                        checked={agreementChecked}
                        onChange={(e) => setAgreementChecked(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                      />
                      <label htmlFor="calc-agreement" className="font-body-md text-body-md text-on-surface cursor-pointer">
                        Include Legal Tenancy Agreement drafting (+₹200 + GST)
                      </label>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-surface-container-low p-space-md lg:p-space-lg rounded-xl space-y-space-sm">
                    <h4 className="font-title-md text-title-md text-on-surface font-bold pb-2">Estimated Settlement Breakdown</h4>
                    
                    <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                      <span>One-Time GharBazaar Access Fee:</span>
                      <span className="text-on-surface font-semibold">₹{values.baseFee.toLocaleString('en-IN')}.00</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                      <span>GST (18% on service charge):</span>
                      <span className="text-on-surface font-semibold">₹{values.gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                      <span>Agreement Documentation:</span>
                      <span className="text-on-surface font-semibold">₹{values.agreement.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-body-sm text-secondary pb-2">
                      <span>Escrow Security Deposit:</span>
                      <span className="text-primary font-bold">₹{values.escrow.toLocaleString('en-IN')}.00</span>
                    </div>

                    <div className="p-space-sm bg-surface-container-lowest rounded-lg space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-title-md text-title-md text-on-surface font-bold">Total Initial Payout:</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          ₹{Math.round(values.total).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-[14px]">info</span>
                        <span>
                          Of which <strong className="text-primary">₹{values.escrow.toLocaleString('en-IN')}.00</strong> is 100% refundable upon exit.
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-2 py-3 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-all text-center">
                      Lock In This Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="w-full bg-surface-container py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[1360px] mx-auto space-y-space-lg">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Student &amp; Family Voices</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Trusted by Over 18,400+ Renters in NCR &amp; Mathura</h2>
                <p className="font-body-md text-body-md text-secondary">
                  Read how direct owner verification and zero-touch security escrow made renting seamless.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {/* Review 1 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      ))}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      "I shifted from Kanpur to Mathura for GLA University. Usually brokers demand 1 month rent as their cut plus 3 months advance. With GharBazaar, I paid ₹999 once, verified the room photos via video tour, and my deposit was safe in their vault. Got my complete refund when my semester ended!"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-space-xs">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
                      AK
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface font-semibold">Aarav Kulshrestha</div>
                      <div className="font-label-sm text-label-sm text-secondary">GLA University Student • Mathura</div>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      ))}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      "Finding a clean 3BHK flat in Noida without getting 40 calls a day from spam brokers seemed impossible until GharBazaar. The ₹1,999 fee felt insignificant compared to the ₹35,000 brokerage standard agents wanted. Plus, having the ₹200 rental agreement drafted online saved my weekend."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-space-xs">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
                      SM
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface font-semibold">Sneha &amp; Rohit Mathur</div>
                      <div className="font-label-sm text-label-sm text-secondary">Tech Professionals • Sector 137, Noida</div>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-between">
                  <div className="space-y-space-sm">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      ))}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      "We booked our electronics repair showroom in Vrindavan. The commercial lease vetting through GharBazaar verified the owner's title deed right away so our trade license had zero hitches. The 1.5 month escrow gave both parties peace of mind."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-space-xs">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
                      DG
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface font-semibold">Devendra Goyal</div>
                      <div className="font-label-sm text-label-sm text-secondary">Commercial Retailer • Vrindavan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full bg-surface py-space-xl px-margin-mobile lg:px-margin">
            <div className="max-w-[880px] mx-auto space-y-space-lg">
              <div className="text-center space-y-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Clear Answers</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Frequently Asked Questions</h2>
                <p className="font-body-md text-body-md text-secondary">
                  Everything you need to know about the GharBazaar one-time model and escrow safety.
                </p>
              </div>

              <div className="space-y-space-sm">
                {[
                  {
                    q: "Is this really a one-time fee, or will I be charged every month?",
                    a: "It is 100% a one-time fee. Unlike traditional listing portals that enroll you in monthly auto-debit plans, GharBazaar charges once per tenancy search cycle. Your account remains active until you finalize your lease."
                  },
                  {
                    q: "How does GharBazaar ensure my deposit is refunded when I vacate?",
                    a: "Your security deposit is parked in an independent, RBI-regulated Escrow Trust Account. Neither the landlord nor GharBazaar can unilaterally deduct funds without photographic inspection evidence and adherence to the legal agreement notice clause."
                  },
                  {
                    q: "What is included in the ₹200 Rental Agreement service?",
                    a: "Our legal team prepares a legally enforceable, bilingual (Hindi/English) rent agreement aligned with the Model Tenancy Act. Both parties authenticate securely via Aadhaar e-Sign, and a signed digital copy is delivered immediately."
                  },
                  {
                    q: "How do you prevent spam calls from brokers?",
                    a: "Your real phone number is never exposed in public directories. All communications happen either inside GharBazaar's secured messaging bridge or via virtual masked calls. Once you book a home, only that specific verified owner receives your contact."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-surface-container-low rounded-xl p-space-md cursor-pointer transition-all hover:bg-surface-container"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-title-md text-title-md text-on-surface font-semibold">{faq.q}</h4>
                      <span className={`material-symbols-outlined text-primary text-[20px] transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </div>
                    {openFaq === index && (
                      <p className="font-body-sm text-body-sm text-secondary pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="w-full bg-primary py-space-xl px-margin-mobile lg:px-margin text-on-primary">
            <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="space-y-space-xs max-w-xl">
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Move In with Confidence
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
                  Ready to Find Your Next Home Without Broker Hassle?
                </h3>
                <p className="font-body-md text-body-md text-primary-fixed-dim">
                  Join thousands of smart renters in Mathura, Agra, Noida and across India. Pick your plan and begin exploring physically verified listings today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-space-sm w-full md:w-auto shrink-0">
                <a
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 bg-on-primary text-primary hover:bg-surface-container-lowest font-label-lg text-label-lg px-space-lg py-3 rounded-xl shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  Browse Verified Listings
                </a>
                <a
                  href="tel:+919548283300"
                  className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-container/80 text-on-primary font-label-lg text-label-lg px-space-lg py-3 rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  Talk to Tenant Support
                </a>
              </div>
            </div>
          </section>
        </div>
        ) : activeTab === 'owners' ? (
          <PricingOwners />
        ) : activeTab === 'partners' ? (
          <PricingPartners />
        ) : (
          <PricingVendors />
        )}
      </main>
    </>
  );
}
