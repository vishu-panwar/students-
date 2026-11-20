import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const STATUS_CONFIG = {
  available: { label: "Active",   bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  Pending:   { label: "Pending",  bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400",   ring: "ring-amber-200"  },
  closed:    { label: "Closed",   bg: "bg-red-50",     text: "text-red-600",     dot: "bg-red-400",     ring: "ring-red-200"    },
  Rejected:  { label: "Rejected", bg: "bg-rose-50",    text: "text-rose-700",    dot: "bg-rose-500",    ring: "ring-rose-200"   },
};

function Badge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${cfg.bg} ${cfg.text} ${cfg.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, colorClass, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 flex-1 min-w-[120px]">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${colorClass}`}>{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide m-0">{label}</p>
        <p className="text-2xl font-bold text-gray-900 m-0 leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ── Phone number validation helper ──────────────────────────────────────────
function isValidPhone(value) {
  if (!value || !value.trim()) return true; // optional field, empty is fine
  return /^[\d\s\+\-\(\)]{7,15}$/.test(value.trim());
}

function EditModal({ property, onClose, onSave, saving }) {
  const [form, setForm]         = useState({ ...property });
  const [phoneError, setPhoneError] = useState("");

  // When the modal opens for a new property, fetch the hidden phoneNumber
  // (it's excluded from the list query via .select() but we need it here)
  const [loadingPhone, setLoadingPhone] = useState(false);

  useEffect(() => {
    // Only fetch if phone isn't already on the object (it's hidden on list queries)
    if (form.phoneNumber !== undefined) return;

    const fetchPhone = async () => {
      setLoadingPhone(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getPropertyPhoneNumber/${property._id}`,
          { withCredentials: true }
        );
        if (data?.phoneNumber !== undefined) {
          setForm(prev => ({ ...prev, phoneNumber: data.phoneNumber ?? "" }));
        }
      } catch {
        // non-critical — leave field empty so admin can still set it
        setForm(prev => ({ ...prev, phoneNumber: "" }));
      } finally {
        setLoadingPhone(false);
      }
    };

    fetchPhone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property._id]);

  const handleSave = () => {
    if (!isValidPhone(form.phoneNumber)) {
      setPhoneError("Enter a valid phone number (digits, spaces, +, -, parentheses)");
      return;
    }
    setPhoneError("");
    onSave(form);
  };

  const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
  const inputErrCls = "w-full bg-gray-50 border border-red-300 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 m-0">Edit Listing</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-4">

          {/* ── Standard text / number fields ── */}
          {[
            { key: "title",    label: "Title" },
            { key: "price",    label: "Price (₹)", type: "number" },
            { key: "location", label: "Location" },
            { key: "city",     label: "City" },
          ].map(({ key, label, type = "text" }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key] || ""}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className={inputCls}
              />
            </div>
          ))}

          {/* ── Phone Number ── */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Contact Phone Number
              <span className="ml-1.5 text-[10px] font-normal text-gray-400">(shown to interested buyers)</span>
            </label>

            <div className="relative">
              {loadingPhone ? (
                <div className={`${inputCls} flex items-center gap-2 text-gray-400`}>
                  <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <span className="text-xs">Loading…</span>
                </div>
              ) : (
                <>
                  {/* dial-code prefix hint */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none pointer-events-none">
                    📞
                  </span>
                  <input
                    type="tel"
                    value={form.phoneNumber ?? ""}
                    onChange={e => {
                      setPhoneError("");
                      setForm(p => ({ ...p, phoneNumber: e.target.value }));
                    }}
                    placeholder="+91 98765 43210"
                    className={`${phoneError ? inputErrCls : inputCls} pl-9`}
                  />
                </>
              )}
            </div>

            {phoneError && (
              <p className="mt-1 text-xs text-red-500 font-medium">{phoneError}</p>
            )}
          </div>

          {/* ── Description ── */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
            <textarea
              value={form.description || ""}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* ── Select fields ── */}
          {[
            { key: "type", label: "Property Type", opts: ["Villa","Apartment","Home/House","Independent House","Plot/Land","Commercial Space","PG/Hostel"] },
            { key: "listingType", label: "Listing Type", opts: ["Rent","Sale"] },
            { key: "status", label: "Status", opts: ["available","Pending","closed","Rejected"] },
          ].map(({ key, label, opts }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
              <select
                value={form[key] || ""}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className={inputCls}
              >
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loadingPhone}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ id, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
        <h3 className="text-base font-bold text-gray-900 mb-2">Delete this listing?</h3>
        <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The property will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const LIMIT = 15;

export default function ListingControl() {
  const [properties, setProperties]       = useState([]);
  const [filter, setFilter]               = useState("All");
  const [search, setSearch]               = useState("");
  const [editTarget, setEditTarget]       = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast]                 = useState(null);
  const [loading, setLoading]             = useState({});
  const [fetching, setFetching]           = useState(true);
  const [fetchError, setFetchError]       = useState(null);
  const [savingEdit, setSavingEdit]       = useState(false);

  const [page, setPage]           = useState(1);
  const [hasMore, setHasMore]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef               = useRef(null);
  const [accept, setAccept]       = useState(0);
  const [reject, setReject]       = useState(0);
  const [pending, setPending]     = useState(0);
  const [close, setClose]         = useState(0);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const adjustCounters = (status, amount) => {
    if (!status) return;
    if (status === "available") setAccept(prev => Math.max(0, prev + amount));
    if (status === "Pending")   setPending(prev => Math.max(0, prev + amount));
    if (status === "closed")    setClose(prev => Math.max(0, prev + amount));
    if (status === "Rejected")  setReject(prev => Math.max(0, prev + amount));
  };

  const fetchListings = useCallback(async (pageNum = 1, replace = true, searchQuery = "") => {
    if (replace) setFetching(true); else setLoadingMore(true);
    setFetchError(null);
    try {
      let url = `${import.meta.env.VITE_BASE_URL}/EmployeeProperty?page=${pageNum}&limit=${LIMIT}`;

      if (searchQuery.trim()) {
        url = `${import.meta.env.VITE_BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`;
      }

      const { data } = await axios.get(url, { withCredentials: true });

      const incoming = Array.isArray(data.data || data.properties)
        ? (data.data || data.properties)
        : Array.isArray(data) ? data
        : data.listings || [];

      setProperties(prev => replace ? incoming : [...prev, ...incoming]);
      setTotal(data.total || 0);
      setHasMore(data.hasMore ?? false);
      setPage(pageNum);

      if (data?.counts) {
        setAccept(data.counts.active || 0);
        setClose(data.counts.closed || 0);
        setPending(data.counts.pending || 0);
        setReject(data.counts.rejected || 0);
      }
    } catch (err) {
      setFetchError(err?.response?.data?.message || err.message || "Failed to load listings");
    } finally {
      if (replace) setFetching(false); else setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!search.trim()) {
        fetchListings(1, true, "");
      } else {
        fetchListings(1, true, search);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, fetchListings]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore && !fetching) {
          fetchListings(page + 1, false, search);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, fetching, page, fetchListings, search]);

  const setStatus = async (id, status) => {
    setLoading(l => ({ ...l, [id]: status }));
    try {
      const targetProperty = properties.find(p => p._id === id);
      const oldStatus = targetProperty ? targetProperty.status : null;

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/property-status/${id}`,
        { status },
        { withCredentials: true }
      );

      setProperties(prev => prev.map(p => p._id === id ? { ...p, status } : p));

      if (oldStatus !== status) {
        adjustCounters(oldStatus, -1);
        adjustCounters(status, 1);
      }

      showToast(
        status === "available" ? "Listing approved ✓" : "Listing rejected",
        status === "available" ? "success" : "error"
      );
    } catch (err) {
      showToast(err?.response?.data?.message || "Action failed", "error");
    } finally {
      setLoading(l => ({ ...l, [id]: null }));
    }
  };

  const handleDelete = async (id) => {
    setLoading(l => ({ ...l, [id]: "delete" }));
    try {
      const targetProperty = properties.find(p => p._id === id);
      const oldStatus = targetProperty ? targetProperty.status : null;

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/myListings/${id}`,
        { withCredentials: true }
      );

      setProperties(prev => prev.filter(p => p._id !== id));
      setTotal(t => Math.max(0, t - 1));
      adjustCounters(oldStatus, -1);

      setConfirmDelete(null);
      showToast("Listing deleted");
    } catch (err) {
      showToast(err?.response?.data?.message || "Delete failed", "error");
    } finally {
      setLoading(l => ({ ...l, [id]: null }));
    }
  };

  const handleSave = async (updated) => {
    setSavingEdit(true);
    try {
      const targetProperty = properties.find(p => p._id === updated._id);
      const oldStatus = targetProperty ? targetProperty.status : null;

      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/property-details/${updated._id}`,
        updated,
        { withCredentials: true }
      );

      const nextProperty = data.property || updated;
      setProperties(prev => prev.map(p => p._id === updated._id ? { ...p, ...nextProperty } : p));

      if (oldStatus && nextProperty.status && oldStatus !== nextProperty.status) {
        adjustCounters(oldStatus, -1);
        adjustCounters(nextProperty.status, 1);
      }

      setEditTarget(null);
      showToast("Changes saved ✓");
    } catch (err) {
      showToast(err?.response?.data?.message || "Save failed", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  const filtered = properties.filter(p => {
    return filter === "All" ||
      (filter === "Active"   && p.status === "available") ||
      (filter === "Pending"  && p.status === "Pending")   ||
      (filter === "Closed"   && p.status === "closed")    ||
      (filter === "Rejected" && p.status === "Rejected");
  });

  const stats = {
    total:    total || properties.length,
    active:   accept,
    pending:  pending,
    closed:   close,
    rejected: reject,
  };

  const FILTERS = ["All", "Active", "Pending", "Closed", "Rejected"];
  const filterCount = { Active: stats.active, Pending: stats.pending, Closed: stats.closed, Rejected: stats.rejected };
  const btnBase = "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-px active:scale-95";

  return (
    <div className="space-y-6 font-['Poppins',sans-serif]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] px-5 py-3 rounded-xl text-sm font-semibold shadow-lg animate-[slideIn_0.2s_ease] border
          ${toast.type === "error"
            ? "bg-red-50 text-red-600 border-red-200"
            : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
          {toast.msg}
        </div>
      )}

      {editTarget    && <EditModal   property={editTarget}  onClose={() => setEditTarget(null)}   onSave={handleSave}     saving={savingEdit} />}
      {confirmDelete && <DeleteModal id={confirmDelete}     onClose={() => setConfirmDelete(null)} onConfirm={handleDelete} loading={loading[confirmDelete] === "delete"} />}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 m-0">Listing Control Centre</h1>
          <p className="text-sm text-gray-400 m-0 mt-0.5">Review, approve, reject and manage property listings</p>
        </div>
        <button
          onClick={() => fetchListings(1, true, search)}
          disabled={fetching}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-sm disabled:opacity-60 transition-all"
        >
          <span className={fetching ? "animate-spin" : ""}>↻</span>
          {fetching ? "Loading…" : "Refresh"}
        </button>
      </div>

      {/* Stat cards */}
      <div className="flex gap-4 flex-wrap">
        <StatCard label="Total"    value={stats.total}    icon="🏘️" colorClass="bg-violet-50 text-violet-500" />
        <StatCard label="Active"   value={stats.active}   icon="✅" colorClass="bg-emerald-50 text-emerald-500" />
        <StatCard label="Pending"  value={stats.pending}  icon="⏳" colorClass="bg-amber-50 text-amber-500" />
        <StatCard label="Closed"   value={stats.closed}   icon="🚫" colorClass="bg-red-50 text-red-400" />
        <StatCard label="Rejected" value={stats.rejected} icon="❌" colorClass="bg-rose-50 text-rose-500" />
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search via server (title, city, seller)…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border
                ${filter === f
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100"
                  : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"}`}
            >
              {f}
              {f !== "All" && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                  ${filter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {filterCount[f]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {fetchError && (
          <div className="py-14 text-center space-y-3">
            <p className="text-red-500 text-sm font-semibold">⚠️ {fetchError}</p>
            <button
              onClick={() => fetchListings(1, true, search)}
              className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {fetching && !fetchError && (
          <div className="py-16 text-center text-gray-400 text-sm">
            <span className="inline-block animate-spin mr-2">↻</span> Loading listings…
          </div>
        )}

        {!fetching && !fetchError && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Listing", "Seller", "Type", "Price", "Phone", "Status", "Views", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-400 text-sm">
                      {search ? `No live results found for "${search}"` : "No listings found"}
                    </td>
                  </tr>
                )}
                {filtered.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50/60 transition-colors group">

                    {/* Listing */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0]
                          ? <img src={p.images[0]} alt="" className="w-14 h-11 object-cover rounded-xl border border-gray-100 shrink-0" onError={e => e.target.style.display = "none"} />
                          : <div className="w-14 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0">🏠</div>
                        }
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 m-0 truncate max-w-[180px]">{p.title}</p>
                          <p className="text-xs text-gray-400 m-0 mt-0.5">{p.location}{p.city && p.city !== p.location ? `, ${p.city}` : ""}</p>
                        </div>
                      </div>
                    </td>

                    {/* Seller */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-800 m-0">{p.ownBy?.fullName || "—"}</p>
                      <p className="text-xs text-gray-400 m-0 mt-0.5">{p.ownBy?.email || ""}</p>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold whitespace-nowrap">{p.type || "—"}</span>
                      <p className="text-xs text-gray-400 m-0 mt-1">{p.listingType || ""}</p>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-emerald-600 m-0">₹{(p.price || 0).toLocaleString("en-IN")}</p>
                      <p className="text-xs text-gray-400 m-0 mt-0.5">/{p.listingType === "Rent" ? "mo" : "total"}</p>
                    </td>

                    {/* Phone — shown in table, hidden by .select() so blank until admin edits */}
                    <td className="px-5 py-4">
                      {p.phoneNumber
                        ? (
                          <a
                            href={`tel:${p.phoneNumber}`}
                            className="text-sm text-emerald-600 font-medium hover:underline whitespace-nowrap"
                          >
                            📞 {p.phoneNumber}
                          </a>
                        )
                        : (
                          <button
                            onClick={() => setEditTarget(p)}
                            className="text-xs text-gray-400 hover:text-emerald-600 underline underline-offset-2 transition-colors"
                          >
                            + Add phone
                          </button>
                        )
                      }
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4"><Badge status={p.status} /></td>

                    {/* Views */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-500 font-medium">{p.views || 0}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          className={`${btnBase} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                          onClick={() => setEditTarget(p)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className={`${btnBase} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                          onClick={() => setStatus(p._id, "available")}
                          disabled={!!loading[p._id] || p.status === "available"}
                        >
                          {loading[p._id] === "available" ? "…" : "✓ Approve"}
                        </button>
                        <button
                          className={`${btnBase} bg-red-50 text-red-600 hover:bg-red-100`}
                          onClick={() => setStatus(p._id, "Rejected")}
                          disabled={!!loading[p._id] || p.status === "Rejected"}
                        >
                          {loading[p._id] === "Rejected" ? "…" : "✕ Reject"}
                        </button>
                        <button
                          className={`${btnBase} bg-gray-50 text-gray-500 hover:bg-gray-100`}
                          onClick={() => setConfirmDelete(p._id)}
                          disabled={!!loading[p._id]}
                        >
                          {loading[p._id] === "delete" ? "…" : "🗑"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div ref={sentinelRef} className="h-1" />

            {loadingMore && (
              <div className="py-5 text-center text-gray-400 text-sm">
                <span className="inline-block animate-spin mr-2">↻</span> Loading more…
              </div>
            )}

            {!hasMore && properties.length > 0 && (
              <div className="py-3 text-center text-xs text-gray-300">
                All {total} listings loaded
              </div>
            )}
          </div>
        )}

        <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {fetching ? "Loading…" : `Showing ${filtered.length} of ${properties.length} loaded · ${total} total`}
          </span>
          <span className="text-xs text-gray-300">GharBazaar Employee Portal</span>
        </div>
      </div>

      <style>{`@keyframes slideIn{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}