// Simple Express Mock Server for GharBazaar
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
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

// Get user's listed properties (for seller dashboard)
app.get('/myListings', (req, res) => {
  console.log('📥 GET /myListings', { query: req.query, cookies: req.cookies });
  
  const { page = 1, limit = 9, status, listingType, search } = req.query;
  
  // Filter properties by demo user
  let userProperties = mockProperties.filter(
    (prop) => prop.ownerEmail === 'demo@gharbazaar.in'
  );
  
  console.log(`   Found ${userProperties.length} demo user properties`);
  
  // Apply filters
  if (status) {
    userProperties = userProperties.filter(p => 
      p.status.toLowerCase() === status.toLowerCase()
    );
    console.log(`   After status filter: ${userProperties.length}`);
  }
  
  if (listingType) {
    userProperties = userProperties.filter(p => 
      p.type.toLowerCase().includes(listingType.toLowerCase())
    );
    console.log(`   After type filter: ${userProperties.length}`);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    userProperties = userProperties.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.location.toLowerCase().includes(searchLower) ||
      p.city.toLowerCase().includes(searchLower)
    );
    console.log(`   After search filter: ${userProperties.length}`);
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = userProperties.slice(startIndex, endIndex);
  
  console.log(`   Returning ${paginatedData.length} properties (page ${page})`);
  
  res.json({
    success: true,
    properties: paginatedData,
    total: userProperties.length,
    totalPages: Math.ceil(userProperties.length / limit),
    currentPage: parseInt(page)
  });
});

// Get user's listed properties (for seller dashboard)
app.get('/api/user/properties', (req, res) => {
  const { email } = req.query;
  console.log('📥 GET /api/user/properties', { email });
  
  // Filter properties by owner email (demo user)
  const userProperties = mockProperties.filter(
    (prop) => prop.ownerEmail === 'demo@gharbazaar.in'
  );
  
  res.json({
    success: true,
    data: userProperties,
    total: userProperties.length,
    active: userProperties.filter(p => p.status === 'Available').length,
    closed: userProperties.filter(p => p.status === 'Closed').length
  });
});

// Get property schedule/bookings
app.get('/api/property/:id/schedule', (req, res) => {
  const { id } = req.params;
  console.log('📥 GET /api/property/:id/schedule', { id });
  
  const property = mockProperties.find((prop) => prop._id === id);
  
  if (property && property.schedule) {
    res.json({
      success: true,
      data: property.schedule
    });
  } else {
    res.json({
      success: true,
      data: []
    });
  }
});

// Service Enquiry endpoint
app.post('/api/service-enquiry', (req, res) => {
  const { name, email, phone, customerType, serviceId, serviceName, message, city, budget } = req.body;
  
  console.log('📥 POST /api/service-enquiry', {
    name,
    email,
    phone,
    customerType,
    serviceId,
    serviceName,
    city,
    budget
  });
  
  // Validation
  if (!name || !email || !phone || !customerType || !serviceId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }
  
  // Phone validation
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit mobile number'
    });
  }
  
  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }
  
  // Mock success response
  // In production, this would:
  // 1. Store enquiry in database
  // 2. Send notification to admin
  // 3. Send confirmation email to customer
  // 4. Create a CRM ticket
  
  res.json({
    success: true,
    message: 'Service enquiry submitted successfully! Our team will contact you within 2 business hours.',
    data: {
      enquiryId: `ENQ-${Date.now()}`,
      name,
      email,
      phone,
      serviceName,
      customerType,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
  });
  
  console.log('✅ Service enquiry stored successfully');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📦 Serving ${mockProperties.length} mock properties`);
  const demoProperties = mockProperties.filter(p => p.ownerEmail === 'demo@gharbazaar.in');
  console.log(`👤 Demo User has ${demoProperties.length} listed properties`);
});
