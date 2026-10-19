import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Home, Building2, FileText, Search, TrendingUp, Users, 
  ShieldCheck, Calculator, Briefcase, Phone, Mail, MapPin,
  ArrowRight, CheckCircle2, Award, Clock, Target, DollarSign,
  Key, Wrench, Package, ThumbsUp, Star, ChevronRight, 
  FileCheck, Hammer, Palette, Scale
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Complete Real Estate Services - GharBazaar</title>
        <meta name="description" content="Complete real estate services, all in one place." />
      </Helmet>

      <div className="min-h-screen bg-white">
        
        {/* Hero Section with Side Cards */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 overflow-hidden">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Content */}
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
                  Complete Real Estate Services, <span className="text-green-700">All In One Place.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-xl">
                  From property search to home loans, legal documentation to interior design - 
                  we provide comprehensive services to make your real estate journey seamless.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <Link
                    to="/contact"
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Started Now
                  </Link>
                  <button className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Talk to Our Team
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Home size={16} className="text-gray-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Property</div>
                      <div className="text-xs text-gray-500">2000+ listed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award size={16} className="text-gray-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Award Winning</div>
                      <div className="text-xs text-gray-500">Best Service 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck size={16} className="text-gray-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Secure Payment</div>
                      <div className="text-xs text-gray-500">100% Safe</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image Area with Floating Cards */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=600&fit=crop" 
                    alt="Real Estate Services"
                    className="w-full rounded-2xl shadow-xl"
                  />
                </div>
                
                {/* Floating Service Cards - Right Side */}
                <div className="absolute top-8 -right-4 space-y-3 hidden lg:block">
                  {/* Rental Card */}
                  <div className="bg-white p-4 rounded-xl shadow-lg w-48 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                        <Home className="text-green-700" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0A0A0A]">Rental</div>
                        <div className="text-xs text-gray-600 mt-1">Find your perfect rental property</div>
                      </div>
                    </div>
                  </div>

                  {/* Buy/Sell Card */}
                  <div className="bg-white p-4 rounded-xl shadow-lg w-48 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="text-orange-700" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0A0A0A]">Buy/Sell</div>
                        <div className="text-xs text-gray-600 mt-1">Buy or sell properties easily</div>
                      </div>
                    </div>
                  </div>

                  {/* Property Management Card */}
                  <div className="bg-white p-4 rounded-xl shadow-lg w-48 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Briefcase className="text-blue-700" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0A0A0A]">Property Management</div>
                        <div className="text-xs text-gray-600 mt-1">Complete property solutions</div>
                      </div>
                    </div>
                  </div>

                  {/* Documentation Card */}
                  <div className="bg-white p-4 rounded-xl shadow-lg w-48 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="text-purple-700" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0A0A0A]">Documentation Support</div>
                        <div className="text-xs text-gray-600 mt-1">Legal and paperwork help</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Bar */}
        <section className="border-y border-gray-200 bg-white py-4">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors">
                <Phone size={18} />
                Find Services
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Search size={16} />
                <span>Search services by requirements or project needs</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                <MapPin size={18} />
                Set Your Location
              </button>
            </div>
          </div>
        </section>

        {/* What Do You Need Help With? */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-2">
                  What Do You Need Help With?
                </h2>
                <p className="text-gray-600">Select from our expert professionals</p>
              </div>
              <Link to="/contact" className="text-green-700 font-semibold hover:underline flex items-center gap-1">
                View all our Experts
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Expert Profiles Carousel */}
            <div className="overflow-x-auto pb-4 -mx-5 px-5">
              <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                {[
                  { name: "Rajesh K.", role: "Property Agent", img: "https://randomuser.me/api/portraits/men/32.jpg", rating: "4.9" },
                  { name: "Priya S.", role: "Legal Expert", img: "https://randomuser.me/api/portraits/women/44.jpg", rating: "4.8" },
                  { name: "Amit P.", role: "Loan Advisor", img: "https://randomuser.me/api/portraits/men/46.jpg", rating: "4.9" },
                  { name: "Sneha R.", role: "Interior Designer", img: "https://randomuser.me/api/portraits/women/68.jpg", rating: "4.7" },
                  { name: "Vikram S.", role: "Vastu Expert", img: "https://randomuser.me/api/portraits/men/52.jpg", rating: "4.8" },
                  { name: "Kavita N.", role: "Documentation", img: "https://randomuser.me/api/portraits/women/32.jpg", rating: "4.9" },
                  { name: "Rahul V.", role: "Tax Consultant", img: "https://randomuser.me/api/portraits/men/68.jpg", rating: "4.6" },
                  { name: "Anita D.", role: "Property Manager", img: "https://randomuser.me/api/portraits/women/56.jpg", rating: "4.8" },
                ].map((expert, idx) => (
                  <div key={idx} className="flex flex-col items-center w-28">
                    <div className="relative mb-2">
                      <img 
                        src={expert.img} 
                        alt={expert.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <Star size={10} fill="white" />
                        {expert.rating}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm text-[#0A0A0A]">{expert.name}</div>
                      <div className="text-xs text-gray-600">{expert.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services For You */}
        <section className="py-16 bg-white">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-2">
                  Popular Services For You
                </h2>
                <p className="text-gray-600">Most requested services by customers</p>
              </div>
              <Link to="/services" className="text-green-700 font-semibold hover:underline flex items-center gap-1">
                View all Services
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Interior Design", desc: "Transform your space", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop", tag: "Popular" },
                { title: "Home Inspection", desc: "Complete property check", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop", tag: "Trending" },
                { title: "Legal Verification", desc: "Document verification", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop", tag: "Essential" },
                { title: "Home Loan Assist", desc: "Best loan deals", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop", tag: "Popular" },
                { title: "Property Management", desc: "Full management", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop", tag: "New" },
                { title: "Vastu Consultation", desc: "Expert Vastu advice", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop", tag: "Popular" },
              ].map((service, idx) => (
                <div key={idx} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.img} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {service.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-[#0A0A0A] mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                    <button className="text-green-700 font-semibold text-sm hover:underline flex items-center gap-1">
                      Learn More
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore All Service Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-2">
                  Explore All Service Categories
                </h2>
                <p className="text-gray-600">Browse our complete range of 50+ services</p>
              </div>
              <Link to="/services" className="text-green-700 font-semibold hover:underline flex items-center gap-1">
                View All Services
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "Rental Services", icon: Home, color: "bg-green-50", iconColor: "text-green-700", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop" },
                { title: "Property Buying", icon: Building2, color: "bg-pink-50", iconColor: "text-pink-700", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=80&h=80&fit=crop" },
                { title: "Property Selling", icon: TrendingUp, color: "bg-pink-50", iconColor: "text-pink-700", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop" },
                { title: "Legal & Documentation", icon: FileText, color: "bg-orange-50", iconColor: "text-orange-700", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=80&h=80&fit=crop" },
                { title: "Valuation & Inspection", icon: Search, color: "bg-blue-50", iconColor: "text-blue-700", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop" },
                { title: "Property Management", icon: Users, color: "bg-teal-50", iconColor: "text-teal-700", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop" },
                { title: "Broker & Advisor", icon: Briefcase, color: "bg-purple-50", iconColor: "text-purple-700", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&h=80&fit=crop" },
                { title: "Property Marketing", icon: TrendingUp, color: "bg-yellow-50", iconColor: "text-yellow-700", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop" },
              ].map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={idx}
                    to="/services"
                    className="relative bg-white border border-gray-200 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                      <img src={cat.img} alt="" className="w-full h-full object-cover rounded" />
                    </div>
                    <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-3 relative z-10`}>
                      <Icon className={cat.iconColor} size={24} />
                    </div>
                    <h3 className="font-bold text-sm text-[#0A0A0A] relative z-10">{cat.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Need a Custom Solution - Dark CTA */}
        <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=400&fit=crop" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-[1450px] mx-auto px-5 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Need a Custom Solution?
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Can't find what you're looking for? Our experts will create a personalized 
                  service package tailored to your specific requirements.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Contact Experts Now
                  <ArrowRight size={20} />
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                  alt="Custom Solutions"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services & Support */}
        <section className="py-16 bg-white">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-3">
                Additional Services & Support
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need for a complete real estate experience
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { icon: Package, title: "Packers & Movers", color: "bg-green-50 text-green-700" },
                { icon: Wrench, title: "Home Repairs", color: "bg-orange-50 text-orange-700" },
                { icon: ShieldCheck, title: "Insurance", color: "bg-blue-50 text-blue-700" },
                { icon: Palette, title: "Painting Services", color: "bg-pink-50 text-pink-700" },
                { icon: Key, title: "Lock & Key", color: "bg-purple-50 text-purple-700" },
                { icon: Calculator, title: "Tax Advisory", color: "bg-yellow-50 text-yellow-700" },
                { icon: Hammer, title: "Renovation", color: "bg-red-50 text-red-700" },
                { icon: Award, title: "Premium Support", color: "bg-indigo-50 text-indigo-700" },
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-semibold text-sm text-[#0A0A0A]">{service.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Available in Major Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-2">
                  Services Available in Major Cities
                </h2>
                <p className="text-gray-600">We operate across India's top cities</p>
              </div>
              <Link to="/contact" className="text-green-700 font-semibold hover:underline flex items-center gap-1">
                View All Cities
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Mumbai", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=300&h=200&fit=crop" },
                { name: "Delhi NCR", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop" },
                { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&h=200&fit=crop" },
                { name: "Hyderabad", img: "https://images.unsplash.com/photo-1603893211-0dd754dc7bbf?w=300&h=200&fit=crop" },
                { name: "Chennai", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop" },
                { name: "Pune", img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=300&h=200&fit=crop" },
                { name: "Kolkata", img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=300&h=200&fit=crop" },
                { name: "Ahmedabad", img: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=300&h=200&fit=crop" },
              ].map((city, idx) => (
                <div key={idx} className="relative group cursor-pointer rounded-xl overflow-hidden h-32">
                  <img 
                    src={city.img} 
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                    <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Different Needs. Tailored Services. */}
        <section className="py-16 bg-white">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-3">
                Different Needs.<br />Tailored Services.
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Services designed specifically for your unique requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: "Students", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=280&fit=crop", services: ["PG & Hostels", "Affordable Rentals", "Student Discounts"] },
                { type: "Families", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=280&fit=crop", services: ["Family Homes", "School Proximity", "Safe Areas"] },
                { type: "NRIs & Investors", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=280&fit=crop", services: ["Investment Advisory", "Remote Management", "Legal Support"] },
              ].map((customer, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={customer.img} 
                    alt={customer.type}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">{customer.type}</h3>
                    <ul className="space-y-2">
                      {customer.services.map((service, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                          <span className="text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-green-700 font-semibold hover:underline text-sm">
                      Explore Services
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Service Highlights */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-3">
                Our Service Highlights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Why thousands trust GharBazaar for their real estate needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Verified Professionals", desc: "All experts thoroughly verified" },
                { icon: FileText, title: "Transparent Pricing", desc: "No hidden charges" },
                { icon: Clock, title: "Easy to Book Online", desc: "Book in just few clicks" },
                { icon: Target, title: "Wide Range of Services", desc: "50+ services available" },
              ].map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0A0A0A] mb-2">{highlight.title}</h3>
                    <p className="text-sm text-gray-600">{highlight.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Still Confused? - Final CTA */}
        <section className="py-16 bg-gradient-to-br from-green-700 via-green-600 to-green-700 text-white">
          <div className="max-w-[1450px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Still Confused?<br />
                  Let Our Experts Guide You.
                </h2>
                <p className="text-lg text-green-50 mb-6">
                  Not sure which service you need? Our expert consultants will guide you 
                  to the perfect solution - completely free!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Request Consultation
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
                  >
                    <Phone size={20} />
                    Call: +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop" 
                  alt="Expert Consultation"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-black text-green-700">10,000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
