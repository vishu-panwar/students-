import { useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  MessageSquare,
  BarChart,
  FileText,
  Loader2,
  Shield,
  Handshake,
} from "lucide-react";
import axios from "axios";
import { socket } from "../socket/socket";

export default function SellerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.fullName?.trim()?.charAt(0)?.toUpperCase() || "S";

  // Mock KYC status - AUTO-VERIFY: Set to true to unlock all features
  const [isKycVerified, setIsKycVerified] = useState(true);

  const menuItems = [
    { path: "/seller/dashboard/property", icon: LayoutDashboard, label: "Dashboard", requiresKyc: false },
    { path: "/seller/dashboard/property/create-listing", icon: Building2, label: "Create Listing", requiresKyc: true },
    { path: "/seller/dashboard/property/listings", icon: Building2, label: "My Properties", requiresKyc: true },
    { path: "/seller/dashboard/property/leads", icon: Users, label: "Leads & Inquiries", requiresKyc: true },
    { path: "/seller/dashboard/property/bookings", icon: FileText, label: "Bookings", requiresKyc: true },
    { path: "/seller/dashboard/property/become-partner", icon: Handshake, label: "Become a Partner", requiresKyc: true },
    { path: "/seller/dashboard/property/payments", icon: CreditCard, label: "Payments", requiresKyc: true },
    { path: "/seller/dashboard/property/kyc-verification", icon: Shield, label: "KYC Verification", requiresKyc: false },
    { path: "/seller/dashboard/property/settings", icon: Settings, label: "Settings", requiresKyc: true },
  ];

  const isActive = (path) => {
    if (path === "/seller/dashboard/property") {
      return location.pathname === "/seller/dashboard/property";
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuClick = (e, item) => {
    if (item.requiresKyc && !isKycVerified) {
      e.preventDefault();
      // Remove the dismissed flag so popup shows again
      localStorage.removeItem('kycPopupDismissedSeller');
      // Show popup message
      alert("Please complete KYC verification to access this section. You'll see a popup on the dashboard.");
      return;
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    socket.on("updaterole", handleLogout);
    return () => {
      socket.off("updaterole", handleLogout);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      setLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-[#EDE8DF] overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-bold text-gray-900">Seller Portal</h2>

        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <User size={20} />
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-[300px] shrink-0
          bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3 text-decoration-none">
            <div className="bg-emerald-50 p-2 rounded-xl">
              <img
                src="/logo.jpeg"
                alt="GharBazaar Logo"
                className="h-8 w-auto"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-emerald-600 leading-none">
                GharBazaar
              </h3>

              <p className="text-xs text-emerald-500 mt-1">Seller Portal</p>
            </div>
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const isLocked = item.requiresKyc && !isKycVerified;

            return (
              <Link
                key={item.path}
                to={isLocked ? "#" : item.path}
                onClick={(e) => handleMenuClick(e, item)}
                className={`
                  flex items-center gap-4
                  px-4 py-3 rounded-xl
                  text-sm font-semibold
                  transition-all duration-200
                  ${
                    isLocked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                      : active
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }
                `}
                style={isLocked ? { pointerEvents: 'auto' } : {}}
              >
                <item.icon size={20} />

                <span className="flex-1">{item.label}</span>

                {isLocked && (
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
              {firstLetter}
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">
                {user?.fullName || "Seller Name"}
              </h3>

              <p className="text-xs text-gray-500">{user?.email || "seller@gharbazaar.in"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pt-[72px] lg:pt-0 bg-[#EDE8DF]">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
