import { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  ImagePlus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  X,
  Eye,
  EyeOff,
  Link as LinkIcon,
} from "lucide-react";
import {
  useGetAllAdvertisementsAdminQuery,
  useCreateAdvertisementAdminMutation,
  useUpdateAdvertisementAdminMutation,
  useDeleteAdvertisementAdminMutation,
  useReorderAdvertisementsAdminMutation,
} from "../../../store/HeroSectionQuery/advertisementAdminQuery";

// ─── Banner Form ─────────────────────────────────────────────────────────────
function BannerForm({ initial, onCancel, onSubmit, submitting }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [link, setLink] = useState(initial?.link ?? "/");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image ?? null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initial && !file) {
      toast.error("Please choose an image for the new banner");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (file) formData.append("image", file);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image picker */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Banner Image
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 relative aspect-[21/9] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-400 transition-colors"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImagePlus size={28} />
              <span className="text-sm font-medium">Click to upload image</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-[11px] text-gray-400 mt-1.5">
          Uploaded at original resolution — no compression applied.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Title (optional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Monsoon Move-in Offer"
          className="mt-1.5 w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Link */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Link (where it navigates on click)
        </label>
        <div className="relative mt-1.5">
          <LinkIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="/properties"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {initial ? "Save Changes" : "Add Banner"}
        </button>
      </div>
    </form>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Banner Card ─────────────────────────────────────────────────────────────
function BannerCard({ banner, index, total, onEdit, onDelete, onToggleActive, onMove, moving }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      {/* Image */}
      <div className="relative aspect-[21/9] bg-gray-100">
        <img
          src={banner.image}
          alt={banner.title || "Banner"}
          className="w-full h-full object-cover"
        />
        {!banner.isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold uppercase tracking-wide px-3 py-1 bg-black/40 rounded-full">
              Hidden from site
            </span>
          </div>
        )}
        {/* Active badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            banner.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {banner.isActive ? "Live" : "Hidden"}
        </span>
      </div>

      {/* Info + actions */}
      <div className="p-4">
        <p className="font-semibold text-gray-900 text-sm truncate">
          {banner.title || "Untitled banner"}
        </p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{banner.link}</p>

        <div className="flex items-center justify-between mt-4">
          {/* Reorder */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={index === 0 || moving}
              onClick={() => onMove(banner, "up")}
              className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-30 transition-colors"
              title="Move up"
            >
              <ArrowUp size={14} />
            </button>
            <button
              disabled={index === total - 1 || moving}
              onClick={() => onMove(banner, "down")}
              className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-30 transition-colors"
              title="Move down"
            >
              <ArrowDown size={14} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleActive(banner)}
              className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
              title={banner.isActive ? "Hide from site" : "Show on site"}
            >
              {banner.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={() => onEdit(banner)}
              className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(banner)}
              className="p-2 rounded-lg bg-gray-50 border border-red-200 text-red-400 hover:text-red-600 hover:border-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function HeroBannerManager() {
  const { data, isLoading, isError, error, refetch } = useGetAllAdvertisementsAdminQuery();
  const [createBanner, { isLoading: creating }] = useCreateAdvertisementAdminMutation();
  const [updateBanner, { isLoading: updating }] = useUpdateAdvertisementAdminMutation();
  const [deleteBanner] = useDeleteAdvertisementAdminMutation();
  const [reorderBanners, { isLoading: reordering }] = useReorderAdvertisementsAdminMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deletingBanner, setDeletingBanner] = useState(null);

  // transformResponse normalizes everything to { advertisements: [] }
  const banners = data?.advertisements ?? [];

  const handleCreate = async (formData) => {
    try {
      await createBanner(formData).unwrap();
      toast.success("Banner added successfully");
      setShowAddModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add banner");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateBanner({ id: editingBanner._id, formData }).unwrap();
      toast.success("Banner updated successfully");
      setEditingBanner(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update banner");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBanner(deletingBanner._id).unwrap();
      toast.success("Banner deleted");
      setDeletingBanner(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete banner");
    }
  };

  const handleToggleActive = async (banner) => {
    const formData = new FormData();
    formData.append("isActive", String(!banner.isActive));
    try {
      await updateBanner({ id: banner._id, formData }).unwrap();
      toast.success(banner.isActive ? "Banner hidden from site" : "Banner is now live");
    } catch {
      toast.error("Failed to update banner status");
    }
  };

  const handleMove = async (banner, direction) => {
    const sorted = [...banners].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((b) => b._id === banner._id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[swapIdx];
    const newOrder = [
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ];
    try {
      await reorderBanners(newOrder).unwrap();
    } catch {
      toast.error("Failed to reorder banners");
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hero Banner Slides</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage the images shown in the homepage carousel. Uploads keep original image quality.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
        >
          <ImagePlus size={15} />
          Add Banner
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={22} className="animate-spin text-indigo-600" />
          <span className="text-sm">Loading banners…</span>
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm mb-2">
            Couldn't load banners.{" "}
            <button
              onClick={refetch}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Try again
            </button>
          </p>
          {error && (
            <p className="text-red-400 text-xs mt-1">
              {error?.status} — {error?.data?.message || JSON.stringify(error?.data) || "Unknown error"}
            </p>
          )}
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <ImagePlus size={36} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400 text-sm font-medium">No banners yet.</p>
          <p className="text-gray-400 text-xs mt-1">Click "Add Banner" to create your first hero slide.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[...banners]
            .sort((a, b) => a.order - b.order)
            .map((banner, index) => (
              <BannerCard
                key={banner._id}
                banner={banner}
                index={index}
                total={banners.length}
                moving={reordering}
                onEdit={setEditingBanner}
                onDelete={setDeletingBanner}
                onToggleActive={handleToggleActive}
                onMove={handleMove}
              />
            ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add Hero Banner" onClose={() => setShowAddModal(false)}>
          <BannerForm
            onCancel={() => setShowAddModal(false)}
            onSubmit={handleCreate}
            submitting={creating}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editingBanner && (
        <Modal title="Edit Hero Banner" onClose={() => setEditingBanner(null)}>
          <BannerForm
            initial={editingBanner}
            onCancel={() => setEditingBanner(null)}
            onSubmit={handleUpdate}
            submitting={updating}
          />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deletingBanner && (
        <Modal title="Delete Banner?" onClose={() => setDeletingBanner(null)}>
          <p className="text-sm text-gray-500 mb-6">
            This will permanently remove{" "}
            <span className="font-semibold text-gray-700">
              "{deletingBanner.title || "this banner"}"
            </span>{" "}
            from the homepage and delete its image. This can't be undone.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDeletingBanner(null)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
