import React, { useState, useRef } from "react";
import { MapPin, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addBookmark,
  removeBookmark,
} from "../../../../store/bookmark/bookMarkSlice";
import { useToggleBookmarkMutation } from "../../../../store/propertyQuery/getPropertyQuery";

const RecentCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const requestLock = useRef(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { _id, title, price, location, images, status, views } = property || {};
  const isFavorite = bookmarks?.some(
    (item) => String(item?._id) === String(property?._id),
  );

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    if (requestLock.current || loading) return;
    requestLock.current = true;
    const wasFavorite = isFavorite;
    try {
      setLoading(true);
      if (wasFavorite) dispatch(removeBookmark(_id));
      else dispatch(addBookmark(property));
      await toggleBookmark(_id).unwrap();
    } catch (error) {
      console.error(error);
      if (wasFavorite) dispatch(addBookmark(property));
      else dispatch(removeBookmark(_id));
      toast.error("Action failed");
    } finally {
      setLoading(false);
      requestLock.current = false;
    }
  };

  const handleNavigate = () => navigate(`/property/${_id}`);

  const statusText = status || "Available";
  const isAvailable = statusText.toLowerCase().includes("available");

  return (
    <div
      onClick={handleNavigate}
      className="w-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col p-2.5"
    >
      {/* IMAGE — inset with padding, rounded corners */}
      <div className="relative h-[195px] sm:h-[205px] w-full overflow-hidden bg-gray-100 shrink-0">
        <img
          src={(!imgError && images?.[0]) || "https://via.placeholder.com/800x600/1B9E4B/FFFFFF?text=No+Image"}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges — top left */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span
            className={`font-semibold text-[11px] tracking-wide px-2.5 py-1 ${
              isAvailable
                ? "bg-[#1B9E4B] text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {isAvailable ? "Available" : statusText}
          </span>
          <span className="font-semibold text-[11px] tracking-wide px-2.5 py-1 bg-[#2563eb] text-white">
            Verified
          </span>
        </div>

        {/* Heart — top right, rounded square */}
        <button
          onClick={handleBookmark}
          disabled={loading}
          className={`absolute top-2.5 right-2.5 w-8 h-8 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            loading ? "pointer-events-none" : "hover:scale-110 active:scale-95"
          }`}
        >
          <Heart
            size={14}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-1.5 pt-3 pb-1 flex flex-col flex-1 justify-between">
        <div>
          {/* Title + Views */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-snug flex-1 line-clamp-1">
              {title || "Single room with AC"}
            </h3>
            <div className="flex items-center gap-0.5 text-gray-400 mt-0.5 shrink-0">
              <Eye size={13} />
              <span className="text-[11px] font-medium">
                {Array.isArray(views) ? views.length : views || 0}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin size={11} className="text-gray-400 shrink-0" />
            <span className="text-[11.5px] text-gray-500 line-clamp-1">
              {location || "Near Quantum Uni, Chhutmalpur"}
            </span>
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-gray-100">
          <div className="flex items-baseline text-[#147638]">
            <span className="text-sm font-extrabold">₹</span>
            <span className="text-lg sm:text-xl font-black tracking-tight ml-0.5">
              {price
                ? price >= 10000000
                  ? `${(price / 10000000).toFixed(1)} Cr`
                  : price.toLocaleString("en-IN")
                : "3,500"}
            </span>
            <span className="text-[11px] text-[#1b9e4b] font-medium ml-0.5">
              /month
            </span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
            className="bg-[#1B9E4B] hover:bg-[#147638] active:scale-95 text-white text-xs font-bold px-4 py-1.5 transition-colors whitespace-nowrap"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentCard;
