import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gift, Users, IndianRupee, Copy, Check,
  Play, ArrowRight, Award, Shield, Star,
  Gem, CircleCheck,
} from "lucide-react";

const BONUS_PRODUCTS = [
  { emoji: "🎁",  count: "5 Referrals",   name: "₹500 Bonus"     },
  { emoji: "⌚",  count: "10 Referrals",  name: "Smart Watch"    },
  { emoji: "🎧",  count: "20 Referrals",  name: "AirPods Pro"    },
  { emoji: "💻",  count: "30 Referrals",  name: "Premium Laptop" },
  { emoji: "📱",  count: "40 Referrals",  name: "iPhone 15"      },
  { emoji: "🏍️", count: "50+ Referrals", name: "Cruiser Bike"   },
];

export default function ReferEarn() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://gharbazaar.in/ref?code=GB10245";
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#f0f2eb] min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-24 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 bg-[#b8f0ce] text-[#0a5c2a] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-sm">
              <Gift size={11} /> Exclusive Program
            </div>
            <div className="mb-6 leading-[1.1]">
              <h1 className="text-[42px] sm:text-[56px] font-extrabold text-gray-900 tracking-tight">Refer Friends.</h1>
              <h1 className="text-[42px] sm:text-[56px] font-extrabold text-[#1B7A3E] tracking-tight">Earn Big.</h1>
              <h1 className="text-[42px] sm:text-[56px] font-extrabold text-gray-400 italic tracking-tight">Unlock Premium Rewards!</h1>
            </div>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-[420px] mb-9">
              Invite friends, help them find their perfect property and earn exciting rewards,
              bonuses and premium benefits. Join India's most rewarding real estate network.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-[#0a3d1f] hover:bg-[#0c4a25] active:scale-[0.98] text-white font-bold text-sm px-7 py-3 rounded-lg transition-all shadow-md shadow-[#0a3d1f]/30"
              >
                Start Referring Now <ArrowRight size={15} />
              </Link>
              <button className="inline-flex items-center gap-2 border border-gray-300 bg-white/80 hover:bg-white text-gray-700 font-semibold text-sm px-5 py-3 rounded-lg transition-all shadow-sm">
                <span className="w-[20px] h-[20px] rounded-full border-[1.5px] border-gray-500 flex items-center justify-center shrink-0">
                  <Play size={7} className="fill-gray-500 text-gray-500 ml-0.5" />
                </span>
                How It Works
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3.5 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#e6f4ec] flex items-center justify-center shrink-0">
                  <Users size={20} className="text-[#1B7A3E]" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-gray-900 leading-none">10,000+</p>
                  <p className="text-[11px] text-gray-400 mt-1">Active Referrers</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3.5 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                  <IndianRupee size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-gray-900 leading-none">₹2.5Cr+</p>
                  <p className="text-[11px] text-gray-400 mt-1">Rewards Distributed</p>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/80">
              <img src="/ReferAndEarnSection.jpg" alt="Refer and Earn" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>

        </div>
      </section>

      {/* ── MEMBERSHIP TIERS ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-24 py-14">
        <div className="max-w-7xl mx-auto">

          {/* Section heading with gradient lines */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-[#1B7A3E]" />
            <span className="text-[13px] font-black tracking-[0.25em] text-gray-800 uppercase">Membership Tiers</span>
            <div className="flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-[#1B7A3E]" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-12">
            The more you refer, the more exclusive your benefits!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

            {/* ── BRONZE ── */}
            <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#d4902e] via-[#b97020] to-[#8a4e10] rounded-2xl flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,200,100,0.18)_0%,_transparent_70%)]" />
                <Award size={72} className="text-white/60" strokeWidth={0.9} />
                <div className="absolute bottom-5 left-5">
                  <p className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">TIER 01</p>
                  <p className="text-white text-2xl font-black tracking-wide leading-none drop-shadow">BRONZE</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-1">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Unlock at</p>
                  <span className="inline-block bg-[#eeeaf8] text-[#5b4b8a] text-xs font-semibold px-4 py-1.5 rounded-full">
                    1 Successful Referral
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2.5">Benefits</p>
                  <ul className="space-y-2.5">
                    {["Referral Link & Dashboard", "Track Referrals & Earnings", "Earn Cashback"].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CircleCheck size={15} className="text-[#1B7A3E] shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-600 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Earning per Referral</p>
                  <p className="text-[38px] font-black text-[#b06820] leading-none">₹100</p>
                </div>
              </div>
            </div>

            {/* ── SILVER ── */}
            <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#b0b0b0] via-[#808080] to-[#545454] rounded-2xl flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />
                <Shield size={72} className="text-white/60" strokeWidth={0.9} />
                <div className="absolute bottom-5 left-5">
                  <p className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">TIER 02</p>
                  <p className="text-white text-2xl font-black tracking-wide leading-none drop-shadow">SILVER</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-1">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Unlock at</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full">
                    10 Successful Referrals
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2.5">Benefits</p>
                  <ul className="space-y-2.5">
                    {["All Bronze Benefits", "Higher Cashback", "Priority Support"].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CircleCheck size={15} className="text-[#1B7A3E] shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-600 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Earning per Referral</p>
                  <p className="text-[38px] font-black text-[#5a5a5a] leading-none">₹150</p>
                </div>
              </div>
            </div>

            {/* ── GOLD — Most Popular ── */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-5 flex flex-col gap-6 border-2 border-[#1B7A3E] mt-6 lg:mt-0 hover:shadow-[0_20px_50px_rgba(27,122,62,0.18)] transition-shadow duration-300">
              <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 z-10 bg-[#0a3d1f] text-white text-[10px] font-black px-5 py-1.5 rounded-full tracking-widest uppercase whitespace-nowrap shadow-lg shadow-[#0a3d1f]/40">
                ✦ MOST POPULAR ✦
              </div>
              <div className="bg-gradient-to-br from-[#f7d860] via-[#e8b930] to-[#c08000] rounded-2xl flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,240,150,0.25)_0%,_transparent_65%)]" />
                <div className="w-[72px] h-[72px] rounded-full border-[2.5px] border-[#9a7000]/50 flex items-center justify-center">
                  <Star size={38} className="text-[#7a5500]/60 fill-[#7a5500]/20" strokeWidth={1.2} />
                </div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-[#8a6000]/60 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">TIER 03</p>
                  <p className="text-[#4a3000] text-2xl font-black tracking-wide leading-none drop-shadow">GOLD</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-1">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Unlock at</p>
                  <span className="inline-block bg-[#d4edda] text-[#155724] text-xs font-semibold px-4 py-1.5 rounded-full">
                    25 Successful Referrals
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2.5">Benefits</p>
                  <ul className="space-y-2.5">
                    {["All Silver Benefits", "VIP Support", "Exclusive Event Invites"].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CircleCheck size={15} className="text-[#1B7A3E] shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-600 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Earning per Referral</p>
                  <p className="text-[38px] font-black text-[#c9960c] leading-none">₹250</p>
                </div>
              </div>
            </div>

            {/* ── ELITE ── */}
            <div className="bg-[#0c0c1e] rounded-3xl shadow-lg p-5 flex flex-col gap-6 border border-[#2e2e55] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#7b26a8] via-[#3d1272] to-[#160936] rounded-2xl flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(160,80,255,0.2)_0%,_transparent_65%)]" />
                <Gem size={72} className="text-white/60" strokeWidth={0.9} />
                <div className="absolute bottom-5 left-5">
                  <p className="text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">TIER 04</p>
                  <p className="text-white text-2xl font-black tracking-wide leading-none drop-shadow">ELITE</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-1">
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-2">Unlock at</p>
                  <span className="inline-block bg-white/10 text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/15">
                    50 Successful Referrals
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-2.5">Benefits</p>
                  <ul className="space-y-2.5">
                    {["Dedicated Relationship Manager", "Elite Community Access", "Max Cashback & Rewards"].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CircleCheck size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-400 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Earning per Referral</p>
                  <p className="text-[38px] font-black text-white leading-none">₹500</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── AMAZING BONUS REWARDS ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col lg:flex-row overflow-hidden">

            {/* Left info panel */}
            <div className="px-8 py-9 lg:w-64 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
              <div>
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#e6f4ec] flex items-center justify-center mb-5 shadow-sm">
                  <Gift size={24} className="text-[#1B7A3E]" />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase leading-snug mb-3 tracking-wide">
                  Amazing Bonus<br />Rewards
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Unlock guaranteed high-value prizes as you hit major referral milestones.
                  Your hard work deserves a premium treat!
                </p>
              </div>
              <Link
                to="/login"
                className="mt-7 inline-flex items-center gap-2 bg-[#0a3d1f] hover:bg-[#0c4a25] text-white font-bold text-xs px-5 py-3 rounded-lg transition-all self-start shadow-md shadow-[#0a3d1f]/25"
              >
                Start Referring Now <ArrowRight size={13} />
              </Link>
            </div>

            {/* Right product tiles */}
            <div className="flex-1 px-6 py-7 grid grid-cols-3 lg:grid-cols-6 gap-5 items-center">
              {BONUS_PRODUCTS.map(({ emoji, count, name }) => (
                <div key={name} className="flex flex-col items-center text-center gap-2">
                  <div className="w-full aspect-square max-w-[84px] rounded-2xl bg-[#f5f5f5] border border-gray-100 flex items-center justify-center text-[32px] shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
                    {emoji}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight">{count}</p>
                  <p className="text-[12px] font-bold text-[#1B7A3E] leading-tight">{name}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK ────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 sm:px-8 md:px-14 lg:px-24 py-14">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] font-black tracking-widest text-[#1B7A3E] uppercase">Your Unique Link</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 mb-2">Share &amp; Start Earning</h2>
          <p className="text-gray-500 text-sm mb-7 leading-relaxed">
            Copy your referral link and send it to friends. Every successful referral puts money in your wallet.
          </p>
          <div className="flex items-center bg-[#f8f9f3] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <span className="flex-1 px-4 py-3.5 text-sm text-gray-500 truncate text-left select-all">{referralLink}</span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm shrink-0 transition-all ${
                copied ? "bg-green-600 text-white" : "bg-[#0a3d1f] hover:bg-[#0c4a25] text-white"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0a3d1f] px-4 sm:px-8 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
          <Gift size={26} className="text-[#4CAF7D]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Start Earning?</h2>
        <p className="text-green-300 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Join thousands of referrers already earning big with GharBazaar. Takes less than 60 seconds to get started.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-white text-[#0a3d1f] font-bold text-sm px-9 py-3.5 rounded-lg hover:bg-green-50 transition-all shadow-lg"
        >
          Start Referring Now <ArrowRight size={15} />
        </Link>
      </section>

    </div>
  );
}
