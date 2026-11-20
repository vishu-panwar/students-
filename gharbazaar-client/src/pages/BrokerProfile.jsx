import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Globe, Award, Users, Building, CheckCircle, MessageCircle, Share2, ChevronLeft, Calendar, Clock, Shield, Verified, Send, Search, Home as HomeIcon, Store, Truck, Package } from 'lucide-react';
import './BrokerProfile.css';

function BrokerProfile() {
  const { id } = useParams();

  // Comprehensive Broker/Builder/Agent data matching all 8 partners
  const brokerData = {
    1: {
      name: 'Rahul Sharma',
      type: 'Premium Broker',
      tagline: 'Real Estate Broker & Property Consultant',
      location: 'Delhi NCR',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
      logo: 'https://via.placeholder.com/120/e74c3c/ffffff?text=RS',
      color: '#e74c3c',
      rating: 4.8,
      reviews: 342,
      experience: '12+ Years',
      properties: 85,
      products: 0,
      clients: '2,500+',
      memberSince: '2024',
      responseTime: '< 15 mins',
      workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
      rera: 'UPRERAAGT19842',
      gstin: '09AAACS8492K1Z5',
      description: 'Helping customers discover quality residential & commercial properties with 100% transparent documentation, competitive pricing, and trusted service across Delhi NCR region.',
      specialization: ['Luxury Apartments', 'Commercial Spaces', 'Investment Properties', 'Property Management'],
      contact: {
        phone: '+91 98765 43210',
        email: 'rahul.sharma@realty.com',
        website: 'www.rahulsharma-realty.com',
        address: 'Plot 42, Krishna Nagar Main Road, Near Highway Plaza, Delhi NCR - 110001'
      },
      certifications: ['RERA Registered', 'Certified Property Consultant', 'Top Performer 2024'],
      portfolio: [
        { id: 1, name: 'Modern 3 BHK Independent Villa', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹72,00,000', pricePerUnit: '₹4,000 / sq.ft', location: 'Krishna Nagar, Delhi', status: 'Ready to Move', type: 'For Sale', specs: { area: '1,800 sq.ft', beds: '3 Bed / 3 Bath', parking: '1 Dedicated' } },
        { id: 2, name: 'Gated Township Residential Plot', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80', price: '₹34,50,000', pricePerUnit: '₹2,300 / sq.yd', location: 'NH-19 Highway, Near University', status: 'Freehold Plot', type: 'For Sale', specs: { area: '150 sq.yd', beds: 'East Facing', parking: '30 ft. Wide' } },
        { id: 3, name: 'Commercial Showroom Space', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80', price: '₹1,25,00,000', pricePerUnit: 'Rent: ₹45,000/mo', location: 'Vrindavan Road, Delhi', status: 'Ground Floor', type: 'Sale / Lease', specs: { area: '1,200 sq.ft', beds: '12 Feet', parking: '100% DG Set' } }
      ]
    },
    2: {
      name: 'Anita Builders',
      type: 'Verified Builder',
      tagline: 'Real Estate Developer & Construction Company',
      location: 'Bangalore',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      logo: 'https://via.placeholder.com/120/e67e22/ffffff?text=AB',
      color: '#e67e22',
      rating: 4.9,
      reviews: 523,
      experience: '18+ Years',
      properties: 120,
      products: 0,
      clients: '15,000+',
      memberSince: '2024',
      responseTime: '< 10 mins',
      workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      rera: 'KARERAAGT18965',
      gstin: '29AAACB8492K1Z8',
      description: 'Established construction company with a legacy of building quality homes and commercial spaces. We are committed to excellence, timely delivery, and customer satisfaction.',
      specialization: ['Residential Apartments', 'Villa Projects', 'Commercial Buildings', 'Gated Communities'],
      contact: {
        phone: '+91 98765 54321',
        email: 'info@anitabuilders.com',
        website: 'www.anitabuilders.com',
        address: 'Tower B, Tech Park, Electronic City, Bangalore - 560100'
      },
      certifications: ['RERA Registered', 'ISO 9001:2015', 'IGBC Green Certified', 'BDA Approved'],
      portfolio: [
        { id: 11, name: 'Anita Grand Heights', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹1,80,00,000', pricePerUnit: '₹5,500 / sq.ft', location: 'Whitefield, Bangalore', status: 'Under Construction', type: 'For Sale', specs: { area: '3,200 sq.ft', beds: '4 BHK', parking: '2 Covered' } },
        { id: 12, name: 'Anita Tech Park', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80', price: '₹5,50,00,000', pricePerUnit: '₹8,000 / sq.ft', location: 'Electronic City, Bangalore', status: 'Ready to Move', type: 'Commercial', specs: { area: '6,800 sq.ft', beds: 'A Grade', parking: 'Covered' } }
      ]
    },
    // Add data for other partners (3-8) similarly...
    default: {
      name: 'Shree Krishna Properties & Construction',
      type: 'Real Estate Agency & Building Material Wholesaler',
      tagline: 'Real Estate Broker & Construction Material Supplier',
      location: 'Mathura, UP',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
      logo: 'https://via.placeholder.com/120/10b981/ffffff?text=SK',
      color: '#166534',
      rating: 4.8,
      reviews: 64,
      experience: '12+ Years',
      properties: 12,
      products: 24,
      clients: '450+',
      memberSince: '2024',
      responseTime: '< 15 mins',
      workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
      rera: 'UPRERAAGT19842',
      gstin: '09AAACS8492K1Z5',
      description: 'Helping customers discover quality residential & commercial properties and reliable branded construction materials with 100% transparent documentation, competitive bulk pricing, and trusted doorstep delivery.',
      specialization: ['Luxury Apartments', 'Commercial Spaces', 'Cement & Concrete', 'TMT Steel & Rebars'],
      contact: {
        phone: '+91 98765 43210',
        email: 'info@skproperties.com',
        website: 'www.skproperties.com',
        address: 'Plot 42, Krishna Nagar Main Road, Near Highway Plaza, Mathura, UP - 281004'
      },
      certifications: ['RERA Registered', 'GSTIN Verified', 'Quality Certified', 'GharBazaar Verified'],
      portfolio: [
        { id: 1, name: 'Modern 3 BHK Independent Villa', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹72,00,000', pricePerUnit: '₹4,000 / sq.ft', location: 'Krishna Nagar, Mathura', status: 'Ready to Move', type: 'For Sale', specs: { area: '1,800 sq.ft', beds: '3 Bed / 3 Bath', parking: '1 Dedicated' } },
        { id: 2, name: 'Gated Township Villa Plot', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80', price: '₹34,50,000', pricePerUnit: '₹2,300 / sq.yd', location: 'NH-19, Mathura', status: 'Freehold', type: 'For Sale', specs: { area: '150 sq.yd', beds: 'East Facing', parking: '30 ft Road' } },
        { id: 3, name: 'Commercial Showroom', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80', price: '₹1,25,00,000', pricePerUnit: 'Rent: ₹45,000/mo', location: 'Vrindavan Road', status: 'Ground Floor', type: 'Sale/Lease', specs: { area: '1,200 sq.ft', beds: '12 ft Height', parking: 'DG Backup' } }
      ],
      materials: [
        { id: 101, name: 'UltraTech Super Premium Cement (PPC)', img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=300&q=80', price: '₹390', unit: 'Bag', description: 'Grade 53, High strength, Water repellent', inStock: true, minOrder: '50 Bags' },
        { id: 102, name: 'First-Class Red Clay Bricks', img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=300&q=80', price: '₹8.50', unit: 'Piece', description: 'Kiln-fired, uniform edges', inStock: true, minOrder: '3,000 Pcs' },
        { id: 103, name: 'Tata Tiscon 550D TMT Steel', img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=300&q=80', price: '₹68', unit: 'Kg', description: 'Earthquake resistant, Mill certificate', inStock: true, minOrder: '1 Ton' }
      ]
    }
  };

  const broker = brokerData[id] || brokerData.default;

  return (
    <div className="broker-profile-m3">
      {/* Breadcrumb & Top Bar */}
      <section className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronLeft size={16} className="breadcrumb-icon" />
            <Link to="/directory" className="breadcrumb-link">Directory</Link>
            <ChevronLeft size={16} className="breadcrumb-icon" />
            <span className="breadcrumb-current">{broker.name}</span>
          </nav>
          <div className="credentials-badges">
            <span className="badge-rera">
              <Shield size={15} />
              RERA: {broker.rera}
            </span>
            <span className="badge-gstin">
              <Verified size={15} />
              GSTIN: {broker.gstin}
            </span>
          </div>
        </div>
      </section>

      <div className="container profile-container">
        {/* Hero Business Card */}
        <section className="hero-card" style={{ borderLeftColor: broker.color }}>
          <div className="hero-content">
            <div className="hero-left">
              <div className="logo-wrapper">
                <div className="logo-emblem" style={{ backgroundColor: broker.color }}>
                  <img src={broker.logo} alt={`${broker.name} logo`} />
                </div>
                <span className="verified-seal" style={{ backgroundColor: broker.color }}>
                  <CheckCircle size={16} />
                </span>
              </div>

              <div className="business-info">
                <div className="name-header">
                  <h1>{broker.name}</h1>
                  <span className="verified-badge" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
                    <Verified size={14} />
                    Verified Business
                  </span>
                </div>
                
                <h2 className="tagline" style={{ color: broker.color }}>{broker.tagline}</h2>
                
                <p className="description">{broker.description}</p>

                <div className="meta-badges">
                  <span className="meta-item">
                    <MapPin size={15} />
                    {broker.location}
                  </span>
                  <span className="meta-item">
                    <Calendar size={15} />
                    Member Since {broker.memberSince}
                  </span>
                  <span className="meta-item" style={{ color: broker.color }}>
                    <Clock size={15} />
                    High Response Rate ({broker.responseTime})
                  </span>
                  <span className="meta-item">
                    <Clock size={15} />
                    {broker.workingHours}
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn-primary" style={{ backgroundColor: broker.color }}>
                <MessageCircle size={18} />
                <div>
                  <span>Connect Through GharBazaar</span>
                  <small>GharBazaar Assisted Coordination</small>
                </div>
              </button>
              
              <button className="btn-secondary">
                <Share2 size={18} />
                Share Profile
              </button>

              <div className="trust-notice">
                <Shield size={18} style={{ color: broker.color }} />
                <p>All enquiries facilitated centrally via GharBazaar Trust Desk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
              <HomeIcon size={26} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{broker.properties}</div>
              <div className="metric-label">Properties Listed</div>
              <div className="metric-sub">Villas, Plots & Commercial</div>
            </div>
          </div>

          {broker.products > 0 && (
            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
                <Package size={26} />
              </div>
              <div className="metric-content">
                <div className="metric-value">{broker.products}</div>
                <div className="metric-label">Products Listed</div>
                <div className="metric-sub">Cement, Steel, Bricks</div>
              </div>
            </div>
          )}

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
              <Award size={26} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{broker.experience}</div>
              <div className="metric-label">Experience</div>
              <div className="metric-sub">Industry Veteran</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
              <Users size={26} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{broker.clients}</div>
              <div className="metric-label">Happy Clients</div>
              <div className="metric-sub">Satisfied Customers</div>
            </div>
          </div>
        </section>

        {/* About & Credentials Grid */}
        <section className="about-grid">
          <div className="about-card">
            <div className="section-header">
              <Building size={22} style={{ color: broker.color }} />
              <h2>About {broker.name}</h2>
            </div>
            
            <p className="about-text">{broker.description}</p>

            <h3>Specialization</h3>
            <div className="spec-tags">
              {broker.specialization.map((spec, index) => (
                <span key={index} className="spec-tag" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
                  {spec}
                </span>
              ))}
            </div>

            <div className="features-list">
              <div className="feature-item">
                <CheckCircle size={20} style={{ color: broker.color }} />
                <span>GharBazaar Managed Sourcing</span>
              </div>
              <div className="feature-item">
                <Truck size={20} style={{ color: broker.color }} />
                <span>Coordinated Delivery</span>
              </div>
              <div className="feature-item">
                <Shield size={20} style={{ color: broker.color }} />
                <span>RERA Title Verification</span>
              </div>
            </div>
          </div>

          <div className="credentials-card">
            <div className="section-header">
              <h3>Verified Credentials</h3>
              <span className="verified-badge-small" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
                <Shield size={14} />
                GharBazaar Verified
              </span>
            </div>

            <div className="credential-list">
              <div className="credential-item">
                <span className="cred-label">Primary Category</span>
                <span className="cred-value">{broker.type}</span>
              </div>
              <div className="credential-item">
                <span className="cred-label">Registered Office</span>
                <span className="cred-value">{broker.contact.address}</span>
              </div>
              <div className="credential-item">
                <span className="cred-label">Compliance</span>
                <span className="cred-value">GSTIN: {broker.gstin} | RERA: {broker.rera}</span>
              </div>
              <div className="credential-item">
                <span className="cred-label">Contact</span>
                <span className="cred-value">{broker.contact.phone}</span>
              </div>
            </div>

            <div className="trust-banner">
              <CheckCircle size={20} style={{ color: broker.color }} />
              <span>All documents field-inspected by GharBazaar Trust Desk</span>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="listings-section">
          <div className="section-header-with-tabs">
            <div>
              <span className="section-label" style={{ color: broker.color }}>Direct Inventory Showcase</span>
              <h2>Explore Our Listings</h2>
              <p>Browse verified properties and certified materials</p>
            </div>
          </div>

          {/* Properties */}
          <div className="listings-header">
            <h3>
              <HomeIcon size={22} style={{ color: broker.color }} />
              Featured Properties
            </h3>
            <Link to="#" className="view-all" style={{ color: broker.color }}>
              View all {broker.properties} properties
              <ChevronLeft size={16} className="rotated" />
            </Link>
          </div>

          <div className="listings-grid">
            {broker.portfolio.map(property => (
              <article key={property.id} className="listing-card">
                <div className="listing-image">
                  <img src={property.img} alt={property.name} />
                  <div className="listing-badges">
                    <span className="badge-primary" style={{ backgroundColor: broker.color }}>{property.type}</span>
                    <span className="badge-secondary">{property.status}</span>
                  </div>
                  <span className="badge-verified" style={{ color: broker.color }}>
                    <Verified size={13} />
                    RERA Approved
                  </span>
                </div>

                <div className="listing-content">
                  <div className="listing-price">
                    <div className="price-main">{property.price}</div>
                    <div className="price-unit">{property.pricePerUnit}</div>
                  </div>

                  <h4>{property.name}</h4>
                  
                  <p className="listing-location">
                    <MapPin size={15} />
                    {property.location}
                  </p>

                  <div className="listing-specs">
                    <div>
                      <span className="spec-label">Area</span>
                      <span className="spec-value">{property.specs.area}</span>
                    </div>
                    <div>
                      <span className="spec-label">Details</span>
                      <span className="spec-value">{property.specs.beds}</span>
                    </div>
                    <div>
                      <span className="spec-label">Features</span>
                      <span className="spec-value">{property.specs.parking}</span>
                    </div>
                  </div>

                  <div className="listing-actions">
                    <button className="btn-enquiry" style={{ backgroundColor: broker.color }}>
                      <Send size={16} />
                      Send Enquiry
                    </button>
                    <button className="btn-details">Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Construction Materials (if available) */}
          {broker.materials && broker.materials.length > 0 && (
            <>
              <div className="listings-header">
                <h3>
                  <Store size={22} style={{ color: broker.color }} />
                  Wholesale Construction Materials
                  <span className="badge-managed" style={{ backgroundColor: `${broker.color}15`, color: broker.color }}>
                    <Verified size={13} />
                    GharBazaar Managed
                  </span>
                </h3>
                <Link to="#" className="view-all" style={{ color: broker.color }}>
                  View all {broker.products} products
                  <ChevronLeft size={16} className="rotated" />
                </Link>
              </div>

              <div className="listings-grid">
                {broker.materials.map(material => (
                  <article key={material.id} className="listing-card">
                    <div className="listing-image">
                      <img src={material.img} alt={material.name} />
                      <div className="listing-badges">
                        {material.inStock && (
                          <span className="badge-stock" style={{ backgroundColor: broker.color }}>
                            <span className="stock-dot"></span>
                            In Stock
                          </span>
                        )}
                      </div>
                      <span className="badge-unit">{material.unit}</span>
                    </div>

                    <div className="listing-content">
                      <div className="listing-price">
                        <div className="price-main">{material.price} <span className="price-unit">/ {material.unit}</span></div>
                        <div className="min-order">Min. {material.minOrder}</div>
                      </div>

                      <h4>{material.name}</h4>
                      
                      <p className="material-desc">
                        <Verified size={15} />
                        {material.description}
                      </p>

                      <div className="delivery-info">
                        <Truck size={16} style={{ color: broker.color }} />
                        <span>Doorstep Delivery within 24 Hours</span>
                      </div>

                      <div className="listing-actions">
                        <button className="btn-enquiry" style={{ backgroundColor: broker.color }}>
                          <Send size={16} />
                          Wholesale Quote
                        </button>
                        <button className="btn-details">Specs</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Contact Form & CTA */}
        <section className="contact-cta-grid">
          <div className="cta-banner" style={{ backgroundColor: broker.color }}>
            <span className="cta-badge">
              <Verified size={16} />
              Centralized GharBazaar Facilitation
            </span>
            <h3>Need a property visit or material quote?</h3>
            <p>GharBazaar provides unbiased transaction support, title verification, transparent pricing, and site visit management.</p>
            
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Zero Seller Spam — All requests reviewed by GharBazaar</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Guided site visits & verified document checking</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Centralized escrow & verified dispatch</span>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="form-header">
              <div>
                <h3>Quick Enquiry</h3>
                <p>Tell us what you're looking for and we'll coordinate next steps</p>
              </div>
              <MessageCircle size={28} style={{ color: broker.color }} />
            </div>

            <form className="enquiry-form">
              <div className="form-group">
                <label>I am interested in</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input type="radio" name="type" value="property" defaultChecked />
                    <span>Property</span>
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="type" value="materials" />
                    <span>Materials</span>
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="type" value="both" />
                    <span>Both</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="phone-input">
                    <span className="phone-code">+91</span>
                    <input type="tel" placeholder="98765 00000" pattern="[0-9]{10}" required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Requirements</label>
                <textarea placeholder="Describe your requirements, preferred location, budget, quantity..." rows={3}></textarea>
              </div>

              <button type="submit" className="btn-submit" style={{ backgroundColor: broker.color }}>
                <Send size={20} />
                Submit Enquiry
              </button>
              
              <p className="form-notice">
                <Shield size={15} style={{ color: broker.color }} />
                Your enquiry is handled by GharBazaar. We coordinate with the business and assist you throughout.
              </p>
            </form>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="reviews-section">
          <div className="reviews-header">
            <div>
              <h3>Verified Customer Feedback</h3>
              <p>Authentic reviews from homeowners, builders, and contractors</p>
            </div>
            <div className="rating-pill">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="rating-value">{broker.rating} / 5</span>
              <span className="rating-count">({broker.reviews} Reviews)</span>
            </div>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <p className="review-text">"Excellent service and transparent documentation. The property title verification was thorough and professional."</p>
              <div className="reviewer">
                <div className="reviewer-avatar">AK</div>
                <div>
                  <div className="reviewer-name">Anand K. Agrawal</div>
                  <div className="reviewer-meta">Homeowner • {broker.location}</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <p className="review-text">"Fast delivery and quality materials. Fair pricing and excellent coordination throughout the project."</p>
              <div className="reviewer">
                <div className="reviewer-avatar" style={{ backgroundColor: broker.color }}>VS</div>
                <div>
                  <div className="reviewer-name">Er. Vikram Singh</div>
                  <div className="reviewer-meta">Civil Contractor • {broker.location}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BrokerProfile;
