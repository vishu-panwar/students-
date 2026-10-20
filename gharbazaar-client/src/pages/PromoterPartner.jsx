import { useState } from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Target,
  Zap,
  Gift,
  Star,
  Building2,
  ArrowRight,
} from "lucide-react";

const jobRoles = [
  {
    id: 1,
    title: "Inbound Sales Executive",
    type: "Inbound",
    employmentType: "Full Time",
    salaryType: "Fixed Salary + Incentives",
    salary: "₹20,000 - ₹30,000/month",
    incentives: "Up to ₹15,000/month",
    location: "Delhi NCR",
    experience: "0-2 years",
    openings: 10,
    description: "Handle incoming leads and convert them into successful property deals. Perfect for freshers with good communication skills.",
    responsibilities: [
      "Handle incoming calls and inquiries",
      "Understand customer requirements",
      "Pitch relevant properties",
      "Close deals and achieve targets",
      "Maintain customer database",
    ],
    requirements: [
      "Excellent communication skills",
      "Basic computer knowledge",
      "Target-oriented mindset",
      "Fluent in Hindi & English",
    ],
    benefits: [
      "Fixed monthly salary",
      "Performance-based incentives",
      "Training provided",
      "Career growth opportunities",
    ],
  },
  {
    id: 2,
    title: "Outbound Sales Executive",
    type: "Outbound",
    employmentType: "Full Time",
    salaryType: "Fixed Salary + Incentives",
    salary: "₹18,000 - ₹25,000/month",
    incentives: "Up to ₹20,000/month",
    location: "Delhi NCR",
    experience: "0-3 years",
    openings: 15,
    description: "Reach out to potential customers, generate leads, and close property deals. High earning potential through incentives.",
    responsibilities: [
      "Make outbound calls to prospects",
      "Generate new leads",
      "Schedule property visits",
      "Follow up with customers",
      "Achieve monthly sales targets",
    ],
    requirements: [
      "Strong persuasion skills",
      "Confident communication",
      "Self-motivated",
      "Good negotiation abilities",
    ],
    benefits: [
      "Attractive incentive structure",
      "Fixed base salary",
      "Weekly/Monthly rewards",
      "Fast-track promotions",
    ],
  },
  {
    id: 3,
    title: "Sales Manager",
    type: "Sales",
    employmentType: "Full Time",
    salaryType: "Fixed Salary + Performance Bonus",
    salary: "₹35,000 - ₹50,000/month",
    incentives: "Up to ₹30,000/month",
    location: "Delhi NCR",
    experience: "2-5 years",
    openings: 5,
    description: "Lead a team of sales executives, manage operations, and drive revenue growth. Leadership role with high earning potential.",
    responsibilities: [
      "Manage sales team performance",
      "Set and achieve team targets",
      "Train and mentor executives",
      "Handle key client relationships",
      "Report to senior management",
    ],
    requirements: [
      "Proven sales experience",
      "Team management skills",
      "Strong leadership abilities",
      "Real estate knowledge preferred",
    ],
    benefits: [
      "Leadership position",
      "Performance bonuses",
      "Team incentives",
      "Career advancement",
    ],
  },
  {
    id: 4,
    title: "Business Development Executive",
    type: "Sales",
    employmentType: "Full Time",
    salaryType: "Incentive Based",
    salary: "No fixed salary",
    incentives: "₹5,000 - ₹50,000 per deal",
    location: "Work from anywhere",
    experience: "Any",
    openings: 50,
    description: "Pure commission-based role with unlimited earning potential. Close property deals and earn high commissions.",
    responsibilities: [
      "Generate and convert leads",
      "Close property transactions",
      "Build client relationships",
      "Achieve sales targets",
      "Independent work",
    ],
    requirements: [
      "Self-motivated hustler",
      "Strong sales mindset",
      "Network building skills",
      "Flexibility and determination",
    ],
    benefits: [
      "Unlimited earnings",
      "Work flexibility",
      "No salary cap",
      "Performance recognition",
    ],
  },
];

export default function PromoterPartner() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = selectedType === "All" 
    ? jobRoles 
    : jobRoles.filter((job) => job.type === selectedType);

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Briefcase className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a Promoter Partner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Join India's fastest-growing real estate platform. Earn high incentives, work flexibly, 
            and grow your career with GharBazaar.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-md">
              <p className="text-3xl font-bold text-emerald-600">80+</p>
              <p className="text-sm text-gray-600 mt-1">Open Positions</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-md">
              <p className="text-3xl font-bold text-blue-600">₹50k+</p>
              <p className="text-sm text-gray-600 mt-1">Avg Monthly Earning</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-md">
              <p className="text-3xl font-bold text-amber-600">500+</p>
              <p className="text-sm text-gray-600 mt-1">Active Partners</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md">
              <p className="text-3xl font-bold text-purple-600">4.8★</p>
              <p className="text-sm text-gray-600 mt-1">Employee Rating</p>
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 mb-12 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1">High Earnings</p>
                <p className="text-emerald-50 text-sm">Earn up to ₹50,000+ per month with incentives</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1">Career Growth</p>
                <p className="text-emerald-50 text-sm">Fast-track promotions and leadership roles</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Award size={24} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1">Recognition</p>
                <p className="text-emerald-50 text-sm">Monthly rewards and top performer benefits</p>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          {["All", "Inbound", "Outbound", "Sales"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedType === type
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* JOB CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b-2 border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                        {job.employmentType}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Openings</p>
                    <p className="text-3xl font-bold text-emerald-600">{job.openings}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{job.description}</p>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Salary & Incentives */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Base Salary</p>
                    <p className="font-bold text-gray-900">{job.salary}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <p className="text-xs text-emerald-700 mb-1">Incentives</p>
                    <p className="font-bold text-emerald-600">{job.incentives}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span>Experience: {job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Award size={16} className="text-gray-400" />
                    <span>{job.salaryType}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  View Details & Apply
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT CTA */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our team today and start your journey towards a rewarding career in real estate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Phone size={20} />
              Call: +91 98765 43210
            </a>
            <a
              href="mailto:careers@gharbazaar.com"
              className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Mail size={20} />
              careers@gharbazaar.com
            </a>
          </div>
        </div>

      </div>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border-2 border-gray-200 my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="text-emerald-50">{selectedJob.employmentType} • {selectedJob.location}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Salary Info */}
              <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Base Salary</p>
                    <p className="text-xl font-bold text-gray-900">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-700 mb-1">Incentives</p>
                    <p className="text-xl font-bold text-emerald-600">{selectedJob.incentives}</p>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-600 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Star size={20} className="text-amber-500" />
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Gift size={20} className="text-purple-600" />
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-600 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="pt-6 border-t-2 border-gray-200">
                <a
                  href={`mailto:careers@gharbazaar.com?subject=Application for ${selectedJob.title}&body=Hi, I am interested in applying for the ${selectedJob.title} position.`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Apply Now via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
