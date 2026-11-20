// ─────────────────────────────────────────────────────────────────────────────
// MarketplaceHome.jsx — Fully responsive across all screen sizes
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck, Zap, Phone, MapPin, IndianRupee,
  ChevronDown, Package, Users, Headphones,
} from "lucide-react";
import MarketplaceProductCard, { MarketplaceProductSkeleton }
  from "./MarketplaceProductCard";

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  cement:   "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  tiles:    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
  steel:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  kitchen:  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  warehouse:"https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80",
  smart:    "https://images.unsplash.com/photo-1558002038-1055e2e6a6f4?w=400&q=80",
  sofa:     "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  bed:      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
  lock:     "https://images.unsplash.com/photo-1558618047-3c8d4d9e1b00?w=400&q=80",
  switch:   "https://images.unsplash.com/photo-1621905251189-08b45249b475?w=400&q=80",
  floor:    "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&q=80",
  marble:   "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80",
  sand:     "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  tmt:      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
  table:    "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&q=80",
  office:   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  security: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
  brick:    "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=400&q=80",
};

// ─── Product data ─────────────────────────────────────────────────────────────
const BUILDING_PRODUCTS = [
  { id:1,  name:"White Cement",     image:IMG.cement,    price:450,  unit:"bag",   rating:4.5, seller:"Sharma Building Materials" },
  { id:2,  name:"Verified Tiles",   image:IMG.tiles,     price:45,   unit:"sq.ft", rating:4.5, seller:"Royal Tiles & Sanitary"    },
  { id:3,  name:"TMT Steel Bars",   image:IMG.steel,     price:5800, unit:"ton",   rating:4.5, seller:"Sharma Building Materials" },
  { id:4,  name:"Kitchen Tiles",    image:IMG.kitchen,   price:550,  unit:"sq.ft", rating:4.5, seller:"Sharma Building Materials" },
  { id:5,  name:"Warehouse Cement", image:IMG.warehouse, price:450,  unit:"bag",   rating:4.5, seller:"Sharma Building Materials" },
];

const SMART_PRODUCTS = [
  { id:6,  name:"Smart Locks",      image:IMG.lock,      price:1299, unit:"pc",    rating:4.5, seller:"SmartHome India"           },
  { id:7,  name:"Security Systems", image:IMG.security,  price:4999, unit:"set",   rating:4.5, seller:"SecureTech Solutions"      },
  { id:8,  name:"Smart Switches",   image:IMG.switch,    price:599,  unit:"pc",    rating:4.5, seller:"SmartHome India"           },
  { id:9,  name:"Smart Lighting",   image:IMG.smart,     price:799,  unit:"pc",    rating:4.5, seller:"LightTech India"           },
  { id:10, name:"Home Automation",  image:IMG.kitchen,   price:8999, unit:"set",   rating:4.5, seller:"AutoHome India"            },
];

const FURNITURE_PRODUCTS = [
  { id:11, name:"Sofa Sets",        image:IMG.sofa,      price:12999,unit:"set",   rating:4.5, seller:"FurnitureMart"             },
  { id:12, name:"Verified Tiles",   image:IMG.tiles,     price:45,   unit:"sq.ft", rating:4.5, seller:"Royal Tiles & Sanitary"    },
  { id:13, name:"Dining Tables",    image:IMG.table,     price:8999, unit:"pc",    rating:4.5, seller:"FurnitureMart"             },
  { id:14, name:"Office Furniture", image:IMG.office,    price:15999,unit:"set",   rating:4.5, seller:"OfficePro India"           },
  { id:15, name:"Bedroom Sets",     image:IMG.bed,       price:22999,unit:"set",   rating:4.5, seller:"FurnitureMart"             },
];

// ─── Category sections ────────────────────────────────────────────────────────
const CAT_SECTIONS = [
  {
    id:"building", title:"Building Materials", tag:"Up to 30% off", sub:"Building Material",
    items:[
      { label:"Cement & Steel",   image:IMG.cement   },
      { label:"Bricks & Blocks",  image:IMG.brick    },
      { label:"Sand & Aggregates",image:IMG.sand     },
      { label:"TMT Bars",         image:IMG.tmt      },
    ],
  },
  {
    id:"smart", title:"Smart Home Devices", tag:"Starting ₹199", sub:"Premium Quality",
    items:[
      { label:"Smart Locks",      image:IMG.lock     },
      { label:"Security Systems", image:IMG.security },
      { label:"Smart Switches",   image:IMG.switch   },
      { label:"Smart Lighting",   image:IMG.smart    },
    ],
  },
  {
    id:"tiles", title:"Tiles & Flooring", tag:"Best Quality", sub:"Verified Vendors",
    items:[
      { label:"Vitrified Tiles",  image:IMG.tiles    },
      { label:"Ceramic Tiles",    image:IMG.marble   },
      { label:"Wooden Flooring",  image:IMG.floor    },
      { label:"Marble Tiles",     image:IMG.marble   },
    ],
  },
  {
    id:"furniture", title:"Furniture & Decor", tag:"Premium & Exclusive", sub:"Collections",
    items:[
      { label:"Sofa Sets",        image:IMG.sofa     },
      { label:"Dining Tables",    image:IMG.table    },
      { label:"Bedroom Sets",     image:IMG.bed      },
      { label:"Office Furniture", image:IMG.office   },
    ],
  },
];

// ─── Why Choose ───────────────────────────────────────────────────────────────
const WHY = [
  { icon:<Package size={22} className="text-[#1B9E4B]" />,    val:"1000+",  label:"Products",         sub:"Verified listings from trusted vendors across India."   },
  { icon:<Users size={22} className="text-[#1B9E4B]" />,      val:"Trusted",label:"by Thousands",     sub:"Safe and reliable marketplace for every home need."     },
  { icon:<BadgeCheck size={22} className="text-[#1B9E4B]" />, val:"100+",   label:"Verified Vendors", sub:"Authenticated sellers and manufacturers only."          },
  { icon:<Headphones size={22} className="text-[#1B9E4B]" />, val:"24/7",   label:"Support",          sub:"Quick response from our dedicated support team."        },
  { icon:<Zap size={22} className="text-[#1B9E4B]" />,        val:"Zero",   label:"Commission",       sub:"Connect directly with vendors at best prices."          },
];

// ─── Product row ──────────────────────────────────────────────────────────────
function ProductRow({ title, products }) {
  const navigate = useNavigate();
  return (
    <section className="bg-[#EDE8DF] px-3 sm:px-6 md:px-10 lg:px-14 py-5 sm:py-7">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => navigate("/contact")}
          className="text-xs font-semibold text-gray-600 hover:text-[#1B9E4B] hover:underline whitespace-nowrap transition-colors"
        >
          Explore more →
        </button>
      </div>
      {/* Mobile: horizontal scroll single row | sm+: grid */}
      <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:items-start overflow-x-auto scrollbar-hide sm:overflow-visible gap-3 pb-2 sm:pb-0">
        {products.map((p) => (
          <div key={p.id} className="flex-none w-[200px] sm:w-auto">
            <MarketplaceProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Requirement form ─────────────────────────────────────────────────────────
function RequirementForm() {
  const [form, setForm] = useState({ name:"", mobile:"", looking:"", location:"", budget:"" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section className="bg-[#1B4332] px-3 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">

        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#2d6a4f] text-[#b7e4c7] text-[10px] font-bold px-3 py-1 rounded-full mb-3">
            🤝 We're Here to Help
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-3">
            Looking for the Product for your Home?
          </h2>
          <p className="text-[#95d5b2] text-xs leading-relaxed mb-5">
            Tell us your requirements and our expert will help you find the best options.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { icon:<BadgeCheck size={14} />, label:"Verified\nVendors"      },
              { icon:<Users size={14} />,      label:"Trusted by\nThousands"  },
              { icon:<Zap size={14} />,        label:"Quick\nResponse"        },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <div className="w-9 h-9 rounded-full bg-[#2d6a4f] flex items-center justify-center text-[#b7e4c7]">
                  {icon}
                </div>
                <span className="text-[9px] text-[#95d5b2] font-medium leading-tight whitespace-pre-line">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-base font-bold text-white mb-4">Send Your Requirements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-2.5">
              <span className="text-white/50 text-xs shrink-0">👤</span>
              <input value={form.name} onChange={(e) => set("name",e.target.value)} placeholder="Your Name"
                className="flex-1 bg-transparent text-white text-xs placeholder:text-white/40 outline-none min-w-0" />
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-2.5">
              <Phone size={13} className="text-white/50 shrink-0" />
              <input value={form.mobile} onChange={(e) => set("mobile",e.target.value)} placeholder="Mobile Number"
                className="flex-1 bg-transparent text-white text-xs placeholder:text-white/40 outline-none min-w-0" />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-2.5">
              <input value={form.looking} onChange={(e) => set("looking",e.target.value)} placeholder="I'm looking for..."
                className="flex-1 bg-transparent text-white text-xs placeholder:text-white/40 outline-none min-w-0" />
              <ChevronDown size={14} className="text-white/40 shrink-0" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-2.5">
              <MapPin size={13} className="text-white/50 shrink-0" />
              <input value={form.location} onChange={(e) => set("location",e.target.value)} placeholder="Preferred Location"
                className="flex-1 bg-transparent text-white text-xs placeholder:text-white/40 outline-none min-w-0" />
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-2.5">
              <IndianRupee size={13} className="text-white/50 shrink-0" />
              <input value={form.budget} onChange={(e) => set("budget",e.target.value)} placeholder="Budget Range"
                className="flex-1 bg-transparent text-white text-xs placeholder:text-white/40 outline-none min-w-0" />
              <ChevronDown size={14} className="text-white/40 shrink-0" />
            </div>
          </div>
          <button className="w-full bg-white hover:bg-gray-50 active:scale-[0.98] text-[#1B4332] font-bold text-sm py-3 rounded transition-all">
            Submit Requirement
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MarketplaceHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#EDE8DF] min-h-screen" style={{ fontFamily:"'Poppins','Plus Jakarta Sans',sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#1B4332] px-4 sm:px-8 md:px-14 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2">
            Tools, Hardware<br />& Electricals
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Everything in Your Hands!
          </h1>
        </div>
      </section>

      {/* ── FIND HOME MATERIALS ──────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 sm:px-8 py-6 sm:py-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
                Find Home Materials
              </h2>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1B9E4B] leading-tight mb-3">
                Near You
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-5">
                Connect with India's top-rated vendors and manufacturers.<br className="hidden sm:block" />
                Zero hidden charges. 100% verified vendors.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button onClick={() => navigate("/contact")}
                  className="bg-[#1B9E4B] hover:bg-[#147638] active:scale-[0.98] text-white text-sm font-bold px-4 sm:px-5 py-2.5 rounded transition-all">
                  List Products Free
                </button>
                <button onClick={() => navigate("/contact")}
                  className="bg-[#1B9E4B] hover:bg-[#147638] active:scale-[0.98] text-white text-sm font-bold px-4 sm:px-5 py-2.5 rounded transition-all">
                  Post Requirement
                </button>
              </div>
            </div>
            {/* Category pills — row on mobile, column on lg */}
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap lg:flex-nowrap shrink-0">
              {["Building Materials","Electronic Devices","Home Furniture"].map((cat) => (
                <button key={cat}
                  className="border border-[#1B9E4B] text-[#1B9E4B] hover:bg-[#1B9E4B] hover:text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded transition-all whitespace-nowrap">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW PRODUCTS ─────────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">New Products</h2>
          <button onClick={() => navigate("/contact")}
            className="text-xs font-semibold text-gray-600 hover:text-[#1B9E4B] hover:underline whitespace-nowrap transition-colors">
            Explore more →
          </button>
        </div>
        {/* Mobile: horizontal scroll single row | sm+: grid */}
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:items-start overflow-x-auto scrollbar-hide sm:overflow-visible gap-3 pb-2 sm:pb-0">
          {BUILDING_PRODUCTS.map((p) => (
            <div key={p.id} className="flex-none w-[200px] sm:w-auto">
              <MarketplaceProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Categories</h2>
          <p className="text-gray-500 mt-1.5 text-sm sm:text-base">
            Explore hand-picked products tailored to your needs.
          </p>
        </div>
        {/* Mobile: 1 col | sm: 2 | xl: 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {CAT_SECTIONS.map(({ id, title, tag, sub, items }) => (
            <div key={id}
              className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-900 leading-tight">{title}</p>
                  <p className="text-[11px] font-semibold text-gray-600 leading-tight mt-0.5">{tag} | {sub}</p>
                </div>
                <button className="text-[10px] sm:text-[11px] text-gray-500 hover:text-[#1B9E4B] hover:underline whitespace-nowrap shrink-0 ml-2 transition-colors">
                  Explore more→
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {items.map(({ label, image }) => (
                  <div key={label} className="group/item cursor-pointer">
                    <div className="overflow-hidden bg-gray-100">
                      <img src={image} alt={label}
                        className="w-full h-[110px] sm:h-[130px] md:h-[140px] object-cover transition-transform duration-500 group-hover/item:scale-110" />
                    </div>
                    <p className="text-[11px] sm:text-[12px] font-semibold text-gray-800 mt-1.5 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT ROWS ─────────────────────────────────────────────────────── */}
      <ProductRow title="Building Materials"  products={BUILDING_PRODUCTS}  />
      <ProductRow title="Smart Home Devices"  products={SMART_PRODUCTS}     />
      <ProductRow title="Furniture & Decor"   products={FURNITURE_PRODUCTS} />

      {/* ── REQUIREMENT FORM ─────────────────────────────────────────────────── */}
      <RequirementForm />

      {/* ── WHY CHOOSE ───────────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 md:px-10 lg:px-14 py-10 sm:py-12">
        <div className="text-center mb-7 sm:mb-9">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
            Why Choose GharBazaar Products?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            India's trusted marketplace for Building Materials &amp; Home Products.
          </p>
        </div>
        {/* Mobile: 2 cols | sm: 3 | lg: 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {WHY.map(({ icon, val, label, sub }) => (
            <div key={label}
              className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 sm:p-5 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                {icon}
              </div>
              <p className="text-sm sm:text-base font-extrabold text-gray-900 leading-none">{val}</p>
              <p className="text-xs font-bold text-gray-700 leading-tight">{label}</p>
              <p className="text-[10px] text-gray-400 leading-relaxed hidden sm:block">{sub}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
