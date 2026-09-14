import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";

export default function BookingStep3() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading } = useGetPropertyByIdQuery({ id });
  const property = data?.data;

  // Payment form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("India");
  const [saveInfo, setSaveInfo] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvc) {
      toast.error("Please fill all payment details");
      return;
    }

    // Simulate payment processing
    toast.success("Payment successful! Redirecting...");
    
    // Navigate to confirmation page
    setTimeout(() => {
      navigate(`/booking-confirmation/${id}`);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1B9E4B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const holdingFee = 50;
  const processingFee = 1.81;
  const totalPayable = holdingFee + processingFee;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hey {user?.name || "test"}, almost booked! Final step.
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Let's complete the payment to secure your spot.
          </p>

          {/* Steps */}
          <div className="flex items-center justify-center gap-8 max-w-2xl mx-auto">
            {/* Step 1 - Completed */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M9 11H15M9 15H15M21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">STEP1</p>
                <p className="text-sm font-bold text-gray-900">Booking Details</p>
              </div>
              <div className="w-20 h-px bg-green-600"></div>
            </div>

            {/* Step 2 - Completed */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21M7 14H7.01M11 14H11.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">STEP2</p>
                <p className="text-sm font-bold text-gray-900">Payment</p>
              </div>
              <div className="w-20 h-px bg-green-600"></div>
            </div>

            {/* Step 3 - Active */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center border-2 border-green-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-600">STEP3</p>
                <p className="text-sm font-bold text-gray-900">Booking Confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Payment Form */}
          <div className="lg:col-span-2">
            {/* Payment Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Payment</h3>
              </div>

              <div className="flex items-center gap-2 mb-6 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="font-medium">Secure, fast checkout with Link</span>
              </div>

              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      maxLength="19"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm pr-24"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" className="h-5" />
                      <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" className="h-5" />
                      <img src="https://img.icons8.com/color/24/amex.png" alt="Amex" className="h-5" />
                    </div>
                  </div>
                </div>

                {/* Expiry Date & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM / YY"
                      maxLength="7"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security code</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      maxLength="4"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country/Territory</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                {/* Optional Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">Optional</span>
                    <span className="text-sm text-gray-700">Save my information for faster checkout</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number</label>
                      <div className="flex gap-2">
                        <select className="w-24 border border-gray-300 rounded-lg px-2 py-2.5 text-sm">
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="081234 56789"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="First and last name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    By continuing, you agree to our <a href="#" className="text-blue-600 underline">terms and conditions</a>
                  </p>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold py-3 rounded-lg transition-all text-base"
                >
                  Pay £{totalPayable.toFixed(2)}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Cancellation Policy</p>
                  <a href="#" className="text-xs text-blue-600 underline">View</a>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Lowest Price Guaranteed</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Safe & Secure</p>
                </div>
              </div>

              {/* Things to Know */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Things to Know</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Payment gateway charges are fees paid to the payment gateway for processing transactions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Booking Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Property Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative">
                <img
                  src={property?.images?.[0] || "https://via.placeholder.com/400x200"}
                  alt={property?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Book with Confidence
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{property?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{property?.location}</p>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-semibold">Standard Studio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">51 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available From</span>
                    <span className="font-semibold">12 Sep, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Move-Out</span>
                    <span className="font-semibold">5 Sep, 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-semibold">From £325/week</span>
                  </div>
                </div>

                <button className="w-full text-sm text-[#1B9E4B] font-semibold py-2">
                  View Price Summary →
                </button>
              </div>
            </div>

            {/* Booking Amount */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Amount</h3>
              
              <div className="space-y-3 text-sm mb-4 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Fully Refundable Holding Fee</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-semibold">£{holdingFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Processing Fee</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-semibold">£{processingFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-base font-bold">
                <span>Payable Now</span>
                <span>£{totalPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Applicable Offers */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-500">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Applicable Offers</h3>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">£500</span>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-900">Hot Pick: Lock In Your Spot & Snag £500 CASHBACK!</p>
                </div>
                <button className="text-xs font-semibold text-red-500 hover:text-red-600 flex-shrink-0">View</button>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                <span className="text-sm font-semibold text-gray-900">Cancellation Policy (6)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Payment Policy */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                <span className="text-sm font-semibold text-gray-900">Payment Policy (4)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Expandable Sections */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Instant Booking */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10H21M7 3V6M17 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Instant Booking</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Lowest Price Guaranteed */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-600">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Lowest Price Guaranteed</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Verified Properties */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Verified Properties</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* 24x7 Personal Assistance */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-600">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">24x7 Personal Assistance</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* 10.7K+ Reviews */}
              <div>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">10.7K+ Reviews</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
