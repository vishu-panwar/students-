import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, IndianRupee, Eye, Phone, MessageSquare, CheckCircle, XCircle, User } from "lucide-react";

export default function SellerBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - Replace with actual API call
  const bookings = [
    {
      id: "GB-2025-10482",
      propertyName: "3BHK Luxury Apartment",
      location: "Andheri West, Mumbai",
      propertyType: "Apartment",
      roomType: "3 BHK",
      tenantName: "Rahul Sharma",
      tenantPhone: "+91 9876543210",
      moveIn: "01 Sep, 2025",
      duration: "12 months",
      rent: "₹35,000/month",
      totalAmount: "₹4,20,000",
      status: "pending",
      bookingDate: "25 Aug, 2025",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-99821",
      propertyName: "2BHK Sea View Flat",
      location: "Bandra, Mumbai",
      propertyType: "Apartment",
      roomType: "2 BHK",
      tenantName: "Priya Patel",
      tenantPhone: "+91 9123456789",
      moveIn: "15 Sep, 2025",
      duration: "11 months",
      rent: "₹45,000/month",
      totalAmount: "₹4,95,000",
      status: "confirmed",
      bookingDate: "20 Aug, 2025",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-88765",
      propertyName: "Office Space BKC",
      location: "BKC, Mumbai",
      propertyType: "Commercial",
      roomType: "1200 sqft",
      tenantName: "Tech Solutions Pvt Ltd",
      tenantPhone: "+91 9988776655",
      moveIn: "10 Aug, 2025",
      duration: "24 months",
      rent: "₹1,50,000/month",
      totalAmount: "₹36,00,000",
      status: "completed",
      bookingDate: "01 Aug, 2025",
      image: "https://images.unsplash.com/photo-1502672260066-6bc05c107db4?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-77654",
      propertyName: "Studio Apartment",
      location: "Powai, Mumbai",
      propertyType: "Apartment",
      roomType: "Studio",
      tenantName: "Amit Kumar",
      tenantPhone: "+91 9876512345",
      moveIn: "01 Sep, 2025",
      duration: "6 months",
      rent: "₹22,000/month",
      totalAmount: "₹1,32,000",
      status: "rejected",
      bookingDate: "18 Aug, 2025",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    },
  ];

  const tabs = [
    { id: "all", label: "All", count: bookings.length },
    { id: "pending", label: "Pending Approval", count: bookings.filter(b => b.status === "pending").length },
    { id: "confirmed", label: "Confirmed", count: bookings.filter(b => b.status === "confirmed").length },
    { id: "completed", label: "Completed", count: bookings.filter(b => b.status === "completed").length },
    { id: "rejected", label: "Rejected", count: bookings.filter(b => b.status === "rejected").length },
  ];

  const getFilteredBookings = () => {
    if (activeTab === "all") return bookings;
    return bookings.filter(b => b.status === activeTab);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "bg-orange-50", text: "text-orange-600", label: "Pending Approval" },
      confirmed: { bg: "bg-green-50", text: "text-green-600", label: "Confirmed" },
      completed: { bg: "bg-blue-50", text: "text-blue-600", label: "Completed" },
      rejected: { bg: "bg-red-50", text: "text-red-600", label: "Rejected" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleApprove = (bookingId) => {
    // API call to approve booking
    alert(`Booking ${bookingId} approved!`);
  };

  const handleReject = (bookingId) => {
    // API call to reject booking
    alert(`Booking ${bookingId} rejected!`);
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600">Review and manage property booking requests from tenants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {bookings.filter(b => b.status === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === "confirmed").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹45.5L</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <IndianRupee size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 min-w-[140px] px-6 py-4 text-sm font-semibold
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
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">You don't have any bookings in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Image */}
                <div className="md:col-span-2">
                  <img
                    src={booking.image}
                    alt={booking.propertyName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Property Details */}
                <div className="md:col-span-4 flex flex-col justify-between">
                  <div>
                    {getStatusBadge(booking.status)}
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                      {booking.propertyName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{booking.location}</p>
                    <p className="text-xs text-gray-500">
                      {booking.propertyType} • {booking.roomType}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Move-in</p>
                        <p className="font-semibold text-gray-900 text-xs">{booking.moveIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee size={14} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Rent</p>
                        <p className="font-semibold text-gray-900 text-xs">{booking.rent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tenant Details */}
                <div className="md:col-span-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tenant</p>
                      <p className="font-semibold text-gray-900 text-sm">{booking.tenantName}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <p className="text-xs text-gray-700">{booking.tenantPhone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <p className="text-xs text-gray-700">Booked: {booking.bookingDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <p className="text-xs text-gray-700">Duration: {booking.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex flex-col justify-between gap-2">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-green-700">{booking.totalAmount}</p>
                    <p className="text-xs text-gray-500 mt-1">Booking ID: {booking.id}</p>
                  </div>

                  <div className="flex gap-2">
                    {booking.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(booking.id)}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(booking.id)}
                          className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-red-200"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="w-full px-3 py-2 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-xs border border-blue-200">
                      <Phone size={14} />
                      Call
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-600 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-xs border border-green-200">
                      <MessageSquare size={14} />
                      Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Hold Info for Confirmed */}
              {booking.status === "confirmed" && (
                <div className="bg-green-50 border-t border-green-100 px-4 py-3 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Tenant payment is securely held by GharBazaar. Confirm move-in to receive payment.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
