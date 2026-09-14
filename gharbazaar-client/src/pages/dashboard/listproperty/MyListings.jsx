import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "lucide-react";

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

  // -------------------------
  // FETCH
  // -------------------------

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({ page, limit: 9 });
      if (statusFilter) params.append("status", statusFilter);
      if (typeFilter) params.append("listingType", typeFilter);
      if (search.trim()) params.append("search", search.trim());

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/myListings?${params.toString()}`,
        { withCredentials: true }
      );

      setProperties(data.properties || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
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
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/myListings/${id}`,
        { withCredentials: true }
      );
      setProperties((prev) => prev.filter((p) => p._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete property");
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
    const newStatus = property.status === "available" ? "closed" : "available";

    try {
      setTogglingId(property._id);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/myListings/${property._id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setProperties((prev) =>
        prev.map((p) => (p._id === property._id ? data.property || data : p))
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
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

      const formData = new FormData();
      formData.append("title", editingProperty.title);
      formData.append("price", editingProperty.price);
      formData.append("location", editingProperty.location);
      formData.append("city", editingProperty.city);
      formData.append("type", editingProperty.type);
      formData.append("listingType", editingProperty.listingType);
      
      // If new images are uploaded, tell backend to completely overwrite the old array
      if (editingProperty.newImages && editingProperty.newImages.length > 0) {
        Array.from(editingProperty.newImages).forEach((file) => {
          formData.append("images", file);
        });
        // Explicit flag informing backend to prune older assets completely
        formData.append("overwriteImages", "true");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/updateProperty/${editingProperty._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProperties((prev) =>
        prev.map((p) => (p._id === editingProperty._id ? data.property || data : p))
      );
      
      setEditingProperty(null); 
      alert("Property updated successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update property");
    } finally {
      setIsUpdating(false);
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
    <div className="min-h-screen bg-gray-50 pb-16">
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
    </div>
  );
}

// =============================================
// PROPERTY CARD
// =============================================

function PropertyCard({ property, onDelete, onToggle, onEdit, isDeleting, isToggling }) {
  const isAvailable = property.status === "available";
  const coverImage = property.images?.[0];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col">
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
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
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