// ─────────────────────────────────────────────────────────────────────────────
// MarketplacePropertyDetail.jsx — Full property detail page
// Route: /marketplace/property/:id
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Bed, Bath, Maximize2, Eye, Heart, Share2,
  Phone, BadgeCheck, ChevronLeft, ChevronRight,
  Calendar, ArrowLeft, Home, Zap, Shield,
  CheckCircle2, X, MessageCircle,
} from "lucide-react";
import { useGetPropertyByIdQuery, useToggleBookmarkMutation, useGetPropertiesQuery }
  from "../../store/propertyQuery/getPropertyQuery";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../store/bookmark/bookMarkSlice";
import { toast } from "react-toastify";
import { PageWrapper, Badge, Btn, Breadcrumb, Skeleton, Card, Stars, Divider } from "./ds";
import MarketplacePropertyCard, { PropertyCardSkeleton } from "./MarketplacePropertyCard";

const PLACEHOLDER = "https://via.placeholder.com/800x500?text=GharBazaar";
const WHATSAPP_NO  = "919548283300";

// ── Image gallery ────────────────────────────────────────────────────────────
function Gallery({ images = [], title }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const imgs = images.length ? images : [PLACEHOLDER];
  const prev = () => setActive((a) => (a - 1 + imgs.length) % imgs.length);
  const next = () => setActive((a) => (a + 1) % imgs.length);

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9] sm:aspect-[2/1] cursor-zoom-in"
        onClick={() => setLightbox(true)}>
        <img src={imgs[active]} alt={title}
          className="w-full h-full object-cover transition-all duration-500" />
        {imgs.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] px-2.5 py-1 rounded-full">
              {active + 1} / {imgs.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {imgs.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                active === i ? "border-[#1B7A3E] scale-105" : "border-transparent opacity-60 hover:opacity-100"
              }`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <X size={20} />
          </button>
          <img src={imgs[active]} alt={title}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()} />
          {imgs.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <ChevronLeft size={20} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ── Contact card ─────────────────────────────────────────────────────────────
function ContactCard({ property }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const openWhatsApp = () => {
    const link = `https://gharbazaar.in/property/${property?._id}`;
    const msg = encodeURIComponent(
      `Hi, I'm interested in:\n*${property?.title}*\n📍 ${property?.location}\n💰 ₹${property?.price?.toLocaleString("en-IN")}/month\n\n${link}`
    );
    window.open(`https://wa.me/${WHATSAPP_NO}?text=${msg}`, "_blank");
  };

  const bookVisit = () => {
    if (!user) { navigate("/login"); return; }
    navigate(`/property/${property?._id}`);
  };

  const fmtPrice = (p) => {
    if (!p) return "On Request";
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString("en-IN")}`;
  };

  return (
    <Card className="p-5 sticky top-6">
      {/* Price */}
      <div className="mb-4">
        <p className="text-2xl font-black text-[#1B7A3E]">
          {fmtPrice(property?.price)}
          <span className="text-sm font-medium text-gray-400 ml-1">/month</span>
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge variant={property?.status?.toLowerCase().includes("available") ? "available" : "sold"}>
            {property?.status || "Available"}
          </Badge>
          <Badge variant="verified"><BadgeCheck size={10} /> Verified</Badge>
        </div>
      </div>
      <Divider className="mb-4" />

      {/* Quick meta */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {property?.bedrooms && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5">
            <Bed size={14} className="text-[#1B7A3E]" />
            <span className="text-xs font-semibold text-gray-700">{property.bedrooms} Beds</span>
          </div>
        )}
        {property?.bathrooms && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5">
            <Bath size={14} className="text-[#1B7A3E]" />
            <span className="text-xs font-semibold text-gray-700">{property.bathrooms} Baths</span>
          </div>
        )}
        {property?.area && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 col-span-2">
            <Maximize2 size={14} className="text-[#1B7A3E]" />
            <span className="text-xs font-semibold text-gray-700">{property.area} sq.ft</span>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <Btn className="w-full" size="md" onClick={openWhatsApp}>
          <MessageCircle size={15} /> Book on WhatsApp
        </Btn>
        <Btn className="w-full" size="md" variant="outline" onClick={bookVisit}>
          <Calendar size={15} /> Schedule Visit ₹299
        </Btn>
        <Btn className="w-full" size="md" variant="ghost" onClick={() => navigate(`/property/${property?._id}`)}>
          View Full Details →
        </Btn>
      </div>

      <Divider className="my-4" />
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Shield size={13} className="text-[#1B7A3E] shrink-0" />
        <span>Your data is safe. No spam, ever.</span>
      </div>
    </Card>
  );
}

// ── EMI Calculator ───────────────────────────────────────────────────────────
function EMICalculator({ price }) {
  const [principal, setPrincipal] = useState(price || 5000000);
  const [rate,      setRate]      = useState(8.5);
  const [tenure,    setTenure]    = useState(20);

  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, rate, tenure]);

  const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Zap size={15} className="text-[#1B7A3E]" /> EMI Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-semibold text-gray-600">Loan Amount</label>
            <span className="text-xs font-bold text-[#1B7A3E]">{fmt(principal)}</span>
          </div>
          <input type="range" min={100000} max={50000000} step={100000}
            value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full accent-[#1B7A3E]" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-semibold text-gray-600">Interest Rate</label>
            <span className="text-xs font-bold text-[#1B7A3E]">{rate}%</span>
          </div>
          <input type="range" min={5} max={20} step={0.1}
            value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[#1B7A3E]" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-semibold text-gray-600">Tenure</label>
            <span className="text-xs font-bold text-[#1B7A3E]">{tenure} yrs</span>
          </div>
          <input type="range" min={1} max={30} step={1}
            value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-[#1B7A3E]" />
        </div>
        <div className="bg-[#e8f5ee] rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
          <p className="text-2xl font-black text-[#1B7A3E]">{fmt(emi)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Total: {fmt(emi * tenure * 12)} | Interest: {fmt((emi * tenure * 12) - principal)}
          </p>
        </div>
      </div>
    </Card>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function MarketplacePropertyDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { bookmarks } = useSelector((s) => s.bookmark);
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [bmLoading, setBmLoading] = useState(false);

  const { data: propData, isLoading, isError } = useGetPropertyByIdQuery(id, {
    skip: !id,
  });
  const { data: allData } = useGetPropertiesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const property = propData?.data || propData;

  const similar = useMemo(() => {
    const all = Array.isArray(allData) ? allData : allData?.data || [];
    return all.filter((p) => p._id !== id).slice(0, 4);
  }, [allData, id]);

  const isFav = bookmarks?.some((b) => String(b?._id) === String(id));
  const user  = JSON.parse(localStorage.getItem("user") || "null");

  const handleBm = async (e) => {
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    if (bmLoading) return;
    const was = isFav;
    try {
      setBmLoading(true);
      if (was) dispatch(removeBookmark(id));
      else dispatch(addBookmark(property));
      await toggleBookmark(id).unwrap();
    } catch {
      if (was) dispatch(addBookmark(property));
      else dispatch(removeBookmark(id));
      toast.error("Action failed");
    } finally {
      setBmLoading(false);
    }
  };

  const handleShare = () => {
    navigator.share?.({
      title: property?.title,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    });
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-8">
          <div className="h-4 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            <div>
              <div className="aspect-[2/1] bg-gray-200 rounded-2xl animate-pulse mb-4" />
              <div className="flex gap-2 mb-8">
                {[1,2,3,4].map((k) => <div key={k} className="w-16 h-12 bg-gray-200 rounded-xl animate-pulse" />)}
              </div>
              <div className="space-y-3">
                {[1,2,3,4,5].map((k) => <div key={k} className={`h-4 bg-gray-200 rounded animate-pulse ${k===1?"w-2/3":k===2?"w-1/2":"w-full"}`} />)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (isError || !property) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-lg font-bold text-gray-800 mb-2">Property not found</p>
          <p className="text-sm text-gray-500 mb-4">This listing may have been removed or is unavailable.</p>
          <Btn onClick={() => navigate("/marketplace/listings")} variant="outline">
            ← Back to Listings
          </Btn>
        </div>
      </PageWrapper>
    );
  }

  const { title, location, price, description, images, status, views, type,
          bedrooms, bathrooms, area, amenities = [] } = property;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home",        href: "/" },
          { label: "Marketplace", href: "/marketplace" },
          { label: "Listings",    href: "/marketplace/listings" },
          { label: title || "Property" },
        ]} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1B7A3E] transition-colors mb-5"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── LEFT column ─────────────────────────────────────────────────── */}
          <div className="min-w-0">

            {/* Gallery */}
            <Gallery images={images} title={title} />

            {/* Title + action row */}
            <div className="flex items-start justify-between gap-4 mt-6 mb-2">
              <div className="flex-1 min-w-0">
                {type && (
                  <span className="inline-block text-[10px] font-semibold text-[#1B7A3E] bg-[#e8f5ee] px-2.5 py-0.5 rounded-md mb-2">
                    {type}
                  </span>
                )}
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-2">
                  {title}
                </h1>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#1B7A3E] shrink-0" />
                  <span className="text-sm text-gray-500">{location}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={handleBm} disabled={bmLoading}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                    isFav ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-500 hover:border-red-200"
                  }`}>
                  <Heart size={15} className={isFav ? "fill-red-500" : ""} />
                </button>
                <button onClick={handleShare}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:border-[#1B7A3E] transition-all hover:scale-105 active:scale-95">
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {/* Badges + views */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant={status?.toLowerCase().includes("available") ? "available" : "sold"}>
                {status || "Available"}
              </Badge>
              <Badge variant="verified"><BadgeCheck size={10} /> Verified</Badge>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Eye size={12} /> {Array.isArray(views) ? views.length : views || 0} views
              </span>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-7">
              {[
                bedrooms  && { icon: <Bed size={16} />,      label: "Bedrooms",  val: bedrooms  },
                bathrooms && { icon: <Bath size={16} />,     label: "Bathrooms", val: bathrooms },
                area      && { icon: <Maximize2 size={16} />,label: "Area",      val: `${area} sq.ft` },
                type      && { icon: <Home size={16} />,     label: "Type",      val: type },
              ].filter(Boolean).map(({ icon, label, val }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm text-center">
                  <div className="text-[#1B7A3E]">{icon}</div>
                  <p className="text-xs font-bold text-gray-900">{val}</p>
                  <p className="text-[10px] text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {description && (
              <section className="mb-7">
                <h2 className="text-base font-bold text-gray-900 mb-3">About this Property</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
              </section>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="mb-7">
                <h2 className="text-base font-bold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100 shadow-sm">
                      <CheckCircle2 size={14} className="text-[#1B7A3E] shrink-0" />
                      <span className="text-xs font-medium text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Map placeholder */}
            <section className="mb-7">
              <h2 className="text-base font-bold text-gray-900 mb-3">Location</h2>
              <div className="w-full h-52 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative">
                <div className="text-center text-gray-400">
                  <MapPin size={28} className="mx-auto mb-2 text-[#1B7A3E]" />
                  <p className="text-sm font-medium text-gray-600">{location}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location || "")}`}
                    target="_blank" rel="noreferrer"
                    className="mt-2 inline-block text-xs text-[#1B7A3E] hover:underline font-semibold"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </section>

            {/* EMI Calculator */}
            <section className="mb-7">
              <EMICalculator price={price} />
            </section>

            {/* Similar properties */}
            {similar.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4">Similar Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similar.map((p) => (
                    <MarketplacePropertyCard key={p._id} property={p} layout="grid" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT column ────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <ContactCard property={property} />
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
                  <Shield size={16} className="text-[#1B7A3E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 mb-0.5">GharBazaar Verified</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    This property has been physically inspected and verified by our field team. Zero brokerage, zero hidden charges.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
