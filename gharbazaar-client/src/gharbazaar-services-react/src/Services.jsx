import React, { useMemo, useState } from 'react';
import {
  Search, Heart, Menu, ArrowRight, ChevronDown, ChevronRight, Home,
  FileText, ShieldCheck, Headset, LayoutGrid, GraduationCap, BriefcaseBusiness,
  UserRound, ShoppingCart, Tag, Building2, UsersRound, ChartNoAxesColumnIncreasing,
  MoreHorizontal, Sofa, Truck, Wifi, Lamp, IndianRupee, Wrench, CarFront,
  MapPin, Phone, CheckCircle2, X
} from 'lucide-react';
import './Services.css';

const photo = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const userTypes = [
  { label: 'Students', icon: GraduationCap },
  { label: 'Working Professionals', icon: BriefcaseBusiness },
  { label: 'Tenants', icon: Home },
  { label: 'Property Owners', icon: UserRound },
  { label: 'Buyers', icon: ShoppingCart },
  { label: 'Sellers', icon: Tag },
  { label: 'Builders', icon: Building2 },
  { label: 'Brokers', icon: UsersRound },
  { label: 'Investors', icon: ChartNoAxesColumnIncreasing },
  { label: 'Other', icon: MoreHorizontal },
];

const featuredByUser = {
  Students: [
    { title: 'Find a Room or PG', desc: 'Discover rental rooms and PGs near your college.', price: 'From ₹0', image: photo('photo-1616486338812-3dadae4b4ace', 800) },
    { title: 'Find Rental Homes', desc: 'Search affordable homes in your preferred area.', price: 'From ₹0', image: photo('photo-1600607687939-ce8a6c25118c', 800) },
    { title: 'Rental Agreement Assistance', desc: 'Get help with rental agreements and documentation.', price: 'From ₹499', image: photo('photo-1450101499163-c8848c66ca85', 800) },
    { title: 'Property Visit Scheduling', desc: 'Arrange property visits at your convenience.', price: 'From ₹0', image: photo('photo-1521737711867-e3b97375f902', 800) },
    { title: 'Property Verification', desc: 'Review property details before making a decision.', price: 'From ₹899', image: photo('photo-1560518883-ce09059eeffa', 800) },
  ],
  'Working Professionals': [
    { title: 'Find Furnished Homes', desc: 'Explore furnished homes close to work and transit.', price: 'From ₹0', image: photo('photo-1600607687920-4e2a09cf159d', 800) },
    { title: 'Rental Agreement', desc: 'Get assistance with rental paperwork.', price: 'From ₹499', image: photo('photo-1450101499163-c8848c66ca85', 800) },
    { title: 'Relocation Support', desc: 'Coordinate your move to a new city.', price: 'Get a quote', image: photo('photo-1600518464441-9306b7a1a3f4', 800) },
    { title: 'Property Visit', desc: 'Arrange visits around your schedule.', price: 'From ₹0', image: photo('photo-1521737711867-e3b97375f902', 800) },
  ],
  Tenants: [
    { title: 'Find a Rental Home', desc: 'Explore rooms, PGs, flats and family homes.', price: 'From ₹0', image: photo('photo-1600607687939-ce8a6c25118c', 800) },
    { title: 'Rental Agreement', desc: 'Documentation assistance for tenants and owners.', price: 'From ₹499', image: photo('photo-1450101499163-c8848c66ca85', 800) },
    { title: 'Move-in Assistance', desc: 'Make your move easier with a clear checklist.', price: 'Get a quote', image: photo('photo-1600518464441-9306b7a1a3f4', 800) },
  ],
  'Property Owners': [
    { title: 'List Your Property', desc: 'Showcase your property to relevant customers.', price: 'From ₹999', image: photo('photo-1600607687920-4e2a09cf159d', 800) },
    { title: 'Find Tenants', desc: 'Get help managing enquiries and property visits.', price: 'Get a quote', image: photo('photo-1560518883-ce09059eeffa', 800) },
    { title: 'Property Management', desc: 'Coordinate maintenance and tenant requests.', price: 'Get a quote', image: photo('photo-1600566753086-00f18fb6b3ea', 800) },
  ],
  Buyers: [
    { title: 'Buyer Assistance', desc: 'Shortlist homes that match your requirements.', price: 'Get a quote', image: photo('photo-1600607687939-ce8a6c25118c', 800) },
    { title: 'Property Verification', desc: 'Review documents and property information.', price: 'From ₹899', image: photo('photo-1560518883-ce09059eeffa', 800) },
    { title: 'Home Inspection', desc: 'Arrange a property condition assessment.', price: 'Get a quote', image: photo('photo-1600566753086-00f18fb6b3ea', 800) },
  ],
  Sellers: [
    { title: 'Sell Your Property', desc: 'Get support presenting your property to buyers.', price: 'Get a quote', image: photo('photo-1600607687920-4e2a09cf159d', 800) },
    { title: 'Property Photography', desc: 'Create professional visuals for your listing.', price: 'From ₹2,999', image: photo('photo-1600607687939-ce8a6c25118c', 800) },
    { title: 'Document Assistance', desc: 'Coordinate sale documentation with professionals.', price: 'Get a quote', image: photo('photo-1450101499163-c8848c66ca85', 800) },
  ],
};

const categories = [
  { title: 'Rental Services', count: '20+ services', desc: 'Find rental homes, PGs, agreements and tenant support.', icon: Home, tone: 'mint' },
  { title: 'Property Buying', count: '18+ services', desc: 'Search, compare and buy properties with assistance.', icon: Home, tone: 'peach' },
  { title: 'Property Selling', count: '16+ services', desc: 'List and sell your property with professional support.', icon: FileText, tone: 'pink' },
  { title: 'Legal & Documentation', count: '20+ services', desc: 'Agreements, deeds and documentation assistance.', icon: FileText, tone: 'orange' },
  { title: 'Verification & Inspection', count: '15+ services', desc: 'Review property information and arrange inspections.', icon: ShieldCheck, tone: 'blue' },
  { title: 'Property Management', count: '16+ services', desc: 'Coordinate tenants, maintenance and property care.', icon: Building2, tone: 'mint' },
  { title: 'Builder & Developer', count: '12+ services', desc: 'Project listings, enquiries and marketing support.', icon: Building2, tone: 'purple' },
  { title: 'Property Marketing', count: '10+ services', desc: 'Photography, videos and property promotions.', icon: LayoutGrid, tone: 'pink' },
  { title: 'Broker & Agent Solutions', count: '11+ services', desc: 'Tools and support for real estate professionals.', icon: UsersRound, tone: 'blue' },
  { title: 'Home & Lifestyle Support', count: '12+ services', desc: 'Cleaning, movers, internet and home setup support.', icon: Sofa, tone: 'orange' },
];

const addOns = [
  { title: 'Home Cleaning & Painting', icon: Sofa, tone: 'mint' },
  { title: 'Packers & Movers', icon: Truck, tone: 'orange' },
  { title: 'Internet & Utilities', icon: Wifi, tone: 'blue' },
  { title: 'Interior Design Referrals', icon: Lamp, tone: 'pink' },
  { title: 'Property Insurance', icon: ShieldCheck, tone: 'purple' },
  { title: 'Home Loan Assistance', icon: IndianRupee, tone: 'mint' },
  { title: 'Repairs & Maintenance', icon: Wrench, tone: 'blue' },
  { title: 'Relocation Support', icon: CarFront, tone: 'orange' },
];

const cities = [
  { name: 'Delhi NCR', image: photo('photo-1587474260584-136574528ed5', 450) },
  { name: 'Mumbai', image: photo('photo-1570168007204-dfb528c6958f', 450) },
  { name: 'Bengaluru', image: photo('photo-1596176530529-78163a4f7af2', 450) },
  { name: 'Hyderabad', image: photo('photo-1564013799919-ab600027ffc6', 450) },
  { name: 'Pune', image: photo('photo-1605640840605-14ac1855827b', 450) },
  { name: 'Chennai', image: photo('photo-1582510003544-4d00b7f74220', 450) },
];

function EnquiryModal({ open, onClose, initialService = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: initialService, city: '', details: '' });
  React.useEffect(() => setForm((old) => ({ ...old, service: initialService })), [initialService]);
  if (!open) return null;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    // Connect this handler to your existing backend/API before production.
    setSubmitted(true);
  };
  return <div className="gb-modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="gb-modal" role="dialog" aria-modal="true" aria-labelledby="gb-modal-title">
      <button className="gb-modal-close" onClick={onClose} aria-label="Close enquiry form"><X size={20} /></button>
      {submitted ? <div className="gb-success"><CheckCircle2 size={46} /><h2>Request ready!</h2><p>This demo form is validated locally. Connect it to your GharBazaar backend to save and route real enquiries.</p><button className="gb-btn gb-btn-primary" onClick={onClose}>Done</button></div> : <>
        <span className="gb-eyebrow">GHARBAZAAR ASSISTANCE</span><h2 id="gb-modal-title">Tell us what you need</h2><p className="gb-muted">Share a few details and our team can guide you to the right service.</p>
        <form className="gb-form" onSubmit={submit}>
          <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Enter your name" required /></label>
          <label>Mobile number<input name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile number" inputMode="numeric" pattern="[6-9][0-9]{9}" required /></label>
          <label>Service required<select name="service" value={form.service} onChange={update} required><option value="">Select a service</option>{categories.map((c) => <option key={c.title}>{c.title}</option>)}{['Rental Agreement Assistance','Find a Room or PG','Property Verification','Property Photography','Buyer Assistance'].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>City<input name="city" value={form.city} onChange={update} placeholder="e.g. Noida, Delhi, Bareilly" required /></label>
          <label className="gb-full">Tell us more (optional)<textarea name="details" value={form.details} onChange={update} placeholder="Briefly describe your requirement" rows="3" /></label>
          <button className="gb-btn gb-btn-primary gb-full" type="submit">Submit Enquiry <ArrowRight size={17} /></button>
          <small className="gb-full gb-privacy">Your details should be handled securely and used only for this enquiry.</small>
        </form>
      </>}
    </section>
  </div>;
}

export default function Services() {
  const [activeUser, setActiveUser] = useState('Students');
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const featured = featuredByUser[activeUser] || [
    { title: 'Personalized Property Assistance', desc: 'Tell us what you need and explore suitable options.', price: 'Get a quote', image: photo('photo-1600607687939-ce8a6c25118c', 800) },
    { title: 'Property Verification', desc: 'Review property information before making a decision.', price: 'From ₹899', image: photo('photo-1560518883-ce09059eeffa', 800) },
    { title: 'Expert Consultation', desc: 'Get guidance for your property-related requirement.', price: 'Get a quote', image: photo('photo-1450101499163-c8848c66ca85', 800) },
  ];
  const filteredCategories = useMemo(() => categories.filter((c) => {
    const matchQuery = `${c.title} ${c.desc}`.toLowerCase().includes(query.toLowerCase());
    const matchCategory = activeCategory === 'All Services' || c.title.toLowerCase().includes(activeCategory.toLowerCase().replace(' services', '')) || (activeCategory === 'Buying & Selling' && /buying|selling/.test(c.title.toLowerCase())) || (activeCategory === 'Legal & Documentation' && c.title === 'Legal & Documentation') || (activeCategory === 'Verification & Inspection' && c.title === 'Verification & Inspection') || (activeCategory === 'Builder & Broker' && /builder|broker/.test(c.title.toLowerCase())) || (activeCategory === 'Marketing' && c.title === 'Property Marketing') || (activeCategory === 'Property Management' && c.title === 'Property Management');
    return matchQuery && matchCategory;
  }), [query, activeCategory]);
  const openEnquiry = (service = '') => { setSelectedService(service); setModalOpen(true); };

  return <div className="gb-page">
    <header className="gb-header">
      <a className="gb-brand" href="#top" aria-label="GharBazaar home"><span className="gb-brand-icon"><Home size={19} /></span><span>GharBazaar</span></a>
      <nav className={`gb-nav ${mobileMenu ? 'gb-nav-open' : ''}`} aria-label="Main navigation">
        <a href="#buy">Buy Property</a><a href="#rent">Rent Property</a><a className="active" href="#services">Services</a><a href="#marketplace">Marketplace</a><a href="#pricing">Pricing</a><a href="#refer">Refer & Earn</a><a href="#about">About</a><a href="#contact">Contact</a>
      </nav>
      <div className="gb-header-actions"><button className="gb-icon-button" aria-label="Favorites"><Heart size={18} /></button><button className="gb-btn gb-btn-primary gb-login" onClick={() => openEnquiry('Account assistance')}>Login</button><button className="gb-menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button></div>
    </header>

    <main id="top">
      <div className="gb-breadcrumb">Home <ChevronRight size={13} /> <span>Services</span></div>
      <section className="gb-hero">
        <div className="gb-hero-copy"><span className="gb-eyebrow">OUR SERVICES</span><h1>Complete Real Estate<br />Services, <em>All in One Place.</em></h1><p>From finding a rental home to buying, selling, documentation and property management — get the right support in one place.</p><div className="gb-hero-actions"><a className="gb-btn gb-btn-primary" href="#services">Explore Services <ArrowRight size={16} /></a><button className="gb-btn gb-btn-outline" onClick={() => openEnquiry() }><Headset size={16} /> Talk to Our Team</button></div></div>
        <div className="gb-hero-visual"><img src={photo('photo-1600607687939-ce8a6c25118c', 1100)} alt="Modern residential property" /><div className="gb-float-card gb-float-one"><span className="gb-float-icon mint"><Home size={17} /></span><span><b>Rent & PG</b><small>Find verified rentals</small></span><ChevronRight size={18} /></div><div className="gb-float-card gb-float-two"><span className="gb-float-icon orange"><FileText size={17} /></span><span><b>Legal & Documentation</b><small>Agreements and deeds</small></span><ChevronRight size={18} /></div><div className="gb-float-card gb-float-three"><span className="gb-float-icon blue"><ShieldCheck size={17} /></span><span><b>Verification & Inspection</b><small>On-site verification</small></span><ChevronRight size={18} /></div></div>
      </section>

      <section className="gb-benefit-strip" aria-label="Service benefits"><div><LayoutGrid /><span><b>Wide Range</b><small>of services</small></span></div><div><Home /><span><b>Verified Professionals</b><small>Trusted partners</small></span></div><div><ShieldCheck /><span><b>Transparent Pricing</b><small>Clear and simple</small></span></div><div><Headset /><span><b>End-to-End Support</b><small>From search to handover</small></span></div></section>

      <section className="gb-section gb-audience"><div className="gb-section-heading"><div><h2>What Do You Need Help With?</h2><p>Choose your profile to explore the most relevant services.</p></div><a href="#services">Not sure? View all services <ArrowRight size={15} /></a></div><div className="gb-user-grid">{userTypes.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActiveUser(label)} className={`gb-user-card ${activeUser === label ? 'selected' : ''}`}><span><Icon size={23} /></span><b>{label}</b></button>)}</div></section>

      <section className="gb-section"><div className="gb-section-heading"><div><h2>Popular Services for You</h2><p>Recommended services based on your selected profile.</p></div><button className="gb-text-link" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>View All Services <ArrowRight size={15} /></button></div><div className="gb-featured-grid">{featured.slice(0, 5).map((item) => <article className="gb-feature-card" key={item.title}><img src={item.image} alt="" loading="lazy" /><div className="gb-feature-body"><h3>{item.title}</h3><p>{item.desc}</p><div className="gb-card-bottom"><b>{item.price}</b><button onClick={() => openEnquiry(item.title)}>Explore <ArrowRight size={14} /></button></div></div></article>)}</div></section>

      <section className="gb-section" id="services"><div className="gb-section-heading gb-service-heading"><div><h2>Explore All Service Categories</h2><p>Browse our complete range of real estate services.</p></div><label className="gb-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services (e.g. rental agreement...)" aria-label="Search services" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label></div>
        <div className="gb-filter-row">{['All Services', 'Rental Services', 'Buying & Selling', 'Legal & Documentation', 'Verification & Inspection', 'Property Management', 'Builder & Broker', 'Marketing'].map((x) => <button key={x} className={activeCategory === x ? 'active' : ''} onClick={() => setActiveCategory(x)}>{x}</button>)}</div>
        {filteredCategories.length ? <div className="gb-category-grid">{filteredCategories.map(({ title, count, desc, icon: Icon, tone }) => <button className="gb-category-card" key={title} onClick={() => openEnquiry(title)}><span className={`gb-category-icon ${tone}`}><Icon size={25} /></span><span className="gb-category-content"><b>{title}</b><small>{desc}</small><em>{count}</em></span><ArrowRight className="gb-category-arrow" size={18} /></button>)}</div> : <div className="gb-empty"><Search size={28} /><h3>No matching services found</h3><p>Try another keyword or clear the filters.</p><button className="gb-btn gb-btn-outline" onClick={() => { setQuery(''); setActiveCategory('All Services'); }}>Clear filters</button></div>}
      </section>

      <section className="gb-section gb-addons"><div className="gb-section-heading"><div><h2>Additional Services & Support</h2><p>Get help beyond buying and renting with useful property services.</p></div></div><div className="gb-addon-grid">{addOns.map(({ title, icon: Icon, tone }) => <button key={title} className="gb-addon-card" onClick={() => openEnquiry(title)}><span className={`gb-category-icon ${tone}`}><Icon size={23} /></span><b>{title}</b><small>Request assistance <ArrowRight size={12} /></small></button>)}</div></section>

      <section className="gb-section"><div className="gb-section-heading"><div><h2>Services Available in Major Cities</h2><p>Availability may vary by location and service type.</p></div><button className="gb-text-link" onClick={() => openEnquiry('Service availability by city')}>Check your city <ArrowRight size={15} /></button></div><div className="gb-city-grid">{cities.map((c) => <button key={c.name} className="gb-city-card" onClick={() => { setCity(c.name); openEnquiry('Services in ' + c.name); }}><img src={c.image} alt="" loading="lazy" /><b>{c.name}</b></button>)}</div></section>

      <section className="gb-tailored"><div className="gb-tailored-copy"><span className="gb-eyebrow">PERSONALIZED SUPPORT</span><h2>Different Needs.<br />Tailored Services.</h2><p>From students to families and investors, explore services designed for every stage of your property journey.</p><button className="gb-btn gb-btn-light" onClick={() => document.querySelector('.gb-audience')?.scrollIntoView({ behavior: 'smooth' })}>Explore by User Type <ArrowRight size={15} /></button></div><div className="gb-tailored-image"><img src={photo('photo-1600607687920-4e2a09cf159d', 1000)} alt="Contemporary family home" loading="lazy" /></div></section>

      <section className="gb-section gb-highlights"><div className="gb-section-heading"><div><h2>Our Service Highlights</h2><p>What makes the GharBazaar experience simple and convenient.</p></div></div><div className="gb-highlight-grid"><div><ShieldCheck /><span><b>Professional Partners</b><small>Work with qualified professionals where required.</small></span></div><div><FileText /><span><b>Transparent Information</b><small>Understand service scope and pricing upfront.</small></span></div><div><Headset /><span><b>Dedicated Support</b><small>Get help with your service enquiry.</small></span></div><div><LayoutGrid /><span><b>Wide Range of Services</b><small>Explore property support in one place.</small></span></div></div></section>

      <section className="gb-final-cta"><div><span className="gb-eyebrow">NEED A LITTLE GUIDANCE?</span><h2>Still Confused?<br />Let Our Experts Guide You.</h2><p>Tell us what you're looking for, and we'll help you identify a suitable available service.</p><div className="gb-hero-actions"><button className="gb-btn gb-btn-light" onClick={() => openEnquiry()}>Send an Enquiry <ArrowRight size={15} /></button><button className="gb-btn gb-btn-outline-light" onClick={() => openEnquiry('Talk to our team')}><Phone size={15} /> Talk to Our Team</button></div></div><div className="gb-cta-checks"><span><CheckCircle2 /> Personalized guidance</span><span><CheckCircle2 /> Clear service details</span><span><CheckCircle2 /> No obligation to proceed</span></div></section>
    </main>

    <footer className="gb-footer" id="contact"><div className="gb-footer-main"><div className="gb-footer-brand"><a className="gb-brand" href="#top"><span className="gb-brand-icon"><Home size={19} /></span><span>GharBazaar</span></a><p>Your trusted real estate partner for buying, renting, selling and property services across India.</p><div className="gb-socials"><a href="#facebook" aria-label="Facebook">f</a><a href="#instagram" aria-label="Instagram">◎</a><a href="#youtube" aria-label="YouTube">▶</a><a href="#linkedin" aria-label="LinkedIn">in</a></div></div><div><h4>Services</h4><a href="#services">Rental Services</a><a href="#services">Buying & Selling</a><a href="#services">Legal & Documentation</a><a href="#services">Verification & Inspection</a><a href="#services">Property Management</a><a href="#services">Builder & Developer</a></div><div><h4>Company</h4><a href="#about">About Us</a><a href="#careers">Careers</a><a href="#blog">Blog</a><a href="#partner">Partner With Us</a><a href="#advertise">Advertise</a><a href="#sitemap">Sitemap</a></div><div><h4>Get in Touch</h4><p><Phone size={14} /> +91 98765 43210</p><p>support@gharbazaar.com</p><p><MapPin size={14} /> India</p><button className="gb-btn gb-btn-outline-light gb-footer-contact" onClick={() => openEnquiry()}>Contact our team <ArrowRight size={14} /></button></div></div><div className="gb-footer-bottom"><span>© {new Date().getFullYear()} GharBazaar. All rights reserved.</span><span>Made with care for a better real estate experience.</span></div></footer>
    <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} initialService={selectedService} />
  </div>;
}
