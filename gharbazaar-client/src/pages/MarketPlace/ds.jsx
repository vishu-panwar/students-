// ─────────────────────────────────────────────────────────────────────────────
// GharBazaar Marketplace — Design System
// Tokens, reusable primitives, and shared micro-components
// Font: Poppins (loaded via index.html)
// Brand: #1B7A3E (primary green)  |  BG: #EDE8DF (warm cream)
// ─────────────────────────────────────────────────────────────────────────────

export const DS = {
  // ── Colors ──────────────────────────────────────────────────────────────────
  colors: {
    primary:      "#1B7A3E",
    primaryDark:  "#0f5429",
    primaryLight: "#e8f5ee",
    accent:       "#f5a623",
    bg:           "#EDE8DF",
    bgCard:       "#ffffff",
    text:         "#0A0A0A",
    textMuted:    "#6b7280",
    textLight:    "#9ca3af",
    border:       "#e5e7eb",
    borderLight:  "#f3f4f6",
    success:      "#16a34a",
    error:        "#dc2626",
    warning:      "#d97706",
    info:         "#2563eb",
    badge: {
      verified:  { bg: "#dbeafe", text: "#1d4ed8" },
      available: { bg: "#dcfce7", text: "#15803d" },
      featured:  { bg: "#fef9c3", text: "#a16207" },
      sold:      { bg: "#fee2e2", text: "#dc2626" },
      new:       { bg: "#f0fdf4", text: "#166534" },
    },
  },

  // ── Typography ───────────────────────────────────────────────────────────────
  font: { family: "'Poppins', 'Plus Jakarta Sans', sans-serif" },

  // ── Shadows ──────────────────────────────────────────────────────────────────
  shadow: {
    sm:   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    md:   "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
    lg:   "0 8px 24px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)",
    xl:   "0 16px 40px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)",
    card: "0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Primitive Components
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Loader2 } from "lucide-react";

// ── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ variant = "default", children, className = "" }) {
  const variants = {
    verified: "bg-blue-100 text-blue-700",
    available:"bg-green-100 text-green-700",
    featured: "bg-amber-100 text-amber-700",
    sold:     "bg-red-100 text-red-600",
    new:      "bg-emerald-50 text-emerald-700",
    default:  "bg-gray-100 text-gray-600",
    outline:  "border border-gray-300 text-gray-600 bg-transparent",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ── Button ───────────────────────────────────────────────────────────────────
export function Btn({
  children, variant = "primary", size = "md",
  className = "", loading = false, icon, iconRight, ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  const variants = {
    primary:  "bg-[#1B7A3E] hover:bg-[#0f5429] text-white shadow-sm shadow-[#1B7A3E]/20",
    outline:  "border-2 border-[#1B7A3E] text-[#1B7A3E] hover:bg-[#1B7A3E] hover:text-white",
    ghost:    "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger:   "bg-red-500 hover:bg-red-600 text-white",
    white:    "bg-white text-gray-800 hover:bg-gray-50 shadow-sm border border-gray-200",
    dark:     "bg-gray-900 hover:bg-gray-800 text-white",
  };
  const sizes = {
    xs: "text-[11px] px-3 py-1.5",
    sm: "text-xs px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
    xl: "text-base px-8 py-3.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}

// ── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, error, icon, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-gray-700">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B7A3E]/30 focus:border-[#1B7A3E] transition-all ${icon ? "pl-9" : ""} ${error ? "border-red-400 focus:ring-red-200" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, options = [], className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-gray-700">{label}</label>}
      <select
        className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B7A3E]/30 focus:border-[#1B7A3E] transition-all appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {options.map(({ value, label: lbl }) => (
          <option key={value} value={value}>{lbl}</option>
        ))}
      </select>
    </div>
  );
}

// ── Card shell ───────────────────────────────────────────────────────────────
export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${hover ? "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────
export function SectionHeading({ tag, title, subtitle, center = false, dark = false }) {
  return (
    <div className={`${center ? "text-center" : ""} mb-8`}>
      {tag && (
        <span className="inline-flex items-center gap-1.5 bg-[#e8f5ee] text-[#1B7A3E] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3">
          {tag}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 text-sm leading-relaxed max-w-xl ${center ? "mx-auto" : ""} ${dark ? "text-gray-300" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />;
}

// ── Stat chip ────────────────────────────────────────────────────────────────
export function StatChip({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-9 h-9 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#1B7A3E]">
        {icon}
      </div>
      <p className="text-lg font-black text-gray-900 leading-none">{value}</p>
      <p className="text-[10px] text-gray-400 font-medium">{label}</p>
    </div>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ className = "" }) {
  return <div className={`h-px bg-gray-100 ${className}`} />;
}

// ── Empty state ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 max-w-xs mb-4">{subtitle}</p>}
      {action}
    </div>
  );
}

// ── Page wrapper ─────────────────────────────────────────────────────────────
export function PageWrapper({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen bg-[#EDE8DF] ${className}`}
      style={{ fontFamily: "'Poppins', 'Plus Jakarta Sans', sans-serif" }}
    >
      {children}
    </div>
  );
}

// ── Breadcrumb ───────────────────────────────────────────────────────────────
export function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-gray-300">/</span>}
          {item.href
            ? <a href={item.href} className="hover:text-[#1B7A3E] transition-colors">{item.label}</a>
            : <span className={i === items.length - 1 ? "text-gray-800 font-semibold" : ""}>{item.label}</span>
          }
        </React.Fragment>
      ))}
    </nav>
  );
}

// ── Tag ──────────────────────────────────────────────────────────────────────
export function Tag({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-lg ${className}`}>
      {children}
    </span>
  );
}

// ── Rating stars ─────────────────────────────────────────────────────────────
export function Stars({ rating = 5, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
