import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  Ticket,
  Loader2,
  Copy,
  Check,
  Gift,
  RefreshCw,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  Trash2,
} from "lucide-react";

const CouponGenerator = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCoupons, setFetchingCoupons] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'expired'

  // Pagination & Server Stats States
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [stats, setStats] = useState({
    totalCoupons: 0,
    activeCount: 0,
    expiredCount: 0,
    totalUsedCount: 0,
  });

  // Intersection Observer Target Hook Ref
  const observerTarget = useRef(null);

  // Helper to check if a coupon is expired
  const isExpired = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  // FETCH PAGINATED COUPONS FUNCTION
  const getCoupons = useCallback(
    async (isInitialLoad = false, pageToFetch = 1) => {
      if (fetchingCoupons) return;

      try {
        setFetchingCoupons(true);
        const { data } = await axios.get(
          `${API}/getCoupon?page=${pageToFetch}&limit=10`,
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          // If it's a structural reset/initial load, clear past mutations, else merge array stacks
          setCoupons((prev) =>
            isInitialLoad ? data.coupons : [...prev, ...data.coupons]
          );
          setHasNextPage(data.pagination.hasNextPage);
          setStats(data.stats);
          setPage(pageToFetch);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setFetchingCoupons(false);
      }
    },
    [fetchingCoupons, API]
  );

  // RESET & TRIGGER FRESH POLL (For manual refresh or post-creation sync)
  const resetAndRefreshRegistry = () => {
    getCoupons(true, 1);
  };

  // CREATE COUPON
  const generateCoupon = async () => {
    if (!name.trim()) return alert("Enter a name");
    if (!expiryDate) return alert("Please select an expiry date");

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/createCoupon`,
        { name, expiryDate },
        { withCredentials: true }
      );

      setCoupon(data.coupon);
      setName("");
      setExpiryDate("");

      // Automatically reset data timeline back to first page context upon entry creation
      resetAndRefreshRegistry();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to generate coupon");
    } finally {
      setLoading(false);
    }
  };

  // COPY UTILITY
  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // DELETE COUPON
  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete this coupon? This cannot be undone.")) return;

    try {
      setDeletingId(id);

      await axios.delete(`${API}/deleteCoupon/${id}`, {
        withCredentials: true,
      });

      // Remove locally without a full refetch
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      setStats((prev) => ({
        ...prev,
        totalCoupons: prev.totalCoupons - 1,
      }));

      // If the deleted coupon was the just-generated banner, clear it
      setCoupon((prev) => (prev?._id === id ? null : prev));
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to delete coupon");
    } finally {
      setDeletingId(null);
    }
  };

  // Initial Data Lifecycle Hook
  useEffect(() => {
    getCoupons(true, 1);
  }, []);

  // INFINITE SCROLL OBSERVER EFFECT LOGIC
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasNextPage || fetchingCoupons) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getCoupons(false, page + 1);
        }
      },
      { threshold: 1.0, rootMargin: "100px" } // Fetches 100px before reaching raw bottom margins
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, page, fetchingCoupons, getCoupons]);

  // Filter Local Subsets Computed Properties
  const filteredCoupons = coupons.filter((item) => {
    const expired = isExpired(item.expiryDate);
    if (filter === "active") return !expired;
    if (filter === "expired") return expired;
    return true;
  });

  return (
    <div className="min-h-screen bg-emerald-50/50 p-4 md:p-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER & GENERATOR FORM */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700">
              <Gift size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-emerald-950">
                Coupon Hub
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                Generate and manage time-sensitive referral coupons
              </p>
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-emerald-50/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={expiryDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-emerald-50/20"
                  />
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generateCoupon}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition shadow-md shadow-emerald-600/10 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Building Coupon...
                </>
              ) : (
                <>
                  <Ticket size={20} />
                  Generate Coupon Code
                </>
              )}
            </button>
          </div>

          {/* LATEST GENERATED BANNER */}
          {coupon && (
            <div className="mt-8 bg-gradient-to-br from-emerald-700 to-teal-800 text-white p-6 rounded-2xl relative overflow-hidden shadow-xl">
              <div className="absolute -right-8 -bottom-8 text-emerald-600/20 transform rotate-12 pointer-events-none">
                <Ticket size={160} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Successfully Generated
                  </span>
                  <h2 className="text-4xl font-mono font-black tracking-widest mt-2">
                    {coupon.code}
                  </h2>
                  <div className="mt-3 text-sm text-emerald-100 flex flex-wrap gap-x-4 gap-y-1">
                    <p>
                      <strong>Issued To:</strong> {coupon.name}
                    </p>
                    <p>•</p>
                    <p className="flex items-center gap-1">
                      <Clock size={14} />
                      <strong>Expires:</strong>{" "}
                      {coupon.expiryDate
                        ? new Date(coupon.expiryDate).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => copyCoupon(coupon.code)}
                  className="bg-white text-emerald-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-emerald-50 transition active:scale-95 self-start md:self-center"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={18} className="text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* COUPONS REGISTRY WORKSPACE */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-950">
                Coupon Registry
              </h2>
              <p className="text-sm text-gray-400">
                Review status logs and loaded registry items
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={resetAndRefreshRegistry}
                className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition"
                title="Refresh Entire Catalog"
              >
                <RefreshCw
                  size={18}
                  className={fetchingCoupons && page === 1 ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* DYNAMIC TAB CONTROLS (Counts pulled from live system statistics) */}
          <div className="flex border-b border-gray-100 mb-6 gap-2">
            {[
              { id: "all", label: "All Coupons", count: stats.totalCoupons },
              { id: "active", label: "Active", count: stats.activeCount },
              { id: "expired", label: "Expired", count: stats.expiredCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`pb-3 px-4 text-sm font-semibold tracking-wide transition relative -mb-[1px] ${
                  filter === tab.id
                    ? "text-emerald-700 border-b-2 border-emerald-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}{" "}
                <span className="text-xs opacity-70 font-normal">
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* TABLE PLATFORM */}
          {coupons.length === 0 && fetchingCoupons ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="animate-spin text-emerald-600" size={32} />
              <p className="text-sm text-gray-400 font-medium">
                Syncing database registers...
              </p>
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="text-center text-gray-400 py-14 bg-emerald-50/10 rounded-2xl border-2 border-dashed border-emerald-100">
              <Ticket size={40} className="mx-auto mb-2 opacity-30 text-emerald-800" />
              <p className="font-medium">
                No coupons match this filter category inside loaded records.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider text-left">
                    <th className="pb-4 pt-2 px-4">Coupon Info</th>
                    <th className="pb-4 pt-2 px-4">Status</th>
                    <th className="pb-4 pt-2 px-4">Expires On</th>
                    <th className="pb-4 pt-2 px-4">Redemption Users</th>
                    <th className="pb-4 pt-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredCoupons.map((item) => {
                    const expired = isExpired(item.expiryDate);
                    return (
                      <tr
                        key={item._id}
                        className={`hover:bg-emerald-50/30 transition ${
                          expired ? "bg-gray-50/40" : ""
                        }`}
                      >
                        {/* CODE & OWNER */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg text-xs w-max ${
                                expired
                                  ? "bg-gray-200 text-gray-500 line-through"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {item.code}
                            </span>
                            <span className="font-medium text-gray-700 pl-0.5">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="p-4">
                          {expired ? (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold">
                              <AlertTriangle size={12} />
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                              <CheckCircle size={12} />
                              Active
                            </span>
                          )}
                        </td>

                        {/* EXPIRY DATE */}
                        <td className="p-4 text-gray-600">
                          {item.expiryDate ? (
                            <div className="flex flex-col">
                              <span>
                                {new Date(item.expiryDate).toLocaleDateString(
                                  undefined,
                                  { dateStyle: "medium" }
                                )}
                              </span>
                              {expired && (
                                <span className="text-xs text-red-400 font-medium">
                                  Passed date
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        {/* REDEMPTION USERS */}
                        <td className="p-4">
                          {item.usedBy?.length > 0 ? (
                            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-2 max-w-xs">
                              {item.usedBy.map((user) => (
                                <div
                                  key={user._id}
                                  className="bg-emerald-50/60 border border-emerald-100/50 p-2 rounded-lg text-xs"
                                >
                                  <p className="font-semibold text-emerald-950">
                                    {user.fullName}
                                  </p>
                                  <p className="text-gray-400">{user.email}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-xs">
                              No redemptions yet
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => copyCoupon(item.code)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border ${
                                copiedCode === item.code
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                              }`}
                            >
                              {copiedCode === item.code ? (
                                <>
                                  <Check size={14} /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={14} /> Copy
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => deleteCoupon(item._id)}
                              disabled={deletingId === item._id}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border bg-white text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50"
                            >
                              {deletingId === item._id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <>
                                  <Trash2 size={14} /> Delete
                                </>
                              )}
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

          {/* INFINITE SCROLL DETECTION ZONE & INDICATOR */}
          <div
            ref={observerTarget}
            className="w-full flex justify-center py-6 border-t border-gray-50 mt-4"
          >
            {fetchingCoupons && coupons.length > 0 && (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
                <Loader2 size={16} className="animate-spin" />
                Retrieving next page matrix...
              </div>
            )}
            {!hasNextPage && coupons.length > 0 && (
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                ✓ All items within history logs fetched successfully
              </p>
            )}
          </div>
        </div>

        {/* METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Distributed
            </p>
            <h3 className="text-3xl font-black text-emerald-900 mt-1">
              {stats.totalCoupons}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active Run-Time
            </p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">
              {stats.activeCount}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Expired Deprecated
            </p>
            <h3 className="text-3xl font-black text-red-600 mt-1">
              {stats.expiredCount}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total User Conversions
            </p>
            <h3 className="text-3xl font-black text-emerald-900 mt-1">
              {stats.totalUsedCount}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponGenerator;