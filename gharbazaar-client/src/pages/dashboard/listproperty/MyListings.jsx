import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"; // Not needed - using mock data
import {
  Building2,
  MapPin,
  IndianRupee,
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Plus,
  Search,
  Filter,
  Home,
  TrendingUp,
  Loader2,
  AlertCircle,
  ImageOff,
  ChevronLeft,
  ChevronRight,
  Edit3,
  X,
  Upload,
  Zap,
  HelpCircle,
} from "lucide-react";
import { 
  filterMockListings, 
  updateMockListingStatus, 
  deleteMockListing 
} from "@/data/mockListings";

// =============================================
// MAIN COMPONENT
// =============================================

export default function MyListings() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Action loading states
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  
  // Edit Modal State
  const [editingProperty, setEditingProperty] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Boost Modal State
  const [boostingProperty, setBoostingProperty] = useState(null);
  const [isProcessingBoost, setIsProcessingBoost] = useState(false);

  // -------------------------
  // FETCH
  // -------------------------

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use mock data instead of API call
      const result = filterMockListings({
        search: search.trim(),
        statusFilter,
        typeFilter,
        page,
        limit: 9
      });

      setProperties(result.properties || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, search]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, typeFilter, search]);

  // -------------------------
  // DELETE
  // -------------------------

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

    try {
      setDeletingId(id);
      
      // Use mock data delete function
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = deleteMockListing(id);
      
      if (result.success) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
        setTotal((prev) => prev - 1);
      } else {
        alert("Failed to delete property");
      }
    } catch (err) {
      alert("Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  // -------------------------
  // TOGGLE STATUS
  // -------------------------

  const handleToggleStatus = async (property) => {
    if (property.status === "Rejected" || property.status === "Pending") {
      return;
    }
    const newStatus = property.status === "Available" ? "Closed" : "Available";

    try {
      setTogglingId(property._id);
      
      // Use mock data update function
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = updateMockListingStatus(property._id, newStatus);
      
      if (result.success) {
        setProperties((prev) =>
          prev.map((p) => (p._id === property._id ? { ...p, status: newStatus } : p))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  // -------------------------
  // UPDATE PROPERTY API CALL
  // -------------------------
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update in-memory mock data
      setProperties((prev) =>
        prev.map((p) => {
          if (p._id === editingProperty._id) {
            return {
              ...p,
              title: editingProperty.title,
              price: editingProperty.price,
              location: editingProperty.location,
              city: editingProperty.city,
              type: editingProperty.type,
              listingType: editingProperty.listingType,
              // Note: Image upload won't work with mock data, but we keep existing images
            };
          }
          return p;
        })
      );
      
      setEditingProperty(null); 
      alert("Property updated successfully!");
    } catch (err) {
      alert("Failed to update property");
    } finally {
      setIsUpdating(false);
    }
  };

  // -------------------------
  // BOOST PROPERTY
  // -------------------------
  const handleBoostSubmit = async (duration) => {
    try {
      setIsProcessingBoost(true);

      // Simulate API delay for payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update property with boost status
      setProperties((prev) =>
        prev.map((p) => {
          if (p._id === boostingProperty._id) {
            return {
              ...p,
              isBoosted: true,
              boostExpiresAt: new Date(Date.now() + duration * 7 * 24 * 60 * 60 * 1000).toISOString(),
              boostDuration: duration,
            };
          }
          return p;
        })
      );
      
      setBoostingProperty(null);
      alert(`🚀 Property boosted successfully for ${duration} week${duration > 1 ? 's' : ''}! Your listing is now prioritized.`);
    } catch (err) {
      alert("Failed to boost property. Please try again.");
    } finally {
      setIsProcessingBoost(false);
    }
  };

  // -------------------------
  // STATS
  // -------------------------

  const availableCount = properties.filter((p) => p.status === "available").length;
  const closedCount = properties.filter((p) => p.status === "closed").length;

  // =============================================
  // RENDER
  // =============================================

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-16">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-500 mt-1">
              Manage all your listed properties in one place.
            </p>
          </div>

          <Link
            to="/dashboard/list-property"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Add New Property
          </Link>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <StatCard
            icon={<Home size={20} />}
            label="Total Listings"
            value={total}
            color="emerald"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Active"
            value={availableCount}
            color="blue"
          />
          <StatCard
            icon={<AlertCircle size={20} />}
            label="Closed"
            value={closedCount}
            color="red"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, city, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm appearance-none"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Listing Type Filter */}
        <div className="relative">
          <Building2 size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm appearance-none"
          >
            <option value="">All Types</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchListings} />
      ) : properties.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onDelete={handleDelete}
                onToggle={handleToggleStatus}
                onEdit={(p) => setEditingProperty({ ...p, newImages: null })}
                onBoost={(p) => setBoostingProperty(p)}
                isDeleting={deletingId === property._id}
                isToggling={togglingId === property._id}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm font-semibold text-gray-700 px-4">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* EDIT OVERLAY MODAL */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Property Details</h2>
                <p className="text-xs text-gray-500 mt-0.5">Update listing info and images</p>
              </div>
              <button 
                onClick={() => setEditingProperty(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4 flex-1">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Property Title</label>
                <input
                  type="text"
                  required
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({...editingProperty, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({...editingProperty, price: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Listing Type</label>
                  <select
                    value={editingProperty.listingType}
                    onChange={(e) => setEditingProperty({...editingProperty, listingType: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                  >
                    <option value="Rent">Rent</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Location / Locality</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({...editingProperty, location: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.city || ""}
                    onChange={(e) => setEditingProperty({...editingProperty, city: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Property Type (e.g. Apartment, Villa)</label>
                <input
                  type="text"
                  required
                  value={editingProperty.type}
                  onChange={(e) => setEditingProperty({...editingProperty, type: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 text-sm"
                />
              </div>

              {/* Upload Images Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Upload New Images (Completely replaces existing images)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition relative">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500 text-center px-2">Click to choose new files. Old files are safely removed from the registry automatically.</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setEditingProperty({...editingProperty, newImages: e.target.files})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {editingProperty.newImages && (
                  <p className="text-xs text-amber-600 mt-1 font-medium">
                    {editingProperty.newImages.length} new image(s) selected. Existing items will be deleted upon save.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => setEditingProperty(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition flex items-center gap-2"
                >
                  {isUpdating && <Loader2 size={16} className="animate-spin" />}
                  {isUpdating ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOST PROPERTY MODAL - Matching Website Theme */}
      {boostingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#F5F1E8] rounded-3xl max-w-6xl w-full shadow-2xl border-2 border-gray-200 overflow-hidden">
            
            {/* Close Button */}
            <button 
              onClick={() => setBoostingProperty(null)}
              className="absolute top-6 right-6 p-2.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* LEFT SIDE - Property Info & Benefits */}
              <div className="lg:w-2/5 bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 p-8 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                      <Zap size={32} className="fill-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Boost Your Property</h2>
                    <p className="text-amber-50">Get 10x more visibility & close deals faster</p>
                  </div>

                  {/* Property Card */}
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/30 shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-20 bg-white/20 rounded-xl overflow-hidden shrink-0 border-2 border-white/30">
                        {boostingProperty.images?.[0] ? (
                          <img src={boostingProperty.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageOff size={24} className="text-white/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg leading-tight mb-1">{boostingProperty.title}</h3>
                        <p className="text-amber-100 text-sm flex items-center gap-1 mb-2">
                          <MapPin size={14} />
                          {boostingProperty.location}, {boostingProperty.city}
                        </p>
                        <p className="text-white font-bold text-lg flex items-center gap-0.5">
                          <IndianRupee size={16} />
                          {Number(boostingProperty.price).toLocaleString("en-IN")}
                          {boostingProperty.listingType === "Rent" && <span className="text-sm text-amber-100 font-normal">/mo</span>}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3.5">
                    <h3 className="font-bold text-lg mb-3 text-amber-50">What You Get:</h3>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/30">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Priority Rankings</p>
                        <p className="text-sm text-amber-100">Appear at the top of search results</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/30">
                        <Eye size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">10x Visibility Boost</p>
                        <p className="text-sm text-amber-100">Featured on homepage & categories</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/30">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Social Media Ads</p>
                        <p className="text-sm text-amber-100">Instagram & Facebook promotion</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/30">
                        <Zap size={20} className="fill-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Premium Badge</p>
                        <p className="text-sm text-amber-100">Exclusive "Boosted" tag & styling</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-white/30 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                      <p className="text-3xl font-bold">10x</p>
                      <p className="text-sm text-amber-100">More Views</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                      <p className="text-3xl font-bold">3x</p>
                      <p className="text-sm text-amber-100">Faster Sales</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Pricing Plans */}
              <div className="lg:w-3/5 p-8 lg:p-10 bg-[#F5F1E8]">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h3>
                  <p className="text-gray-600 mb-8">Select the duration that works best for you</p>

                  <div className="grid gap-5">
                    {/* 1 Week Plan */}
                    <button
                      onClick={() => handleBoostSubmit(1)}
                      disabled={isProcessingBoost}
                      className="relative p-6 border-2 border-gray-300 rounded-2xl hover:border-amber-600 hover:shadow-xl transition-all text-left group bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition border border-amber-200">
                              <Zap size={24} className="text-amber-700" />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition">1 Week Boost</p>
                              <p className="text-sm text-gray-600">Quick visibility boost</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-gray-900 group-hover:text-amber-700 transition flex items-center justify-end gap-1">
                            <IndianRupee size={28} />
                            499
                          </p>
                          <p className="text-sm text-gray-500 mt-1">₹71/day</p>
                        </div>
                      </div>
                    </button>

                    {/* 2 Weeks Plan - POPULAR */}
                    <button
                      onClick={() => handleBoostSubmit(2)}
                      disabled={isProcessingBoost}
                      className="relative p-6 border-2 border-amber-500 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all text-left group shadow-lg"
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        ⭐ MOST POPULAR
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-600">
                              <Zap size={24} className="text-white fill-white" />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition">2 Weeks Boost</p>
                              <p className="text-sm text-gray-700">Maximum exposure guaranteed</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-gray-900 group-hover:text-amber-700 transition flex items-center justify-end gap-1">
                            <IndianRupee size={28} />
                            899
                          </p>
                          <p className="text-sm text-emerald-700 font-semibold mt-1">Save ₹99 • ₹64/day</p>
                        </div>
                      </div>
                    </button>

                    {/* 4 Weeks Plan - BEST VALUE */}
                    <button
                      onClick={() => handleBoostSubmit(4)}
                      disabled={isProcessingBoost}
                      className="relative p-6 border-2 border-emerald-500 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-xl transition-all text-left group shadow-lg"
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        💎 BEST VALUE
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-600">
                              <Zap size={24} className="text-white fill-white" />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition">4 Weeks Boost</p>
                              <p className="text-sm text-gray-700">Ultimate growth package</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-gray-900 group-hover:text-emerald-700 transition flex items-center justify-end gap-1">
                            <IndianRupee size={28} />
                            1,599
                          </p>
                          <p className="text-sm text-emerald-700 font-semibold mt-1">Save ₹397 • ₹57/day</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {isProcessingBoost && (
                    <div className="flex items-center justify-center gap-2 text-gray-700 py-6 mt-4">
                      <Loader2 size={24} className="animate-spin text-amber-700" />
                      <span className="font-semibold">Processing your boost...</span>
                    </div>
                  )}

                  {/* Trust Badge */}
                  <div className="mt-8 bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-white text-xl">💡</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-1">Success Guarantee</p>
                        <p className="text-sm text-gray-700">Properties with Boost get <strong className="text-emerald-700">10x more inquiries</strong> and close <strong className="text-emerald-700">3x faster</strong> than regular listings. Join 5,000+ successful sellers!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================
// PROPERTY CARD
// =============================================

function PropertyCard({ property, onDelete, onToggle, onEdit, onBoost, isDeleting, isToggling }) {
  const isAvailable = property.status === "available";
  const isBoosted = property.isBoosted;
  const coverImage = property.images?.[0];

  return (
    <div className={`bg-white rounded-3xl border ${isBoosted ? 'border-orange-300 shadow-lg shadow-orange-100' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col relative`}>
      
      {/* Boosted Corner Badge */}
      {isBoosted && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-2xl shadow-lg flex items-center gap-1">
            <Zap size={12} className="fill-white" />
            BOOSTED
          </div>
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
            <ImageOff size={36} />
            <span className="text-xs">No image</span>
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isAvailable
                ? "bg-emerald-500 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {property.status}
          </span>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-gray-700 shadow-sm">
            {property.listingType}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Badge - Rent/Sale */}
        <div className="mb-2">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
            property.listingType === "Rent" 
              ? "bg-blue-100 text-blue-700 border border-blue-200" 
              : "bg-purple-100 text-purple-700 border border-purple-200"
          }`}>
            For {property.listingType}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 text-lg truncate">{property.title}</h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">
            {property.location}{property.city ? `, ${property.city}` : ""}
          </span>
        </div>

        <div className="flex items-center gap-1 text-emerald-600 font-bold text-lg mt-3">
          <IndianRupee size={17} />
          {Number(property.price).toLocaleString("en-IN")}
          {property.listingType === "Rent" && (
            <span className="text-xs text-gray-400 font-normal">/mo</span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          <Building2 size={13} />
          {property.type}
          <span className="mx-1">·</span>
          <Eye size={13} />
          {property.views?.length ?? 0} views
        </div>

        {/* AMENITIES PREVIEW */}
        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full"
              >
                {a}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs text-gray-400">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
          {/* Row 1: Toggle, Edit, Delete */}
          <div className="flex items-center gap-2">
            {/* Toggle Status */}
            <button
              onClick={() => onToggle(property)}
              disabled={isToggling}
              title={isAvailable ? "Mark as Closed" : "Mark as Available"}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl transition flex-1 justify-center ${
                isAvailable
                  ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                  : property.status === "Rejected" || property.status === "Pending"
                  ? "bg-gray-100 text-emerald-600 hover:cursor-not-allowed"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              }`}
            >
              {isToggling ? (
                <Loader2 size={14} className="animate-spin" />
              ) : isAvailable ? (
                <ToggleRight size={16} />
              ) : (
                <ToggleLeft size={16} />
              )}
              {isAvailable ? "Close" : "Activate"}
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(property)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <Edit3 size={14} />
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(property._id)}
              disabled={isDeleting}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              {isDeleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Delete
            </button>
          </div>

          {/* Row 2: Boost Button with Info */}
          <div className="flex items-center gap-2">
            {isBoosted ? (
              <div className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border border-orange-200 flex-1 justify-center">
                <Zap size={15} className="fill-orange-500" />
                <span className="font-bold">Boosted until {new Date(property.boostExpiresAt).toLocaleDateString()}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onBoost(property)}
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex-1 justify-center"
                >
                  <Zap size={15} className="fill-white" />
                  Boost Property
                </button>
                
                {/* Info Icon with Tooltip */}
                <div className="relative group/tooltip">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                    <HelpCircle size={16} />
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 w-72 bg-gray-900 text-white text-xs rounded-xl p-4 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 shadow-xl z-10">
                    <div className="font-bold text-sm mb-2 text-orange-400">🚀 Boost Your Property</div>
                    <ul className="space-y-1.5 text-gray-200">
                      <li>• <strong>Top Rankings:</strong> Appear first in your area</li>
                      <li>• <strong>Instagram Ads:</strong> Reach 1000s of potential buyers</li>
                      <li>• <strong>10x Visibility:</strong> Get more views & inquiries</li>
                      <li>• <strong>Premium Badge:</strong> Stand out from competitors</li>
                      <li>• <strong>Fast Results:</strong> Rent/sell 3x faster</li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-gray-700 text-orange-300 font-semibold">
                      💰 Starting from ₹499/week
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// HELPERS
// =============================================

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-100" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
            <div className="h-6 bg-gray-100 rounded-lg w-1/3" />
            <div className="h-10 bg-gray-100 rounded-xl mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
        <Home size={36} className="text-emerald-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">No listings yet</h3>
      <p className="text-gray-400 mt-2 max-w-xs">
        You haven't listed any properties. Start by adding your first one!
      </p>
      <Link
        to="/dashboard/list-property"
        className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition hover:-translate-y-0.5"
      >
        <Plus size={18} />
        Add Property
      </Link>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-red-100">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle size={30} className="text-red-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">Something went wrong</h3>
      <p className="text-gray-400 mt-1 text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition"
      >
        Try Again
      </button>
    </div>
  );
}