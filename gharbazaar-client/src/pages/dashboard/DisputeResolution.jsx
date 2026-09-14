import React, { useState } from "react";

export default function DisputeResolution() {
  const [showRaiseDispute, setShowRaiseDispute] = useState(false);

  const commonIssues = [
    { title: "Property not as described", description: "Report discrepancies between listing and actual property" },
    { title: "Owner not responding", description: "Owner is not responding to your messages or calls" },
    { title: "Refund request", description: "Request a refund for your booking" },
    { title: "Maintenance issue", description: "Report maintenance or repair issues" },
    { title: "Payment related issue", description: "Issues with payment, deposits, or refunds" },
    { title: "Others", description: "Any other issue not listed above" }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dispute Resolution</h1>
        <p className="text-gray-600">Get help resolving issues with your bookings</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Facing Issue Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white text-2xl">
              🛡️
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Facing an issue?</h3>
              <p className="text-sm text-gray-700">
                We're here to help. Raise a request and our team will resolve it fairly.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRaiseDispute(true)}
            className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
          >
            📄 Raise a Dispute
          </button>
        </div>

        {/* Common Issues */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Common Issues</h3>
          
          <div className="space-y-2">
            {commonIssues.map((issue, index) => (
              <button
                key={index}
                onClick={() => setShowRaiseDispute(true)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-gray-200 hover:border-green-300 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors text-xl">
                  {index === 0 && "🏠"}
                  {index === 1 && "👤"}
                  {index === 2 && "🔄"}
                  {index === 3 && "🔧"}
                  {index === 4 && "💳"}
                  {index === 5 && "➕"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-0.5">{issue.title}</p>
                  <p className="text-xs text-gray-500">{issue.description}</p>
                </div>
                <span className="text-gray-400 group-hover:text-green-600 text-xl">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Need Immediate Help */}
        <div className="bg-blue-50 border-t border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              💬
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Need Immediate Help?</h3>
              <p className="text-sm text-gray-600">Chat with our support team or call us.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}
              className="py-3 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all"
            >
              💬 Chat on WhatsApp
            </button>
            <button
              onClick={() => window.location.href = "tel:+919876543210"}
              className="py-3 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all"
            >
              📞 Call Support
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            We usually respond within a few minutes.
          </p>
        </div>
      </div>

      {/* Your Disputes */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Disputes</h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
            🛡️
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">No active disputes</h4>
          <p className="text-sm text-gray-600">
            You don't have any open disputes at the moment.
          </p>
        </div>
      </div>

      {/* Raise Dispute Modal */}
      {showRaiseDispute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Raise a Dispute</h3>
              <button
                onClick={() => setShowRaiseDispute(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Select Booking <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">
                    <option value="">Choose a booking</option>
                    <option value="GB-2025-10482">GB-2025-10482 - Akshik PG</option>
                    <option value="GB-2025-99821">GB-2025-99821 - The Canal House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Issue Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">
                    <option value="">Select issue type</option>
                    <option value="property">Property not as described</option>
                    <option value="owner">Owner not responding</option>
                    <option value="refund">Refund request</option>
                    <option value="maintenance">Maintenance issue</option>
                    <option value="payment">Payment related issue</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Describe the issue <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 50 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Upload Evidence (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <div className="text-4xl mb-2">➕</div>
                    <p className="text-sm text-gray-600 mb-1">Click to upload images or documents</p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
                >
                  Submit Dispute
                </button>
              </form>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-gray-700">
                  <strong>Note:</strong> Our team will review your dispute within 24-48 hours and reach out to both parties to resolve the issue fairly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
