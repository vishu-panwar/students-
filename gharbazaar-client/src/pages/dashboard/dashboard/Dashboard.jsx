import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetBookmarkQuery } from "../../../store/propertyQuery/getPropertyQuery";
import { useCheckkycQuery } from "../../../store/kyc/kycQuery";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showKycPopup, setShowKycPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user?.name || user?.fullName || user?.username || user?.firstName || "User";

  const { data: bookmarkData, isLoading: isBookmarksLoading } = useGetBookmarkQuery();
  const bookmarks = bookmarkData?.data || [];

  const { data: kycData } = useCheckkycQuery();
  const kycStatus = kycData?.status;

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Show KYC popup on every page load/refresh if not verified and not dismissed
  useEffect(() => {
    const popupDismissed = localStorage.getItem('kycPopupDismissed');
    
    if (kycStatus && kycStatus !== "Verified" && !popupDismissed) {
      // Show popup after 1 second delay
      const timer = setTimeout(() => setShowKycPopup(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [kycStatus]);

  const handleDismissPopup = () => {
    // Mark popup as dismissed in localStorage
    localStorage.setItem('kycPopupDismissed', 'true');
    setShowKycPopup(false);
  };

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    { label: "Cart Items", value: 5, icon: "shopping_cart", to: "/dashboard/cart", color: "#004c22" },
    { label: "Saved Properties", value: bookmarks.length, icon: "favorite", to: "/dashboard/favorites", color: "#dc3545" },
    { label: "My Bookings", value: 3, icon: "event_note", to: "/dashboard/my-bookings", color: "#f59e0b" },
    { label: "Documents", value: 12, icon: "description", to: "/dashboard/documents", color: "#3b82f6" },
  ];

  const recentActivities = [
    { action: "Added to Cart", item: "UltraTech Cement - 50 Kg", time: "10 mins ago", icon: "shopping_cart" },
    { action: "Saved Property", item: "2BHK Apartment in Andheri", time: "2 hours ago", icon: "favorite" },
    { action: "Payment Completed", item: "Monthly Rent - ₹25,000", time: "1 day ago", icon: "payments" },
    { action: "Document Uploaded", item: "Rental Agreement.pdf", time: "2 days ago", icon: "upload_file" },
  ];

  const quickActions = [
    { label: "Browse Properties", icon: "home", to: "/properties" },
    { label: "Shop Materials", icon: "store", to: "/marketplace" },
    { label: "My Orders", icon: "local_shipping", to: "/dashboard/my-bookings" },
    { label: "Payments", icon: "account_balance_wallet", to: "/dashboard/payments" },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="max-w-[1200px] mx-auto p-6">
        
        {/* Greeting Banner */}
        <div className="bg-white rounded-xl border border-[#dee2e6] p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-[14px] text-[#6c757d]">Welcome back to your GharBazaar dashboard</p>
            
            <div className="flex gap-3 mt-4">
              <Link to="/properties" className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium hover:bg-[#003818] transition-colors">
                Browse Properties
              </Link>
              <Link to="/dashboard/favorites" className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[13px] font-medium hover:bg-[#f8f9fa] transition-colors">
                View Saved ({bookmarks.length})
              </Link>
            </div>
          </div>

          {/* KYC Status */}
          <div className="bg-[#fff8f5] rounded-lg border border-[#f6ece6] p-4 w-[280px]">
            {kycStatus === "Verified" ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[20px] text-[#28a745]">verified</span>
                  <span className="text-[14px] font-bold text-[#1a1a1a]">KYC Verified ✓</span>
                </div>
                <p className="text-[12px] text-[#6c757d]">Your account is fully verified</p>
              </div>
            ) : (
              <div>
                <div className="text-[14px] font-bold text-[#1a1a1a] mb-2">Complete KYC</div>
                <p className="text-[12px] text-[#6c757d] mb-3">Unlock all GharBazaar features</p>
                <Link to="/dashboard/kyc-verification" className="inline-block px-4 py-2 bg-[#004c22] text-white rounded-lg text-[12px] font-medium hover:bg-[#003818] transition-colors">
                  Complete Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map(stat => (
            <Link key={stat.label} to={stat.to} className="bg-white rounded-xl border border-[#dee2e6] p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wide">{stat.label}</span>
                <span className="material-symbols-outlined text-[20px]" style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="text-[28px] font-bold text-[#1a1a1a]">{stat.value}</div>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          
          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-[#dee2e6] p-6">
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Recent Activities</h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="bg-[#fff8f5] rounded-lg p-4 flex items-start gap-3 border border-[#f6ece6]">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                    <span className="material-symbols-outlined text-[20px] text-[#004c22]">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[14px] text-[#1a1a1a] mb-1">{activity.action}</div>
                    <div className="text-[12px] text-[#6c757d] mb-1">{activity.item}</div>
                    <div className="text-[11px] text-[#6c757d]">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Properties */}
          <div className="bg-white rounded-xl border border-[#dee2e6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-[#1a1a1a]">Saved Properties</h3>
              <Link to="/dashboard/favorites" className="text-[13px] text-[#004c22] font-medium hover:underline">
                View All
              </Link>
            </div>

            {isBookmarksLoading ? (
              <div className="text-center py-8 text-[#6c757d]">Loading...</div>
            ) : bookmarks.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[48px] text-[#6c757d] mb-2 inline-block">favorite_border</span>
                <p className="text-[14px] text-[#6c757d]">No saved properties yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.slice(0, 3).map(property => (
                  <div key={property._id} className="bg-[#fff8f5] rounded-lg p-3 flex gap-3 border border-[#f6ece6] hover:border-[#004c22] transition-colors">
                    <img 
                      src={property.images?.[0]} 
                      alt={property.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[14px] text-[#1a1a1a] mb-1 truncate">{property.title}</div>
                      <div className="flex items-center gap-1 text-[12px] text-[#6c757d] mb-2">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {property.city || "Mumbai"}
                      </div>
                      <div className="text-[14px] font-bold text-[#004c22]">₹{property.price?.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#dee2e6] p-6">
          <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map(action => (
              <Link 
                key={action.label} 
                to={action.to}
                className="bg-[#fff8f5] rounded-xl p-5 flex flex-col items-center justify-center gap-3 border border-[#f6ece6] hover:border-[#004c22] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#dee2e6]">
                  <span className="material-symbols-outlined text-[24px] text-[#004c22]">{action.icon}</span>
                </div>
                <span className="text-[13px] font-bold text-[#1a1a1a] text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* KYC Completion Popup */}
      {showKycPopup && kycStatus !== "Verified" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-[500px] w-full p-8 relative shadow-2xl animate-scaleIn">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowKycPopup(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[24px] text-[#6c757d]">close</span>
            </button>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#004c22] to-[#003818] rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="material-symbols-outlined text-[48px] text-white">verified_user</span>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-3">
                Complete Your KYC
              </h2>
              <p className="text-[15px] text-[#6c757d] leading-relaxed">
                Please complete your KYC verification first to unlock the full GharBazaar experience and access all features including:
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {[
                { icon: "shopping_cart", text: "Shop Construction Materials" },
                { icon: "event_note", text: "Book Properties & Schedule Visits" },
                { icon: "payments", text: "Secure Rent Payments" },
                { icon: "description", text: "Upload & Manage Documents" },
                { icon: "favorite", text: "Save & Compare Properties" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#fff8f5] rounded-lg p-3 border border-[#f6ece6]">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                    <span className="material-symbols-outlined text-[18px] text-[#004c22]">{feature.icon}</span>
                  </div>
                  <span className="text-[14px] text-[#495057] font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleDismissPopup}
                className="flex-1 px-5 py-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-xl text-[#495057] text-[15px] font-semibold hover:bg-[#e9ecef] transition-colors flex items-center justify-center gap-2"
              >
                <span>OK, Got it</span>
              </button>
              <Link 
                to="/dashboard/kyc-verification"
                onClick={() => setShowKycPopup(false)}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-[#004c22] to-[#003818] text-white rounded-xl text-[15px] font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Complete KYC</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>

            {/* Security Note */}
            <div className="mt-4 flex items-start gap-2 bg-[#e8f5e9] rounded-lg p-3">
              <span className="material-symbols-outlined text-[18px] text-[#28a745]">shield</span>
              <p className="text-[11px] text-[#495057] leading-relaxed">
                Your information is encrypted and secure. KYC verification takes only 2-3 minutes.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

<style>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }

  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out;
  }
`}</style>