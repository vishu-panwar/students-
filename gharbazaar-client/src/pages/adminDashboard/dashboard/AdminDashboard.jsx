import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  Building2,
  UserCheck,
  ListChecks,
  Bell,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Megaphone,
  FileText,
  Download,
  ShieldCheck,
  TicketCheck,
  Loader2,
  Activity,
  Home,
  KeyRound,
  ChevronDown,
  Images,
  FolderOpen,
} from "lucide-react";
import { toast } from "react-toastify";

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (n) =>
  n >= 10_000_000
    ? `₹${(n / 10_000_000).toFixed(2)} Cr`
    : n >= 100_000
    ? `₹${(n / 100_000).toFixed(0)}L`
    : n >= 1_000
    ? `₹${(n / 1_000).toFixed(1)}k`
    : `₹${n}`;

const num = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}k`
    : String(n ?? 0);

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}hr ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const STATUS_STYLE = {
  approved: "bg-[#1B4332] text-white",
  verified: "bg-[#1B4332] text-white",
  active:   "bg-blue-100 text-blue-700",
  pending:  "bg-gray-900 text-white",
  rejected: "bg-red-100 text-red-700",
  open:     "bg-gray-900 text-white",
};

// ─── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, change, iconBg, iconColor, loading }) {
  const positive = change >= 0;
  return (
    <div className="bg-[#FBF9F3] rounded-3xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {positive ? "+" : ""}{change}%
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
        {loading
          ? <div className="h-7 w-20 bg-gray-100 animate-pulse rounded mt-1.5" />
          : <p className="text-[26px] leading-tight font-bold text-[#1B2B22] mt-0.5">{value}</p>
        }
      </div>
    </div>
  );
}

// ─── Small alert card (Pending Verification / Support Tickets) ─────────────
function AlertCard({ icon: Icon, iconBg, iconColor, label, value, suffix, loading }) {
  return (
    <div className="bg-[#FBF9F3] rounded-3xl p-5 shadow-sm flex items-center gap-4">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
        {loading
          ? <div className="h-6 w-14 bg-gray-100 animate-pulse rounded mt-1" />
          : (
            <p className="text-lg font-bold text-[#1B2B22] mt-0.5">
              {value} <span className="text-sm font-medium text-gray-400">{suffix}</span>
            </p>
          )
        }
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats]         = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingStats, setLoadingStats]     = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [health, setHealth] = useState(99.8);
  const [supportTickets, setSupportTickets] = useState(12);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const BASE = import.meta.env.VITE_BASE_URL;

  // ── fetch stats ────────────────────────────────────────────────────────────
  const fetchStats = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoadingStats(true);

      const [usersRes, propertiesRes] = await Promise.allSettled([
        axios.get(`${BASE}/users`, { withCredentials: true }),
        axios.get(`${BASE}/EmployeeProperty`, { withCredentials: true }),
      ]);

      const users = usersRes.status === "fulfilled"
        ? (Array.isArray(usersRes.value.data)
            ? usersRes.value.data
            : usersRes.value.data.users ?? [])
        : [];

      const totalUsers = users.length;
      const admins     = users.filter((u) => u.role === "admin").length;
      const employees  = users.filter((u) => u.role === "employee").length;
      const clients    = users.filter((u) => u.role === "client").length;
      const owners     = users.filter((u) => u.role === "owner" || u.role === "propertyOwner").length;
      const tenants    = users.filter((u) => u.role === "tenant" || u.role === "client").length;

      const properties = propertiesRes.status === "fulfilled"
        ? (Array.isArray(propertiesRes.value.data)
            ? propertiesRes.value.data
            : propertiesRes.value.data.properties ?? propertiesRes.value.data.data ?? [])
        : [];

      const totalProperties  = properties.length;
      const activeListings   = properties.filter((p) => p.status === "approved" || p.status === "active").length;
      const pendingListings  = properties.filter((p) => p.status === "pending").length;
      const occupiedCount    = properties.filter((p) => p.availability === "occupied" || p.isOccupied).length;
      const availableCount   = totalProperties - occupiedCount;
      const occupiedPct      = totalProperties > 0 ? Math.round((occupiedCount / totalProperties) * 100) : 70;

      setStats({
        totalUsers, admins, employees, clients, owners, tenants,
        totalProperties, activeListings, pendingListings,
        occupiedCount, availableCount, occupiedPct,
      });
    } catch (err) {
      if (!silent) toast.error("Could not load dashboard stats.");
    } finally {
      setLoadingStats(false);
    }
  }, [BASE]);

  // ── fetch recent activity ─────────────────────────────────────────────────
  const fetchActivity = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoadingActivity(true);

      const res = await axios.get(`${BASE}/pendingProperty`, { withCredentials: true });
      const items = Array.isArray(res.data)
        ? res.data
        : res.data.properties ?? res.data.data ?? [];

      setActivities(
        items.slice(0, 6).map((p) => ({
          id:     p._id,
          event:  p.title ?? "Untitled Property",
          user:   p.ownerName ?? p.createdBy?.fullName ?? p.userName ?? "Owner",
          date:   p.createdAt,
          status: p.status ?? "pending",
        }))
      );
    } catch {
      setActivities([]);
    } finally {
      setLoadingActivity(false);
    }
  }, [BASE]);

  useEffect(() => {
    fetchStats();
    fetchActivity();
    const id = setInterval(() => { fetchStats(true); fetchActivity(true); }, 60_000);
    return () => clearInterval(id);
  }, [fetchStats, fetchActivity]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(true), fetchActivity(true)]);
    setRefreshing(false);
    toast.success("Dashboard refreshed");
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const statCards = [
    { icon: Users,     label: "Total Users",      value: num(stats?.totalUsers),      change: 12, iconBg: "bg-emerald-100", iconColor: "text-[#1B4332]" },
    { icon: Home,      label: "Property Owners",  value: num(stats?.owners),          change: 4,  iconBg: "bg-blue-100",    iconColor: "text-blue-600" },
    { icon: UserCheck, label: "Total Tenants",    value: num(stats?.tenants),         change: -2, iconBg: "bg-violet-100",  iconColor: "text-violet-600" },
    { icon: ListChecks,label: "Active Listings",  value: num(stats?.activeListings),  change: 21, iconBg: "bg-[#1B4332]",   iconColor: "text-white" },
  ];

  const quickActions = [
    { icon: Images,      label: "Hero Banners",       onClick: () => navigate("/admin/hero-banners") },
    { icon: Megaphone,   label: "Broadcast",          onClick: () => navigate("/admin/broadcast") },
    { icon: FileText,    label: "Invoices",           onClick: () => navigate("/admin/invoices") },
    { icon: FileText,    label: "My Documents",       onClick: () => navigate("/admin/my-documents") },
    { icon: FolderOpen,  label: "Employee Documents", onClick: () => navigate("/admin/employee-documents") },
    { icon: Download,    label: "Export Logs" },
    { icon: ShieldCheck, label: "Permissions" },
  ];

  return (
    <div className="min-h-screen bg-[#F3EFE4] font-['Inter',sans-serif]">
      {/* ── TOP BAR ── */}
      <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, {user.fullName?.split(" ")[0] ?? "Admin"}. Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search data…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 w-60 text-gray-700 shadow-sm"
            />
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-full bg-white text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
            title="Refresh"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          </button>

          <button  onClick={()=>navigate('/admin/notifications')} className="relative p-2.5 rounded-full bg-white text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button className="flex items-center gap-2 bg-[#1B4332] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#143828] transition-colors shadow-sm">
            <Plus size={15} />
            <span>New Property</span>
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-6 pb-6 space-y-5 max-w-[1400px] mx-auto">
        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c) => (
            <StatCard key={c.label} {...c} loading={loadingStats} />
          ))}
        </div>

        {/* ── ROW 2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Property Status */}
          <div className="bg-[#FBF9F3] rounded-3xl p-5 shadow-sm">
            <h3 className="font-bold text-[#1B2B22] mb-4">Property Status</h3>
            {loadingStats ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 size={24} className="animate-spin text-[#1B4332]" />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EDE9DD" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1B4332" strokeWidth="3.5"
                      strokeDasharray={`${stats?.occupiedPct ?? 70} ${100 - (stats?.occupiedPct ?? 70)}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-[#1B2B22]">{stats?.occupiedPct ?? 70}%</span>
                    <span className="text-[8px] text-gray-400 font-semibold tracking-wide">OCCUPIED</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1B2B22]">Occupied</p>
                      <p className="text-xs text-gray-400">({num(stats?.occupiedCount ?? 0)})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D8D3C2] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1B2B22]">Available</p>
                      <p className="text-xs text-gray-400">({num(stats?.availableCount ?? 0)})</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Revenue Card */}
          <div className="bg-[#FBF9F3] rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1B2B22]">Revenue</h3>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#1B4332]">
                Gross <ChevronDown size={13} />
              </span>
            </div>
            <div className="space-y-4">
              {[
                { label: "Today",         value: "₹45,200",     pct: 30 },
                { label: "This Month",    value: "₹12,40,000",  pct: 65 },
                { label: "Year to Date",  value: "₹1.48 Cr",    pct: 90 },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-500">{r.label}</span>
                    <span className="text-sm font-bold text-[#1B2B22]">{r.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#EDE9DD] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B4332] rounded-full transition-all duration-700"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert cards */}
          <div className="space-y-4 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-4 lg:space-y-0">
            <AlertCard
              icon={AlertCircle}
              iconBg="bg-orange-100"
              iconColor="text-orange-500"
              label="Pending Verification"
              value={loadingStats ? "" : num(stats?.pendingListings ?? 0)}
              suffix="requests"
              loading={loadingStats}
            />
            <AlertCard
              icon={TicketCheck}
              iconBg="bg-red-100"
              iconColor="text-red-500"
              label="Coupon Management"
              value={supportTickets}
              suffix="open"
              loading={false}
            />
          </div>
        </div>

        {/* ── ROW 3 — Recent Activity + Quick Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-[#FBF9F3] rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
              <h3 className="font-bold text-[#1B2B22]">Recent Activities</h3>
              <button className="text-sm font-semibold text-[#1B4332] hover:underline">View All</button>
            </div>

            {loadingActivity ? (
              <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
                <Loader2 size={20} className="animate-spin text-[#1B4332]" />
                <span className="text-sm">Loading activity…</span>
              </div>
            ) : activities.length === 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EFEBDD] border-y border-[#E5E1D4]">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Event</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">User</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEBDD]">
                    {[
                      { icon: Building2,    color: "text-[#1B4332]", event: "New Listing: Green Valley", user: "Rakesh Kumar",  date: "2 mins ago",  status: "approved" },
                      { icon: AlertCircle,  color: "text-red-400",   event: "Refund Request #2041",      user: "Sneha Singh",   date: "15 mins ago", status: "pending" },
                      { icon: KeyRound,     color: "text-blue-400",  event: "New Landlord Signed Up",    user: "Priya Sharma",  date: "45 mins ago", status: "active" },
                      { icon: CheckCircle2, color: "text-[#1B4332]", event: "Document Verified",         user: "Amit Verma",    date: "1 hour ago",  status: "verified" },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <tr key={i} className="hover:bg-[#EFEBDD]/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Icon size={15} className={row.color} />
                              <span className="font-medium text-[#1B2B22]">{row.event}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{row.user}</td>
                          <td className="px-6 py-4 text-gray-400 text-xs hidden md:table-cell">{row.date}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${STATUS_STYLE[row.status] ?? "bg-gray-100 text-gray-600"}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EFEBDD] border-y border-[#E5E1D4]">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Event</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">User</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEBDD]">
                    {activities.map((row) => (
                      <tr key={row.id} className="hover:bg-[#EFEBDD]/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Clock size={14} className="text-gray-300 shrink-0" />
                            <span className="font-medium text-[#1B2B22]">{row.event}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{row.user}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs hidden md:table-cell">{timeAgo(row.date)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${STATUS_STYLE[row.status?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[#E5E1D4] bg-[#EFEBDD]/50">
              <p className="text-xs text-gray-400">© 2026 GharBazaar Admin Panel. All systems operational. &nbsp;·&nbsp; <a href="#" className="hover:text-gray-600">Privacy Policy</a> &nbsp;·&nbsp; <a href="#" className="hover:text-gray-600">Terms of Service</a> &nbsp;·&nbsp; <a href="#" className="hover:text-gray-600">Help Center</a></p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1B4332] rounded-3xl p-5 text-white flex flex-col">
            <h3 className="font-bold mb-4 text-sm">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {quickActions.map(({ icon: Icon, label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 rounded-2xl py-4 px-2 transition-colors"
                >
                  <Icon size={18} className="text-white" />
                  <span className="text-xs font-medium text-white/90">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">System Health</span>
                <span className="text-sm font-black text-white">{health}%</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${health}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}