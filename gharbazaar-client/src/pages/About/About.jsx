import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Users, MapPin, Shield, Scale, Handshake, Heart,
  TrendingUp, Award, CheckCircle2, ArrowRight, Target, Eye, Zap
} from 'lucide-react';

const STATS = [
  { value: "10,000+", label: "Listed Properties", desc: "Verified properties across India" },
  { value: "50,000+", label: "Real Estate Agents", desc: "Trusted agents on platform" },
  { value: "500+", label: "Verified Vendors", desc: "Quality building materials" },
  { value: "80+", label: "Cities (Pan-India)", desc: "Presence across India" },
];

const MISSION_VISION_VALUES = [
  {
    icon: <Target size={32} className="text-white" />,
    title: "Our Mission",
    desc: "To create a transparent and technology-driven platform that empowers Indian property seekers, real estate professionals, and construction ecosystem.",
    bgColor: "bg-[#1B4332]"
  },
  {
    icon: <Eye size={32} className="text-white" />,
    title: "Our Vision",
    desc: "To bring India's real estate and construction ecosystem online, and make every piece of property information accessible and reliable.",
    bgColor: "bg-[#2d6a4f]"
  },
  {
    icon: <Heart size={32} className="text-white" />,
    title: "Our Values",
    desc: "Trust & Transparency\nCustomer First\nIntegrity & Excellence\nInnovation & Growth\nInclusive Growth",
    bgColor: "bg-[#1B9E4B]"
  },
];

const JOURNEY = [
  { icon: "🎯", year: "Ideation", title: "Identifying the Gap", desc: "Recognized the need for a transparent real estate platform in India" },
  { icon: "🚀", year: "Foundation", title: "Platform Launch", desc: "GharBazaar platform launched with 1000+ properties" },
  { icon: "📈", year: "Expansion", title: "Rapid Growth", desc: "Expanded to 80+ cities with 50,000+ agents" },
  { icon: "🏆", year: "Growth & Beyond", title: "Market Leadership", desc: "Became one of India's leading PropTech platforms" },
];

const VERTICALS = [
  {
    icon: <Building2 size={40} className="text-white" />,
    title: "Properties",
    desc: "Buy, Sell, or Lease properties with verified listings. Get expert support and advice end-to-end.",
    features: ["Verified Listings", "Expert Guidance", "End-to-end Support"],
    bgColor: "bg-[#1B4332]"
  },
  {
    icon: <Shield size={40} className="text-white" />,
    title: "Products",
    desc: "Premium construction and building materials, delivered fast and sourced from trusted vendors and manufacturers.",
    features: ["Quality Materials", "Fast Delivery", "Trusted Vendors"],
    bgColor: "bg-[#2d6a4f]"
  },
  {
    icon: <Users size={40} className="text-white" />,
    title: "Services",
    desc: "Expert property services including inspections, legal assistance, digital marketing, and more.",
    features: ["Property Inspection", "Legal Services", "Digital Marketing"],
    bgColor: "bg-[#1B9E4B]"
  },
];

const WHY_CHOOSE = [
  {
    icon: <Shield size={24} className="text-[#1B9E4B]" />,
    title: "Trust",
    desc: "Built on trust, we are a transparent real estate ecosystem",
  },
  {
    icon: <CheckCircle2 size={24} className="text-[#1B9E4B]" />,
    title: "Tech-Led & Data",
    desc: "AI-powered recommendations and data-driven insights",
  },
  {
    icon: <Zap size={24} className="text-[#1B9E4B]" />,
    title: "Zero Fraud",
    desc: "100% verified listings with zero tolerance for fraud",
  },
  {
    icon: <Users size={24} className="text-[#1B9E4B]" />,
    title: "Wide Partner Base",
    desc: "50,000+ agents and 500+ vendors on our platform",
  },
];

const PARTNERSHIPS = [
  {
    icon: <Users size={32} className="text-[#1B9E4B]" />,
    title: "Ground Partners",
    desc: "50,000+ real estate agents, brokers, and property consultants",
  },
  {
    icon: <Scale size={32} className="text-[#1B9E4B]" />,
    title: "Legal Partners",
    desc: "Verified legal professionals for documentation and compliance",
  },
  {
    icon: <Award size={32} className="text-[#1B9E4B]" />,
    title: "Premium Partners",
    desc: "Top-tier developers, builders, and construction companies",
  },
  {
    icon: <Heart size={32} className="text-[#1B9E4B]" />,
    title: "Strategic Partners",
    desc: "Banks, insurance, and financial institutions",
  },
];

const RECOGNITIONS = [
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png", name: "Startup India", desc: "DPIIT Recognized" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png", name: "Digital India", desc: "Innovation Award 2024" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png", name: "Make in India", desc: "Certified Partner" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png", name: "MSME", desc: "Supporting MSMEs" },
];

export default function About() {
  const navigate = useNavigate();

  // Load Instagram Embed Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds after script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-[#EDE8DF] min-h-screen" style={{ fontFamily: "'Poppins','Plus Jakarta Sans',sans-serif" }}>
      
      <Helmet>
        <title>About GharBazaar | Building India's Trusted Real Estate Ecosystem</title>
        <meta name="description" content="Learn about GharBazaar - India's leading PropTech platform connecting property seekers with verified listings, agents, and construction materials." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2d6a4f] to-[#1B4332] px-4 sm:px-8 md:px-14 py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-white/20">
                🏆 Government Recognized Platform
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Building a More Transparent & Trusted<br />
                <span className="text-[#95d5b2]">Real Estate Ecosystem</span><br />
                for Bharat
              </h1>
              
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                GharBazaar is a digital platform that enables the real estate and building construction industry to do business in a more transparent, easy, cost-effective, trustworthy, and efficient way by leveraging the power of technology, AI & ML.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-white hover:bg-gray-100 text-[#1B4332] font-bold px-6 py-3 rounded-lg transition-all duration-300 text-sm flex items-center gap-2 shadow-lg">
                  Get Started
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => navigate('/services')}
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold px-6 py-3 rounded-lg transition-all duration-300 text-sm">
                  Our Services
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
                  alt="Modern House"
                  className="w-full h-[400px] object-cover"
                />
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1B9E4B] rounded-full flex items-center justify-center">
                      <Building2 size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">Trust</p>
                      <p className="text-xs text-gray-600">Certified Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-8 md:px-14 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, desc }) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 bg-[#1B9E4B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 size={28} className="text-[#1B9E4B]" />
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
                <p className="text-sm font-bold text-gray-700">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block bg-[#1B9E4B]/10 text-[#1B9E4B] text-xs font-bold px-3 py-1 rounded-full mb-4">
                OUR STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                The Idea Behind<br />GharBazaar
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                GharBazaar was founded with a vision to revolutionize India's real estate and construction industry. We recognized the challenges faced by property seekers, agents, and vendors - lack of transparency, information asymmetry, and inefficient processes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, GharBazaar stands as a comprehensive ecosystem connecting millions of Indians with their dream properties, trusted agents, quality construction materials, and expert services - all powered by technology and driven by trust.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                  <CheckCircle2 size={32} className="text-[#1B9E4B] mb-3" />
                  <p className="text-2xl font-black text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Verified Listings</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                  <Shield size={32} className="text-blue-600 mb-3" />
                  <p className="text-2xl font-black text-gray-900">Zero</p>
                  <p className="text-sm text-gray-600">Hidden Charges</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
                  alt="City View"
                  className="w-full h-[400px] object-cover"
                />
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-[#1B9E4B]" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Pan India Presence</p>
                      <p className="text-xs text-gray-600">80+ Cities & Growing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MISSION_VISION_VALUES.map(({ icon, title, desc, bgColor }) => (
              <div key={title} className={`${bgColor} rounded-xl p-8 text-white`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  {icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1B9E4B]/10 text-[#1B9E4B] text-xs font-bold px-3 py-1 rounded-full mb-4">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              From an Idea to a Growing Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY.map(({ icon, year, title, desc }, idx) => (
              <div key={year} className="text-center">
                <div className="w-20 h-20 bg-[#1B9E4B] rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
                  {icon}
                </div>
                <p className="text-sm font-bold text-[#1B9E4B] mb-2">{year}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS VERTICALS */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1B9E4B]/10 text-[#1B9E4B] text-xs font-bold px-3 py-1 rounded-full mb-4">
              BUSINESS VERTICALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              A Complete Real Estate & Construction Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERTICALS.map(({ icon, title, desc, features, bgColor }) => (
              <div key={title} className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300">
                <div className={`w-20 h-20 ${bgColor} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{desc}</p>
                
                <div className="space-y-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#1B9E4B] shrink-0" />
                      <span className="text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full bg-[#1B9E4B] hover:bg-[#147638] text-white font-bold py-2.5 rounded-lg transition-all duration-300 text-sm flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose GharBazaar?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on trust, we are a transparent real estate and property ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-[#1B9E4B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNMENT RECOGNITION */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
              🏆 GOVERNMENT RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Recognized by Government of India
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RECOGNITIONS.map(({ logo, name, desc }) => (
              <div key={name} className="bg-white rounded-xl p-6 border-2 border-blue-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                  <img src={logo} alt={name} className="w-12 h-12 object-contain" />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">{name}</p>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" 
              alt="GharBazaar Office"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/90 to-transparent flex items-center">
              <div className="px-8 sm:px-12 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Driven by People,<br />Powered by Purpose
                </h2>
                <p className="text-white/90 leading-relaxed mb-6">
                  At GharBazaar, we believe in the power of technology to transform the way India buys, sells, and builds homes. Join us in our mission to make real estate accessible and transparent for everyone.
                </p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-white hover:bg-gray-100 text-[#1B4332] font-bold px-6 py-3 rounded-lg transition-all duration-300 text-sm inline-flex items-center gap-2">
                  Join Our Mission
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY PARTNERSHIPS */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
              OUR KEY PARTNERSHIPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Building Together with Our Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERSHIPS.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-[#1B9E4B]/10 rounded-xl flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-gradient-to-br from-[#1B4332] via-[#2d6a4f] to-[#1B4332]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Be a Part of Our Mission
          </h2>
          <p className="text-white/90 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Join thousands of property seekers, agents, and vendors who trust GharBazaar for transparent, efficient, and reliable real estate transactions.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white hover:bg-gray-100 text-[#1B4332] font-bold px-8 py-3 rounded-lg transition-all duration-300 text-sm">
              List Property
            </button>
            <button 
              onClick={() => navigate('/promoter-partner')}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold px-8 py-3 rounded-lg transition-all duration-300 text-sm">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="px-4 sm:px-8 md:px-14 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-8 h-8 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Follow Us on Instagram
              </h2>
            </div>
            <p className="text-gray-600 mb-2">
              Stay updated with our latest properties, tips, and real estate insights
            </p>
            <a 
              href="https://www.instagram.com/gharbazaar.official/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E4405F] hover:text-[#d12e4a] font-bold text-lg transition-colors"
            >
              @gharbazaar.official
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Instagram Feed Widget - Using Elfsight or Similar */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
            
            {/* Instagram Profile Embed */}
            <div className="flex justify-center mb-8">
              <iframe
                src="https://www.instagram.com/gharbazaar.official/embed"
                width="100%"
                height="700"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                className="rounded-xl shadow-lg max-w-2xl mx-auto"
                title="Instagram Profile Feed"
              />
            </div>

            {/* Alternative: Latest Posts Grid */}
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-6">
                ⬆️ Scroll to see our latest posts, reels, and property updates!
              </p>
              
              {/* Follow Button */}
              <a
                href="https://www.instagram.com/gharbazaar.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow @gharbazaar.official on Instagram
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Additional Links */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.instagram.com/gharbazaar.official/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#E4405F] border-2 border-[#E4405F] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.823 1l2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 011.596 2.82l.07.295h-4.629L15.15 1zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 013.942-4.53zm9.735 12.834l-4.545-2.624a.909.909 0 00-1.356.668l-.008.12v5.248a.91.91 0 001.255.84l.109-.053 4.545-2.624a.909.909 0 00.1-1.507l-.1-.068-4.545-2.624zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189z"/>
                  </svg>
                  Watch Reels
                </a>
                <a
                  href="https://www.instagram.com/gharbazaar.official/tagged/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#E4405F] border-2 border-[#E4405F] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Tagged Posts
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
