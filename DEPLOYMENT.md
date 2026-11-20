# GharBazaar Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Hosting accounts (Vercel for frontend, Railway/Render for backend)

## 📦 Environment Setup

### Frontend (.env.production)
```env
VITE_BASE_URL=https://your-backend-url.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

## 🔧 Deployment Steps

### 1. Deploy Backend (Railway/Render/Heroku)

**Railway:**
1. Connect GitHub repository
2. Select `gharbazaar-server` folder as root
3. Add environment variables
4. Deploy automatically

**Render:**
1. New Web Service
2. Connect repository
3. Root directory: `gharbazaar-server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables

### 2. Deploy Frontend (Vercel/Netlify)

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from gharbazaar-client directory
cd gharbazaar-client
vercel --prod
```

Or use Vercel Dashboard:
1. Import GitHub repository
2. Root directory: `gharbazaar-client`
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variables

**Netlify:**
1. New site from Git
2. Root directory: `gharbazaar-client`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible (test `/api/health` endpoint)
- [ ] Frontend loads without errors
- [ ] CORS is configured correctly
- [ ] Environment variables are set on hosting platforms
- [ ] API calls work from production frontend
- [ ] Properties/listings are displaying
- [ ] Authentication works (if applicable)
- [ ] Images are loading correctly

## 🐛 Troubleshooting

### Listings not showing
1. Check browser console for errors
2. Verify `VITE_BASE_URL` in production
3. Check backend logs
4. Verify CORS configuration

### CORS Errors
1. Add your frontend URL to backend `allowedOrigins`
2. Rebuild and redeploy backend
3. Clear browser cache

### API Not Found (404)
1. Check if backend routes need `/api` prefix
2. Verify backend is running
3. Check backend URL is correct

## 📝 Important Notes

- Always use HTTPS in production
- Never commit `.env` files with real credentials
- Set environment variables on hosting platforms
- Test thoroughly before going live
- Keep local `.env` for development separate from production

## 🔗 Useful Commands

```bash
# Build frontend locally
npm run build

# Preview production build locally
npm run preview

# Test backend locally
node server.js

# Check environment variables (Linux/Mac)
printenv | grep VITE

# Check environment variables (Windows)
set | findstr VITE
```

## 📞 Support

If you encounter issues:
1. Check browser developer console
2. Check backend logs on hosting platform
3. Verify all environment variables are set
4. Test API endpoints directly using browser or Postman
