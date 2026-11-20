import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Check, 
  Shield, 
  Zap, 
  Heart,
  TrendingUp,
  Users,
  Award,
  Lock,
  Sparkles,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { toast } from "react-toastify";

export default function PricingBenefits() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "tenant";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleContinueToDashboard = () => {
    const updatedUser = {
      ...user,
      onboardingComplete: true,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Welcome to GharBazaar! 🎉");

    if (userType === "tenant") {
      navigate("/dashboard");
    } else {
      navigate("/seller/dashboard/property");
    }
  };

  const features = userType === "tenant" 
    ? [
        { icon: Shield, title: "Verified Properties", desc: "Zero fake listings" },
        { icon: Lock, title: "Secure Payments", desc: "Escrow protection" },
        { icon: Zap, title: "Instant Booking", desc: "Move in 24 hours" },
        { icon: MessageCircle, title: "Direct Chat", desc: "No middlemen" },
        { icon: TrendingUp, title: "Price Insights", desc: "Save up to 15%" },
        { icon: Award, title: "24/7 Support", desc: "4.8★ Rating" },
      ]
    : [
        { icon: Users, title: "50K+ Reach", desc: "Active seekers" },
        { icon: Sparkles, title: "3x Visibility", desc: "Featured listings" },
        { icon: Lock, title: "Secure Payments", desc: "100% guaranteed" },
        { icon: Shield, title: "Verified Tenants", desc: "99% screened" },
        { icon: TrendingUp, title: "Smart Analytics", desc: "Real-time data" },
        { icon: MessageCircle, title: "Fast Closure", desc: "40% quicker" },
      ];

  const stats = [
    { num: "50K+", label: "Users" },
    { num: "₹50Cr+", label: "Secured" },
    { num: "95%", label: "Success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-6 h-[90vh]">
          {/* Left Side - Info */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.jpeg" alt="GharBazaar" className="h-12 w-auto rounded-lg" />
                <div>
                  <h1 className="text-2xl font-bold">GharBazaar</h1>
                  <p className="text-xs text-green-100">India's Most Trusted Platform</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
                {userType === "tenant" 
                  ? "Find Your Perfect Home 🏠"
                  : "Find Perfect Tenants 🔑"}
              </h2>
              <p className="text-green-100 text-sm mb-6">
                {userType === "tenant"
                  ? "Zero brokerage • Verified properties • Instant booking"
                  : "No commission • Verified tenants • Smart analytics"}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <Icon size={24} className="mb-2" />
                      <p className="font-bold text-sm">{feature.title}</p>
                      <p className="text-xs text-green-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <p className="text-2xl font-bold">{stat.num}</p>
                  <p className="text-xs text-green-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="bg-white rounded-3xl p-8 flex flex-col justify-between shadow-2xl border-2 border-gray-200">
            {/* Why Choose Us */}
            <div>
              <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-4">
                🏆 Why Choose Us?
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Better Than Traditional Brokers
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {userType === "tenant" ? "Zero Brokerage Fees" : "No Commission Charges"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userType === "tenant" 
                        ? "Save 1-2 months rent. Brokers charge ₹20K-₹40K, we charge ₹0"
                        : "Keep 100% of your earnings. Other platforms take 10-20% cut"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">100% Verified</p>
                    <p className="text-sm text-gray-600">
                      {userType === "tenant"
                        ? "Every property verified by our team. No fake listings"
                        : "Every tenant background checked. No payment defaults"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {userType === "tenant" ? "Book in 24 Hours" : "List in 5 Minutes"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userType === "tenant"
                        ? "Simple 3-step process. Move in same day if needed"
                        : "Upload photos, add details, go live instantly"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Payment Protection</p>
                    <p className="text-sm text-gray-600">
                      All payments held in escrow. Released only after confirmation
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200 mb-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {userType === "tenant"
                    ? '"Found my dream home in 2 days! Saved ₹40,000 on broker fees!"'
                    : '"Got 15 qualified leads in first week! Rented in 10 days!"'}
                </p>
                <p className="text-xs text-gray-600">
                  - {userType === "tenant" ? "Rahul S., Mumbai" : "Priya P., Bangalore"}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={handleContinueToDashboard}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                🎉 Get ₹500 credit on your first transaction!
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-4 text-gray-500 text-xs">
          <div className="flex items-center gap-1">
            <Shield size={14} className="text-green-600" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock size={14} className="text-green-600" />
            <span>Payment Protected</span>
          </div>
          <div className="flex items-center gap-1">
            <Check size={14} className="text-green-600" />
            <span>100% Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
