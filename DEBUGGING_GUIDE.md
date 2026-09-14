# 🔧 Debugging Guide - Mock Data Issues

## 🎯 Problem
Mock data nahi dikh raha hai properties pages par.

## ✅ What We Fixed

### 1. Mock Data Added (46 Properties)
- ✅ Residential: 24
- ✅ Home/House: 8 
- ✅ PG/Hostel: 8
- ✅ Commercial: 4
- ✅ Plot/Land: 4

### 2. API Queries Updated
- ✅ `getProperties` - with logging
- ✅ `getTopRatesPropertyById` - with logging
- ✅ `getPropertyById` - with logging

### 3. Filter Function Enhanced
- ✅ Better type matching (Home/House, Villa, Independent House)
- ✅ PG/Hostel variations handled
- ✅ Console logging added

## 🔍 How to Debug

### Step 1: Open Browser Console (F12)

Look for these messages:

#### ✅ Success Messages:
```
🔍 getProperties: Attempting API call...
✅ getProperties: Using mock data
📦 Mock properties count: 46
📦 Mock properties: [Array of 46 properties]
```

#### For Properties Page:
```
🔍 getTopRatesPropertyById called with: {type: "Home/House", city: "all", page: 1}
🔍 Filtering properties: {type: "Home/House", city: "all", page: 1, limit: 8}
📦 Total properties before filter: 46
📦 After type filter: 8
📦 After city filter: 8
📦 Final result: {data: Array(8), hasNextPage: false, ...}
```

#### For Property Details Page:
```
🔍 getPropertyById called with ID: mock-prop-031
✅ Using mock property by ID
📦 Mock property: {_id: "mock-prop-031", title: "...", ...}
```

### Step 2: Check Network Tab
- Should see failed API calls (this is normal!)
- Example: `GET http://localhost:5000/top-rated` → Failed
- This triggers mock data fallback

### Step 3: Check Redux DevTools (if installed)
- Look for `getProperty/getProperties/fulfilled` action
- Check the payload - should contain 46 properties

## 🌐 Test URLs

### 1. Home Page
```
http://localhost:5173/
```
**Expected:**
- Recently Listed: 5 properties
- Homes & Houses: 8 properties  
- PG & Hostels: 8 properties

### 2. All Properties (with filter)
```
http://localhost:5173/properties
```
Then click "Explore more" from any section.

**Expected for Home/House:**
- 8 properties displayed
- Types: Independent House, Villa, Home/House

**Expected for PG/Hostel:**
- 8 properties displayed
- Types: PG/Hostel, PG, Hostel

### 3. Property Details
Click on any property card to see details page.

**Expected:**
- Full property information
- Images, price, location, bedrooms, bathrooms
- All data from mock property object

### 4. Test Page (Direct Mock Data)
```
http://localhost:5173/test-mock-data.html
```
**Expected:**
- Shows all 46 properties grouped by type
- This bypasses API completely

## 🚨 Common Issues

### Issue 1: Skeleton Loaders Forever
**Cause:** Query is stuck in loading state  
**Fix:** 
- Check console for errors
- Hard refresh (Ctrl + Shift + R)
- Clear browser cache

### Issue 2: "No properties available"
**Cause:** Filter returning empty array  
**Console Check:**
```
📦 After type filter: 0  ← This is wrong!
```
**Fix:** Type mismatch in filter. Check console logs.

### Issue 3: TypeScript/ESM Import Errors
**Cause:** Module import issues  
**Fix:** Restart dev server:
```bash
npm run dev
```

### Issue 4: Redux State Not Updating
**Cause:** Store not configured  
**Fix:** Check `src/store/store.js` includes `getProperty` reducer

## 🔧 Manual Fixes

### Force Clear Everything:
```bash
# Stop server
Ctrl + C

# Clear cache
rmdir /s /q node_modules\.vite

# Restart
npm run dev
```

### Hard Browser Refresh:
```
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)
```

### Clear Browser Cache:
1. F12 (DevTools)
2. Right-click refresh button
3. "Empty Cache and Hard Reload"

## 📊 Expected Console Output

### On Home Page Load:
```
🔍 getProperties: Attempting API call...
⚠️ Using mock data - API unavailable
✅ getProperties: Using mock data
📦 Mock properties count: 46
📦 Mock properties: (46) [{…}, {…}, ...]
```

### On Properties Page (Home/House filter):
```
🔍 getTopRatesPropertyById called with: {type: "Home/House", city: "all", page: 1}
⚠️ Using mock data - API unavailable  
✅ Using mock data for filtering
🔍 Filtering properties: {type: "home/house", city: "all", page: 1, limit: 8}
📦 Total properties before filter: 46
📦 After type filter: 8
📦 After city filter: 8
📦 Final result: {data: Array(8), hasNextPage: false}
```

### On Property Details Click:
```
🔍 getPropertyById called with ID: mock-prop-031
⚠️ Using mock data - API unavailable
✅ Using mock property by ID
📦 Mock property: {_id: "mock-prop-031", title: "Spacious Independent House...", ...}
```

## ✅ If Everything Works

You should see:
1. ✅ Home page with properties in all sections
2. ✅ Properties page showing filtered results
3. ✅ Property details page with full information
4. ✅ Console logs showing mock data usage
5. ✅ No infinite loaders

## 🎉 Success Checklist

- [ ] Browser console shows mock data logs
- [ ] Home page displays 5 recent properties
- [ ] "Homes & Houses" shows 8 properties
- [ ] "PG & Hostels" shows 8 properties
- [ ] "Explore more" opens properties page
- [ ] Properties page shows filtered items
- [ ] Clicking property opens details page
- [ ] Details page shows full info
- [ ] Images loading properly
- [ ] No console errors

## 🆘 Still Not Working?

### Check These Files:
1. `src/data/mockProperties.js` - 46 properties?
2. `src/store/propertyQuery/getPropertyQuery.js` - Has console.log?
3. `src/store/store.js` - Has getProperty reducer?

### Try Test Page:
```
http://localhost:5173/test-mock-data.html
```
If this works but main site doesn't → Redux query issue  
If this also fails → Mock data file issue

### Nuclear Option - Fresh Start:
```bash
# Delete node_modules
rmdir /s /q node_modules

# Delete package-lock
del package-lock.json

# Reinstall
npm install

# Run
npm run dev
```

---

**After every fix:** Hard refresh browser (Ctrl + Shift + R)

**Key Console Messages to Look For:**
- ⚠️ Using mock data - API unavailable
- 📦 Mock properties count: 46
- ✅ Using mock data

If you see these, mock data is loading! 🎉
