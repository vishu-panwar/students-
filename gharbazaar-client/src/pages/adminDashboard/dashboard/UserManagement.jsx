import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  Trash2,
  Ban,
  CheckCircle,
  Loader2,
  Users,
  UserCheck,
  UserX,
  Shield,
  ChevronDown,
  X,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "react-toastify";

const BASE = import.meta.env.VITE_BASE_URL;
const PAGE_SIZE = 50;

// ── Role badge ────────────────────────────────────────────────────────────────
const ROLE_STYLE = {
  admin:    "bg-purple-100 text-purple-700",
  employee: "bg-blue-100  text-blue-700",
  client:   "bg-gray-100  text-gray-600",
};

function RoleBadge({ role }) {
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${ROLE_STYLE[role] ?? "bg-gray-100 text-gray-500"}`}>
      {role}
    </span>
  );
}

// ── Confirm modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ open, title, message, confirmLabel, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${danger ? "bg-red-100" : "bg-amber-100"}`}>
          <AlertTriangle size={22} className={danger ? "text-red-500" : "text-amber-500"} />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${danger ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User detail drawer ────────────────────────────────────────────────────────
function UserDrawer({ user, onClose, onDisable, onDelete, actionLoading }) {
  if (!user) return null;
  const disabled = user.isDisabled || user.status === "disabled";
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">User Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="p-6 flex flex-col items-center gap-3 border-b border-gray-100">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg ${disabled ? "bg-gray-400" : "bg-[#1B4332]"}`}>
            {user.fullName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="text-center">
            <h4 className="font-bold text-gray-900 text-lg">{user.fullName}</h4>
            <RoleBadge role={user.role} />
            {disabled && (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                <Ban size={11} /> Account Disabled
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-4 flex-1">
          {[
            { icon: Mail,     label: "Email",  value: user.email },
            { icon: Phone,    label: "Phone",  value: user.phone || "—" },
            { icon: Calendar, label: "Joined", value: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—" },
            { icon: Shield,   label: "KYC",    value: user.kycStatus ?? user.kyc ?? "Not submitted" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-gray-100 space-y-2">
          <button
            onClick={() => onDisable(user)}
            disabled={!!actionLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
              disabled
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            {actionLoading === `disable-${user._id}` ? (
              <Loader2 size={15} className="animate-spin" />
            ) : disabled ? (
              <><CheckCircle size={15} /> Enable Account</>
            ) : (
              <><Ban size={15} /> Disable Account</>
            )}
          </button>
          <button
            onClick={() => onDelete(user)}
            disabled={!!actionLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {actionLoading === `delete-${user._id}` ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <><Trash2 size={15} /> Delete User</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function UsersManagement() {
  const [allUsers, setAllUsers]     = useState([]);     // full list from API
  const [displayed, setDisplayed]   = useState([]);     // paginated slice
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(false);

  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | disabled

  const [selectedUser, setSelectedUser] = useState(null);  // drawer
  const [confirmModal, setConfirmModal] = useState(null);  // { type, user }

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const loaderRef = useRef(null);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const { data } = await axios.get(`${BASE}/users`, { withCredentials: true });
      const users = Array.isArray(data) ? data : (data.users ?? []);
      setAllUsers(users);
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── filter + paginate ──────────────────────────────────────────────────────
  const filtered = allUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      u.fullName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const isDisabled = u.isDisabled || u.status === "disabled";
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active"   && !isDisabled) ||
      (statusFilter === "disabled" &&  isDisabled);
    return matchSearch && matchRole && matchStatus;
  });

  useEffect(() => {
    setPage(1);
    setDisplayed(filtered.slice(0, PAGE_SIZE));
    setHasMore(filtered.length > PAGE_SIZE);
  }, [allUsers, search, roleFilter, statusFilter]);

  // ── infinite scroll observer ───────────────────────────────────────────────
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          const nextSlice = filtered.slice(0, nextPage * PAGE_SIZE);
          setDisplayed(nextSlice);
          setPage(nextPage);
          setHasMore(filtered.length > nextPage * PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, page, filtered]);

  // ── disable / enable ──────────────────────────────────────────────────────
  const handleDisable = async (user) => {
    const isDisabled = user.isDisabled || user.status === "disabled";
    const action = isDisabled ? "enable" : "disable";
    setConfirmModal({ type: action, user });
  };

  const confirmDisable = async () => {
    const { user } = confirmModal;
    const isDisabled = user.isDisabled || user.status === "disabled";
    const key = `disable-${user._id}`;
    setConfirmModal(null);
    setActionLoading(key);
    try {
      // PUT /users/:id/role repurposed — or use a dedicated disable endpoint if you have one
      await axios.put(
        `${BASE}/users/${user._id}/status`,
        { isDisabled: !isDisabled },
        { withCredentials: true }
      );
      setAllUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isDisabled: !isDisabled, status: !isDisabled ? "disabled" : "active" } : u
        )
      );
      if (selectedUser?._id === user._id) {
        setSelectedUser((u) => ({ ...u, isDisabled: !isDisabled, status: !isDisabled ? "disabled" : "active" }));
      }
      toast.success(`User ${!isDisabled ? "disabled" : "enabled"} successfully.`);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to update user status.");
    } finally {
      setActionLoading(null);
    }
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const handleDelete = (user) => setConfirmModal({ type: "delete", user });

  const confirmDelete = async () => {
    const { user } = confirmModal;
    setConfirmModal(null);
    setActionLoading(`delete-${user._id}`);
    try {
      await axios.delete(`${BASE}/users/${user._id}`, { withCredentials: true });
      setAllUsers((prev) => prev.filter((u) => u._id !== user._id));
      if (selectedUser?._id === user._id) setSelectedUser(null);
      toast.success("User deleted.");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to delete user.");
    } finally {
      setActionLoading(null);
    }
  };

  // ── stats ──────────────────────────────────────────────────────────────────
  const totalDisabled = allUsers.filter((u) => u.isDisabled || u.status === "disabled").length;
  const totalActive   = allUsers.length - totalDisabled;

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-['Inter',sans-serif]">
      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4 sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">Manage platform users — enable, disable, or remove accounts.</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); fetchUsers(true); }}
          disabled={refreshing || loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Users,     label: "Total Users",    value: allUsers.length,  bg: "bg-[#1B4332]" },
            { icon: UserCheck, label: "Active",          value: totalActive,       bg: "bg-emerald-500" },
            { icon: UserX,     label: "Disabled",        value: totalDisabled,     bg: "bg-red-500" },
            { icon: Shield,    label: "Admins",          value: allUsers.filter(u => u.role === "admin").length, bg: "bg-purple-500" },
          ].map(({ icon: Icon, label, value, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={17} className="text-white" />
              </div>
              <div>
                {loading
                  ? <div className="h-6 w-10 bg-gray-100 animate-pulse rounded" />
                  : <p className="text-xl font-black text-gray-900">{value}</p>
                }
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] text-gray-700"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Role filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400 hidden sm:block" />
            {["all", "admin", "employee", "client"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  roleFilter === r ? "bg-[#1B4332] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r === "all" ? "All Roles" : r}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            {["all", "active", "disabled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  statusFilter === s
                    ? s === "disabled" ? "bg-red-500 text-white" : "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "All Status" : s}
              </button>
            ))}
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 size={32} className="animate-spin text-[#1B4332]" />
              <p className="text-sm font-medium">Loading users…</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
              <Users size={40} className="text-gray-200" />
              <p className="text-sm font-medium">No users found</p>
              {(search || roleFilter !== "all" || statusFilter !== "all") && (
                <button onClick={() => { setSearch(""); setRoleFilter("all"); setStatusFilter("all"); }} className="text-xs text-[#1B4332] font-semibold hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/60 border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Phone</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {displayed.map((user) => {
                      const isDisabled  = user.isDisabled || user.status === "disabled";
                      const isSelf      = user.email === loggedInUser.email;
                      const letter      = user.fullName?.charAt(0).toUpperCase() ?? "?";
                      const isActioning = actionLoading?.includes(user._id);

                      return (
                        <tr
                          key={user._id}
                          onClick={() => setSelectedUser(user)}
                          className={`cursor-pointer hover:bg-gray-50/70 transition-colors ${isDisabled ? "opacity-60" : ""}`}
                        >
                          {/* Avatar + name */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 ${isDisabled ? "bg-gray-400" : "bg-[#1B4332]"}`}>
                                {letter}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 leading-tight flex items-center gap-1.5">
                                  {user.fullName}
                                  {isSelf && <span className="text-[10px] bg-[#1B4332]/10 text-[#1B4332] px-1.5 py-0.5 rounded-full font-medium">You</span>}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5 sm:hidden">{user.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{user.email}</td>
                          <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{user.phone || <span className="text-gray-300">—</span>}</td>
                          <td className="px-5 py-4"><RoleBadge role={user.role} /></td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            {isDisabled ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                <Ban size={10} /> Disabled
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                <CheckCircle size={10} /> Active
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              {/* Disable / Enable */}
                              <button
                                disabled={isSelf || !!actionLoading}
                                onClick={(e) => { e.stopPropagation(); handleDisable(user); }}
                                title={isSelf ? "Cannot modify yourself" : isDisabled ? "Enable user" : "Disable user"}
                                className={`p-2 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed ${
                                  isDisabled
                                    ? "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                                    : "text-gray-300 hover:text-amber-500 hover:bg-amber-50"
                                }`}
                              >
                                {isActioning && actionLoading === `disable-${user._id}`
                                  ? <Loader2 size={15} className="animate-spin" />
                                  : isDisabled ? <CheckCircle size={15} /> : <Ban size={15} />
                                }
                              </button>

                              {/* Delete */}
                              <button
                                disabled={isSelf || !!actionLoading}
                                onClick={(e) => { e.stopPropagation(); handleDelete(user); }}
                                title={isSelf ? "Cannot delete yourself" : "Delete user"}
                                className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                              >
                                {isActioning && actionLoading === `delete-${user._id}`
                                  ? <Loader2 size={15} className="animate-spin" />
                                  : <Trash2 size={15} />
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── INFINITE SCROLL TRIGGER ── */}
              <div ref={loaderRef} className="py-4 flex items-center justify-center border-t border-gray-50">
                {hasMore ? (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Loader2 size={14} className="animate-spin text-[#1B4332]" />
                    Loading more users…
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-medium">
                    Showing {displayed.length} of {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── USER DRAWER ── */}
      <UserDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onDisable={handleDisable}
        onDelete={handleDelete}
        actionLoading={actionLoading}
      />

      {/* ── CONFIRM MODALS ── */}
      <ConfirmModal
        open={confirmModal?.type === "disable"}
        title="Disable this account?"
        message={`${confirmModal?.user?.fullName} will no longer be able to log in. You can re-enable them at any time.`}
        confirmLabel="Disable"
        onConfirm={confirmDisable}
        onCancel={() => setConfirmModal(null)}
        danger={false}
      />
      <ConfirmModal
        open={confirmModal?.type === "enable"}
        title="Enable this account?"
        message={`${confirmModal?.user?.fullName} will regain access to the platform.`}
        confirmLabel="Enable"
        onConfirm={confirmDisable}
        onCancel={() => setConfirmModal(null)}
        danger={false}
      />
      <ConfirmModal
        open={confirmModal?.type === "delete"}
        title="Delete this user?"
        message={`"${confirmModal?.user?.fullName}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal(null)}
        danger
      />
    </div>
  );
}