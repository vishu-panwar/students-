// EmployeeKYC.jsx
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  UserCircle2,
  RefreshCw,
  Phone,
  MapPin,
  ShieldCheck,
  X,
  ImageOff,
} from "lucide-react";
import {
  useGetkycPendingQuery,
  useUpdatekycMutation,
} from "../../../store/kyc/kycQuery";
import KycCardShimmer from "./KycCardShimmer";
import { socket } from "../../../socket/socket";

const BRAND = "#005327";

export default function EmployeeKYC() {
  // =====================================
  // STATES
  // =====================================
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedKycId, setSelectedKycId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // =====================================
  // GET PENDING KYC
  // =====================================
  const { data, isLoading, refetch } = useGetkycPendingQuery();

  // =====================================
  // UPDATE KYC
  // =====================================
  const [updatekyc, { isLoading: updating }] = useUpdatekycMutation();

  // =====================================
  // REQUESTS
  // =====================================
  const requests = data?.data || [];

  // =====================================
  // APPROVE
  // =====================================
  const handleApprove = async (id) => {
    try {
      await updatekyc({
        id,
        status: "Verified",
      }).unwrap();
      alert("KYC Approved Successfully");
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Something went wrong");
    }
  };

  // =====================================
  // OPEN REJECT MODAL
  // =====================================
  const openRejectModal = (id) => {
    setSelectedKycId(id);
    setShowRejectModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("KYC Verification") === "KYC Verification") {
      localStorage.removeItem("KYC Verification");
    }
    const handleNewEnquiry = async (data) => {
      console.log("New enquiry/contact:", data);

      if (data?.type === "KYC Verification") {
        await refetch();
      }
    };

    socket.on("newEnquiry", handleNewEnquiry);

    return () => {
      socket.off("newEnquiry", handleNewEnquiry);
    };
  }, []);

  // =====================================
  // SUBMIT REJECTION
  // =====================================
  const submitReject = async () => {
    if (!rejectionReason.trim()) {
      return alert("Rejection reason is required");
    }

    try {
      await updatekyc({
        id: selectedKycId,
        status: "Rejected",
        rejectionReason,
      }).unwrap();

      alert("KYC Rejected Successfully");
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedKycId(null);
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10 w-full bg-[#F5F0E8] min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            KYC Verification
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and verify user identification documents
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md hover:border-[#005327]/30 active:scale-95 transition-all duration-200"
          onClick={refetch}
          disabled={isLoading}
          style={{ color: BRAND }}
        >
          <RefreshCw
            size={16}
            className={`text-[#005327] ${isLoading ? "animate-spin" : ""}`}
          />
          <span>Refresh</span>
        </button>
      </div>

      {/* GRID CONTAINER — uniform card sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {isLoading ? (
          <>
            <KycCardShimmer />
            <KycCardShimmer />
            <KycCardShimmer />
          </>
        ) : (
          <>
            {requests.map((request) => (
              <KycCard
                key={request._id}
                request={request}
                updating={updating}
                onApprove={handleApprove}
                onReject={openRejectModal}
                onPreview={setPreviewImage}
              />
            ))}

            {/* EMPTY STATE */}
            {requests.length === 0 && (
              <div className="col-span-full bg-white border border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full shadow-sm my-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner mb-4"
                  style={{ backgroundColor: `${BRAND}14`, color: BRAND }}
                >
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  All Caught Up!
                </h3>
                <p className="text-sm text-gray-500">
                  There are no pending KYC requests at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.15s_ease]">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[scaleIn_0.18s_ease]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Reject KYC</h2>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <textarea
              rows={5}
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400 resize-none text-sm transition-shadow"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
              >
                Close
              </button>

              <button
                disabled={updating}
                onClick={submitReject}
                className="px-4 py-2 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 cursor-zoom-out animate-[fadeIn_0.15s_ease]"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setPreviewImage(null)}
          >
            <X size={22} />
          </button>
          <img
            src={previewImage}
            alt="Document preview"
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain animate-[scaleIn_0.18s_ease]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════
   KYC CARD — uniform size, interactive
════════════════════════════════════ */
function KycCard({ request, updating, onApprove, onReject, onPreview }) {
  return (
    <div
      className="group relative bg-gradient-to-b from-white to-[#F5F0E8] border border-gray-200 rounded-2xl p-5 shadow-sm
                 hover:shadow-xl hover:-translate-y-1 hover:border-[#005327]/40 transition-all duration-300 ease-out
                 flex flex-col w-full h-[480px] sm:h-[500px]"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${BRAND}14`, color: BRAND }}
        >
          <UserCircle2 size={24} />
        </div>
        <div className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Pending Review
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight truncate">
          {request.fullName}
        </h3>

        <div className="mt-2 space-y-1.5 mb-4">
          <p className="text-sm text-gray-600 flex items-center gap-1.5 truncate">
            <Phone size={13} className="text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-800">
              {request.contactNumber}
            </span>
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-gray-400 shrink-0" />
            Aadhaar:
            <span className="font-semibold text-gray-800">
              XXXX-XXXX-{request.aadhaarNumber?.slice(-4)}
            </span>
          </p>

          <p className="text-sm text-gray-600 flex items-start gap-1.5">
            <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
            <span className="font-semibold text-gray-800 line-clamp-2">
              {request.currentAddress}
            </span>
          </p>
        </div>

        {/* DOCUMENTS */}
        <div className="p-3.5 bg-white/70 border border-gray-100 rounded-xl space-y-3 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 shrink-0">
            <FileText size={15} style={{ color: BRAND }} />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Aadhaar Documents
            </span>
          </div>

          {/* IMAGES — uniform size, clickable preview */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            <DocThumb
              label="Front Side"
              src={request.aadhaarFront}
              onClick={() => request.aadhaarFront && onPreview(request.aadhaarFront)}
            />
            <DocThumb
              label="Back Side"
              src={request.aadhaarBack}
              onClick={() => request.aadhaarBack && onPreview(request.aadhaarBack)}
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-gray-100 shrink-0">
        <button
          disabled={updating}
          onClick={() => onApprove(request._id)}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl shadow-sm
                     hover:shadow-md hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-50"
          style={{ backgroundColor: BRAND }}
        >
          <CheckCircle size={15} />
          Approve
        </button>

        <button
          disabled={updating}
          onClick={() => onReject(request._id)}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600
                     text-xs font-bold rounded-xl border border-red-100 active:scale-95 transition-all duration-150 disabled:opacity-50"
        >
          <XCircle size={15} />
          Reject
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   DOCUMENT THUMBNAIL — fixed-size, hover zoom
════════════════════════════════════ */
function DocThumb({ label, src, onClick }) {
  return (
    <div className="flex flex-col gap-1 min-h-0 h-full">
      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide shrink-0">
        {label}
      </span>
      <button
        type="button"
        onClick={onClick}
        disabled={!src}
        className="relative overflow-hidden rounded-lg border border-gray-200 bg-[#F5F0E8] flex-1 w-full min-h-[88px]
                   disabled:cursor-default group/thumb"
      >
        {src ? (
          <>
            <img
              src={src}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover/thumb:opacity-100 text-white text-[10px] font-bold uppercase tracking-wide transition-opacity duration-200">
                View
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageOff size={20} />
          </div>
        )}
      </button>
    </div>
  );
}