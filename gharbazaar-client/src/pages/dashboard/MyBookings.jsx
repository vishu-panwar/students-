import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, IndianRupee, Eye } from "lucide-react";

export default function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - Replace with actual API call
  const bookings = [
    {
      id: "GB-2025-10482",
      propertyName: "Akshik PG - Sector 63",
      location: "Noida, Uttar Pradesh",
      propertyType: "PG/Hostel",
      roomType: "Triple Sharing",
      moveIn: "01 Sep, 2025",
      duration: "12 months",
      rent: "₹15,000/month",
      status: "pending",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-99821",
      propertyName: "The Canal House",
      location: "New York, New York, US",
      propertyType: "Residential",
      roomType: "Private Room",
      moveIn: "31 Aug, 2026",
      duration: "12 months",
      rent: "₹1950/month",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-88765",
      propertyName: "Luxury Studio Apartment",
      location: "Greater Kailash, South Delhi",
      propertyType: "Apartment",
      roomType: "Studio",
      moveIn: "15 Jul, 2025",
      duration: "6 months",
      rent: "₹25,000/month",
      status: "completed",
      image: "https://images.unsplash.com/photo-1502672260066-6bc05c107db4?w=400&h=300&fit=crop",
    },
    {
      id: "GB-2025-77654",
      propertyName: "Modern PG in Gurgaon",
      location: "Gurgaon, Haryana",
      propertyType: "PG/Hostel",
      roomType: "Double Sharing",
      moveIn: "10 Jun, 2025",
      duration: "12 months",
      rent: "₹18,000/month",
      status: "cancelled",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    },
  ];

  const tabs = [
    { id: "all", label: "All", count: bookings.length },
    { id: "ongoing", label: "Ongoing", count: bookings.filter(b => b.status === "pending").length },
    { id: "completed", label: "Completed", count: bookings.filter(b => b.status === "completed").length },
    { id: "cancelled", label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length },
  ];

  const getFilteredBookings = () => {
    if (activeTab === "all") return bookings;
    if (activeTab === "ongoing") return bookings.filter(b => b.status === "pending" || b.status === "confirmed");
    if (activeTab === "completed") return bookings.filter(b => b.status === "completed");
    if (activeTab === "cancelled") return bookings.filter(b => b.status === "cancelled");
    return bookings;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "bg-orange-50", text: "text-orange-600", label: "Payment Pending" },
      confirmed: { bg: "bg-green-50", text: "text-green-600", label: "Confirmed" },
      completed: { bg: "bg-blue-50", text: "text-blue-600", label: "Completed" },
      cancelled: { bg: "bg-red-50", text: "text-red-600", label: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Track and manage all your property bookings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 min-w-[120px] px-6 py-4 text-sm font-semibold
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
          <button
            onClick={() => navigate("/properties")}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
          >
            Explore Properties
          </button>
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
                <div className="md:col-span-3">
                  <img
                    src={booking.image}
                    alt={booking.propertyName}
                    className="w-full h-32 md:h-full object-cover rounded-lg"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    {getStatusBadge(booking.status)}
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                      {booking.propertyName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{booking.location}</p>
                    <p className="text-xs text-gray-500 mb-1">
                      {booking.propertyType} • {booking.roomType}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Move-in</p>
                        <p className="font-semibold text-gray-900">{booking.moveIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">{booking.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee size={16} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Rent</p>
                        <p className="font-semibold text-gray-900">{booking.rent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex flex-col justify-between items-end">
                  <div className="text-right mb-4">
                    <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                    <p className="text-sm font-bold text-gray-900">{booking.id}</p>
                  </div>

                  {booking.status === "pending" ? (
                    <button
                      onClick={() => navigate(`/booking-step3/${booking.id}`)}
                      className="w-full md:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/dashboard/booking-details/${booking.id}`)}
                      className="w-full md:w-auto px-6 py-2.5 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Hold Message for Confirmed */}
              {booking.status === "confirmed" && (
                <div className="bg-green-50 border-t border-green-100 px-4 py-3 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your payments are securely held by GharBazaar until owner confirms your move-in.
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
