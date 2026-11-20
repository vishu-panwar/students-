---
name: Warm Architectural Commerce
colors:
  surface: '#fff8f5'
  surface-dim: '#e2d8d2'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2eb'
  surface-container: '#f6ece6'
  surface-container-high: '#f0e6e0'
  surface-container-highest: '#eae1da'
  on-surface: '#1f1b17'
  on-surface-variant: '#404940'
  inverse-surface: '#342f2b'
  inverse-on-surface: '#f9efe8'
  outline: '#707a6f'
  outline-variant: '#bfc9bd'
  surface-tint: '#1f6c3a'
  primary: '#004c22'
  on-primary: '#ffffff'
  primary-container: '#166534'
  on-primary-container: '#93e0a2'
  inverse-primary: '#8bd79b'
  secondary: '#635d5c'
  on-secondary: '#ffffff'
  secondary-container: '#e6dedc'
  on-secondary-container: '#676160'
  tertiary: '#633600'
  on-tertiary: '#ffffff'
  tertiary-container: '#824b0b'
  on-tertiary-container: '#ffc38f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f4b5'
  primary-fixed-dim: '#8bd79b'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#e9e1df'
  secondary-fixed-dim: '#cdc5c3'
  on-secondary-fixed: '#1e1b1a'
  on-secondary-fixed-variant: '#4b4644'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#ffb877'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6b3b00'
  background: '#fff8f5'
  on-background: '#1f1b17'
  surface-variant: '#eae1da'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system blends high-trust architectural rigor with tactile commerce utility. Designed for a discerning Indian marketplace encompassing property transactions, raw materials sourcing, and architectural fixtures, the interface projects permanence, legal transparency, and calm precision.

### Aesthetic Foundation
- **Modern Minimalist Tactility:** Clean geometric layouts layered over warm, organic foundation tones. The aesthetic deliberately rejects cold corporate tech blues and saturated retail neons in favor of architectural materials: sandstone, plaster, honed slate, and foliage.
- **Tone & Mood:** Authoritative, unhurried, institutional, and meticulously crafted. It conveys the permanence of physical property alongside the efficiency of modern enterprise logistics.
- **Visual Restraint:** White elevated surfaces sit over warm tinted backgrounds, relying on razor-thin stone-tinted borders and gentle ambient depth rather than aggressive fills or high-contrast drop shadows.

## Colors

The palette is strictly locked to light mode. It derives its dignity from natural earth, unbleached cotton, honed stone, and dense evergreen foliage.

### Palette Architecture
- **Primary (`#166534`):** Forest Green. Reserved exclusively for primary transactional actions, verified credibility markers, selected navigation states, and high-confidence metrics.
- **Secondary (`#292524`):** Warm Charcoal / Deep Umber. Used for high-emphasis headlines, dominant navigation headers, critical values, and grounded structural accents.
- **Tertiary (`#854D0E`):** Burnished Brass. Used sparsely for premium listing highlights, architectural heritage designations, and bespoke tier tags.
- **Neutral (`#78716C`):** Warm Stone. Governs metadata, disabled states, structural rules, and secondary typography.

### Surface System
- **Canvas Base:** `#FBF9F5` (Warm Alabaster). The default backdrop for all views.
- **Surface Elevation:** `#FFFFFF` (Pure Card White). All interactive cards, modal drawers, and data tables must use pure white to pop crisply from the warm canvas.
- **Subtle Surface Tint:** `#F4F0E8` for subtle inset wells, table headers, and neutral tag fills.
- **Hairline Borders:** `#E7E2D8` for organic cohesion, never cold blue-grays.

## Typography

Plus Jakarta Sans provides the exact combination of modern geometry, generous open counters, and structured baseline balance required for hybrid commerce and property blueprints.

### Hierarchy & Typesetting Rules
- **Numerics & Currency:** Indian Rupee amounts (`₹`) and square-footage / metric tonnage figures must always render with tabular numbers (`font-variant-numeric: tabular-nums`) and semi-bold weights for rapid scanning.
- **Body Copy Coloration:** Never use pure `#000000`. Body text defaults to `#292524` (Umber Charcoal) for primary reading and `#57534E` for secondary specification tables to maintain warmth.
- **Headings:** Display and headline levels rely on negative tracking (-0.02em to -0.03em) to keep Indian real estate terms, developer names, and city nodes compact and commanding.

## Layout & Spacing

The layout is built around an orderly, open-canvas philosophy reflecting spacious physical environments.

### Grid Standards
- **Desktop (1200px+):** 12-column responsive fluid grid inside a 1360px maximum content envelope. Gutters are locked to `1.5rem` (24px) with minimum page margins of `2rem` (32px).
- **Tablet (768px – 1199px):** 8-column grid with `1.25rem` (20px) gutters and `1.5rem` (24px) page margins.
- **Mobile (< 768px):** 4-column grid with `1rem` (16px) gutters and `1rem` (16px) horizontal screen edge margins.

### Rhythmic Density
- Commercial listings and bulk materials catalogs employ compact component padding (`space-sm` to `space-md`) to ensure high density of transaction-critical data.
- Luxury residential showcases and architect portfolios use expanded component padding (`space-lg` to `space-xl`) to communicate openness, luxury, and breathing room.

## Elevation & Depth

Visual depth is achieved through delicate boundary definition and warm ambient diffusion rather than deep artificial drop shadows.

### Elevation Levels
- **Level 0 (Canvas):** Tone `#FBF9F5`. Completely flat, non-elevated background base.
- **Level 1 (Resting Cards & Tiles):** Pure white background (`#FFFFFF`) with a 1px solid border in `#E7E2D8`. Ambient shadow: `0 1px 3px rgba(41, 37, 36, 0.04), 0 1px 2px rgba(41, 37, 36, 0.02)`.
- **Level 2 (Active/Hover Cards & Contextual Popovers):** Pure white surface, 1px solid border in `#D6CEBE`. Elevated shadow: `0 4px 12px -2px rgba(41, 37, 36, 0.06), 0 2px 6px -1px rgba(41, 37, 36, 0.03)`.
- **Level 3 (Modals, Lead Generation Drawers & Pinned Commerce Trays):** Pure white surface, shadow: `0 12px 32px -4px rgba(41, 37, 36, 0.10), 0 4px 12px -2px rgba(41, 37, 36, 0.04)`.

### Ghost Separation Technique
No element floats purely on blur shadows. Every elevated surface requires the signature 1px boundary line in warm stone tone (`#E7E2D8`), mimicking physical parchment and architectural cardstock.

## Shapes

The shape system adopts a soft, architectural cut (`roundedness: 1`). Radii are deliberate, balanced, and structural—avoiding sharp brutalist edges and hyper-casual stadium capsules.

### Radius Scale
- **Small (`0.25rem` / 4px):** Form inputs, utility buttons, data tags, table cells, metric badges.
- **Default / Medium (`0.375rem` / 6px):** Property feature cards, quote calculators, catalog thumbnails, action buttons.
- **Large (`0.5rem` / 8px):** Primary listing presentation cards, quotation sheets, filter sidebars.
- **Extra-Large (`0.75rem` / 12px):** Modal dialogs, media carousels, hero search modules.
- **Full Rounded (Pill):** Strictly reserved for verification status pills and interactive filter chips.

## Components

### Buttons
- **Primary CTA:** Background `#166534`, text `#FFFFFF`, radius 6px, hover state `#14532D`. Used exclusively for critical path interactions: "Book Site Visit", "Request Wholesale Quote", "Contact Broker".
- **Secondary / Outlined:** Background `#FFFFFF`, 1px border `#D6CEBE`, text `#292524`, hover state `#F7F5F0`.
- **Tertiary / Subtle:** Background transparent, text `#166534`, hover background `#E8F0EB`.

### Cards (Property & Material Commerce)
- **Container:** Pure `#FFFFFF` surface, 1px border `#E7E2D8`, radius 8px.
- **Image Module:** Aspect ratio 16:10 for properties, 1:1 for building materials. Pinned top corner holds verified or RERA badges.
- **Content Hierarchy:** Price (`#292524`, font-weight 700) precedes location or material specification (`#78716C`, body-sm).

### Input Fields & Selectors
- **Base Input:** Height 44px, background `#FFFFFF`, border 1px `#D6CEBE`, padding `0 12px`, radius 4px. Text `#292524`.
- **Focus State:** 1px border `#166534`, outer ring `2px solid rgba(22, 101, 52, 0.15)`.
- **Placeholder:** `#A8A29E`.

### Chips & Filter Pills
- **Unselected:** Background `#FFFFFF`, 1px border `#E7E2D8`, text `#57534E`, radius 9999px.
- **Selected:** Background `#166534`, border 1px `#166534`, text `#FFFFFF`, radius 9999px.

### Checkboxes & Radio Controls
- **Unchecked:** 1px border `#A8A29E`, background `#FFFFFF`, radius 4px (checkbox) or circle (radio).
- **Checked:** Background `#166534`, checkmark icon pure white `#FFFFFF`.

### Verification & Trust Badges
- **RERA / Verified Merchant Badge:** Background `#DCFCE7`, border 1px `#BBF7D0`, text `#14532D`, font size 11px, font weight 600, paired with an emerald shield or check icon.