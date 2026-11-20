import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../store/propertyQuery/getPropertyQuery";

export default function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetPropertyByIdQuery({ id });
  const property = data?.data;

  // Generate booking ID
  const bookingId = `GB-2025-${Math.floor(10000 + Math.random() * 90000)}`;
  const amountPaid = 10499;
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">Payment Processing</h3>
              <p className="text-sm text-gray-600">GharBazaar holds your payment securely</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Success */}
          <div className="lg:col-span-2 space-y-6">
            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Success Animation */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4 relative">
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-green-600 relative z-10">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h2>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600 font-medium">Booking ID</span>
                  <span className="text-xl font-bold text-gray-900">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600 font-medium">Amount Paid</span>
                  <span className="text-xl font-bold text-gray-900">₹{amountPaid.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <button className="text-blue-600 font-semibold text-sm hover:underline">
                    View Details &gt;
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Payment is securely held by GharBazaar</h4>
                    <p className="text-sm text-gray-700">
                      We are holding your security amount (₹{amountPaid.toLocaleString()}) to ensure a safe experience. 
                      It will be released to the property owner after your move-in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {/* Step 1 - Completed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="w-0.5 h-12 bg-green-500"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-bold text-gray-900">Payment Received</h4>
                    <p className="text-sm text-blue-600">{currentDate}, {currentTime}</p>
                  </div>
                </div>

                {/* Step 2 - In Progress */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="w-0.5 h-12 bg-green-500"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-bold text-gray-900">Documents Verification</h4>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>

                {/* Step 3 - Pending */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-bold text-gray-900">Owner Confirmation</h4>
                    <p className="text-sm text-blue-600">Within 24 - 48 hours</p>
                  </div>
                </div>

                {/* Step 4 - Pending */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Booking Confirmed</h4>
                    <p className="text-sm text-gray-600">You'll get a notification</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  View Booking
                </button>
                <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 rounded-lg transition-all">
                  Need Help?
                </button>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-600">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">24x7 Customer Support</h3>
                  <p className="text-gray-600">We're always here to help you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Why We Hold Payment */}
          <div className="lg:col-span-1 space-y-6">
            {/* Why We Hold Payment */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why We Hold Your Payment?</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">Ensures genuine listings</p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">Protects you from fraud</p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">Helps in easy refund if listing not as promised</p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">We also help in dispute resolution</p>
                </div>
              </div>

              {/* Image */}
              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop"
                  alt="Happy customers"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <p className="text-lg font-bold text-gray-900 mb-1">More than Properties,</p>
                <p className="text-xl font-bold text-gray-900 mb-3">We Build Trust.</p>
                <div className="flex items-center justify-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="#FF6B35"/>
                    <path d="M9 22V12H15V22" fill="white"/>
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">GharBazaar.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
