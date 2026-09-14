// Simple Express Mock Server for GharBazaar
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import mock data (we'll use the same data from client)
const mockProperties = require('./mockData');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock server running' });
});

// Get top-rated properties
app.get('/top-rated', (req, res) => {
  console.log('📥 GET /top-rated');
  res.json(mockProperties);
});

// Get properties by type and city with pagination
app.get('/getTopRateByType', (req, res) => {
  const { type, city, page = 1, limit = 8 } = req.query;
  console.log('📥 GET /getTopRateByType', { type, city, page, limit });

  let filtered = [...mockProperties];

  // Filter by type
  if (type && type !== 'all') {
    const typeToMatch = type.toLowerCase().trim();
    filtered = filtered.filter((prop) => {
      const propType = prop.type.toLowerCase().trim();
      
      if (typeToMatch === 'home/house') {
        return propType === 'home/house' || 
               propType === 'villa' || 
               propType === 'independent house' ||
               propType === 'apartment';
      }
      
      if (typeToMatch === 'pg/hostel') {
        return propType === 'pg/hostel' || 
               propType === 'pg' || 
               propType === 'hostel';
      }
      
      return propType === typeToMatch;
    });
  }

  // Filter by city
  if (city && city !== 'all') {
    filtered = filtered.filter((prop) => 
      prop.city.toLowerCase() === city.toLowerCase()
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = filtered.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    hasNextPage: endIndex < filtered.length,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(filtered.length / limit),
      totalItems: filtered.length,
      hasNextPage: endIndex < filtered.length,
      hasPreviousPage: page > 1
    }
  });
});

// Get property by category
app.get('/getPropertyBycategory', (req, res) => {
  const { type, city, page = 1, limit = 8 } = req.query;
  console.log('📥 GET /getPropertyBycategory', { type, city, page, limit });

  let filtered = [...mockProperties];

  if (type && type !== 'all') {
    filtered = filtered.filter((prop) => 
      prop.type.toLowerCase() === type.toLowerCase()
    );
  }

  if (city && city !== 'all') {
    filtered = filtered.filter((prop) => 
      prop.city.toLowerCase() === city.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = filtered.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    hasNextPage: endIndex < filtered.length
  });
});

// Get single property by ID
app.get('/getPropertyById/:id', (req, res) => {
  const { id } = req.params;
  console.log('📥 GET /getPropertyById/:id', id);

  const property = mockProperties.find((prop) => prop._id === id);

  if (property) {
    res.json({ data: property });
  } else {
    res.status(404).json({ error: 'Property not found' });
  }
});

// Category endpoint
app.get('/category', (req, res) => {
  const { type } = req.query;
  console.log('📥 GET /category', { type });
  
  let filtered = mockProperties;
  if (type && type !== 'all') {
    filtered = mockProperties.filter((prop) => 
      prop.type.toLowerCase() === type.toLowerCase()
    );
  }
  
  res.json(filtered);
});

// Offers endpoint
app.get('/offers', (req, res) => {
  console.log('📥 GET /offers');
  res.json([]);
});

// Advertisement endpoint - Hero banners
app.get('/advertisement', (req, res) => {
  console.log('📥 GET /advertisement');
  
  const advertisements = [
    {
      _id: 'ad-1',
      title: 'Find Your Dream Home',
      image: 'https://via.placeholder.com/1200x400/0F9D58/ffffff?text=Find+Your+Dream+Home+with+GharBazaar',
      link: '/properties'
    },
    {
      _id: 'ad-2',
      title: 'Property Management Services',
      image: 'https://via.placeholder.com/1200x400/0D6B3F/ffffff?text=Professional+Property+Management',
      link: '/pricing'
    },
    {
      _id: 'ad-3',
      title: 'Premium Properties',
      image: 'https://via.placeholder.com/1200x400/147638/ffffff?text=Explore+Premium+Properties',
      link: '/properties'
    },
    {
      _id: 'ad-4',
      title: 'List Your Property Free',
      image: 'https://via.placeholder.com/1200x400/005327/ffffff?text=List+Your+Property+for+FREE',
      link: '/pricing'
    },
    // Mobile banners
    {
      _id: 'ad-mobile-1',
      title: 'Mobile - PG & Hostels',
      image: 'https://via.placeholder.com/800x600/0F9D58/ffffff?text=PG+and+Hostels',
      link: '/properties'
    },
    {
      _id: 'ad-mobile-2',
      title: 'Mobile - Verified Properties',
      image: 'https://via.placeholder.com/800x600/0D6B3F/ffffff?text=100%25+Verified+Properties',
      link: '/properties'
    },
    {
      _id: 'ad-mobile-3',
      title: 'Mobile - Student Plans',
      image: 'https://via.placeholder.com/800x600/147638/ffffff?text=Special+Student+Plans',
      link: '/pricing'
    },
    {
      _id: 'ad-mobile-4',
      title: 'Mobile - Owner Services',
      image: 'https://via.placeholder.com/800x600/005327/ffffff?text=Owner+Services',
      link: '/pricing'
    }
  ];
  
  res.json({ advertisements });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📦 Serving ${mockProperties.length} mock properties`);
});
