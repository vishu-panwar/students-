# Mock Data Implementation 🎭

## Overview
Mock data has been successfully integrated into the GharBazaar application. The app now displays 30 realistic property listings even without a backend server!

## What Was Added

### 1. Mock Data File (`src/data/mockProperties.js`)
- **30 realistic property listings** across different categories:
  - **Residential Properties** (24 properties)
    - Delhi: 6 properties
    - Bangalore: 6 properties
    - Mumbai: 6 properties
    - Noida: 6 properties
  - **Commercial Properties** (4 properties)
  - **Plot/Land** (4 properties)

### 2. Property Features
Each property includes:
- ✅ Unique ID
- ✅ Title & Description
- ✅ Price (formatted for display)
- ✅ Location & City
- ✅ High-quality images (from Unsplash)
- ✅ Status (Available/Sold)
- ✅ View counts
- ✅ Property type
- ✅ Bedrooms, Bathrooms, Area

### 3. API Integration
Modified `src/store/propertyQuery/getPropertyQuery.js` to:
- ✅ Automatically fallback to mock data when backend is unavailable
- ✅ Support filtering by city (Delhi, Bangalore, Mumbai, Noida)
- ✅ Support filtering by property type (Residential, Commercial, Plot/Land)
- ✅ Support pagination (8 items per page)
- ✅ Provide seamless experience whether backend is connected or not

## How It Works

### Automatic Fallback
When the API call fails or `VITE_BASE_URL` is not configured, the app automatically uses mock data:

```javascript
// Console will show: "⚠️ Using mock data - API unavailable"
```

### Filter Support
All filters work with mock data:
- **City Filter**: Delhi, Bangalore, Mumbai, Noida
- **Type Filter**: Residential, Commercial Space, Plot/Land
- **Search**: By title, location, or city

### Pagination
- 8 properties per page
- Infinite scroll supported
- Proper "hasNextPage" logic

## Testing the Mock Data

### 1. Home Page
Visit: `http://localhost:5173/`
- See "Recently Listed Properties" section with 5 properties

### 2. All Properties
Click "Explore more" or visit: `http://localhost:5173/properties`
- See all 30 properties with filters

### 3. Filter by City
Use the sidebar filter to select:
- Delhi (9 properties)
- Bangalore (7 properties)
- Mumbai (7 properties)
- Noida (7 properties)

### 4. Filter by Type
Select property type:
- Residential (24 properties)
- Commercial Space (4 properties)
- Plot/Land (4 properties)

### 5. Search
Type in the search box to filter by:
- Title keywords
- Location
- City name

## Sample Properties

### Luxury Properties
- **3BHK in South Delhi** - ₹45,000/month
- **Sea-Facing 3BHK in Bandra** - ₹1,25,000/month
- **Villa with Pool in Bangalore** - ₹1,50,000/month

### Affordable Options
- **Studio in Koramangala** - ₹18,000/month
- **2BHK in Noida Sector 76** - ₹22,000/month
- **Compact Studio in Mira Road** - ₹15,000/month

### Commercial
- **Office in Cyber City** - ₹1,85,000/month
- **Retail Shop in CP** - ₹95,000/month
- **Co-Working Space** - ₹65,000/month

### Plots
- **Residential Plot Dwarka** - ₹85 Lakh
- **Commercial Plot Bangalore** - ₹1.5 Crore
- **Farm House Plot** - ₹2.2 Crore

## Images
All images are from Unsplash (free, high-quality property photos):
- Modern interiors
- Exterior views
- Professional real estate photography

## Future Enhancements
To connect to a real backend:
1. Set `VITE_BASE_URL` in `.env` file
2. Ensure backend is running on specified port
3. App will automatically use real API data
4. Mock data remains as fallback

## Developer Notes

### Adding More Mock Data
Edit `src/data/mockProperties.js` and add objects to the `mockProperties` array:

```javascript
{
  _id: "mock-prop-XXX",
  title: "Your Property Title",
  price: 30000,
  location: "Locality, City",
  city: "City Name",
  images: ["image-url-1", "image-url-2"],
  status: "Available",
  views: 100,
  type: "residential", // or "Commercial Space" or "Plot/Land"
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  description: "Property description"
}
```

### Modifying Filter Logic
Edit the `filterProperties` function in `src/data/mockProperties.js`

## Browser Console
Check the browser console for:
```
⚠️ Using mock data - API unavailable
```

This confirms mock data is being used.

## Live Status
- ✅ Dev Server: Running on http://localhost:5173/
- ✅ Mock Data: 30 properties loaded
- ✅ Filters: Working (City + Type)
- ✅ Search: Working
- ✅ Pagination: Working (8 per page)
- ✅ Images: High-quality from Unsplash

---

**Happy Testing! 🏡**
