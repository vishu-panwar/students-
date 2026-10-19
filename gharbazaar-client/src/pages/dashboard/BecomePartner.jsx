import { useState } from "react";
import {
  Building2,
  Award,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle2,
  Search,
  Filter,
  TrendingUp,
  Users,
  Home,
  Briefcase,
  ExternalLink,
  Shield,
  Target,
  Clock,
} from "lucide-react";

// Mock Partners Data
const partnersData = [
  {
    id: 1,
    name: "Rahul Sharma",
    type: "Real Estate Broker",
    company: "Elite Properties",
    location: "South Delhi, Delhi",
    phone: "+91 98765 43210",
    email: "rahul@eliteproperties.com",
    rating: 4.8,
    reviews: 124,
    properties: 45,
    experience: 12,
    verified: true,
    specialization: ["Residential", "Commercial"],
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Experienced broker specializing in premium properties across Delhi NCR.",
  },
  {
    id: 2,
    name: "Anita Builders",
    type: "Builder",
    company: "Anita Construction Pvt. Ltd.",
    location: "Gurgaon, Haryana",
    phone: "+91 98765 43211",
    email: "info@anitabuilders.com",
    rating: 4.9,
    reviews: 89,
    properties: 28,
    experience: 18,
    verified: true,
    specialization: ["Luxury Villas", "Apartments"],
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Award-winning builder with 18 years of excellence in construction.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    type: "Real Estate Broker",
    company: "Metro Realty",
    location: "Noida, UP",
    phone: "+91 98765 43212",
    email: "amit@metrorealty.com",
    rating: 4.7,
    reviews: 156,
    properties: 67,
    experience: 10,
    verified: true,
    specialization: ["Residential", "PG"],
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Trusted broker helping clients find their dream homes in Noida.",
  },
  {
    id: 4,
    name: "Skyline Properties",
    type: "Builder",
    company: "Skyline Constructions",
    location: "Dwarka, Delhi",
    phone: "+91 98765 43213",
    email: "contact@skylineproperties.com",
    rating: 4.9,
    reviews: 203,
    properties: 35,
    experience: 22,
    verified: true,
    specialization: ["High-Rise", "Commercial"],
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    description: "Premium builder specializing in modern high-rise developments.",
  },
  {
    id: 5,
    name: "Priya Malhotra",
    type: "Real Estate Broker",
    company: "Prime Properties",
    location: "Greater Kailash, Delhi",
    phone: "+91 98765 43214",
    email: "priya@primeproperties.com",
    rating: 4.8,
    reviews: 98,
    properties: 52,
    experience: 9,
    verified: true,
    specialization: ["Luxury Homes", "Plots"],
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    description: "Expert in luxury property deals with personalized service.",
  },
  {
    id: 6,
    name: "DLF Homes",
    type: "Builder",
    company: "DLF Limited",
    location: "Gurgaon, Haryana",
    phone: "+91 98765 43215",
    email: "info@dlfhomes.com",
    rating: 5.0,
    reviews: 342,
    properties: 112,
    experience: 30,
    verified: true,
    specialization: ["Integrated Townships", "Commercial Complexes"],
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    description: "India's leading real estate developer with iconic projects.",
  },
  {
    id: 7,
    name: "Vikram Reddy",
    type: "Real Estate Broker",
    company: "Urban Spaces",
    location: "Vasant Kunj, Delhi",
    phone: "+91 98765 43216",
    email: "vikram@urbanspaces.com",
    rating: 4.6,
    reviews: 87,
    properties: 41,
    experience: 8,
    verified: true,
    specialization: ["Rental", "Co-living"],
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    description: "Specializing in rental properties and modern co-living spaces.",
  },
  {
    id: 8,
    name: "Godrej Properties",
    type: "Builder",
    company: "Godrej Properties Ltd.",
    location: "Faridabad, Haryana",
    phone: "+91 98765 43217",
    email: "contact@godrejproperties.com",
    rating: 4.9,
    reviews: 267,
    properties: 85,
    experience: 25,
    verified: true,
    specialization: ["Eco-friendly Homes", "Smart Cities"],
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    description: "Sustainable real estate solutions with innovative designs.",
  },
];

export default function BecomePartner() {
  const [partners, setPartners] = useState(partnersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Filter partners
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "All" || partner.type === filterType;

    return matchesSearch && matchesType;
  });

  const stats = {
    totalPartners: partners.length,
    brokers: partners.filter((p) => p.type === "Real Estate Broker").length,
    builders: partners.filter((p) => p.type === "Builder").length,
    avgRating: (partners.reduce((sum, p) => sum + p.rating, 0) / partners.length).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-16">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Shield className="text-emerald-600" size={36} />
              Become a Partner
            </h1>
            <p className="text-gray-600 mt-2">
              Connect with verified brokers and builders. Grow your real estate network.
            </p>
          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={20} />}
              label="Total Partners"
              value={stats.totalPartners}
              color="emerald"
            />
            <StatCard
              icon={<Briefcase size={20} />}
              label="Brokers"
              value={stats.brokers}
              color="blue"
            />
            <StatCard
              icon={<Building2 size={20} />}
              label="Builders"
              value={stats.builders}
              color="amber"
            />
            <StatCard
              icon={<Star size={20} />}
              label="Avg Rating"
              value={stats.avgRating}
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, company, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm appearance-none min-w-[180px]"
          >
            <option value="All">All Partners</option>
            <option value="Real Estate Broker">Brokers</option>
            <option value="Builder">Builders</option>
          </select>
        </div>
      </div>

      {/* PARTNERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredPartners.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <Search size={36} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No partners found</h3>
          <p className="text-gray-400 mt-2 max-w-xs">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* BECOME PARTNER CTA */}
      <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Target size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-3">Want to Become a Partner?</h2>
          <p className="text-emerald-50 mb-6 text-lg">
            Join our network of verified brokers and builders. Get access to thousands of buyers and sellers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-2xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
              <CheckCircle2 size={20} />
              Apply Now
            </button>
            <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// PARTNER CARD
// =============================================

function PartnerCard({ partner }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* HEADER with Image */}
      <div className="relative h-32 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-gray-100">
            <img
              src={partner.image}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {partner.verified && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
            <CheckCircle2 size={14} />
            Verified
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="p-6 pt-16">
        {/* Name & Type */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{partner.name}</h3>
          <p className="text-sm text-gray-600 font-semibold">{partner.type}</p>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 text-gray-700 mb-3">
          <Building2 size={16} className="text-gray-400" />
          <span className="text-sm font-medium">{partner.company}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm">{partner.location}</span>
        </div>

        {/* Rating & Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-900">{partner.rating}</span>
            <span className="text-xs text-gray-500">({partner.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Home size={14} className="text-gray-400" />
            {partner.properties} properties
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock size={14} className="text-gray-400" />
            {partner.experience}y exp
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">SPECIALIZATION</p>
          <div className="flex flex-wrap gap-2">
            {partner.specialization.map((spec) => (
              <span
                key={spec}
                className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {partner.description}
        </p>

        {/* Contact Buttons */}
        <div className="flex gap-2">
          <a
            href={`tel:${partner.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Phone size={16} />
            Call
          </a>
          <a
            href={`mailto:${partner.email}`}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Mail size={16} />
            Email
          </a>
          <button className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// STAT CARD
// =============================================

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
}
