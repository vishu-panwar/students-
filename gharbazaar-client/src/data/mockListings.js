// Mock data for seller listings - No backend needed!
export const mockSellerListings = [
  {
    _id: "demo-user-001",
    title: "Spacious 3BHK Apartment in Vasant Kunj",
    price: 48000,
    location: "Vasant Kunj, South Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    status: "Available",
    views: 156,
    type: "residential",
    listingType: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    description: "Beautiful 3BHK apartment with modern amenities in prime location of Vasant Kunj.",
    furnishingStatus: "Semi-Furnished",
    availableFrom: "Immediate",
  },
  {
    _id: "demo-user-002",
    title: "Modern 2BHK Flat in Dwarka Mor",
    price: 22000,
    location: "Dwarka Mor, West Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800"
    ],
    status: "Available",
    views: 89,
    type: "residential",
    listingType: "Rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 950,
    description: "Cozy 2BHK flat with parking and modern amenities near metro station.",
    furnishingStatus: "Furnished",
    availableFrom: "Immediate",
  },
  {
    _id: "demo-user-003",
    title: "Luxury 4BHK Penthouse in Greater Kailash",
    price: 125000,
    location: "Greater Kailash I, South Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    status: "Available",
    views: 234,
    type: "residential",
    listingType: "Rent",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    description: "Luxurious penthouse with terrace garden and premium amenities.",
    furnishingStatus: "Fully-Furnished",
    availableFrom: "15 days",
  },
  {
    _id: "demo-user-004",
    title: "Budget 1BHK Apartment in Laxmi Nagar",
    price: 12000,
    location: "Laxmi Nagar, East Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    status: "Closed",
    views: 67,
    type: "residential",
    listingType: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    description: "Affordable 1BHK apartment perfect for students and working professionals.",
    furnishingStatus: "Semi-Furnished",
    availableFrom: "Immediate",
  },
  {
    _id: "demo-user-005",
    title: "Premium 3BHK Villa in Gurgaon Sector 54",
    price: 3500000,
    location: "Sector 54, Gurgaon, Haryana",
    city: "Gurgaon",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800"
    ],
    status: "Available",
    views: 312,
    type: "residential",
    listingType: "Sell",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    description: "Beautiful independent villa with private garden and parking.",
    furnishingStatus: "Semi-Furnished",
    availableFrom: "30 days",
  },
  {
    _id: "demo-user-006",
    title: "Spacious 2BHK in Noida Extension",
    price: 18000,
    location: "Greater Noida West, Noida, UP",
    city: "Noida",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    status: "Available",
    views: 145,
    type: "residential",
    listingType: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    description: "Well-maintained 2BHK with club facilities and good connectivity.",
    furnishingStatus: "Semi-Furnished",
    availableFrom: "Immediate",
  },
  {
    _id: "demo-user-007",
    title: "Studio Apartment in Connaught Place",
    price: 25000,
    location: "Connaught Place, Central Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800"
    ],
    status: "Available",
    views: 198,
    type: "residential",
    listingType: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    description: "Prime location studio apartment ideal for working professionals.",
    furnishingStatus: "Fully-Furnished",
    availableFrom: "Immediate",
  },
  {
    _id: "demo-user-008",
    title: "Luxury 5BHK Duplex in Vasant Vihar",
    price: 8500000,
    location: "Vasant Vihar, South Delhi, Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
    ],
    status: "Available",
    views: 456,
    type: "residential",
    listingType: "Sell",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    description: "Ultra-luxury duplex with premium amenities and private terrace.",
    furnishingStatus: "Fully-Furnished",
    availableFrom: "60 days",
  },
];

// Helper function to filter mock data
export function filterMockListings({ search, statusFilter, typeFilter, page = 1, limit = 9 }) {
  let filtered = [...mockSellerListings];

  // Search filter
  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(prop => 
      prop.title.toLowerCase().includes(searchLower) ||
      prop.location.toLowerCase().includes(searchLower) ||
      prop.city.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (statusFilter) {
    filtered = filtered.filter(prop => prop.status === statusFilter);
  }

  // Type filter (listingType)
  if (typeFilter) {
    filtered = filtered.filter(prop => prop.listingType === typeFilter);
  }

  // Calculate pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    properties: paginatedData,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

// Helper to get single property by ID
export function getMockListingById(id) {
  return mockSellerListings.find(prop => prop._id === id);
}

// Helper to update property status (in-memory only)
export function updateMockListingStatus(id, newStatus) {
  const property = mockSellerListings.find(prop => prop._id === id);
  if (property) {
    property.status = newStatus;
    return { success: true, property };
  }
  return { success: false, message: 'Property not found' };
}

// Helper to delete property (in-memory only)
export function deleteMockListing(id) {
  const index = mockSellerListings.findIndex(prop => prop._id === id);
  if (index !== -1) {
    mockSellerListings.splice(index, 1);
    return { success: true };
  }
  return { success: false, message: 'Property not found' };
}
