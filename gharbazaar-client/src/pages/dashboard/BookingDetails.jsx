import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Clock, IndianRupee, Shield, FileText, X, Check, ChevronDown } from "lucide-react";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPriceSummary, setShowPriceSummary] = useState(false);
  const [showWhatsIncluded, setShowWhatsIncluded] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);

  // Mock data - Replace with actual API call
  const booking = {
    id: "GB-2025-10482",
    propertyName: "Akshik PG - Sector 63",
    location: "Noida, Uttar Pradesh",
    propertyType: "PG/Hostel",
    roomType: "Triple Sharing",
    moveInDate: "01 Sep, 2025",
    moveOutDate: "31 Aug, 2026",
    duration: "12 months",
    monthlyRent: 10000,
    securityDeposit: 10000,
    platformFee: 499,
    otherCharges: 400,
    status: "pending",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    ownerPhone: "+91 98765 43210",
    ownerWhatsApp: "+91 98765 43210",
  };

  // Calculate totals
  const durationMonths = parseInt(booking.duration);
  const totalRent = booking.monthlyRent * durationMonths;
  const totalCost = totalRent + booking.securityDeposit + booking.platformFee + booking.otherCharges;

  const getStatusConfig = (status) => {
    const configs = {
      pending: { bg: "bg-orange-50", text: "text-orange-600", label: "Payment Pending" },
      confirmed: { bg: "bg-green-50", text: "text-green-600", label: "Confirmed" },
      completed: { bg: "bg-blue-50", text: "text-blue-600", label: "Completed" },
      cancelled: { bg: "bg-red-50", text: "text-red-600", label: "Cancelled" },
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(booking.status);

  const handleCall = () => {
    window.location.href = `tel:${booking.ownerPhone}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${booking.ownerWhatsApp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleMessage = () => {
    // Navigate to messages or open SMS
    window.location.href = `sms:${booking.ownerPhone}`;
  };

  const handleLocation = () => {
    // Open Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
          <p className="text-gray-600 text-sm">View complete booking information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Property Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4 items-start">
            <img
              src={booking.image}
              alt={booking.propertyName}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusConfig.bg} ${statusConfig.text}`}>
                {statusConfig.label}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{booking.propertyName}</h2>
              <p className="text-gray-600 text-sm mb-1">{booking.location}</p>
              <p className="text-gray-500 text-xs">{booking.propertyType} • {booking.roomType}</p>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="grid grid-cols-4 gap-3 p-6 bg-gray-50 border-b border-gray-200">
          <button
            onClick={handleCall}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Phone size={20} className="text-blue-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Call</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <MessageCircle size={20} className="text-green-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">WhatsApp</span>
          </button>

          <button
            onClick={handleMessage}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <MessageCircle size={20} className="text-purple-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Message</span>
          </button>

          <button
            onClick={handleLocation}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <MapPin size={20} className="text-red-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Location</span>
          </button>
        </div>

        {/* Booking Info */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Info</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Booking ID */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking ID</p>
              <p className="text-base font-bold text-gray-900">{booking.id}</p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                {statusConfig.label}
              </span>
            </div>

            {/* Move-in Date */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Move-in Date</p>
              <p className="text-base font-semibold text-gray-900">{booking.moveInDate}</p>
            </div>

            {/* Move-out Date */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Move-out Date</p>
              <p className="text-base font-semibold text-gray-900">{booking.moveOutDate}</p>
            </div>

            {/* Duration */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-base font-semibold text-gray-900">{booking.duration}</p>
            </div>

            {/* Monthly Rent */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Rent</p>
              <p className="text-base font-semibold text-gray-900">₹{booking.monthlyRent.toLocaleString()}</p>
            </div>

            {/* Security Deposit */}
            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Security Deposit (Held by GharBazaar)</p>
              <p className="text-base font-semibold text-gray-900">₹{booking.securityDeposit.toLocaleString()}</p>
            </div>

            {/* Other Charges */}
            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Other Charges (One time)</p>
              <p className="text-base font-semibold text-gray-900">₹{booking.otherCharges}</p>
            </div>
          </div>

          {/* View Price Summary Button */}
          <button
            onClick={() => setShowPriceSummary(true)}
            className="w-full mt-6 py-3 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            View Price Summary
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>

        {/* Payment Hold Info - Only for confirmed bookings */}
        {booking.status === "confirmed" && (
          <div className="bg-green-50 border-t border-green-100 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Your payments are securely held by GharBazaar</h4>
                <p className="text-sm text-gray-700">
                  We are holding your security amount to ensure a safe experience. It will be released to the property owner after your move-in confirmation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pay Now Button - Only for pending bookings */}
        {booking.status === "pending" && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => navigate(`/booking-step3/${id}`)}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all text-lg"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <IndianRupee size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
          </div>
          <p className="text-sm text-gray-600">View all your payment transactions and receipts</p>
          <button className="mt-4 text-sm text-blue-600 font-semibold hover:underline">
            View Details →
          </button>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Documents</h3>
          </div>
          <p className="text-sm text-gray-600">Access booking agreements and receipts</p>
          <button className="mt-4 text-sm text-purple-600 font-semibold hover:underline">
            View Documents →
          </button>
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <MessageCircle size={24} className="text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-sm text-gray-600">Our customer support team is here to assist you 24/7</p>
          </div>
          <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all">
            Contact Support
          </button>
        </div>
      </div>

      {/* Price Summary Modal */}
      {showPriceSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Price Summary</h3>
              <button
                onClick={() => setShowPriceSummary(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Booking Related Fee */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Related Fee</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monthly Rent (₹{booking.monthlyRent.toLocaleString()} × {durationMonths})</span>
                    <span className="font-semibold text-gray-900">₹{totalRent.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Security Deposit</span>
                    <span className="font-semibold text-gray-900">₹{booking.securityDeposit.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">(Held by GharBazaar)</p>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Platform/Processing Fee</span>
                    <span className="font-semibold text-gray-900">₹{booking.platformFee}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Other Charges (One time)</span>
                    <span className="font-semibold text-gray-900">₹{booking.otherCharges}</span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-green-700">₹{booking.securityDeposit.toLocaleString()} (Security Deposit)</span> will be securely held by GharBazaar and released to the owner after successful move-in.
                  </p>
                </div>
              </div>

              {/* Total Cost */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Cost ({durationMonths} months)</span>
                  <span className="text-2xl font-bold text-gray-900">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowWhatsIncluded(!showWhatsIncluded)}
                  className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                >
                  <span className="text-base font-bold text-gray-900">What's Included?</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-600 transition-transform ${showWhatsIncluded ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {showWhatsIncluded && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Verified property & owner</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Secure payment with escrow protection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Help with dispute resolution</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">24×7 customer support</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowCancellationPolicy(!showCancellationPolicy)}
                  className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-gray-600" />
                    <span className="text-base font-bold text-gray-900">Cancellation Policy</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-600 transition-transform ${showCancellationPolicy ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {showCancellationPolicy && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      For 25-26 AY & 26-27 AY:
                    </p>
                    <p className="text-sm text-gray-700">
                      The property does not offer any cooling off period, all contracts are legal and binding.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowPriceSummary(false)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
