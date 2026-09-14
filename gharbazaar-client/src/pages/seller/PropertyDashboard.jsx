import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Eye, TrendingUp, Plus, Home, BarChart, FileText, MessageSquare } from 'lucide-react';

export default function PropertyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user?.name || user?.fullName || user?.username || "Seller";

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    { 
      label: 'Active Listings', 
      value: '12', 
      icon: <Building2 size={20} />, 
      trend: '+2 this month',
      btn: 'Manage Properties',
      to: '/seller/dashboard/property/listings'
    },
    { 
      label: 'Total Views', 
      value: '3,450', 
      icon: <Eye size={20} />, 
      trend: '+15% this week',
      btn: 'View Analytics',
      to: '/seller/dashboard/property/analytics'
    },
    { 
      label: 'New Leads', 
      value: '48', 
      icon: <Users size={20} />, 
      trend: '+8 today',
      btn: 'Manage Leads',
      to: '/seller/dashboard/property/leads'
    },
    { 
      label: 'Conversion Rate', 
      value: '4.2%', 
      icon: <TrendingUp size={20} />, 
      trend: '+1.1% overall',
      btn: 'View Reports',
      to: '/seller/dashboard/property/analytics'
    },
  ];

  const activities = [
    {
      icon: <Users size={16} color="#555" />,
      action: "New Lead Received",
      sub: "3BHK Apartment in Andheri",
      time: "30 mins ago",
    },
    {
      icon: <Eye size={16} color="#555" />,
      action: "Property Viewed",
      sub: "Luxury Villa in Bandra",
      time: "1 hour ago",
    },
    {
      icon: <MessageSquare size={16} color="#555" />,
      action: "New Message",
      sub: "Inquiry about 2BHK property",
      time: "2 hours ago",
    },
    {
      icon: <FileText size={16} color="#555" />,
      action: "Booking Request",
      sub: "Office Space in BKC",
      time: "1 day ago",
    },
  ];

  const quickActions = [
    {
      label: "Add Property",
      icon: <Plus size={26} />,
      to: "/seller/dashboard/property/list-property",
    },
    {
      label: "My Properties",
      icon: <Home size={26} />,
      to: "/seller/dashboard/property/listings",
    },
    {
      label: "View Analytics",
      icon: <BarChart size={26} />,
      to: "/seller/dashboard/property/analytics",
    },
    {
      label: "Messages",
      icon: <MessageSquare size={26} />,
      to: "/seller/dashboard/property/messages",
    },
  ];

  const recentListings = [
    {
      id: 1,
      title: "3BHK Luxury Apartment",
      location: "Andheri West, Mumbai",
      price: "85 Lac",
      image: "/api/placeholder/80/60",
      views: 234,
      leads: 12,
    },
    {
      id: 2,
      title: "2BHK Sea View Flat",
      location: "Bandra, Mumbai",
      price: "1.2 Cr",
      image: "/api/placeholder/80/60",
      views: 456,
      leads: 23,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#EDE8DF] p-3 sm:p-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── GREETING BANNER ── */}
      <div className="bg-white rounded-xl p-5 sm:p-7 mb-4 flex flex-col md:flex-row md:items-stretch gap-5">
        {/* LEFT — greeting + buttons */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 leading-tight">
            {getGreeting()},<br />
            {userName}!
          </h1>
          <p className="text-sm text-gray-600 mt-2">Welcome to your property seller dashboard</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              to="/seller/dashboard/property/listings"
              className="px-4 py-2 border border-gray-800 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              My Listings
            </Link>
            <Link
              to="/seller/dashboard/property/list-property"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Plus size={16} /> Add Property
            </Link>
          </div>
        </div>

        {/* RIGHT — Quick Stats */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl flex flex-col justify-between w-full md:w-72 flex-shrink-0 border border-green-100">
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">This Month</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total Earnings</span>
                <span className="text-sm font-bold text-green-700">₹2.4L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Properties Sold</span>
                <span className="text-sm font-bold text-green-700">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Active Deals</span>
                <span className="text-sm font-bold text-green-700">8</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-green-200">
            <p className="text-xs text-green-600 font-semibold">↗ 18% increase from last month</p>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <p className="text-xs text-gray-500 font-medium leading-snug">
                {s.label}
              </p>
              <div className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center flex-shrink-0 ml-2 text-green-600">
                {s.icon}
              </div>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mb-1">
              {s.value}
            </p>
            <p className="text-xs text-green-600 font-semibold mb-3">{s.trend}</p>
            <Link
              to={s.to}
              className="block w-full text-center py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md transition-colors"
            >
              {s.btn}
            </Link>
          </div>
        ))}
      </div>

      {/* ── ACTIVITIES + RECENT LISTINGS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="flex flex-col gap-3">
            {activities.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 bg-[#F5F0E8] rounded-xl transition hover:opacity-90"
              >
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white flex-shrink-0 text-gray-700">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    {act.action}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">
                    {act.sub}
                  </p>
                </div>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap flex-shrink-0 self-center pl-2">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">
              Recent Listings
            </h3>
            <Link
              to="/seller/dashboard/property/listings"
              className="text-xs text-gray-500 underline hover:text-green-600 transition-colors"
            >
              View All
            </Link>
          </div>

          {recentListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
              <Building2 size={48} className="mb-3 opacity-30" />
              <p>No listings yet</p>
              <Link 
                to="/seller/dashboard/property/list-property"
                className="mt-3 text-green-600 font-semibold underline"
              >
                Add your first property
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentListings.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-3 bg-[#F5F0E8] rounded-xl p-3 transition hover:opacity-95"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {property.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {property.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-[#FFF5EA] text-[#D08230] text-[11px] font-bold px-2.5 py-0.5 border border-[#FBE3CC] rounded">
                        ₹{property.price}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        👁 {property.views} views
                      </span>
                      <span className="text-[11px] text-gray-500">
                        💬 {property.leads} leads
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-center justify-center gap-3 py-6 px-4 bg-[#F5F0E8] rounded-2xl transition hover:opacity-95 group"
            >
              <div className="text-gray-900 transition-transform group-hover:scale-105 duration-200">
                {action.icon}
              </div>
              <span className="text-xs font-bold text-gray-800 text-center tracking-tight leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
