import React, { useState } from "react";
import { 
  TrendingUp, 
  Eye, 
  Users, 
  IndianRupee, 
  Calendar,
  Building2,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

export default function SellerAnalytics() {
  const [timeRange, setTimeRange] = useState("7days");

  const timeRanges = [
    { id: "7days", label: "Last 7 Days" },
    { id: "30days", label: "Last 30 Days" },
    { id: "3months", label: "Last 3 Months" },
    { id: "1year", label: "Last Year" },
  ];

  // Mock data
  const overviewStats = [
    {
      label: "Total Views",
      value: "3,450",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      color: "blue",
    },
    {
      label: "Total Leads",
      value: "248",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      label: "Total Inquiries",
      value: "189",
      change: "+8.7%",
      trend: "up",
      icon: MessageSquare,
      color: "purple",
    },
    {
      label: "Revenue",
      value: "₹4.5L",
      change: "-2.4%",
      trend: "down",
      icon: IndianRupee,
      color: "orange",
    },
  ];

  const propertyPerformance = [
    {
      id: 1,
      name: "3BHK Luxury Apartment",
      location: "Andheri West, Mumbai",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      views: 1250,
      leads: 48,
      inquiries: 32,
      conversion: "6.5%",
      trend: "up",
    },
    {
      id: 2,
      name: "2BHK Sea View Flat",
      location: "Bandra, Mumbai",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      views: 890,
      leads: 35,
      inquiries: 28,
      conversion: "8.2%",
      trend: "up",
    },
    {
      id: 3,
      name: "Office Space BKC",
      location: "BKC, Mumbai",
      image: "https://images.unsplash.com/photo-1502672260066-6bc05c107db4?w=400&h=300&fit=crop",
      views: 650,
      leads: 22,
      inquiries: 18,
      conversion: "4.1%",
      trend: "down",
    },
    {
      id: 4,
      name: "Studio Apartment",
      location: "Powai, Mumbai",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      views: 450,
      leads: 15,
      inquiries: 12,
      conversion: "5.3%",
      trend: "up",
    },
  ];

  const weeklyData = [
    { day: "Mon", views: 450, leads: 28, inquiries: 22 },
    { day: "Tue", views: 520, leads: 35, inquiries: 28 },
    { day: "Wed", views: 480, leads: 30, inquiries: 24 },
    { day: "Thu", views: 610, leads: 42, inquiries: 35 },
    { day: "Fri", views: 580, leads: 38, inquiries: 30 },
    { day: "Sat", values: 720, leads: 52, inquiries: 42 },
    { day: "Sun", views: 590, leads: 23, inquiries: 18 },
  ];

  const topCities = [
    { city: "Mumbai", leads: 145, percentage: 58 },
    { city: "Pune", leads: 52, percentage: 21 },
    { city: "Bangalore", leads: 31, percentage: 12 },
    { city: "Delhi", leads: 20, percentage: 9 },
  ];

  const leadSources = [
    { source: "Direct Search", count: 98, percentage: 40 },
    { source: "WhatsApp Share", count: 62, percentage: 25 },
    { source: "Social Media", count: 45, percentage: 18 },
    { source: "Referrals", count: 28, percentage: 11 },
    { source: "Others", count: 15, percentage: 6 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your property performance and insights</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`
                px-4 py-2 rounded-md text-sm font-semibold transition-all
                ${
                  timeRange === range.id
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-full bg-${stat.color}-50 flex items-center justify-center`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Weekly Activity</h3>
            <Activity size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((data, index) => {
              const maxValue = Math.max(...weeklyData.map(d => d.views));
              const barWidth = (data.views / maxValue) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 w-12">{data.day}</span>
                    <span className="text-sm font-bold text-gray-900">{data.views} views</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>👥 {data.leads} leads</span>
                    <span>💬 {data.inquiries} inquiries</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Lead Sources</h3>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {leadSources.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{source.source}</span>
                  <span className="text-sm font-bold text-gray-900">{source.count}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-500 w-10">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Cities by Leads</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {topCities.map((city, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">📍</span>
                <span className="text-xs font-bold text-green-700">{city.percentage}%</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{city.city}</h4>
              <p className="text-sm text-gray-600">{city.leads} leads</p>
              <div className="mt-3 bg-white rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-green-600 h-full rounded-full"
                  style={{ width: `${city.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Property Performance</h3>
          <p className="text-sm text-gray-600 mt-1">Compare your properties side by side</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Inquiries
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {propertyPerformance.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{property.name}</p>
                        <p className="text-xs text-gray-500">{property.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-gray-900">{property.views}</span>
                      <Eye size={14} className="text-gray-400 mt-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-gray-900">{property.leads}</span>
                      <Users size={14} className="text-gray-400 mt-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-gray-900">{property.inquiries}</span>
                      <MessageSquare size={14} className="text-gray-400 mt-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      parseFloat(property.conversion) >= 7
                        ? "bg-green-50 text-green-700"
                        : parseFloat(property.conversion) >= 5
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {property.conversion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {property.trend === "up" ? (
                      <div className="inline-flex items-center gap-1 text-green-600">
                        <ArrowUpRight size={16} />
                        <span className="text-xs font-bold">Up</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-red-600">
                        <ArrowDownRight size={16} />
                        <span className="text-xs font-bold">Down</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
