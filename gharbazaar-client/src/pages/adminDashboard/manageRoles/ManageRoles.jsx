import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Shield,
  UserCheck,
  Users,
  ChevronDown,
  Loader2,
  Trash2,
  AlertTriangle,
  Download,
  UserPlus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  Building2,
  Ban,
  X,
  UserCog,
} from "lucide-react";
import { toast } from "react-toastify";

// ── Role config ──────────────────────────────────────────────────────────────
const ROLES = ["admin", "manager", "client", "review", "property", "ban"];

const TAB_META = {
  all:       { label: "All Users",         icon: Users },
  client:    { label: "Customers",         icon: Users },
  property: { label: "Property Owners",   icon: Home },
  manager:  { label: "Employees",         icon: Briefcase },
  review:    { label: "Partners",          icon: Building2 },
  ban:       { label: "Service Providers", icon: Ban },
  admin:    { label: "Admins",             icon: Shield },
};

const TAB_ORDER = ["all", "client", "property", "manager", "review", "ban", "admin"];

const ROLE_PILL = {
  admin:    "bg-[#1B4332] text-white",
  manager:  "bg-blue-50 text-blue-600",
  client:   "bg-gray-100 text-gray-600",
  review:   "bg-violet-50 text-violet-600",
  property: "bg-amber-50 text-amber-700",
  ban:      "bg-rose-50 text-rose-600",
};

const ROLE_LABEL = {
  admin: "Admin",
  manager: "Manager",
  client: "Customer",
  review: "Examiner",
  property: "Property manager",
  ban: "Account Suspend",
};

const STATUS_META = {
  active:    { label: "Active",    dot: "bg-emerald-500", text: "text-emerald-700" },
  pending:   { label: "Pending",   dot: "bg-gray-400",    text: "text-gray-500" },
  suspended: { label: "Suspended", dot: "bg-red-500",     text: "text-red-600" },
};

function deriveStatus(user) {
  if (user.banned || user.role === "ban") return "suspended";
  if (user.verified === false) return "pending";
  return "active";
}

const AVATAR_BG = ["#1B4332", "#2563EB", "#7C3AED", "#D97706", "#DC2626", "#0891B2"];
function avatarColor(name = "") {
  return AVATAR_BG[(name.charCodeAt(0) || 0) % AVATAR_BG.length];
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "2-digit", year: "numeric",
  });
}

const PAGE_LIMIT = 5;
const SEARCH_DEBOUNCE_MS = 400;

// ── Confirm Modal (Click Outside to Close Enabled) ──────────────────────────
function ConfirmModal({ isOpen, title, message, confirmLabel, onConfirm, onCancel, danger }) {
  if (!isOpen) return null;
  return (
    <div 
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${danger ? "bg-red-100" : "bg-[#D1FAE5]"}`}>
          <AlertTriangle size={22} className={danger ? "text-red-600" : "text-[#1B4332]"} />
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
        </div>
        <div className="flex gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[#1B4332] hover:bg-[#143828]"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Role Selector Modal (Click Outside to Close Enabled) ─────────────────────
function RoleSelectorModal({ isOpen, targetUser, onRoleChange, onClose }) {
  if (!isOpen || !targetUser) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">Select System Role</h3>
            <p className="text-xs text-gray-400 truncate">{targetUser.fullName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
            <X size={16} />
          </button>
        </div>
        <div className="p-2 space-y-0.5">
          {ROLES.map((r) => {
            const isCurrent = r === targetUser.role;
            return (
              <button
                key={r}
                onClick={() => {
                  if (!isCurrent) onRoleChange(targetUser._id, r);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                  isCurrent ? "bg-[#FAF8F2] cursor-default" : "hover:bg-gray-50"
                }`}
              >
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_PILL[r]}`}>
                  {ROLE_LABEL[r]}
                </span>
                {isCurrent && <span className="text-[10px] font-medium text-[#1B4332] bg-[#D1FAE5] px-2 py-0.5 rounded-full">Current</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Layout Page ──────────────────────────────────────────────────────────
export default function ManageRoles() {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [roleModalTarget, setRoleModalTarget] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected] = useState(new Set());

  const BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [search]);

  const fetchUsers = useCallback(async (pageToFetch) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE}/users`, {
        params: {
          page: pageToFetch,
          limit: PAGE_LIMIT,
          search: debouncedSearch || undefined,
          role: roleFilter !== "all" ? roleFilter : undefined,
        },
        withCredentials: true,
      });

      const fetchedUsers = data.users ?? (Array.isArray(data) ? data : []);
      setUsers(fetchedUsers);
      setPage(pageToFetch);

      const total = typeof data.total === "number" ? data.total : fetchedUsers.length;
      setTotalUsers(total);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_LIMIT)));

      if (data.counts) setCounts(data.counts);
    } catch (err) {
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [BASE, debouncedSearch, roleFilter]);

  useEffect(() => {
    fetchUsers(1);
    setSelected(new Set());
  }, [debouncedSearch, roleFilter, fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdating(userId);
      await axios.put(`${BASE}/users/${userId}/role`, { role: newRole }, { withCredentials: true });

      const prevRole = users.find((u) => u._id === userId)?.role;
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));

      if (prevRole && prevRole !== newRole) {
        setCounts((prev) => ({
          ...prev,
          [prevRole]: Math.max((prev[prevRole] ?? 1) - 1, 0),
          [newRole]: (prev[newRole] ?? 0) + 1,
        }));
      }
      toast.success(`Role updated to "${ROLE_LABEL[newRole]}"`);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to update role.");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(deleteTarget.id);
      await axios.delete(`${BASE}/users/${deleteTarget.id}`, { withCredentials: true });

      const deletedRole = users.find((u) => u._id === deleteTarget.id)?.role;
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget.id));
      setTotalUsers((prev) => Math.max(prev - 1, 0));
      if (deletedRole) {
        setCounts((prev) => ({ ...prev, [deletedRole]: Math.max((prev[deletedRole] ?? 1) - 1, 0) }));
      }
      toast.success("User deleted successfully.");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to delete user.");
    } finally {
      setDeleting(null);
      setDeleteTarget(null);
    }
  };

  const handleExportCSV = () => {
    const header = ["Name", "Email", "Role", "Status", "Joined"];
    const rows = users.map((u) => [
      u.fullName, u.email, ROLE_LABEL[u.role] ?? u.role, deriveStatus(u), formatDate(u.createdAt),
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selected.size === users.length) setSelected(new Set());
    else setSelected(new Set(users.map((u) => u._id)));
  };

  const toggleSelectOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  const totalGrowthPct = 12;
  const verifiedOwners = counts.property ?? 0;
  const pendingApproval = users.filter((u) => deriveStatus(u) === "pending").length || counts.pending || 0;
  const suspendedAccounts = counts.ban ?? 0;

  return (
    <div className="min-h-screen bg-[#F3EFE4] font-['Inter',sans-serif] flex justify-center">
      <div className="w-full max-w-[1280px] px-6 py-8 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-[#1B4332] tracking-tight">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Oversee and manage account access for all platform participants.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-700 text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Download size={15} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4332] text-white text-sm font-semibold shadow-sm hover:bg-[#143828] transition-colors">
              <UserPlus size={15} />
              Add New User
            </button>
          </div>
        </div>

        {/* ── Core Table Wrapper ── */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          {/* Search filters row */}
          <div className="px-6 pt-6 pb-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#F7F5EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 text-gray-700"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#F7F5EF] text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Status: All
                <ChevronDown size={13} />
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#F7F5EF] text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Joined: Any time
                <ChevronDown size={13} />
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#F7F5EF] text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                <SlidersHorizontal size={13} />
                More Filters
              </button>
              {(search || roleFilter !== "all") && (
                <button
                  onClick={() => { setSearch(""); setRoleFilter("all"); }}
                  className="text-sm font-semibold text-[#1B4332] hover:underline px-2"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Role filter Tabs */}
          <div className="px-6 flex items-center gap-1 overflow-x-auto border-b border-gray-100">
            {TAB_ORDER.map((key) => {
              const isActive = roleFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setRoleFilter(key)}
                  className={`relative flex items-center gap-1.5 px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive ? "text-[#1B4332]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {TAB_META[key].label}
                  {key === "all" && (
                    <span className="text-[10px] font-bold bg-[#1B4332] text-white px-1.5 py-0.5 rounded-full">
                      {totalUsers}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#1B4332] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* User Grid Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
              <Loader2 size={28} className="animate-spin text-[#1B4332]" />
              <p className="text-sm font-medium">Loading users…</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
              <Users size={36} className="text-gray-200" />
              <p className="text-sm font-medium">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-gray-100 bg-[#FAF8F2]">
                    <th className="w-12 px-6 py-3">
                      <input
                        type="checkbox"
                        checked={selected.size === users.length && users.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 accent-[#1B4332]"
                      />
                    </th>
                    <th className="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Name</th>
                    <th className="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Role</th>
                    <th className="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Status</th>
                    <th className="text-left px-3 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Joined Date</th>
                    <th className="text-right px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => {
                    const letter = user.fullName?.trim().charAt(0).toUpperCase() || "?";
                    const isSelf = user.email === loggedInUser.email;
                    const isUpdating = updating === user._id;
                    const isDeleting = deleting === user._id;
                    const status = deriveStatus(user);
                    const sMeta = STATUS_META[status];

                    return (
                      <tr key={user._id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                        <td className="px-6 py-3.5">
                          <input
                            type="checkbox"
                            checked={selected.has(user._id)}
                            onChange={() => toggleSelectOne(user._id)}
                            className="w-4 h-4 rounded border-gray-300 accent-[#1B4332]"
                          />
                        </td>

                        {/* User Identity Column */}
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.fullName} className="w-9 h-9 rounded-full object-cover shrink-0" />
                            ) : (
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                                style={{ backgroundColor: avatarColor(user.fullName) }}
                              >
                                {letter}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-[#1B2B22] leading-tight truncate">
                                {user.fullName}
                                {isSelf && (
                                  <span className="ml-2 text-[10px] font-medium bg-[#D1FAE5] text-[#1B4332] px-1.5 py-0.5 rounded-full">You</span>
                                )}
                              </p>
                              <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Static Role Status Pill Column */}
                        <td className="px-3 py-3.5">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_PILL[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                            {ROLE_LABEL[user.role] ?? user.role}
                          </span>
                        </td>

                        {/* Account Integrity Status */}
                        <td className="px-3 py-3.5">
                          <span className={`flex items-center gap-1.5 text-xs font-medium ${sMeta.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sMeta.dot}`} />
                            {sMeta.label}
                          </span>
                        </td>

                        {/* Timestamp Data */}
                        <td className="px-3 py-3.5 text-gray-500">{formatDate(user.createdAt)}</td>

                        {/* Clean Production Actions Column */}
                        <td className="px-6 py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              disabled={isSelf || isUpdating}
                              onClick={() => setRoleModalTarget(user)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {isUpdating ? (
                                <Loader2 size={12} className="animate-spin text-[#1B4332]" />
                              ) : (
                                <UserCog size={12} className="text-gray-500" />
                              )}
                              Change Role
                            </button>

                            <button
                              disabled={isSelf || isDeleting}
                              onClick={() => setDeleteTarget({ id: user._id, name: user.fullName })}
                              title={isSelf ? "You cannot delete yourself" : "Delete user"}
                              className="p-1.5 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && users.length > 0 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                Showing <span className="font-semibold text-gray-600">{(page - 1) * PAGE_LIMIT + 1}-{(page - 1) * PAGE_LIMIT + users.length}</span> of <span className="font-semibold text-gray-600">{totalUsers.toLocaleString()}</span> users
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => page > 1 && fetchUsers(page - 1)}
                  disabled={page <= 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchUsers(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      p === page ? "bg-[#1B4332] text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 3 && <span className="text-gray-300 px-1">…</span>}
                {totalPages > 3 && (
                  <button
                    onClick={() => fetchUsers(totalPages)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      totalPages === page ? "bg-[#1B4332] text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  onClick={() => page < totalPages && fetchUsers(page + 1)}
                  disabled={page >= totalPages}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Metric Footnotes ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FBF9F3] rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                <Users size={16} className="text-[#1B4332]" />
              </div>
              <span className="text-xs font-bold text-emerald-600">+{totalGrowthPct}%</span>
            </div>
            <p className="text-2xl font-black text-[#1B2B22] mt-3">{totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Total Growth</p>
          </div>

          <div className="bg-[#FBF9F3] rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <UserCheck size={16} className="text-blue-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600">+5.4%</span>
            </div>
            <p className="text-2xl font-black text-[#1B2B22] mt-3">{verifiedOwners.toLocaleString()}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Verified Owners</p>
          </div>

          <div className="bg-[#FBF9F3] rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Shield size={16} className="text-amber-600" />
              </div>
              <span className="text-xs font-bold text-red-500">-2.1%</span>
            </div>
            <p className="text-2xl font-black text-[#1B2B22] mt-3">{pendingApproval}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Pending Approval</p>
          </div>

          <div className="bg-[#FBF9F3] rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <Ban size={16} className="text-red-500" />
              </div>
              <span className="text-xs font-bold text-gray-400">Steady</span>
            </div>
            <p className="text-2xl font-black text-[#1B2B22] mt-3">{suspendedAccounts}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Suspended Accounts</p>
          </div>
        </div>
      </div>

      {/* ── Application Layer Dynamic Modals ── */}
      <RoleSelectorModal
        isOpen={!!roleModalTarget}
        targetUser={roleModalTarget}
        onRoleChange={handleRoleChange}
        onClose={() => setRoleModalTarget(null)}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        danger
        title="Delete this user?"
        message={`"${deleteTarget?.name}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}