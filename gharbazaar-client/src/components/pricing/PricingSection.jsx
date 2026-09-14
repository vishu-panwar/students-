import { useState } from "react";
import {
  Check,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Users,
  BadgeIndianRupee,
  HeartHandshake,
  Headphones,
  Home,
  Building2,
  FileText,
  Package,
  Truck,
  ArrowRight,
  HelpCircle,
  Star,
  ChevronUp,
  MapPin,
  Award,
  ThumbsUp,
  Phone,
  Plus,
} from "lucide-react";
import axios from "axios";

const FONT_LINK = `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap`;

const G   = "#0F9D58";
const GD  = "#0a7a44";
const GL  = "#e8f5ee";
const DARK  = "#111827";
const MID   = "#374151";
const SOFT  = "#6b7280";
const BORDER = "#ddd6c8";
const WHITE  = "#ffffff";
const BG    = "#F5F0E8";
const CARD_BG = "#ffffff";
const HERO_HEADING = "#0C3A1D";

/* ─────────────────────────────────────────────
   ALL CSS scoped under .gbp-root so NOTHING
   leaks out and affects Footer or other pages.
   No global * reset. No :root variables.
───────────────────────────────────────────── */
const CSS = `
  /* ── Scoped CSS variables ── */
  .gbp-root {
    --gbp-pad: 24px;
    --gbp-col2: 1fr 1fr;
    --gbp-col4: repeat(4, 1fr);
    --gbp-hero: 36px;
    font-family: 'DM Sans', sans-serif;
    background: #F5F0E8;
    min-height: 100vh;
    box-sizing: border-box;
  }
  .gbp-root *, .gbp-root *::before, .gbp-root *::after {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .gbp-root { --gbp-pad: 16px; --gbp-col2: 1fr; --gbp-col4: 1fr 1fr; --gbp-hero: 26px; }
  }
  @media (max-width: 480px) {
    .gbp-root { --gbp-col4: 1fr; --gbp-hero: 22px; }
  }

  /* ── Page wrapper ── */
  .gbp-wrap {
    max-width: 100%;
    margin: 0 auto;
    padding: 24px var(--gbp-pad) 48px;
  }

  /* ── Section spacing ── */
  .gbp-section { margin-bottom: 40px; }
  .gbp-section:last-child { margin-bottom: 0; }

  /* ── Hero ── */
  .gbp-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: var(--gbp-hero);
    font-weight: 800;
    color: #0C3A1D;
    margin: 0 0 10px;
    line-height: 1.2;
  }
  .gbp-trust-bar {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 18px;
    border-top: 1px solid #ddd6c8;
    padding-top: 18px;
  }
  .gbp-trust-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
    padding: 5px 14px;
    border: 1px solid #ddd6c8;
    border-radius: 20px;
    background: #fff;
    white-space: nowrap;
  }

  /* ══════════════════════════════════
     STUDENT PLANS
  ══════════════════════════════════ */
  .gbp-sp-tab-bar {
    display: none;
  }

  .gbp-sp-single-plan {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    background: #ffffff;
    border: 2px solid #0D6B3F;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  @media (max-width: 900px) { 
    .gbp-sp-single-plan { 
      grid-template-columns: 1fr; 
      gap: 24px;
      padding: 24px;
    } 
  }

  .gbp-sp-left-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .gbp-sp-plan-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .gbp-sp-plan-badge {
    background: #0D6B3F;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 20px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-plan-title {
    font-size: 32px;
    font-weight: 800;
    color: #0F6D38;
    margin: 0 0 8px;
    line-height: 1.2;
    font-family: 'DM Sans', sans-serif;
  }
  @media (max-width: 900px) { .gbp-sp-plan-title { font-size: 26px; } }
  
  .gbp-sp-plan-desc {
    font-size: 14px;
    color: #596560;
    line-height: 1.7;
    margin: 0 0 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .gbp-sp-price-box {
    background: linear-gradient(135deg, #E6F5EC, #D6E3DC);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
  }
  .gbp-sp-price-label {
    font-size: 12px;
    font-weight: 600;
    color: #0D6B3F;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 8px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-price-display {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 12px;
  }
  .gbp-sp-price-amount {
    font-size: 48px;
    font-weight: 800;
    color: #005327;
    line-height: 1;
    font-family: 'DM Sans', sans-serif;
  }
  @media (max-width: 900px) { .gbp-sp-price-amount { font-size: 40px; } }
  .gbp-sp-price-note {
    font-size: 13px;
    color: #3F4940;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }

  .gbp-sp-benefits-section {
    flex: 1;
  }
  .gbp-sp-benefits-title {
    font-size: 16px;
    font-weight: 700;
    color: #1F2937;
    margin: 0 0 16px;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .gbp-sp-benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  @media (max-width: 520px) { .gbp-sp-benefits-grid { grid-template-columns: 1fr; } }
  
  .gbp-sp-benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #374151;
    line-height: 1.6;
    font-family: 'DM Sans', sans-serif;
    background: #F7F8FC;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #E5E7EB;
  }

  .gbp-sp-cta-button {
    width: 100%;
    height: 54px;
    background: #005327;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'DM Sans', sans-serif;
    margin-top: auto;
  }
  .gbp-sp-cta-button:hover { background: #0F6D38; }

  /* ── RIGHT PANEL: CALCULATOR ── */
  .gbp-sp-calculator {
    background: #F5F6FB;
    border-radius: 16px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #D8D4CB;
  }
  .gbp-sp-calc-title {
    font-size: 18px;
    font-weight: 700;
    color: #1F2937;
    margin: 0 0 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-calc-subtitle {
    font-size: 12px;
    color: #6B7280;
    margin: 0 0 16px;
    font-family: 'DM Sans', sans-serif;
  }

  .gbp-sp-calc-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .gbp-sp-calc-label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-calc-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #D8D4CB;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
  }
  .gbp-sp-calc-input:focus {
    outline: none;
    border-color: #0D6B3F;
  }

  .gbp-sp-calc-divider {
    height: 1px;
    background: #D8D4CB;
    margin: 8px 0;
  }

  .gbp-sp-calc-breakdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .gbp-sp-calc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #374151;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-calc-row-label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .gbp-sp-calc-row-value {
    font-weight: 700;
    color: #111827;
  }

  .gbp-sp-calc-total {
    background: #E6F5EC;
    border: 2px solid #0D6B3F;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .gbp-sp-calc-total-label {
    font-size: 14px;
    font-weight: 700;
    color: #0D6B3F;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-sp-calc-total-value {
    font-size: 24px;
    font-weight: 800;
    color: #005327;
    font-family: 'DM Sans', sans-serif;
  }

  .gbp-sp-calc-note {
    background: #fff;
    border: 1px solid #D8D4CB;
    border-radius: 10px;
    padding: 12px;
    font-size: 11px;
    color: #6B7280;
    line-height: 1.6;
    font-family: 'DM Sans', sans-serif;
  }

  /* ══════════════════════════════════
     ADD-ON SERVICES
  ══════════════════════════════════ */
  .gbp-addon-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .gbp-addon-icon-box {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: #E6F5EC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gbp-addon-header-title {
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    color: #1F2937;
    margin: 0 0 2px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.04em;
  }
  .gbp-addon-header-sub {
    font-size: 13px;
    color: #6B7280;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-addon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media (max-width: 900px)  { .gbp-addon-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px)  { .gbp-addon-grid { grid-template-columns: 1fr; } }

  .gbp-addon-card {
    background: #F5F6FB;
    border: 1px solid #D8D4CB;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 260px;
  }
  .gbp-addon-card-top { display: flex; flex-direction: column; align-items: center; }
  .gbp-addon-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #E6F5EC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0D6B3F;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  .gbp-addon-card-title {
    font-size: 13px;
    font-weight: 700;
    color: #1F2937;
    text-align: center;
    line-height: 1.45;
    margin: 0 0 14px;
    font-family: 'DM Sans', sans-serif;
    min-height: 38px;
  }
  .gbp-addon-feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .gbp-addon-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: #374151;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.5;
  }
  .gbp-addon-card-bottom { margin-top: 16px; }
  .gbp-addon-divider {
    border-top: 1px solid #CFCFCF;
    padding-top: 12px;
    margin-bottom: 10px;
    text-align: center;
  }
  .gbp-addon-gst-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6B7280;
    margin: 0 0 2px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-addon-gst-value {
    font-size: 18px;
    font-weight: 700;
    color: #0D6B3F;
    line-height: 1;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-addon-btn {
    width: 100%;
    height: 38px;
    border-radius: 8px;
    border: 1.5px solid #0D6B3F;
    background: transparent;
    color: #0D6B3F;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-addon-btn:hover { background: #0D6B3F; color: #fff; }

  /* ══════════════════════════════════
     PROPERTY OWNER PLANS
  ══════════════════════════════════ */
  .gbp-owner-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .gbp-owner-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 1024px) { .gbp-owner-grid { grid-template-columns: 1fr; } }

  .gbp-owner-card {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid #D8D4CB;
    background: #F7F8FC;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .gbp-owner-card-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    flex: 1;
  }
  .gbp-owner-card-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .gbp-owner-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #E8F5EE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gbp-owner-plan-label {
    font-size: 11px;
    font-weight: 600;
    color: #0D6B3F;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-card-title {
    font-size: 22px;
    font-weight: 800;
    color: #0F6D38;
    margin: 0 0 6px;
    line-height: 1.15;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-card-desc {
    font-size: 13px;
    color: #596560;
    margin: 0;
    line-height: 1.7;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-price-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 8px;
  }
  .gbp-owner-price {
    font-size: 48px;
    font-weight: 800;
    color: #005327;
    line-height: 1;
    font-family: 'DM Sans', sans-serif;
  }
  @media (max-width: 900px) { .gbp-owner-price { font-size: 40px; } }
  .gbp-owner-price-suffix {
    font-size: 13px;
    font-weight: 600;
    color: #147638;
    margin-bottom: 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-tag {
    display: inline-flex;
    align-items: center;
    background: #D6E3DC;
    color: #3F4940;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 4px;
  }
  .gbp-owner-divider { height: 1px; background: #D8E6DE; }

  .gbp-owner-feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
  }
  @media (max-width: 520px) { .gbp-owner-feature-grid { grid-template-columns: 1fr; } }

  .gbp-owner-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #3F4940;
    line-height: 1.6;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-card-footer { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 14px; }
  .gbp-owner-example {
    background: #fff;
    border: 1px solid #D6E3DC;
    border-radius: 14px;
    padding: 14px 16px;
  }
  .gbp-owner-example-label {
    font-size: 11px;
    font-weight: 700;
    color: #3F4940;
    margin: 0 0 6px;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-example-text {
    font-size: 13px;
    color: #3F4940;
    line-height: 1.7;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-cta {
    width: 100%;
    height: 50px;
    background: #005327;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-owner-cta:hover { background: #0F6D38; }

  /* ══════════════════════════════════
     WHY + HOW
  ══════════════════════════════════ */
  .gbp-why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 768px) { .gbp-why-grid { grid-template-columns: 1fr; } }

  .gbp-section-card {
    background: #fff;
    border: 1px solid #ddd6c8;
    border-radius: 16px;
    overflow: hidden;
  }
  .gbp-section-card-header {
    border-bottom: 1px solid #ddd6c8;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .gbp-section-card-title {
    font-size: 13px;
    font-weight: 800;
    color: #0C3A1D;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .gbp-section-card-sub {
    font-size: 11px;
    color: #6b7280;
    margin: 2px 0 0;
    font-family: 'DM Sans', sans-serif;
  }

  .gbp-compare-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    min-width: 240px;
  }
  .gbp-compare-table th {
    padding: 9px 16px;
    font-weight: 600;
    border-bottom: 1px solid #ddd6c8;
  }
  .gbp-compare-table td {
    padding: 8px 16px;
    border-bottom: 1px solid #ddd6c8;
  }

  .gbp-how-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 18px 20px;
  }
  @media (max-width: 520px) { .gbp-how-grid { grid-template-columns: 1fr; } }

  .gbp-how-step {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #374151;
  }
  .gbp-how-step-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    flex-shrink: 0;
    color: #fff;
  }

  /* ══════════════════════════════════
     FAQ
  ══════════════════════════════════ */
  .gbp-faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    padding: 20px;
  }
  @media (max-width: 640px) { .gbp-faq-grid { grid-template-columns: 1fr; } }

  .gbp-faq-item {
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #ddd6c8;
  }
  .gbp-faq-item.open { border-color: #0F9D58; }
  .gbp-faq-q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    gap: 8px;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  }
  .gbp-faq-item.open .gbp-faq-q { background: #e8f5ee; }
  .gbp-faq-a {
    padding: 10px 14px 14px;
    background: #fff;
    border-top: 1px solid #e8f5ee;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #6b7280;
    line-height: 1.7;
    margin: 0;
  }

  /* ══════════════════════════════════
     CTA BANNER
  ══════════════════════════════════ */
  .gbp-cta-wrap {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
    background: linear-gradient(135deg, #0a7a44, #0F9D58);
    border-radius: 16px;
    padding: 24px 28px;
  }
  @media (max-width: 640px) {
    .gbp-cta-wrap { grid-template-columns: 1fr; gap: 16px; padding: 20px; }
  }
  .gbp-cta-btns {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  @media (max-width: 400px) {
    .gbp-cta-btns { flex-direction: column; }
    .gbp-cta-btns button { width: 100%; }
  }

  /* ══════════════════════════════════
     FOOTER STATS
  ══════════════════════════════════ */
  .gbp-footer-stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding-top: 20px;
    border-top: 1px solid #ddd6c8;
    flex-wrap: wrap;
    padding-bottom: 4px;
  }
  @media (max-width: 640px) { .gbp-footer-stats { gap: 14px; } }
  .gbp-footer-stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }
`;

/* ── helpers ── */
const fl = (extra = {}) => ({ display: "flex", ...extra });

/* ── Razorpay ── */
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const startPayment = async ({ amount, planName }) => {
  try {
    const loaded = await loadRazorpay();
    if (!loaded) { alert("Razorpay SDK failed to load"); return; }

    // FIX: `data` (containing the Razorpay key + order info) was previously
    // referenced below without ever being fetched, so every call threw a
    // ReferenceError and immediately fell into the catch block below,
    // showing "Payment Failed" no matter what. We now create the order on
    // the backend first, then use the returned data to open checkout.
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create-order`,
      { amount, planName },
      { withCredentials: true }
    );

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "GharBazaar",
      description: planName,
      theme: { color: "#0D6B3F" },
      handler: async (response) => {
        try {
          const v = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planName: planName,
            },
            { withCredentials: true }
          );
          if (v.data.success) alert("Payment Successful");
          else alert("Payment Verification Failed");
        } catch { alert("Payment Verification Failed"); }
      },
      modal: { ondismiss: () => {} },
    };
    new window.Razorpay(options).open();
  } catch (err) {
    console.error("Payment initiation failed:", err);
    alert("Payment Failed");
  }
};

/* ══════════════════════════════════
   TRUST BAR
══════════════════════════════════ */
const TrustBar = () => (
  <div className="gbp-trust-bar">
    {[
      { icon: <ShieldCheck size={13} color={SOFT} />, label: "Verified Properties" },
      { icon: <Users size={13} color={SOFT} />, label: "Verified Owners" },
      { icon: <BadgeIndianRupee size={13} color={SOFT} />, label: "Transparent Pricing" },
      { icon: <HeartHandshake size={13} color={SOFT} />, label: "No Hidden Charges" },
      { icon: <Headphones size={13} color={SOFT} />, label: "Dedicated Support" },
    ].map(({ icon, label }) => (
      <span key={label} className="gbp-trust-pill">{icon} {label}</span>
    ))}
  </div>
);

/* ══════════════════════════════════
   STUDENT PLANS
══════════════════════════════════ */
const StudentPlans = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [monthlyRent, setMonthlyRent] = useState(15000);

  // Service fee varies by property type - UPDATED PRICING
  const serviceFees = {
    residential: 1999,
    pg: 999,
    commercial: 2999
  };

  const serviceFee = serviceFees[propertyType];
  
  // Security deposit: 50% of monthly rent for ALL property types
  const securityDeposit = Math.round(monthlyRent * 0.5);
  const firstMonthRent = monthlyRent;
  const totalMoveIn = serviceFee + securityDeposit + firstMonthRent;

  const benefits = [
    "Verified Property Access",
    "Rent Agreement Preparation",
    "Police Verification Support",
    "Documentation Assistance",
    "Property Visit Coordination",
    "Owner Verification",
    "Move-In Coordination",
    "Legal Documentation",
    "Tenant Rights Guidance",
    "Maintenance Coordination",
    "24/7 Support Helpline",
    "Dispute Resolution Support",
  ];

  return (
    <section className="gbp-section">
      <div className="gbp-sp-single-plan">
        {/* LEFT PANEL - Benefits */}
        <div className="gbp-sp-left-panel">
          <div>
            <div className="gbp-sp-plan-header">
              <span className="gbp-sp-plan-badge">★ COMPLETE PACKAGE</span>
            </div>
            <h3 className="gbp-sp-plan-title">All-Inclusive Rental Plan</h3>
            <p className="gbp-sp-plan-desc">
              Everything you need to move into your perfect home. From finding the right property to completing all documentation and moving in - we handle it all. One simple fee, unlimited support.
            </p>
          </div>

          <div className="gbp-sp-price-box">
            <p className="gbp-sp-price-label">One-Time Service Fee</p>
            <div className="gbp-sp-price-display">
              <span className="gbp-sp-price-amount">₹{serviceFee.toLocaleString()}</span>
            </div>
            <p className="gbp-sp-price-note">
              Varies by property type • Pay once, get complete assistance
            </p>
          </div>

          <div className="gbp-sp-benefits-section">
            <h4 className="gbp-sp-benefits-title">
              <CheckCircle2 size={18} color="#0D6B3F" />
              Everything Included in Service Fee
            </h4>
            <div className="gbp-sp-benefits-grid">
              {benefits.map((benefit, i) => (
                <div key={i} className="gbp-sp-benefit-item">
                  <Check size={16} color="#0D6B3F" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="gbp-sp-cta-button"
            onClick={() => startPayment({ amount: serviceFee, planName: "All-Inclusive Rental Plan" })}
          >
            Get Started - Pay ₹{serviceFee.toLocaleString()}
          </button>
        </div>

        {/* RIGHT PANEL - Calculator */}
        <div className="gbp-sp-calculator">
          <div>
            <h4 className="gbp-sp-calc-title">Move-In Cost Calculator</h4>
            <p className="gbp-sp-calc-subtitle">Calculate your total upfront costs</p>
          </div>

          {/* Property Type Selector */}
          <div className="gbp-sp-calc-input-group">
            <label className="gbp-sp-calc-label">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="gbp-sp-calc-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="residential">Residential (Apartment/House)</option>
              <option value="pg">PG/Hostel</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>

          <div className="gbp-sp-calc-input-group">
            <label className="gbp-sp-calc-label">Monthly Rent Amount</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
              className="gbp-sp-calc-input"
              placeholder="Enter monthly rent"
              min="0"
              step="1000"
            />
          </div>

          <div className="gbp-sp-calc-divider" />

          <div className="gbp-sp-calc-breakdown">
            <div className="gbp-sp-calc-row">
              <span className="gbp-sp-calc-row-label">
                <ShieldCheck size={14} color="#0D6B3F" />
                GharBazaar Service Fee
              </span>
              <span className="gbp-sp-calc-row-value">₹{serviceFee.toLocaleString()}</span>
            </div>

            <div className="gbp-sp-calc-row">
              <span className="gbp-sp-calc-row-label">
                <BadgeIndianRupee size={14} color="#7c3aed" />
                Security Deposit (50% of rent)
              </span>
              <span className="gbp-sp-calc-row-value">₹{securityDeposit.toLocaleString()}</span>
            </div>

            <div className="gbp-sp-calc-row">
              <span className="gbp-sp-calc-row-label">
                <Home size={14} color="#ea580c" />
                First Month Rent
              </span>
              <span className="gbp-sp-calc-row-value">₹{firstMonthRent.toLocaleString()}</span>
            </div>
          </div>

          <div className="gbp-sp-calc-total">
            <span className="gbp-sp-calc-total-label">Total Move-In Cost</span>
            <span className="gbp-sp-calc-total-value">₹{totalMoveIn.toLocaleString()}</span>
          </div>

          <div className="gbp-sp-calc-note">
            <strong>Payment Details:</strong><br />
            • <strong>Service Fee:</strong> PG/Hostel: ₹999, Residential: ₹1,999, Commercial: ₹2,999 - Paid to GharBazaar<br />
            • <strong>Security Deposit (50% of monthly rent):</strong> Held by GharBazaar for safety & dispute resolution. Refundable at lease end. Flexible and negotiable.<br />
            • <strong>First Month Rent (₹{firstMonthRent.toLocaleString()}):</strong> Paid to property owner on move-in<br />
            <br />
            <strong>Monthly After Move-In:</strong> Only rent to owner (₹{monthlyRent.toLocaleString()}/month)<br />
            <br />
            <strong style={{ color: "#0D6B3F" }}>💡 Security Flexibility:</strong> 50% security deposit applies to all property types. Amount can be negotiated based on property condition, lease duration, and mutual agreement between tenant and owner.
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════
   ADD-ON SERVICES
══════════════════════════════════ */
const addons = [
  { 
    icon: <FileText size={20} />, 
    title: "Rent Agreement Assistance", 
    features: ["Rental Agreement Preparation", "Documentation Coordination", "Verification Guidance"],
    price: 499
  },
  { 
    icon: <ShieldCheck size={20} />, 
    title: "Police Verification Assistance", 
    features: ["Police Verification Support", "Process Guidance", "Documentation Help"],
    price: 499
  },
  { 
    icon: <Package size={20} />, 
    title: "Documentation Assistance", 
    features: ["Tenant Documentation Support", "Form Guidance", "Verification Assistance"],
    price: 499
  },
  { 
    icon: <Truck size={20} />, 
    title: "Move-In Coordination", 
    features: ["Move-In Planning", "Owner Coordination", "Final Occupancy Support"],
    price: 499
  },
];

const AddOnServices = () => (
  <section className="gbp-section">
    <div className="gbp-addon-header">
      <div className="gbp-addon-icon-box">
        <Package size={18} color="#0D6B3F" />
      </div>
      <div>
        <h2 className="gbp-addon-header-title">Optional Add-On Services</h2>
        <p className="gbp-addon-header-sub">₹499 per service - Choose what you need</p>
      </div>
    </div>
    <div className="gbp-addon-grid">
      {addons.map((addon) => (
        <div key={addon.title} className="gbp-addon-card">
          <div className="gbp-addon-card-top">
            <div className="gbp-addon-card-icon">{addon.icon}</div>
            <p className="gbp-addon-card-title">{addon.title}</p>
            <ul className="gbp-addon-feature-list">
              {addon.features.map((f) => (
                <li key={f} className="gbp-addon-feature-item">
                  <Check size={13} color="#0D6B3F" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="gbp-addon-card-bottom">
            <div className="gbp-addon-divider">
              <p className="gbp-addon-gst-label">Service Fee</p>
              <p className="gbp-addon-gst-value" style={{ fontSize: '20px', color: '#005327' }}>₹499</p>
            </div>
            <button 
              className="gbp-addon-btn"
              onClick={() => startPayment({ amount: addon.price, planName: addon.title })}
              style={{
                background: '#0D6B3F',
                color: '#fff',
                fontWeight: 700
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#0F6D38';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#0D6B3F';
              }}
            >
              Get This Service
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════
   PROPERTY OWNER PLANS
══════════════════════════════════ */
const ownerPlans = [
  {
    label: "Activation Charges",
    title: "Activate Management Plans",
    desc: "Mandatory one-time activation fee to unlock our Property Management services. Pay ₹999 once to activate your account and access either Premium Management (10% plan) or Premium Plus Management (₹5,499 plan). Required before selecting any management plan.",
    icon: <Users size={22} color="#147638" />,
    price: "₹999",
    suffix: "One-Time Activation",
    tag: "Required for Management",
    features: ["Account Setup & Verification", "Property Documentation", "Owner Profile Creation", "Management Platform Access", "Dashboard Activation", "Support Channel Setup", "Service Agreement Preparation", "Unlock Both Management Plans"],
    exampleRent: "Activation Required",
    exampleFee: "Pay: ₹999 (One-Time Only)",
    cta: "Activate Services",
    payAmount: 999,
    payPlan: "Management Plan Activation",
    note: "⚠️ IMPORTANT: This ₹999 activation fee is MANDATORY to unlock access to both Premium Property Management (10% monthly) and Premium Plus Management (₹5,499 monthly) plans. After activation, choose which management plan suits your property.",
  },
  {
    label: "Premium Property Management",
    title: "Premium Property Management",
    desc: "For properties with rent below ₹35,000/month. Let GharBazaar manage everything - rent collection, tenant communication, maintenance coordination, and documentation. Requires ₹999 activation (pay once).",
    icon: <Building2 size={22} color="#147638" />,
    price: "10%",
    suffix: "of Monthly Rental Income",
    tag: "For Rent < ₹35,000",
    features: ["Rent Collection", "Tenant Management", "Maintenance Coordination", "Legal Documentation", "Vacancy Management", "Regular Property Inspections", "Financial Reporting", "24/7 Owner Support"],
    exampleRent: "₹20,000/month rent",
    exampleFee: "You pay us: ₹2,000/month (10%)",
    cta: "Get Premium Management",
    payAmount: 2000,
    payPlan: "Premium Property Management",
    note: "⚠️ Requires ₹999 one-time activation first. Perfect for properties with rent below ₹35,000/month. We handle all property operations and you pay us 10% of monthly rental income.",
  },
  {
    label: "Premium Plus Property Management",
    title: "Premium Plus Property Management",
    desc: "For properties with rent above ₹35,000/month. Same complete management services at a flat monthly fee of ₹5,499. More economical than 10%. Requires ₹999 activation (pay once).",
    icon: <Building2 size={22} color="#147638" />,
    price: "₹5,499",
    suffix: "Flat Monthly Fee",
    tag: "For Rent > ₹35,000",
    features: ["Rent Collection", "Tenant Management", "Maintenance Coordination", "Legal Documentation", "Vacancy Management", "Regular Property Inspections", "Financial Reporting", "24/7 Owner Support"],
    exampleRent: "₹50,000/month rent",
    exampleFee: "You pay us: ₹5,499/month (Flat Fee)",
    cta: "Get Premium Plus",
    payAmount: 5499,
    payPlan: "Premium Plus Property Management",
    note: "⚠️ Requires ₹999 one-time activation first. Ideal for high-value properties with rent above ₹35,000/month. Pay only ₹5,499/month instead of 10% which would be more expensive.",
  },
];

const PropertyOwnerPlans = () => (
  <section className="gbp-section">
    <div className="gbp-owner-header">
      <div className="gbp-addon-icon-box">
        <Building2 size={18} color="#0D6B3F" />
      </div>
      <div>
        <h2 className="gbp-addon-header-title">Property Owner Plans</h2>
        <p className="gbp-addon-header-sub">Fill vacancies faster &amp; increase occupancy</p>
      </div>
    </div>
    <div className="gbp-owner-grid">
      {ownerPlans.map((p) => (
        <div key={p.title} className="gbp-owner-card">
          <div className="gbp-owner-card-body">
            <div className="gbp-owner-card-top-row">
              <div>
                <p className="gbp-owner-plan-label">{p.label}</p>
                <h3 className="gbp-owner-card-title">{p.title}</h3>
                <p className="gbp-owner-card-desc">{p.desc}</p>
              </div>
              <div className="gbp-owner-card-icon">{p.icon}</div>
            </div>
            <div className="gbp-owner-price-row">
              <span className="gbp-owner-price">{p.price}</span>
              <span className="gbp-owner-price-suffix">{p.suffix}</span>
              <span className="gbp-owner-tag">{p.tag}</span>
            </div>
            <div className="gbp-owner-divider" />
            <div className="gbp-owner-feature-grid">
              {p.features.map((f) => (
                <div key={f} className="gbp-owner-feature-item">
                  <CheckCircle2 size={14} color="#147638" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gbp-owner-card-footer">
            <div className="gbp-owner-example">
              <p className="gbp-owner-example-label">Example</p>
              <p className="gbp-owner-example-text">
                Monthly Rent: {p.exampleRent}<br />
                <strong style={{ color: "#005327" }}>{p.exampleFee}</strong>
              </p>
            </div>
            <button className="gbp-owner-cta" onClick={() => startPayment({ amount: p.payAmount, planName: p.payPlan })}>
              {p.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════
   WHY + HOW
══════════════════════════════════ */
const compareFeatures = [
  { feature: "Property Listings", others: true, us: true },
  { feature: "Verified Owners", others: false, us: true },
  { feature: "Property Matching", others: false, us: true },
  { feature: "Accommodation Assistance", others: false, us: true },
  { feature: "Documentation Support", others: false, us: true },
  { feature: "Police Verification Support", others: false, us: true },
  { feature: "Occupancy Management", others: false, us: true },
  { feature: "Property Management", others: false, us: true },
];
const tenantSteps = ["Register", "Choose Plan", "Get Verified Properties", "Visit Properties", "Finalize Accommodation", "Move In"];
const ownerSteps  = ["Submit Property", "Verification", "Marketing & Promotion", "Tenant Matching", "Occupancy", "Revenue Generation"];

const WhyHow = () => (
  <section className="gbp-section">
    <div className="gbp-why-grid">
      {/* Why */}
      <div className="gbp-section-card">
        <div className="gbp-section-card-header">
          <Award size={14} color={SOFT} />
          <div>
            <p className="gbp-section-card-title">Why GharBazaar?</p>
            <p className="gbp-section-card-sub">More than just listings</p>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="gbp-compare-table">
            <thead>
              <tr style={{ background: BG }}>
                <th style={{ textAlign: "left", color: SOFT }}>Feature</th>
                <th style={{ textAlign: "center", color: SOFT, whiteSpace: "nowrap" }}>Other Portals</th>
                <th style={{ textAlign: "center", color: G, whiteSpace: "nowrap" }}>GharBazaar</th>
              </tr>
            </thead>
            <tbody>
              {compareFeatures.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? WHITE : BG }}>
                  <td style={{ color: MID }}>{row.feature}</td>
                  <td style={{ textAlign: "center" }}>
                    {row.others ? <CheckCircle2 size={13} color={G} /> : <XCircle size={13} color="#ef4444" />}
                  </td>
                  <td style={{ textAlign: "center" }}><CheckCircle2 size={13} color={G} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How */}
      <div className="gbp-section-card">
        <div className="gbp-section-card-header">
          <ArrowRight size={14} color={SOFT} />
          <p className="gbp-section-card-title">How It Works</p>
        </div>
        <div className="gbp-how-grid">
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: G, marginBottom: 12, marginTop: 0 }}>For Students / Tenants</p>
            {tenantSteps.map((step, i) => (
              <div key={step} className="gbp-how-step">
                <div className="gbp-how-step-num" style={{ background: G }}>{i + 1}</div>
                {step}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: G, marginBottom: 12, marginTop: 0 }}>For Property Owners</p>
            {ownerSteps.map((step, i) => (
              <div key={step} className="gbp-how-step">
                <div className="gbp-how-step-num" style={{ background: "#7c3aed" }}>{i + 1}</div>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════
   FAQ
══════════════════════════════════ */
const faqs = [
  { q: "How much does each add-on service cost?", a: "Each add-on service costs ₹499 separately. Want Rent Agreement? Pay ₹499. Need Police Verification? Pay ₹499. Each service is independent - choose only what you need, pay only for what you use. No mandatory bundles." },
  { q: "Can I buy multiple add-on services together?", a: "Yes! Each service costs ₹499. If you need 2 services, pay ₹998 (₹499 × 2). Need 3 services? Pay ₹1,497 (₹499 × 3). Want all 4? Pay ₹1,996 (₹499 × 4). Pay individually as you need them, or purchase multiple together." },
  { q: "Why do service fees vary by property type?", a: "Different property types have different requirements. PG/Hostel: ₹999 (simpler process), Residential: ₹1,999 (standard documentation), Commercial: ₹2,999 (complex legal requirements). All services remain the same, only pricing varies based on complexity." },
  { q: "How much security deposit do I need to pay?", a: "Security deposit is 50% of monthly rent for ALL property types (PG, Residential, Commercial). Example: ₹10,000 rent = ₹5,000 security, ₹20,000 rent = ₹10,000 security. This amount is flexible and negotiable based on property condition and lease terms." },
  { q: "Who holds my security deposit?", a: "GharBazaar holds your security deposit (50% of rent) for safety and neutral dispute resolution. This protects both tenant and owner. At lease end, we ensure fair assessment and timely refund minus any legitimate damages." },
  { q: "Is security deposit negotiable?", a: "Yes! While we suggest 50% of monthly rent as standard, the exact amount is flexible. Factors like your rental history, lease duration, advance payment, and references can help negotiate lower amounts. Discuss with property owner through us." },
  { q: "What happens to my security deposit?", a: "Your security deposit (50% of rent) is held safely by GharBazaar throughout your lease. At move-out, we inspect the property with both parties present. After deducting any legitimate damages, the remaining amount is refunded within 7 days." },
  { q: "What are Activation Charges for owners?", a: "₹999 one-time activation fee is MANDATORY to unlock our Property Management services. This unlocks BOTH Premium Management (10% monthly) and Premium Plus (₹5,499 monthly) plans. It covers account setup, property documentation, verification, platform access, dashboard, and service agreement. Pay once, then choose which management plan suits your property rent." },
  { q: "Can I use management plans without paying ₹999?", a: "No. The ₹999 activation is mandatory and must be paid before accessing any management plan. Without activation, you cannot use either the 10% Premium plan or ₹5,499 Premium Plus plan. Think of it as unlocking the management services - pay once, use forever." },
  { q: "Which owner plan should I choose after activation?", a: "After paying ₹999 activation: Choose Premium Management (10% of monthly rent) if rent < ₹35,000/month, or Premium Plus (₹5,499 flat monthly) if rent > ₹35,000/month. Both provide identical full management services - only pricing differs based on your property rent. Example: ₹20,000 rent = pay 10% (₹2,000/month). ₹50,000 rent = pay flat ₹5,499/month." },
  { q: "Is the tenant service fee refundable?", a: "The service fee (₹999 for PG, ₹1,999 for Residential, ₹2,999 for Commercial) is non-refundable as it covers our assistance services. However, we only charge this after you've selected a property and approved moving forward. We don't charge for just searching." },
  { q: "Do I pay rent to GharBazaar every month?", a: "No! You only pay the one-time service fee to us. After move-in, you pay monthly rent directly to the property owner. We don't take any monthly commission or fees from tenants." },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const col1 = faqs.filter((_, i) => i % 2 === 0);
  const col2 = faqs.filter((_, i) => i % 2 !== 0);

  const Item = ({ f, idx }) => (
    <div
      className={`gbp-faq-item${open === idx ? " open" : ""}`}
      onClick={() => setOpen(open === idx ? null : idx)}
    >
      <div className="gbp-faq-q">
        <span>{f.q}</span>
        {open === idx
          ? <ChevronUp size={15} color={G} style={{ flexShrink: 0 }} />
          : <Plus size={15} color={SOFT} style={{ flexShrink: 0 }} />}
      </div>
      {open === idx && <p className="gbp-faq-a">{f.a}</p>}
    </div>
  );

  return (
    <section className="gbp-section">
      <div className="gbp-section-card">
        <div className="gbp-section-card-header">
          <HelpCircle size={14} color={SOFT} />
          <p className="gbp-section-card-title">Frequently Asked Questions</p>
        </div>
        <div className="gbp-faq-grid">
          <div>{col1.map((f, i) => <Item key={i * 2} f={f} idx={i * 2} />)}</div>
          <div>{col2.map((f, i) => <Item key={i * 2 + 1} f={f} idx={i * 2 + 1} />)}</div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════
   CTA
══════════════════════════════════ */
const CTA = () => (
  <div className="gbp-section gbp-cta-wrap">
    <div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, color: WHITE, margin: "0 0 6px" }}>
        Ready to Find Your Perfect Accommodation?
      </h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 10px" }}>
        Join students, tenants, landlords, and property owners who trust GharBazaar.
      </p>
      <div style={fl({ gap: 16, flexWrap: "wrap" })}>
        {[
          { icon: <ShieldCheck size={12} />, label: "Verified" },
          { icon: <BadgeIndianRupee size={12} />, label: "Transparent" },
          { icon: <ThumbsUp size={12} />, label: "Reliable" },
        ].map(({ icon, label }) => (
          <span key={label} style={fl({ alignItems: "center", gap: 4, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 500 })}>
            {icon} {label}
          </span>
        ))}
      </div>
    </div>
    <div className="gbp-cta-btns">
      <button style={{ background: WHITE, color: GD, border: "none", borderRadius: 10, padding: "12px 22px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
        Get Started Now
      </button>
      <button style={{ background: "rgba(255,255,255,0.15)", color: WHITE, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 10, padding: "12px 22px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
        <Phone size={13} /> Talk to Expert
      </button>
    </div>
  </div>
);

/* ══════════════════════════════════
   FOOTER STATS
══════════════════════════════════ */
const FooterStats = () => (
  <div className="gbp-footer-stats">
    {[
      { icon: <Users size={14} color={SOFT} />, label: "10,000+ Students Helped" },
      { icon: <MapPin size={14} color={SOFT} />, label: "50+ Cities Covered" },
      { icon: <ShieldCheck size={14} color={SOFT} />, label: "Verified Properties" },
      { icon: <ThumbsUp size={14} color={SOFT} />, label: "Trusted by Thousands" },
      { icon: <Star size={14} color={SOFT} />, label: "4.8/5 Customer Rating" },
    ].map(({ icon, label }) => (
      <div key={label} className="gbp-footer-stat">{icon} {label}</div>
    ))}
  </div>
);

/* ══════════════════════════════════
   ROOT
══════════════════════════════════ */
export default function GharBazaarPricing() {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{CSS}</style>
      <div className="gbp-root">
        <div className="gbp-wrap">

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: GL, color: G, fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, fontFamily: "'DM Sans',sans-serif", marginBottom: 14, border: `1px solid #bbf7d0` }}>
              💚 Transparent Pricing
            </span>
            <h1 className="gbp-hero-title">
              Simple Plans. Verified Properties.<br />Trusted Support.
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: SOFT, margin: 0, padding: "0 8px" }}>
              Whether you're a Student, Tenant, Property Owner, PG Operator, or Landlord — choose the plan that fits your needs.
            </p>
            <TrustBar />
          </div>

          <StudentPlans />
          <AddOnServices />
          <PropertyOwnerPlans />
          <WhyHow />
          <FAQ />
          <CTA />
          <FooterStats />
        </div>
      </div>
    </>
  );
}