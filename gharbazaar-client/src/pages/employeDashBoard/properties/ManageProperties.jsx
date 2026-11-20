// ManageProperties.jsx

import React, { useEffect, useState } from "react";
import {
  Building,
  MapPin,
  CheckCircle,
  XCircle,
  RefreshCw,
  Bath,
  BedDouble,
  IndianRupee,
  Eye,
  Calendar,
  Phone,
  Home,
  Sofa,
  Maximize,
  Wifi,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  User,
  Mail,
  Layers,
} from "lucide-react";
import PropertyCardShimmer from "./PropertyCardShimmer";
import {
  useGetPendingPropertyQuery,
  useUpdateStatusPropertyMutation,
} from "../../../store/propertyQuery/getPropertyQuery";
import { socket } from "../../../socket/socket";

const BRAND = "#005327";
const BRAND_LIGHT = "#E6F5EC";

export default function ManageProperties() {
  // =====================================================
  // API
  // =====================================================
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetPendingPropertyQuery();

  const [updateStatusProperty, { isLoading: updating }] =
    useUpdateStatusPropertyMutation();

  // =====================================================
  // STATES
  // =====================================================
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [propertyId, setPropertyId] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const properties = data?.data || [];

  // =====================================================
  // SOCKET
  // =====================================================
  useEffect(() => {
    if (localStorage.getItem("Property Verification") === "Property Verification") {
      localStorage.removeItem("Property Verification");
    }
    const handleNewEnquiry = async (data) => {
      if (data?.type === "Property Verification") await refetch();
    };
    socket.on("newEnquiry", handleNewEnquiry);
    return () => socket.off("newEnquiry", handleNewEnquiry);
  }, []);

  // =====================================================
  // APPROVE
  // =====================================================
  const handleApprove = async (propertyId) => {
    try {
      await updateStatusProperty({ propertyId, status:"available" }).unwrap();
      alert("Property Approved Successfully");
      setSelectedProperty(null);
    } catch (err) {
      alert("Failed to approve property");
    }
  };

  // =====================================================
  // OPEN REJECT MODAL
  // =====================================================
  const openRejectModal = (id) => {
    setPropertyId(id);
    setRejectModal(true);
  };

  // =====================================================
  // REJECT
  // =====================================================
  const handleReject = async () => {
    if (!rejectionReason.trim()) return alert("Please enter rejection reason");
    try {
      await updateStatusProperty({
        propertyId,
        status: "Rejected",
        rejectionReason,
      }).unwrap();
      alert("Property Rejected Successfully");
      setRejectModal(false);
      setRejectionReason("");
      setSelectedProperty(null);
      setPropertyId(null);
    } catch (err) {
      alert("Failed to reject property");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <PropertyCardShimmer />
          <PropertyCardShimmer />
          <PropertyCardShimmer />
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-6">
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm max-w-sm w-full">
          <XCircle size={40} className="mx-auto text-red-500 mb-3" />
          <h2 className="text-xl font-bold text-red-600">Failed to load properties</h2>
          <p className="text-sm text-gray-500 mt-2">{error?.data?.message || "Something went wrong"}</p>
          <button
            onClick={refetch}
            className="mt-5 px-5 py-2.5 text-white rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{ backgroundColor: BRAND }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10 w-full bg-[#F5F0E8] min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Property Verification
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve pending listings
          </p>
        </div>

        <button
          onClick={refetch}
          disabled={isFetching}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md hover:border-[#005327]/30 active:scale-95 transition-all duration-200"
          style={{ color: BRAND }}
        >
          <RefreshCw
            size={16}
            className={`text-[#005327] ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* EMPTY STATE */}
      {properties.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">No Pending Properties</h2>
          <p className="text-sm text-gray-500">All listings have been reviewed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <PropertyCard
              key={prop._id}
              prop={prop}
              onClick={() => {
                setSelectedProperty(prop);
                setImgIndex(0);
              }}
            />
          ))}
        </div>
      )}

      {/* PROPERTY DETAIL MODAL */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          updating={updating}
          onClose={() => setSelectedProperty(null)}
          onApprove={() => handleApprove(selectedProperty._id)}
          onReject={() => openRejectModal(selectedProperty._id)}
        />
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 animate-[fadeIn_0.15s_ease]">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-[scaleIn_0.18s_ease]">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-gray-900">Reject Property</h2>
              <button
                onClick={() => { setRejectModal(false); setRejectionReason(""); setPropertyId(null); }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejection.</p>
            <textarea
              rows={5}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-red-400 resize-none text-sm transition-shadow"
            />
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => { setRejectModal(false); setRejectionReason(""); setPropertyId(null); }}
                className="py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={updating}
                className="py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {updating ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
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
   PROPERTY CARD
════════════════════════════════════ */
function PropertyCard({ prop, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-b from-white to-[#F5F0E8] border border-gray-200 rounded-2xl overflow-hidden shadow-sm
                 hover:shadow-xl hover:-translate-y-1 hover:border-[#005327]/40 transition-all duration-300 ease-out
                 cursor-pointer flex flex-col h-[460px]"
    >
      {/* IMAGE */}
      <div className="relative h-[220px] flex-shrink-0 overflow-hidden">
        <img
          src={prop.images?.[0]}
          alt={prop.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Pending badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Pending
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[13px] font-extrabold px-2.5 py-1 rounded-lg shadow flex items-center gap-0.5">
          <IndianRupee size={13} />
          {prop.price?.toLocaleString("en-IN")}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <h2 className="text-[15px] font-bold text-gray-900 line-clamp-1 mb-1">
          {prop.title}
        </h2>

        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-3">
          <MapPin size={12} className="flex-shrink-0" style={{ color: BRAND }} />
          {prop.city}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            {prop.type}
          </span>
          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-semibold">
            {prop.listingType}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          <StatPill icon={<BedDouble size={13} />} label={`${prop.propertySpecifications?.beds ?? "—"} Beds`} />
          <StatPill icon={<Bath size={13} />} label={`${prop.propertySpecifications?.bathrooms ?? "—"} Baths`} />
          <StatPill icon={<Eye size={13} />} label={`${prop.views ?? 0} Views`} />
        </div>

        {/* CTA hint */}
        <div
          className="mt-3 text-center text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: BRAND }}
        >
          Click to review →
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, label }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-100 rounded-lg px-2 py-1.5">
      <span className="text-gray-400">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

/* ════════════════════════════════════
   PROPERTY DETAIL MODAL
════════════════════════════════════ */
function PropertyDetailModal({ property, imgIndex, setImgIndex, updating, onClose, onApprove, onReject }) {
  const images = property.images || [];
  const specs = property.propertySpecifications || {};

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-3 sm:p-5 overflow-hidden animate-[fadeIn_0.15s_ease]">
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-[scaleIn_0.18s_ease]">

        {/* IMAGE GALLERY */}
        <div className="relative h-56 sm:h-72 bg-gray-900 flex-shrink-0">
          <img
            src={images[imgIndex]}
            alt={property.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg text-gray-700 transition-colors z-10"
          >
            <X size={18} />
          </button>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? "bg-white scale-125" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-5 left-5 right-14">
            <span
              className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide"
              style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
            >
              {property.type} · {property.listingType}
            </span>
            <h1 className="text-white text-xl sm:text-2xl font-extrabold drop-shadow line-clamp-1">
              {property.title}
            </h1>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
              <MapPin size={13} /> {property.location}, {property.city}
            </p>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 flex flex-col gap-6">

          {/* PRICE + QUICK STATS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-1.5 text-3xl font-extrabold" style={{ color: BRAND }}>
              <IndianRupee size={26} />
              {property.price?.toLocaleString("en-IN")}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <BedDouble size={14} />, label: `${specs.beds ?? "—"} Beds` },
                { icon: <Bath size={14} />, label: `${specs.bathrooms ?? "—"} Baths` },
                { icon: <Eye size={14} />, label: `${property.views ?? 0} Views` },
                { icon: <Calendar size={14} />, label: new Date(property.createdAt).toLocaleDateString("en-IN") },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-[#F5F0E8] text-gray-700 text-[12px] font-medium px-3 py-1.5 rounded-lg">
                  <span style={{ color: BRAND }}>{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <Section title="Description" icon={<Layers size={15} />}>
            <p className="text-gray-600 text-sm leading-7">{property.description}</p>
          </Section>

          {/* ALL IMAGES GRID */}
          {images.length > 1 && (
            <Section title="All Photos" icon={<Home size={15} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${i === imgIndex ? "border-[#005327] scale-[1.02]" : "border-transparent hover:border-[#005327]/40"}`}
                  >
                    <img src={img} alt="" className="w-full h-28 object-cover" />
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* SPECIFICATIONS */}
          {Object.keys(specs).length > 0 && (
            <Section title="Property Specifications" icon={<Maximize size={15} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(specs).map(([key, val]) => (
                  <SpecCard key={key} title={key} value={val} />
                ))}
              </div>
            </Section>
          )}

          {/* AMENITIES */}
          {property.amenities?.length > 0 && (
            <Section title="Amenities" icon={<Wifi size={15} />}>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-medium"
                    style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* PROPERTY DETAILS */}
          <Section title="Property Details" icon={<Tag size={15} />}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SpecCard title="Phone" value={property.phoneNumber} />
              <SpecCard title="Views" value={property.views} />
              <SpecCard title="Listed On" value={new Date(property.createdAt).toLocaleDateString("en-IN")} />
              <SpecCard title="Status" value={property.status} />
            </div>
          </Section>

          {/* OWNER */}
          <Section title="Owner Details" icon={<User size={15} />}>
            <div
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ backgroundColor: BRAND_LIGHT, borderColor: `${BRAND}22` }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white shadow">
                <img
                  src={property.ownBy?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(property.ownBy?.fullName || "User")}&background=005327&color=fff`}
                  alt="owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-gray-900 truncate">
                  {property.ownBy?.fullName || "N/A"}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
                  <Mail size={12} /> {property.ownBy?.email || "No Email"}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <Phone size={12} /> {property.ownBy?.phoneNumber || property.phoneNumber || "—"}
                </p>
              </div>
            </div>
          </Section>

        </div>

        {/* ACTION BUTTONS — fixed footer, never scrolls away */}
        <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={onApprove}
            disabled={updating}
            className="flex items-center justify-center gap-2 py-3 text-white font-bold rounded-xl shadow-sm hover:shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 text-sm"
            style={{ backgroundColor: BRAND }}
          >
            <CheckCircle size={16} />
            {updating ? "Processing..." : "Approve"}
          </button>
          <button
            onClick={onReject}
            disabled={updating}
            className="flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 active:scale-95 transition-all disabled:opacity-50 text-sm"
          >
            <XCircle size={16} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
function Section({ title, icon, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: BRAND }}>{icon}</span>
        <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SpecCard({ title, value }) {
  return (
    <div className="bg-[#F5F0E8] rounded-xl p-3.5 border border-[#e3dccd]">
      <p className="text-[11px] text-gray-500 capitalize font-medium mb-1">{title}</p>
      <h3 className="text-[14px] font-bold text-gray-900 truncate">{value ?? "N/A"}</h3>
    </div>
  );
}