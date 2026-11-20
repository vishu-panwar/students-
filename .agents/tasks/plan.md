# Implementation Plan: Integrate Pricing Page Components into GharBazaar Landing Page

## Overview
Integrate 4 pricing page HTML designs from `stitch_gharbazaar_business_profile_showcase (2)` into the React-based GharBazaar landing page. The HTML sources use Tailwind CSS with Material Symbols Outlined icons, which are already loaded in the React project's index.html.

## Source Files Analysis
- **Owner/Landlord Pricing** (`gharbazaar_owner_landlord_pricing_plans/code.html`) - Property listing fees, management tiers, ROI calculator with rent slider
- **Tenant/Home Seeker Pricing** (`gharbazaar_tenant_home_seeker_pricing_deposit_model/code.html`) - One-time booking fees (PG/Residential/Commercial), escrow deposit model
- **Partner/Broker Pricing** (`gharbazaar_partner_broker_builder_membership_pricing/code.html`) - Annual membership with GST toggle, boost activation fees (1/2/3 months)
- **B2B Materials/Vendor Pricing** (`gharbazaar_b2b_materials_vendor_commission_pricing/code.html`) - 5% commission model, order value calculator
- **warm_architectural_commerce** - No code.html file present, only DESIGN.md (skip this source)

## React Project Structure
- Framework: React 19 with Vite
- Styling: Tailwind CSS v4.2
- Routing: react-router-dom
- Icons: lucide-react (already used) + Material Symbols Outlined (already loaded in index.html)
- Landing page: `gharbazaar-client/src/pages/Home/Home.jsx`
- Component pattern: Feature sections under `src/components/Home/[feature]/`

---

## Implementation Steps

### - [ ] 1. Create Pricing component folder structure and parent container
**What to do:**
Create `src/components/Pricing/` directory and a parent `PricingSection.jsx` component that will manage shared state (GST toggle) and render all 4 pricing tier components as tabbed or sectioned content. Use React useState to track `includeGst` boolean that all child components will consume.

**Files:**
- Create: `gharbazaar-client/src/components/Pricing/PricingSection.jsx`

**Verify:**
`npm run build` completes without errors. Check that the new Pricing folder exists in the file tree.

---

### - [ ] 2. Convert Owner/Landlord Pricing HTML to React component
**What to do:**
Create `OwnerLandlordPricing.jsx` by converting the HTML source (`gharbazaar_owner_landlord_pricing_plans/code.html`) to JSX. Key conversions:
- `class` → `className`
- `for` → `htmlFor`
- Remove `<header>` and `<main>` wrappers (parent page already has those)
- Inline `onclick` → `onClick` with proper event handlers
- Extract inline `<script>` for the ROI calculator (rent slider + tier badge logic) into React useEffect/useState hooks
- Material Symbols icons already available (no import needed, but verify they render correctly)
- Accept `includeGst` prop from parent to show/hide GST breakdowns

**Files:**
- Create: `gharbazaar-client/src/components/Pricing/OwnerLandlordPricing.jsx`

**Verify:**
Import the component into `PricingSection.jsx` and render it. `npm run dev` starts successfully and the component displays without console errors. Verify the rent slider updates the dynamic yield breakdown.

---

### - [ ] 3. Convert Tenant/Home Seeker Pricing HTML to React component
**What to do:**
Create `TenantPricing.jsx` from `gharbazaar_tenant_home_seeker_pricing_deposit_model/code.html`. Key elements:
- Three pricing tier cards (PG ₹999, Residential ₹1,999, Commercial ₹2,999)
- Security deposit vault diagram with 3-column grid
- Image assets (use placeholder or actual images from `data-alt` attributes if images available)
- Accept `includeGst` prop to toggle "+18% GST" vs "Incl. 18% GST" display
- Convert button `type="button"` to proper React onClick handlers (or Link if routing is needed)

**Files:**
- Create: `gharbazaar-client/src/components/Pricing/TenantPricing.jsx`

**Verify:**
Import into `PricingSection.jsx`. `npm run dev` shows tenant pricing cards with correct layout. Verify responsive grid works on mobile (1 col) and desktop (3 col).

---

### - [ ] 4. Convert Partner/Broker Pricing HTML to React component
**What to do:**
Create `PartnerBrokerPricing.jsx` from `gharbazaar_partner_broker_builder_membership_pricing/code.html`. Critical features:
- **GST toggle switch** at the top (controlled by parent's `includeGst` state, but also allow local toggle that updates parent via callback)
- Inline `<script>` function `toggleTaxDisplay()` must be converted to React state updater that recalculates prices for all elements with IDs like `agent-year1`, `boost-1m`, etc.
- Two main sections: Profile Activation Fees (Year 1 ₹999, Renewal ₹1,599) and Boost Activation Fees (1/2/3 month plans)
- Trust metrics bar at top with 4-column grid

**Files:**
- Create: `gharbazaar-client/src/components/Pricing/PartnerBrokerPricing.jsx`

**Verify:**
Import into `PricingSection.jsx`. Toggle the GST switch and confirm all prices update correctly (e.g., ₹999 → ₹1,179 when GST included). Verify notes change from "+ 18% GST" to "Includes 18% GST".

---

### - [ ] 5. Convert B2B Materials/Vendor Pricing HTML to React component
**What to do:**
Create `B2BMaterialsPricing.jsx` from `gharbazaar_b2b_materials_vendor_commission_pricing/code.html`. Key elements:
- Hero section with 3 quick metrics (₹0 setup, 5.0% commission, 24h escrow)
- Pricing table with rows for Construction Materials and Architectural Products (both 5% commission, ₹0 upfront)
- Interactive calculator with material category dropdown + order value slider (₹20k–₹25L range)
- Output card showing gross/commission/GST/net breakdown
- Commission is 5% of order value, GST is 18% of commission (not of order value)
- Use React state to manage slider value and recalculate breakdowns dynamically

**Files:**
- Create: `gharbazaar-client/src/components/Pricing/B2BMaterialsPricing.jsx`

**Verify:**
Import into `PricingSection.jsx`. Move the order value slider and verify the settlement summary updates correctly (e.g., ₹1,00,000 order → ₹5,000 commission → ₹900 GST → ₹94,100 net payout).

---

### - [ ] 6. Implement tabbed or sectioned navigation in PricingSection parent
**What to do:**
In `PricingSection.jsx`, add a horizontal tab navigation (similar to the HTML sources' sub-navigation pills) to switch between the 4 pricing components. Tab options:
1. "Owners & Landlords"
2. "Tenants & Home Seekers"
3. "Channel Partners & Builders"
4. "B2B Materials & Vendors"

Use React state `activeTab` to track selection. Render only the active child component. Style tabs to match the HTML design (rounded pills, active state uses `bg-primary-container text-on-primary`).

**Files:**
- Modify: `gharbazaar-client/src/components/Pricing/PricingSection.jsx`

**Verify:**
Click each tab and confirm the correct pricing component renders. Verify active tab styling matches the HTML design.

---

### - [ ] 7. Add global GST toggle to PricingSection header
**What to do:**
Add a toggle switch at the top of `PricingSection.jsx` (visible across all tabs) to control `includeGst` state. The toggle should match the design in the Partner/Broker HTML (label: "Base Price" / "Incl. 18% GST"). Pass `includeGst` as prop to all child components. For Partner/Broker tab, ensure the local toggle in that component also updates the parent state (use callback prop).

**Files:**
- Modify: `gharbazaar-client/src/components/Pricing/PricingSection.jsx`

**Verify:**
Toggle GST at the parent level and verify all pricing components update their displays accordingly (prices change, notes change).

---

### - [ ] 8. Insert PricingSection into Home.jsx landing page
**What to do:**
Import `PricingSection` into `Home.jsx` and render it after `<QuerySection />` (as specified in the task). The landing page already has sections like `<BrokerSection />` and `<QuerySection />`, so maintain the same pattern.

**Files:**
- Modify: `gharbazaar-client/src/pages/Home/Home.jsx`

**Verify:**
`npm run dev` and navigate to the homepage. Scroll down past the query form and confirm the pricing section appears. Verify all tabs work and the section is responsive.

---

### - [ ] 9. Handle HTML-to-JSX conversion gotchas and styling consistency
**What to do:**
Review all 4 pricing components for common conversion issues:
- Ensure all `class` → `className` conversions are complete
- Verify `for` → `htmlFor` in `<label>` tags
- Check that inline `onclick`/`onchange` handlers are converted to React camelCase (`onClick`, `onChange`)
- Confirm Material Symbols icons render (they use `<span class="material-symbols-outlined">icon_name</span>`)
- Ensure Tailwind classes from the HTML (using custom theme config) work with the React project's Tailwind setup (the HTML uses a custom `tailwind.config` in a `<script>` tag; check if any custom colors/spacing are needed in the React project's `tailwind.config.js`)
- Remove any inline `<style>` or `<script>` tags that aren't converted to React patterns

**Files:**
- Review: All 4 pricing component files
- Check: `gharbazaar-client/tailwind.config.js` (may need to extend with custom colors/tokens from HTML if they don't render correctly)

**Verify:**
Visual inspection in dev mode: compare rendered React components against the original HTML files opened in a browser. Check for missing styles, broken layouts, or console errors. Test on mobile viewport (responsive grid, font sizes).

---

### - [ ] 10. Material Symbols Outlined font verification
**What to do:**
Confirm that the Material Symbols Outlined CSS is properly loaded in `index.html` (it already is, based on the read file). Verify that all Material Symbol icons used in the pricing components render correctly. If any icons are missing or showing as placeholder boxes, check the icon names and ensure they match the Google Fonts Material Symbols catalog.

**Files:**
- Verify: `gharbazaar-client/index.html` (already has the correct `<link>` tag for Material Symbols)
- Test: Render all pricing components and check icon display

**Verify:**
Visual check: all icons (verified_user, lock, real_estate_agent, etc.) display as expected. If any icon is broken, check the spelling in the `<span>` content (e.g., `<span className="material-symbols-outlined">verified_user</span>`).

---

### - [ ] 11. Final integration test and build verification
**What to do:**
Run a full build and preview to ensure the pricing section integrates cleanly with the existing landing page. Test all interactive elements:
- GST toggle at parent level
- Tab navigation between 4 pricing tiers
- Owner/Landlord rent slider and yield calculator
- B2B order value slider and payout calculator
- Responsive behavior on mobile, tablet, desktop
- Verify no z-index or overflow issues with existing page header/footer

**Files:**
- All pricing component files
- `gharbazaar-client/src/pages/Home/Home.jsx`

**Verify:**
Run `npm run build` and confirm build completes without errors. Run `npm run preview` and test the production build. Navigate through the homepage, interact with the pricing section, and confirm all features work as expected. Check browser console for any runtime errors or warnings.

---

## Exact File List

### Files to Create:
1. `gharbazaar-client/src/components/Pricing/PricingSection.jsx` (parent container with tab nav + GST toggle)
2. `gharbazaar-client/src/components/Pricing/OwnerLandlordPricing.jsx` (listing fees, management, ROI calc)
3. `gharbazaar-client/src/components/Pricing/TenantPricing.jsx` (booking fees, escrow deposit model)
4. `gharbazaar-client/src/components/Pricing/PartnerBrokerPricing.jsx` (membership + boost fees, GST toggle)
5. `gharbazaar-client/src/components/Pricing/B2BMaterialsPricing.jsx` (5% commission, order calc)

### Files to Modify:
1. `gharbazaar-client/src/pages/Home/Home.jsx` (add `<PricingSection />` after QuerySection)
2. `gharbazaar-client/tailwind.config.js` (potentially extend with custom theme tokens from HTML if needed)

---

## HTML-to-JSX Conversion Notes

### Common Conversions:
- `class="..."` → `className="..."`
- `for="inputId"` → `htmlFor="inputId"`
- `onclick="func()"` → `onClick={handleFunc}`
- `onchange="func()"` → `onChange={handleFunc}`
- `<input type="range" value="45000" onchange="...">` → `<input type="range" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} />`
- Inline `<script>` functions → React useState/useEffect hooks
- Self-closing tags: `<input>` → `<input />`, `<img>` → `<img />`

### Material Symbols Icons:
- Already loaded in `index.html` via: `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />`
- Usage in HTML: `<span class="material-symbols-outlined">verified_user</span>`
- Usage in JSX: `<span className="material-symbols-outlined">verified_user</span>` (no import needed)

### GST Toggle Logic:
- The HTML sources include an inline `<script>` with a `toggleTaxDisplay(includeGst)` function that updates multiple elements by ID
- In React, replace this with a `useEffect` that recalculates prices whenever `includeGst` prop changes
- Store price lookup objects (base prices, GST prices) and use conditional rendering: `{includeGst ? '₹1,179' : '₹999'}`

### Calculator Logic (Owner/Landlord & B2B):
- HTML uses `<input type="range" id="calcRentSlider" onchange="updateCalc()">` with inline JS to update multiple DOM elements
- React pattern: `const [rentValue, setRentValue] = useState(45000);` + `<input type="range" value={rentValue} onChange={(e) => setRentValue(Number(e.target.value))} />`
- Use `useMemo` or inline calculations to derive commission, GST, net values from the slider state

### Responsive Grid:
- HTML uses Tailwind responsive classes like `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Keep these classes in JSX (Tailwind classes work the same in React)
- Test on mobile viewport to ensure cards stack correctly

---

## Tailwind Custom Theme Tokens

The HTML sources use a custom Tailwind config with Material Design 3 color tokens (e.g., `primary`, `primary-container`, `on-primary`, `surface`, `surface-container-low`). Check if these are defined in `gharbazaar-client/tailwind.config.js`. If not, the React project likely uses a simpler palette, so either:
1. Add the custom theme tokens to `tailwind.config.js` (copy from the HTML `<script id="tailwind-config">`)
2. Or map the HTML classes to existing Tailwind classes in the React project (e.g., `bg-primary` → `bg-green-700`, `bg-primary-container` → `bg-green-100`)

Recommended: **Option 1** (add custom tokens) to preserve the exact design from the HTML.

---

## Material Symbols Already Loaded
**Confirmed:** The React project's `index.html` already includes:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```
**No additional font loading needed.**

---

## Where to Insert PricingSection in Home.jsx
Insert after `<QuerySection />`:
```jsx
function Home() {
  return (
    <>
      <Hero />
      <div className="lg:hidden">
        <SearchPage />
      </div>
      <BrokerSection />
      <QuerySection />
      <PricingSection />  {/* NEW: Insert here */}
    </>
  );
}
```

---

## Summary
This plan converts 4 HTML pricing pages into React components, manages shared GST toggle state in a parent container, handles interactive calculators with React state, and integrates the pricing section into the GharBazaar landing page after the query form. All Material Symbols icons are already loaded, and Tailwind CSS classes from the HTML will be preserved (with potential theme token additions to `tailwind.config.js` if needed).
