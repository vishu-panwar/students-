import React, { useState } from "react";
import { Phone, MessageSquare, Mail, MapPin, Calendar, Clock, Eye, Star, TrendingUp, Users, Filter } from "lucide-react";

export default function SellerLeads() {
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Mock data - Replace with actual API call
  const leads = [
    {
      id: "L-2025-10001",
      tenantName: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul.sharma@email.com",
      propertyName: "3BHK Luxury Apartment",
      propertyLocation: "Andheri West, Mumbai",
      propertyImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      interestedIn: "Rent",
      budget: "₹30,000 - ₹40,000",
      moveInDate: "01 Oct, 2025",
      inquiryDate: "28 Aug, 2025",
      inquiryTime: "2:30 PM",
      status: "new",
      priority: "high",
      message: "I am interested in visiting this property. Please let me know the available time slots.",
      leadScore: 85,
      viewCount: 5,
    },
    {
      id: "L-2025-10002",
      tenantName: "Priya Patel",
      phone: "+91 9123456789",
      email: "priya.patel@email.com",
      propertyName: "2BHK Sea View Flat",
      propertyLocation: "Bandra, Mumbai",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      interestedIn: "Buy",
      budget: "₹1.2Cr - ₹1.5Cr",
      moveInDate: "15 Sep, 2025",
      inquiryDate: "27 Aug, 2025",
      inquiryTime: "11:00 AM",
      status: "contacted",
      priority: "high",
      message: "Looking to buy this property. Need more details about documentation and possession date.",
      leadScore: 92,
      viewCount: 8,
    },
    {
      id: "L-2025-10003",
      tenantName: "Amit Kumar",
      phone: "+91 9988776655",
      email: "amit.k@email.com",
      propertyName: "Office Space BKC",
      propertyLocation: "BKC, Mumbai",
      propertyImage: "https://images.unsplash.com/photo-1502672260066-6bc05c107db4?w=400&h=300&fit=crop",
      interestedIn: "Rent",
      budget: "₹1,00,000 - ₹1,50,000",
      moveInDate: "01 Sep, 2025",
      inquiryDate: "26 Aug, 2025",
      inquiryTime: "4:15 PM",
      status: "scheduled",
      priority: "medium",
      message: "Need commercial space for startup. Want to schedule a visit this week.",
      leadScore: 78,
      viewCount: 3,
    },
    {
      id: "L-2025-10004",
      tenantName: "Sneha Desai",
      phone: "+91 9876512345",
      email: "sneha.d@email.com",
      propertyName: "Studio Apartment",
      propertyLocation: "Powai, Mumbai",
      propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      interestedIn: "Rent",
      budget: "₹20,000 - ₹25,000",
      moveInDate: "10 Sep, 2025",
      inquiryDate: "25 Aug, 2025",
      inquiryTime: "9:45 AM",
      status: "converted",
      priority: "low",
      message: "Interested in renting. Budget is flexible.",
      leadScore: 95,
      viewCount: 12,
    },
    {
      id: "L-2025-10005",
      tenantName: "Vikram Singh",
      phone: "+91 9123450000",
      email: "vikram.singh@email.com",
      propertyName: "3BHK Luxury Apartment",
      propertyLocation: "Andheri West, Mumbai",
      propertyImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      interestedIn: "Rent",
      budget: "₹35,000 - ₹45,000",
      moveInDate: "15 Sep, 2025",
      inquiryDate: "24 Aug, 2025",
      inquiryTime: "6:30 PM",
      status: "lost",
      priority: "medium",
      message: "Checking multiple properties in the area.",
      leadScore: 45,
      viewCount: 2,
    },
  ];

  const tabs = [
    { id: "all", label: "All Leads", count: leads.length },
    { id: "new", label: "New", count: leads.filter(l => l.status === "new").length },
    { id: "contacted", label: "Contacted", count: leads.filter(l => l.status === "contacted").length },
    { id: "scheduled", label: "Scheduled", count: leads.filter(l => l.status === "scheduled").length },
    { id: "converted", label: "Converted", count: leads.filter(l => l.status === "converted").length },
    { id: "lost", label: "Lost", count: leads.filter(l => l.status === "lost").length },
  ];

  const getFilteredLeads = () => {
    let filtered = leads;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(l => l.status === activeTab);
    }
    
    if (filterStatus !== "all") {
      filtered = filtered.filter(l => l.priority === filterStatus);
    }
    
    return filtered;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: "bg-blue-50", text: "text-blue-600", label: "New Lead" },
      contacted: { bg: "bg-purple-50", text: "text-purple-600", label: "Contacted" },
      scheduled: { bg: "bg-orange-50", text: "text-orange-600", label: "Visit Scheduled" },
      converted: { bg: "bg-green-50", text: "text-green-600", label: "Converted" },
      lost: { bg: "bg-gray-50", text: "text-gray-600", label: "Lost" },
    };

    const config = statusConfig[status] || statusConfig.new;

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
      medium: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
      low: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${config.bg} ${config.text} border ${config.border}`}>
        {priority} Priority
      </span>
    );
  };

  const getLeadScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone, name) => {
    const message = encodeURIComponent(`Hi ${name}, I received your inquiry on GharBazaar. How can I help you?`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredLeads = getFilteredLeads();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads & Inquiries</h1>
        <p className="text-gray-600">Manage and track all property inquiries from potential tenants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">↗ +12% this week</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">New Leads</p>
              <p className="text-2xl font-bold text-blue-600">
                {leads.filter(l => l.status === "new").length}
              </p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-600">20%</p>
              <p className="text-xs text-green-600 font-semibold mt-1">↗ +5% vs last month</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Star size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
              <p className="text-xs text-orange-600 font-semibold mt-1">Can be improved</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex overflow-x-auto flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  min-w-[120px] px-6 py-4 text-sm font-semibold
                  border-b-2 transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "border-green-600 text-green-600 bg-green-50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          <div className="relative px-4">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Filter size={16} />
              Filter
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-4 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-48 z-10">
                <p className="text-xs font-semibold text-gray-700 mb-2">Priority</p>
                {["all", "high", "medium", "low"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => {
                      setFilterStatus(priority);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      filterStatus === priority
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600 mb-6">You don't have any leads in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Property Image */}
                <div className="md:col-span-2">
                  <img
                    src={lead.propertyImage}
                    alt={lead.propertyName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getLeadScoreColor(lead.leadScore)}`}>
                      <Star size={12} fill="currentColor" />
                      {lead.leadScore}
                    </div>
                  </div>
                </div>

                {/* Lead & Property Details */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(lead.status)}
                      {getPriorityBadge(lead.priority)}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {lead.tenantName}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        <span>{lead.email}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-gray-400" />
                        <p className="text-sm font-semibold text-gray-900">{lead.propertyName}</p>
                      </div>
                      <p className="text-xs text-gray-600 ml-5">{lead.propertyLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="md:col-span-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Inquiry Details</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Interested In:</span>
                      <span className="text-xs font-bold text-gray-900">{lead.interestedIn}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Budget:</span>
                      <span className="text-xs font-bold text-gray-900">{lead.budget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Move-in:</span>
                      <span className="text-xs font-bold text-gray-900">{lead.moveInDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Views:</span>
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1">
                        <Eye size={12} />
                        {lead.viewCount}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={12} />
                      {lead.inquiryDate} at {lead.inquiryTime}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex flex-col justify-between gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                    <p className="text-[10px] text-gray-500 mb-1">Lead ID</p>
                    <p className="text-xs font-bold text-gray-900">{lead.id}</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleCall(lead.phone)}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone size={16} />
                      Call
                    </button>
                    
                    <button
                      onClick={() => handleWhatsApp(lead.phone, lead.tenantName)}
                      className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageSquare size={16} />
                      WhatsApp
                    </button>
                    
                    <button
                      onClick={() => handleEmail(lead.email)}
                      className="w-full px-3 py-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Mail size={16} />
                      Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Lead Message */}
              {lead.message && (
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Message:</p>
                  <p className="text-sm text-gray-600 italic">"{lead.message}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
