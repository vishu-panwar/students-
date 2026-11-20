# 🏡 GharBazaar - Quick Start Guide

## ✅ Your Application is LIVE!

**URL:** http://localhost:5173/

The dev server is running with **30 mock properties** loaded!

---

## 🎯 What's Working Now

### ✨ Features
- ✅ **30 Realistic Properties** - Residential, Commercial, and Land plots
- ✅ **4 Cities** - Delhi, Bangalore, Mumbai, Noida
- ✅ **Smart Filters** - Filter by city and property type
- ✅ **Search** - Search properties by title, location, or city
- ✅ **Infinite Scroll** - Smooth pagination with 8 properties per page
- ✅ **High-Quality Images** - Professional property photos from Unsplash
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

---

## 🚀 Exploring Your Website

### 1️⃣ Home Page
- Visit: http://localhost:5173/
- See: 5 recently listed properties
- Click "Explore more →" to see all properties

### 2️⃣ All Properties Page
- Automatically redirects when clicking "Explore more"
- View all 30 properties with filters
- Use sidebar to filter by:
  - **City:** All Cities, Delhi, Bangalore, Mumbai, Noida
  - **Type:** All Types, Residential, Commercial Space, Plot/Land

### 3️⃣ Search Properties
- Type in the search box at the top
- Search by: title, location, or city name
- Real-time filtering as you type

### 4️⃣ Property Details
- Click on any property card
- See detailed information
- View multiple images
- See price, location, bedrooms, bathrooms, area

---

## 📊 Mock Data Stats

| Category | Count | Price Range |
|----------|-------|-------------|
| **Residential** | 24 properties | ₹15K - ₹1.5L/month |
| **Commercial** | 4 properties | ₹65K - ₹1.85L/month |
| **Plot/Land** | 4 properties | ₹85L - ₹2.2 Crore |
| **Total** | 30 properties | - |

### City Distribution
- 🏙️ Delhi: 9 properties
- 🌆 Bangalore: 7 properties
- 🌃 Mumbai: 7 properties
- 🏢 Noida: 7 properties

---

## 🎨 Sample Properties You'll See

### 🏘️ Affordable Options
- Studio in Koramangala - ₹18,000/month
- 2BHK in Noida - ₹22,000/month
- Compact Studio - ₹15,000/month

### 💎 Luxury Properties
- Sea-Facing 3BHK in Bandra - ₹1,25,000/month
- Villa with Pool - ₹1,50,000/month
- Penthouse in Vasant Vihar - ₹95,000/month

### 🏢 Commercial Spaces
- Modern Office in Cyber City - ₹1,85,000/month
- Retail Shop in CP - ₹95,000/month
- Co-Working Space - ₹65,000/month

### 🌾 Plots & Land
- Residential Plot - ₹85 Lakh
- Commercial Plot - ₹1.5 Crore
- Farm House Plot - ₹2.2 Crore

---

## 🛠️ Technical Details

### Files Modified/Added
1. **Created:** `src/data/mockProperties.js` - 30 property listings
2. **Modified:** `src/store/propertyQuery/getPropertyQuery.js` - API with mock fallback
3. **Created:** `gharbazaar-client/MOCK_DATA_README.md` - Detailed documentation

### How Mock Data Works
- Automatically loads when backend is not available
- Console shows: `⚠️ Using mock data - API unavailable`
- Supports all filters and search functionality
- Pagination works perfectly

### Dependencies Installed
- All React dependencies (Redux, Router, Framer Motion, etc.)
- Vite dev server running on port 5173

---

## 🔄 Restarting the Server

If you need to restart:

```bash
cd gharbazaar-client
npm run dev
```

---

## 🌐 Browser Console

Open Developer Tools (F12) to see:
- Mock data loading messages
- Property data structure
- Any warnings or errors

---

## 📝 Next Steps

### To Add More Properties
Edit: `src/data/mockProperties.js`

### To Connect Real Backend
1. Create `.env` file in `gharbazaar-client/`
2. Add: `VITE_BASE_URL=http://localhost:5000`
3. Start your Express backend
4. App will automatically use real API

### To Build for Production
```bash
npm run build
```

---

## 🐛 Troubleshooting

### Port Already in Use?
- Stop the current process
- Change port in `vite.config.js`
- Or kill process using port 5173

### Images Not Loading?
- Check internet connection (using Unsplash CDN)
- Fallback to placeholder images automatically

### Filters Not Working?
- Check browser console for errors
- Verify mock data structure
- Refresh the page

---

## 📱 Mobile Responsive

Test on different screen sizes:
- Desktop: Full filters sidebar
- Tablet: Collapsed filters
- Mobile: Grid adapts to single column

---

## 💡 Pro Tips

1. **Bookmark Favorites** - Click heart icon (requires login)
2. **View Details** - Click "Details →" button
3. **Quick Search** - Use search box for instant results
4. **Infinite Scroll** - Keep scrolling for more properties

---

## 🎉 Enjoy Your Application!

Your GharBazaar real estate platform is now running with beautiful mock data!

**Open in browser:** http://localhost:5173/

---

*For detailed technical documentation, see: `gharbazaar-client/MOCK_DATA_README.md`*
