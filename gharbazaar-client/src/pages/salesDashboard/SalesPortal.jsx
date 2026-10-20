import { useState, useEffect } from "react";
import { 
  LayoutDashboard,
  PhoneIncoming,
  PhoneOutgoing,
  TrendingUp,
  Target,
  Tag,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Home,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import InboundCalls from "./sections/InboundCalls";
import OutboundCalls from "./sections/OutboundCalls";
import SalesTracking from "./sections/SalesTracking";
import TargetsGoals from "./sections/TargetsGoals";
import DiscountManagement from "./sections/DiscountManagement";
import LeadManagement from "./sections/LeadManagement";
import VisitSchedule from "./sections/VisitSchedule";
import Reports from "./sections/Reports";
import Settings from "./sections/Settings";

export default function SalesPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [salesPerson, setSalesPerson] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const salesData = localStorage.getItem("salesUser");
    if (salesData) {
      setSalesPerson(JSON.parse(salesData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === "sales@gharbazaar.com" && loginData.password === "sales123") {
      const salesUser = {
        name: "Vishu Panwar",
        email: loginData.email,
        role: "Sales Executive",
        employeeId: "GBS001"
      };
      localStorage.setItem("salesUser", JSON.stringify(salesUser));
      setSalesPerson(salesUser);
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials! Use: sales@gharbazaar.com / sales123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("salesUser");
    setSalesPerson(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", color: "emerald" },
    { id: "inbound", icon: PhoneIncoming, label: "Inbound Calls", color: "blue" },
    { id: "outbound", icon: PhoneOutgoing, label: "Outbound Calls", color: "purple" },
    { id: "sales", icon: TrendingUp, label: "Sales Tracking", color: "green" },
    { id: "targets", icon: Target, label: "Targets & Goals", color: "orange" },
    { id: "discounts", icon: Tag, label: "Discount Management", color: "red" },
    { id: "leads", icon: Users, label: "Lead Management", color: "indigo" },
    { id: "schedule", icon: Calendar, label: "Visit Schedule", color: "pink" },
    { id: "reports", icon: FileText, label: "Reports", color: "cyan" },
    { id: "settings", icon: Settings, label: "Settings", color: "gray" }
  ];

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl mb-4 shadow-xl">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales Portal</h1>
            <p className="text-gray-600">Professional Dashboard Access</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="sales@gharbazaar.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Enter password"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none pr-12 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-xs font-bold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-800">📧 sales@gharbazaar.com</p>
              <p className="text-xs text-blue-800">🔐 sales123</p>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-gray-600 hover:text-emerald-600 inline-flex items-center gap-2 font-medium">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Content Component
  const DashboardContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      <p className="text-gray-600 mb-8">Welcome back, {salesPerson?.name}. Here's what's happening today.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL LEADS</p>
          <p className="text-3xl font-bold text-gray-900">45</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-200 px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">CONVERTED</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-200 px-2 py-1 rounded-full">+21%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">REVENUE</p>
          <p className="text-3xl font-bold text-gray-900">₹1.85L</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-200 px-2 py-1 rounded-full">8 pending</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">FOLLOW-UPS</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 rounded-xl text-center">
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">New Lead</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 rounded-xl text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">Schedule Visit</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 rounded-xl text-center">
            <Tag className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">Apply Discount</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 rounded-xl text-center">
            <FileText className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">Generate Report</span>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { type: "call", user: "Rakesh Kumar", action: "New Listing: Green Valley", time: "2 mins ago", status: "APPROVED", color: "emerald" },
            { type: "refund", user: "Sneha Singh", action: "Refund Request #2041", time: "15 mins ago", status: "PENDING", color: "orange" },
            { type: "landlord", user: "Priya Sharma", action: "New Landlord Signed Up", time: "45 mins ago", status: "ACTIVE", color: "blue" }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                  <FileText className={`w-5 h-5 text-${activity.color}-600`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${activity.color}-100 text-${activity.color}-700`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Section Renderer
  const renderSection = () => {
    switch(activeSection) {
      case "dashboard": return <DashboardContent />;
      case "inbound": return <InboundCalls />;
      case "outbound": return <OutboundCalls />;
      case "sales": return <SalesTracking />;
      case "targets": return <TargetsGoals />;
      case "discounts": return <DiscountManagement />;
      case "leads": return <LeadManagement />;
      case "schedule": return <VisitSchedule />;
      case "reports": return <Reports />;
      case "settings": return <Settings />;
      default: return <DashboardContent />;
    }
  };

  // Main Dashboard Layout
  return (
    <div className="flex h-screen bg-[#F5F1E8] overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-gray-200 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">GharBazaar</h1>
                <p className="text-xs text-gray-600">Sales Control</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t-2 border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">{salesPerson?.name?.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{salesPerson?.name}</p>
                <p className="text-xs text-gray-600 truncate">{salesPerson?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b-2 border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search data..."
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                + New Property
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
