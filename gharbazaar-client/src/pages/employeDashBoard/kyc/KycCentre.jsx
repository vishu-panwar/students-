import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  UserCircle2,
  RefreshCw,
  Phone,
  MapPin,
  ShieldCheck,
  ImageOff,
  Trash2,
  X,
  ZoomIn,
  CheckCircle2,
  XCircle,
  Clock,
  FileSearch,
} from "lucide-react";
import {
  useGetkycPendingQuery,
  useUpdatekycMutation,
} from "../../../store/kyc/kycQuery";
import KycCardShimmer from "./KycCardShimmer";
import { socket } from "../../../socket/socket";
import axios from "axios";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BRAND    = "#005327";
const BG       = "#F5F0E8";
const CARD_BG  = "#FFFDF8";
const BORDER   = "#EAE4D8";

// Status config — drives the stripe, badge, and icons everywhere
const STATUS_CONFIG = {
  Pending:  { stripe: "#F59E0B", badge: "bg-amber-100 text-amber-800 border-amber-200",  icon: Clock,        iconColor: "text-amber-500"  },
  Verified: { stripe: "#005327", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle2, iconColor: "text-emerald-600" },
  Accepted: { stripe: "#005327", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle2, iconColor: "text-emerald-600" },
  Rejected: { stripe: "#EF4444", badge: "bg-red-100 text-red-800 border-red-200",         icon: XCircle,      iconColor: "text-red-500"    },
};

// ─── Tab counts badge ─────────────────────────────────────────────────────────
function TabBadge({ count }) {
  if (!count) return null;
  return (
    <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold bg-white/30">
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function KycCentre() {
  const [statusFilter, setStatusFilter]   = useState("Pending");
  const [page, setPage]                   = useState(1);
  const [allRequests, setAllRequests]     = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedKycId, setSelectedKycId]     = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [previewImage, setPreviewImage]       = useState(null);
  const observerTarget = useRef(null);

  const { data, isLoading, refetch, isFetching } = useGetkycPendingQuery({
    status: statusFilter, page, limit: 6,
  });

  const [updatekyc, { isLoading: updating }] = useUpdatekycMutation();

  const serverData = data?.data || [];
  const hasMore    = data?.pagination?.hasMore || false;

  // Accumulate pages
  useEffect(() => {
    if (page === 1) {
      setAllRequests(serverData);
    } else {
      setAllRequests((prev) => {
        const incoming = serverData.filter(
          (n) => !prev.some((o) => o._id === n._id)
        );
        return [...prev, ...incoming];
      });
    }
  }, [serverData, page]);

  // Infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading && !isFetching)
        setPage((p) => p + 1);
    },
    [hasMore, isLoading, isFetching]
  );

  useEffect(() => {
    const el = observerTarget.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleObserver, {
      root: null, rootMargin: "150px", threshold: 0.1,
    });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [handleObserver]);

  // Handlers
  const handleStatusChange = (s) => { setAllRequests([]); setStatusFilter(s); setPage(1); };
  const handleRefresh      = async () => { setPage(1); await refetch(); };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this KYC application?")) return;
    try {
      await updatekyc({ id, status: "Verified" }).unwrap();
      alert("KYC Approved Successfully");
      handleRefresh();
    } catch (e) { alert(e?.data?.message || "Something went wrong"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this record?")) return;
    try {
      const base = import.meta.env.VITE_BASE_URL;
      await axios.delete(`${base}/delete/${id}`, { withCredentials: true });
      alert("Record Deleted");
      handleRefresh();
    } catch (e) { alert(e?.response?.data?.message || "Failed to delete record"); }
  };

  const submitReject = async () => {
    if (!rejectionReason.trim()) return alert("Reason is required");
    try {
      await updatekyc({ id: selectedKycId, status: "Rejected", rejectionReason }).unwrap();
      alert("KYC Rejected");
      setShowRejectModal(false);
      setRejectionReason("");
      handleRefresh();
    } catch (e) { alert(e?.data?.message || "Something went wrong"); }
  };

  // Socket
  useEffect(() => {
    const fn = (d) => { if (d?.type === "KYC Verification") handleRefresh(); };
    socket.on("newEnquiry", fn);
    return () => socket.off("newEnquiry", fn);
  }, []);

  // Tab list
  const TABS = ["Pending", "Verified", "Rejected", "All"];
  const activeIdx = TABS.indexOf(statusFilter);

  return (
    <div
      className="w-full min-h-screen antialiased px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5"
      style={{ background: BG, fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border"
        style={{ background: CARD_BG, borderColor: BORDER }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${BRAND}15` }}
          >
            <FileSearch size={20} style={{ color: BRAND }} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: "#1A2B22" }}>
              KYC Control Centre
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Verify identity documents and manage incoming submissions
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading || isFetching}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95"
          style={{
            background: CARD_BG,
            borderColor: BORDER,
            color: BRAND,
          }}
        >
          <RefreshCw
            size={15}
            className={`transition-transform ${isLoading || isFetching ? "animate-spin" : "group-hover:rotate-180 duration-500"}`}
            style={{ color: BRAND }}
          />
          Refresh Records
        </button>
      </div>

      {/* ── FILTER TABS ─────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto border"
        style={{ background: CARD_BG, borderColor: BORDER }}
      >
        {TABS.map((tab) => {
          const active = statusFilter === tab;
          const cfg = STATUS_CONFIG[tab];
          return (
            <button
              key={tab}
              onClick={() => handleStatusChange(tab)}
              className="relative flex-1 min-w-[80px] px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap text-center"
              style={{
                background: active ? BRAND : "transparent",
                color: active ? "#fff" : "#78716C",
              }}
            >
              {tab}
              {active && cfg && (
                <span
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold"
                  style={{ background: "rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  {allRequests.length > 0 ? allRequests.length : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── GRID ────────────────────────────────────────────────────────── */}
      {allRequests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {allRequests.map((req) => (
            <KycCard
              key={req._id}
              request={req}
              updating={updating}
              onApprove={handleApprove}
              onReject={(id) => { setSelectedKycId(id); setShowRejectModal(true); }}
              onDelete={handleDelete}
              onPreview={setPreviewImage}
            />
          ))}
        </div>
      )}

      {/* ── LOADING SHIMMERS ─────────────────────────────────────────────── */}
      {(isLoading || isFetching) && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => <KycCardShimmer key={i} />)}
        </div>
      )}

      {/* ── EMPTY STATE ──────────────────────────────────────────────────── */}
      {allRequests.length === 0 && !isLoading && !isFetching && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${BRAND}10`, border: `1.5px dashed ${BRAND}40` }}
          >
            <UserCircle2 size={28} style={{ color: BRAND }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-700">No Applications Found</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xs">
              There are no <span className="font-semibold">{statusFilter.toLowerCase()}</span> KYC requests to review right now.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="text-xs font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 border"
            style={{ background: CARD_BG, borderColor: BORDER, color: BRAND }}
          >
            Refresh to check again
          </button>
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="h-2 w-full" />

      {/* ── REJECT MODAL ─────────────────────────────────────────────────── */}
      {showRejectModal && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          style={{ background: "rgba(15,20,15,0.65)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && !updating && setShowRejectModal(false)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border animate-slide-up"
            style={{ background: CARD_BG, borderColor: BORDER }}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <XCircle size={17} className="text-red-600" />
                </div>
                <h2 className="text-base font-extrabold text-stone-900">Reject KYC Application</h2>
              </div>
              <button
                disabled={updating}
                onClick={() => setShowRejectModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 disabled:opacity-50 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            <p className="text-xs text-stone-400 mb-3">
              Provide a clear reason so the applicant knows what to fix and resubmit.
            </p>

            <textarea
              rows={4}
              disabled={updating}
              placeholder="e.g., Documents appear blurry. Please upload a clear, well-lit scan of your Aadhaar card."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm outline-none transition-all placeholder:text-stone-300 resize-none"
              style={{
                background: BG,
                borderColor: rejectionReason.trim() ? "#EF4444" : BORDER,
                color: "#1A2B22",
              }}
            />
            <p className="text-[10px] text-stone-400 mt-1.5 text-right">
              {rejectionReason.trim().length} / 300 characters
            </p>

            <div className="flex gap-3 mt-4">
              <button
                disabled={updating}
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95"
                style={{ background: CARD_BG, borderColor: BORDER, color: "#78716C" }}
              >
                Cancel
              </button>
              <button
                disabled={updating || !rejectionReason.trim()}
                onClick={submitReject}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {updating && <RefreshCw size={12} className="animate-spin" />}
                {updating ? "Rejecting…" : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── IMAGE PREVIEW ─────────────────────────────────────────────────── */}
      {previewImage && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center z-[60] p-4 cursor-zoom-out"
          style={{ background: "rgba(10,14,10,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <X size={20} />
          </button>
          <img
            src={previewImage}
            alt="Identity Document Preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            style={{ border: "1.5px solid rgba(255,255,255,0.1)" }}
          />
          <p className="text-xs text-white/40 mt-4">Click anywhere to close</p>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out both; }
      `}</style>
    </div>
  );
}

// ─── KycCard subcomponent ─────────────────────────────────────────────────────
function KycCard({ request, updating, onApprove, onReject, onDelete, onPreview }) {
  const statusKey = request.status === "Accepted" ? "Verified" : request.status;
  const cfg       = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["Pending"];
  const StatusIcon = cfg.icon;
  const isVerified = statusKey === "Verified";
  const isRejected = statusKey === "Rejected";

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: CARD_BG,
        borderColor: BORDER,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Signature element — status stripe on left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{ background: cfg.stripe }}
      />

      {/* ── Card body ── */}
      <div className="pl-5 pr-5 pt-5 pb-4 flex flex-col gap-4 flex-1">

        {/* Top row: icon + name + status badge + delete */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${cfg.stripe}18`, border: `1px solid ${cfg.stripe}30` }}
            >
              <StatusIcon size={18} className={cfg.iconColor} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-stone-900 truncate leading-tight">
                {request.fullName}
              </h3>
              {request.userId?.email && (
                <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                  {request.userId.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${cfg.badge}`}
            >
              {request.status}
            </span>
            <button
              onClick={() => onDelete(request._id)}
              className="p-1.5 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
              title="Delete record"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Detail rows */}
        <div
          className="rounded-xl p-3 space-y-2.5 text-xs border"
          style={{ background: BG, borderColor: BORDER }}
        >
          <div className="flex items-center gap-2.5">
            <Phone size={12} className="text-stone-400 shrink-0" />
            <span className="font-semibold text-stone-700">{request.contactNumber}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={12} className="text-stone-400 shrink-0" />
            <span className="text-stone-500">Aadhaar:</span>
            <span className="font-mono font-semibold text-stone-700">{request.aadhaarNumber}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={12} className="text-stone-400 shrink-0 mt-0.5" />
            <p className="text-stone-500 line-clamp-2 leading-relaxed">{request.currentAddress}</p>
          </div>
        </div>

        {/* Rejection reason */}
        {isRejected && request.rejectionReason && (
          <div className="rounded-xl p-3 text-xs border bg-red-50/60 border-red-100">
            <p className="font-bold text-red-700 mb-0.5">Rejection Reason</p>
            <p className="text-red-600 leading-relaxed">{request.rejectionReason}</p>
          </div>
        )}

        {/* Document thumbnails */}
        <div
          className="rounded-xl p-3 border"
          style={{ background: BG, borderColor: BORDER }}
        >
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">
            Aadhaar Documents
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { src: request.aadhaarFront, label: "Front" },
              { src: request.aadhaarBack,  label: "Back"  },
            ].map(({ src, label }) => (
              <button
                key={label}
                onClick={() => src && onPreview(src)}
                disabled={!src}
                className="relative h-20 rounded-xl overflow-hidden border transition-all group/img active:scale-95"
                style={{
                  background: CARD_BG,
                  borderColor: BORDER,
                  cursor: src ? "zoom-in" : "default",
                }}
              >
                {src ? (
                  <>
                    <img
                      src={src}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                      alt={`Aadhaar ${label}`}
                    />
                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-stone-900/0 group-hover/img:bg-stone-900/40 transition-all flex items-center justify-center">
                      <ZoomIn
                        size={18}
                        className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-md">
                      {label}
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <ImageOff size={16} className="text-stone-300" />
                    <span className="text-[9px] text-stone-300 font-medium">{label}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div
        className="px-5 py-4 border-t grid grid-cols-2 gap-2"
        style={{ borderColor: BORDER, background: `${BG}90` }}
      >
        <button
          disabled={updating || isVerified}
          onClick={() => onApprove(request._id)}
          className="py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: isVerified ? "#a3a3a3" : BRAND,
          }}
          onMouseEnter={(e) => !isVerified && (e.currentTarget.style.background = "#003d1e")}
          onMouseLeave={(e) => !isVerified && (e.currentTarget.style.background = BRAND)}
        >
          {isVerified ? "✓ Approved" : "Approve"}
        </button>
        <button
          disabled={updating || isRejected}
          onClick={() => onReject(request._id)}
          className="py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: CARD_BG,
            borderColor: isRejected ? "#FECACA" : BORDER,
            color: isRejected ? "#EF4444" : "#78716C",
          }}
          onMouseEnter={(e) => !isRejected && Object.assign(e.currentTarget.style, { background: "#FEF2F2", borderColor: "#FECACA", color: "#EF4444" })}
          onMouseLeave={(e) => !isRejected && Object.assign(e.currentTarget.style, { background: CARD_BG, borderColor: BORDER, color: "#78716C" })}
        >
          {isRejected ? "✕ Rejected" : "Reject"}
        </button>
      </div>
    </div>
  );
}