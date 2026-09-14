import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Calendar } from "lucide-react";
import { useGetPropertyByIdQuery } from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading } = useGetPropertyByIdQuery({ id });
  const property = data?.data;

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.phone || user?.phoneNumber || "");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [preferredContact, setPreferredContact] = useState({
    whatsapp: true,
    email: false,
    call: false
  });

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!fullName || !email || !mobile) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms and privacy policy");
      return;
    }

    toast.success("Booking submitted successfully!");
    setTimeout(() => navigate(`/property/${id}`), 1500);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="w-12 h-12 border-4 border-[#1B9E4B] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!property) {
    navigate(-1);
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Book Now</h2>
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Steps */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B9E4B] text-white flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">STEP 1</p>
              <p className="text-sm font-semibold text-gray-900">Booking Details</p>
            </div>
          </div>
        </div>

        {/* Content - Two Panel Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Green */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#1e5437] to-[#0f2e1e] text-white p-8">
            <h3 className="text-lg font-bold mb-6">Personal Details</h3>
            
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-2">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">
                  Your Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm mb-2">
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="w-20 bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white flex items-center justify-between">
                    <span>+91</span>
                    <X size={14} className="text-white/50" />
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Your Mobile Number"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              {/* Best Way To Reach You */}
              <div>
                <label className="block text-sm mb-3">Best Way To Reach You</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.whatsapp}
                      onChange={(e) => setPreferredContact({...preferredContact, whatsapp: e.target.checked})}
                      className="w-4 h-4 rounded border-white/20 bg-white/10"
                    />
                    <span className="text-sm">Whatsapp</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.email}
                      onChange={(e) => setPreferredContact({...preferredContact, email: e.target.checked})}
                      className="w-4 h-4 rounded border-white/20 bg-white/10"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.call}
                      onChange={(e) => setPreferredContact({...preferredContact, call: e.target.checked})}
                      className="w-4 h-4 rounded border-white/20 bg-white/10"
                    />
                    <span className="text-sm">Call</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="pt-4">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/10"
                  />
                  <span className="text-xs text-white/80">
                    I agree with all the <span className="underline">terms</span> and <span className="underline">privacy</span> of GharBazaar.
                  </span>
                </label>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleSubmit}
                disabled={!fullName || !email || !mobile || !agreeTerms}
                className={`w-full py-3.5 rounded-lg font-bold text-base transition-all ${
                  !fullName || !email || !mobile || !agreeTerms
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#E91E63] hover:bg-[#C2185B]'
                } text-white`}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right Panel - Property Details */}
          <div className="w-full md:w-1/2 bg-white p-8">
            <div className="space-y-6">
              {/* Property Image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={property?.images?.[0] || "https://via.placeholder.com/400x250"}
                  alt={property?.title}
                  className="w-full h-56 object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {property?.title || "Property Name"}
                </h3>
                <p className="text-sm text-gray-600">
                  {property?.location || "Location"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Room Type</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {property?.propertyType || "Standard"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">12 months</p>
                </div>
              </div>

              {/* Rent */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Monthly Rent</p>
                <p className="text-2xl font-black text-gray-900">
                  ₹{property?.price?.toLocaleString("en-IN") || "10,000"}
                  <span className="text-sm font-normal text-gray-600"> / month</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
