# Property Type Routing Guide 🏠

## Overview
All property cards now automatically detect whether a property is **For Sale** or **For Rent** and route to the appropriate detail page.

## Visual Changes Made ✅

### 1. Property Cards Now Show:
- **"FOR RENT"** badge (Purple) - for rental properties
- **"FOR SALE"** badge (Amber/Orange) - for sale properties
- Badge appears on top-right corner below the heart/trash icon
- Price display automatically adjusts:
  - Rent: Shows "/month" suffix
  - Sale: No suffix, larger amounts show "L" (Lakhs) or "Cr" (Crores)

### 2. Automatic Routing:
- **Rent Properties** → `/property-rent/:id` → `PropertyDetailsRent.jsx`
- **Sale Properties** → `/property-sale/:id` → `PropertyDetailsSale.jsx`

## How Property Type is Determined 🔍

The system checks in this order:

1. **`listingType`** field (recommended)
   ```javascript
   listingType: "rent" or "sale"
   ```

2. **`propertyType`** field
   ```javascript
   propertyType: "PG", "Hostel", "Co-Living", "Rent", etc. → FOR RENT
   propertyType: "Apartment", "Villa", "Plot", etc. → FOR SALE
   ```

3. **Price Range** (fallback)
   ```javascript
   price < ₹1,00,000 → Likely FOR RENT
   price >= ₹1,00,000 → Likely FOR SALE
   ```

## Backend Property Object Structure 📋

### For Rental Properties:
```javascript
{
  _id: "unique-id",
  title: "Single Room with Private Kitchen",
  price: 3500,           // Monthly rent
  location: "Near Quantum University",
  images: [...],
  status: "Available",
  views: 432,
  listingType: "rent",   // ⭐ IMPORTANT: Set this field
  propertyType: "PG"     // or "Hostel", "Co-Living", "Single Room", etc.
}
```

### For Sale Properties:
```javascript
{
  _id: "unique-id",
  title: "3BHK Corner Penthouse",
  price: 8800000,        // One-time sale price
  location: "Krishna Nagar, Mathura",
  images: [...],
  status: "Available",
  views: 1842,
  listingType: "sale",   // ⭐ IMPORTANT: Set this field
  propertyType: "Apartment"  // or "Villa", "Plot", "Penthouse", etc.
}
```

## Property Type Keywords 🏷️

### FOR RENT (Keywords in propertyType or listingType):
- `"rent"`
- `"pg"`
- `"hostel"`
- `"co-living"`
- `"coliving"`
- `"room"`
- `"accommodation"`

### FOR SALE (Everything else):
- `"apartment"`
- `"villa"`
- `"house"`
- `"plot"`
- `"land"`
- `"penthouse"`
- `"bungalow"`
- `"shop"`
- `"office"`

## Components Updated 🛠️

### 1. **RecentCard.jsx** (Main Property Card)
Location: `src/components/Home/properties/Recentsection/RecentCard.jsx`

**Changes:**
- ✅ Added `listingType` and `propertyType` extraction
- ✅ Added `isForRent` logic
- ✅ Added "FOR RENT" / "FOR SALE" badge
- ✅ Updated `handleNavigate()` to route appropriately
- ✅ Updated price display (shows /month only for rent)

**Usage:**
```jsx
<RecentCard property={propertyObject} />
```

### 2. **FavoriteCard** (Favorites Page)
Location: `src/pages/favourite/Favorites.jsx`

**Changes:**
- ✅ Same logic as RecentCard
- ✅ Badge displayed below status badge
- ✅ Appropriate routing on click

## Testing Checklist ✔️

### Test Rental Property:
1. Create property object with:
   - `listingType: "rent"` OR `propertyType: "PG"`
   - `price: 3500` (< 1 lakh)
2. Card should show **purple "FOR RENT"** badge
3. Price should show **"₹3,500/month"**
4. Click should navigate to `/property-rent/123`

### Test Sale Property:
1. Create property object with:
   - `listingType: "sale"` OR `propertyType: "Apartment"`
   - `price: 8800000` (>= 1 lakh)
2. Card should show **amber "FOR SALE"** badge
3. Price should show **"₹88.0 L"** (no /month)
4. Click should navigate to `/property-sale/123`

## Example API Response Format 📡

```javascript
// GET /api/properties
{
  "success": true,
  "data": [
    {
      "_id": "prop-rent-001",
      "title": "Single Room Near University",
      "price": 3500,
      "listingType": "rent",
      "propertyType": "PG",
      "location": "Saharanpur",
      "images": ["url1", "url2"],
      "status": "Available",
      "views": 234
    },
    {
      "_id": "prop-sale-001",
      "title": "3BHK Luxury Apartment",
      "price": 8500000,
      "listingType": "sale",
      "propertyType": "Apartment",
      "location": "Mathura",
      "images": ["url1", "url2"],
      "status": "Available",
      "views": 1523
    }
  ]
}
```

## Pages Where Cards Appear 📄

All these pages now have updated routing:

1. ✅ **Home Page** - Recent Properties Section
2. ✅ **Properties Page** - All properties grid
3. ✅ **Favorites Page** - Saved properties
4. ✅ **Categories Page** - Category-wise listing
5. ✅ **Property Type Sections** (PG, Home, etc.)
6. ✅ **Marketplace** - Property cards
7. ✅ **Similar Properties** - On detail pages

## Badge Styling 🎨

### FOR RENT Badge:
```css
background: #9333ea (Purple 600)
color: white
position: top-right, below heart icon
```

### FOR SALE Badge:
```css
background: #f59e0b (Amber 500)
color: white
position: top-right, below heart icon
```

## Migration Guide for Existing Data 🔄

If you have existing properties in database without `listingType`:

### Option 1: Add listingType field (Recommended)
```javascript
// Update all rental properties
db.properties.updateMany(
  { price: { $lt: 100000 } },
  { $set: { listingType: "rent" } }
)

// Update all sale properties
db.properties.updateMany(
  { price: { $gte: 100000 } },
  { $set: { listingType: "sale" } }
)
```

### Option 2: Use propertyType
Just ensure propertyType contains keywords like:
- Rent: "PG", "Hostel", "Co-Living", "Room"
- Sale: "Apartment", "Villa", "Plot", "House"

### Option 3: Let price decide (automatic fallback)
System will automatically use price:
- < ₹1,00,000 = Rent
- >= ₹1,00,000 = Sale

## Quick Test URLs 🔗

After starting dev server on `http://localhost:5173`:

### Rental Property Detail:
```
http://localhost:5173/property-rent/123
http://localhost:5173/property-rent/pg-quantum-university
```

### Sale Property Detail:
```
http://localhost:5173/property-sale/456
http://localhost:5173/property-sale/penthouse-mathura
```

## Status: ✅ COMPLETE

All property cards across the application now:
- ✅ Show appropriate "FOR RENT" or "FOR SALE" badge
- ✅ Display price correctly (with/without /month)
- ✅ Route to correct detail page
- ✅ Work on all listing pages
- ✅ Backward compatible (uses price fallback)

---

**Next Step**: Update your backend API to include `listingType` field in property objects for better accuracy!
