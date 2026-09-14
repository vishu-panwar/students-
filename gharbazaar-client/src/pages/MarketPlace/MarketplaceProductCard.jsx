// ─────────────────────────────────────────────────────────────────────────────
// MarketplaceProductCard.jsx
// Structure identical to RecentCard — never overflows at any screen size
// Price on its own line, Buy + Details as two equal buttons below
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Heart, Star, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MarketplaceProductCard({ product }) {
  const [liked,   setLiked]   = useState(false);
  const [imgErr,  setImgErr]  = useState(false);
  const navigate = useNavigate();

  const {
    name    = "Premium Cement",
    image,
    price   = 450,
    unit    = "bag",
    rating  = 4.5,
    seller  = "Sharma Building Materials",
    inStock = true,
  } = product || {};

  const handleBuy = (e) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) { navigate("/login"); return; }
    toast.success("Added to cart!");
  };

  const fmtPrice = (p) => {
    if (!p) return "0";
    if (p >= 100000) return `${(p / 100000).toFixed(1)}L`;
    if (p >= 1000)   return p.toLocaleString("en-IN");
    return String(p);
  };

  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col p-2.5">

      {/* IMAGE */}
      <div className="relative h-[150px] w-full overflow-hidden bg-gray-100 rounded-sm shrink-0">
        <img
          src={(!imgErr && image) || "https://placehold.co/400x300/f1f5f9/94a3b8?text=Product"}
          alt={name}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* In Stock */}
        {inStock && (
          <span className="absolute top-2 left-2 bg-[#1B9E4B] text-white text-[10px] font-semibold px-2 py-0.5 leading-tight">
            In Stock
          </span>
        )}

        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Heart size={13} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-1 pt-2.5 pb-1 flex flex-col flex-1 justify-between">

        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-[12px] font-bold text-gray-900 leading-snug flex-1 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-semibold text-gray-500">{rating}</span>
          </div>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-1 mb-2.5">
          <Store size={9} className="text-gray-400 shrink-0" />
          <span className="text-[10px] text-gray-400 line-clamp-1">by {seller}</span>
        </div>

        {/* Price + Buttons */}
        <div className="pt-2 border-t border-gray-100">
          {/* Price row — always has room, no buttons competing */}
          <div className="flex items-baseline text-[#147638] mb-2">
            <span className="text-xs font-extrabold">₹</span>
            <span className="text-sm font-black tracking-tight ml-0.5">{fmtPrice(price)}</span>
            <span className="text-[9px] text-[#1b9e4b] font-medium ml-0.5">/{unit}</span>
          </div>
          {/* Buttons — each takes exactly 50% of card width, never overflow */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleBuy}
              className="bg-[#147638] hover:bg-[#0f5429] active:scale-95 text-white text-[10px] font-bold py-1.5 transition-colors"
            >
              Buy
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1B9E4B] hover:bg-[#147638] active:scale-95 text-white text-[10px] font-bold py-1.5 transition-colors"
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function MarketplaceProductSkeleton() {
  return (
    <div className="w-full bg-white border border-slate-200 shadow-sm flex flex-col p-2.5 animate-pulse">
      <div className="relative h-[150px] bg-slate-200 rounded-sm overflow-hidden">
        <div className="absolute top-2 left-2 h-4 w-12 bg-white/70 rounded" />
        <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80" />
      </div>
      <div className="px-1 pt-2.5 pb-1 space-y-2">
        <div className="h-3.5 bg-slate-200 rounded w-4/5" />
        <div className="h-3 bg-slate-100 rounded w-3/5" />
        <div className="h-px bg-slate-100 my-1.5" />
        <div className="h-3.5 bg-slate-200 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 bg-emerald-100 rounded" />
          <div className="h-6 bg-emerald-100 rounded" />
        </div>
      </div>
    </div>
  );
}
