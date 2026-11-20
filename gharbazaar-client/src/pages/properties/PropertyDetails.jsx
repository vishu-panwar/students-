// ===============================
// PropertyDetails.jsx
// WhatsApp Preview Optimized with Infinite Scroll Similar Properties & Razorpay Visit Booking
// FIX: Book Visit flow now properly sequenced:
//   fill form -> Pay -> Razorpay loads -> create-order -> user pays ->
//   verify-payment -> (only if verified) createVisit -> success toast
// paymentLoading now stays true for the whole flow instead of clearing
// right after the Razorpay sheet opens.
// ===============================

import React, { useEffect, useMemo, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import {
  MapPin,
  Bed,
  Bath,
  Heart,
  Share2,
  Check,
  ArrowLeft,
  Phone,
  Home,
  Eye,
  Map,
  Calendar,
  BadgeIndianRupee,
  X,
} from "lucide-react";
import {
  useGetPropertyByIdQuery,
  useToggleBookmarkMutation,
  useUpdateviewMutation,
} from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
} from "../../store/bookmark/bookMarkSlice";
import RecentCard from "../../components/Home/properties/Recentsection/RecentCard";
import RecentCardSkeleton from "../../components/Home/properties/Recentsection/RecentCardSkeleton";

// Booking Modal Component
function BookingModal({ property, onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.phone || user?.phoneNumber || "");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [preferredContact, setPreferredContact] = useState({
    whatsapp: true,
    email: false,
    call: false
  });

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!fullName || !email || !mobile) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms and privacy policy");
      return;
    }

    // Store step 1 data in localStorage for step 2
    localStorage.setItem('bookingStep1', JSON.stringify({
      fullName,
      email,
      mobile,
      preferredContact
    }));

    // Close modal first, then navigate
    onClose();
    
    // Small delay to ensure modal closes smoothly before navigation
    setTimeout(() => {
      navigate(`/booking-step2/${property?._id}`);
    }, 100);
  };

  const monthlyRent = property?.price || 10000;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden my-4">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Book Now</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Steps Progress - Compact */}
        <div className="bg-white px-6 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B9E4B]">
                  <path d="M9 11H15M9 15H15M21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">STEP1</p>
                <p className="text-xs font-bold text-gray-900">Booking Details</p>
              </div>
              <div className="flex-1 h-px bg-[#1B9E4B] ml-2"></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21M7 14H7.01M11 14H11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-semibold text-gray-400 uppercase">STEP2</p>
                <p className="text-xs font-bold text-gray-400">Payment</p>
              </div>
              <div className="flex-1 h-px bg-gray-200 ml-2"></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-semibold text-gray-400 uppercase">STEP3</p>
                <p className="text-xs font-bold text-gray-400">Booking Confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Compact Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6 max-h-[70vh] overflow-y-auto">
          {/* Left - Personal Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Details</h3>
            
            <div className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1B9E4B] focus:ring-1 focus:ring-[#1B9E4B]/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1B9E4B] focus:ring-1 focus:ring-[#1B9E4B]/20"
                />
              </div>

              {/* Mobile */}
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Code <span className="text-red-500">*</span></label>
                  <div className="border border-gray-300 rounded-lg px-2 py-2.5 text-sm flex items-center justify-between">
                    <span>+91</span>
                    <X size={12} className="text-gray-400" />
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Your Mobile Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1B9E4B] focus:ring-1 focus:ring-[#1B9E4B]/20"
                  />
                </div>
              </div>

              {/* Best Way */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Best Way To Reach You</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.whatsapp}
                      onChange={(e) => setPreferredContact({...preferredContact, whatsapp: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B9E4B] focus:ring-[#1B9E4B]"
                    />
                    <span className="text-xs font-medium text-gray-700">Whatsapp</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.email}
                      onChange={(e) => setPreferredContact({...preferredContact, email: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B9E4B] focus:ring-[#1B9E4B]"
                    />
                    <span className="text-xs font-medium text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredContact.call}
                      onChange={(e) => setPreferredContact({...preferredContact, call: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B9E4B] focus:ring-[#1B9E4B]"
                    />
                    <span className="text-xs font-medium text-gray-700">Call</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#1B9E4B] focus:ring-[#1B9E4B]"
                  />
                  <span className="text-xs text-gray-600">
                    I agree with all the <span className="text-[#1B9E4B] underline">terms</span> and <span className="text-[#1B9E4B] underline">privacy</span> of amberstudent.
                  </span>
                </label>
              </div>

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={!fullName || !email || !mobile || !agreeTerms}
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                  !fullName || !email || !mobile || !agreeTerms
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#E91E63] hover:bg-[#C2185B] text-white shadow-md'
                }`}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right - Property Card */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={property?.images?.[0] || "https://via.placeholder.com/400x200"}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-0.5">
                  {property?.title || "The Greenwich Student Collective, London"}
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  {property?.location || "London, England, GB"}
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div>
                    <p className="text-gray-500 mb-0.5">Room Type</p>
                    <p className="font-semibold text-gray-900">{property?.propertyType || "Standard Studio"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Duration</p>
                    <p className="font-semibold text-gray-900">51 weeks</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Available From</p>
                    <p className="font-semibold text-gray-900">12 Sep, 2026</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Move-Out</p>
                    <p className="font-semibold text-gray-900">3 Sep, 2027</p>
                  </div>
                </div>

                {/* Rent */}
                <div className="pt-3 border-t border-gray-200 mb-4">
                  <p className="text-xs text-gray-500 mb-0.5">Rent</p>
                  <p className="text-lg font-black text-gray-900">
                    ₹{monthlyRent.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-gray-600"> / week</span>
                  </p>
                </div>

                {/* Icons */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-200">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 mb-1 text-[#E91E63]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z"/><path d="M2 17L12 22L22 17"/><path d="M2 12L12 17L22 12"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-semibold text-gray-700 leading-tight">Lowest Price<br/>Guarantee</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 mb-1 text-[#E91E63]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-semibold text-gray-700 leading-tight">Verified<br/>Properties</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 mb-1 text-[#E91E63]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 8L21 12M21 12L17 16M21 12H9M9 4L5 8L9 12"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-semibold text-gray-700 leading-tight">24x7 Personal<br/>Assistance</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 mb-1 text-[#E91E63]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-semibold text-gray-700 leading-tight">10.7K+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===============================
// CONFIG
// ===============================
const GHARBAZAAR_WHATSAPP = "919548283300";
const APP_BASE_URL = "https://gharbazaar.in";

// ===============================
// WHATSAPP
// ===============================
const openWhatsApp = (property) => {
  if (!property) return;

  const propertyLink = `https://gharbazaar.in/property/${property?._id}`;

  const message = `
*${property?.title}*

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}

Hello GharBazaar,
I am interested in this property.
Please share more details.
`;

  const url = `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(
    message,
  )}`;

  window.open(url, "_blank");
};

// ===============================
// BACK BUTTON
// ===============================
const BackButton = ({ onClick, variant = "dark" }) => {
  const isDark = variant === "dark";

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium
        transition-all duration-200 ease-out select-none
        ${
          isDark
            ? "bg-[#147638] hover:bg-[#1B9E4B] text-white border border-[#1B9E4B]/20"
            : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
        }
      `}
    >
      <ArrowLeft
        size={14}
        strokeWidth={2.5}
        className={`transition-transform duration-200 group-hover:-translate-x-0.5 ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      />
      <span>Back</span>
    </button>
  );
};

// ===============================
// RAZORPAY SDK LOADER
// ===============================
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

// ===============================
// MAIN COMPONENT
// ===============================
export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  // tracks which stage of the booking flow we're in, purely for UI text
  const [bookingStage, setBookingStage] = useState(""); // "", "order", "verifying", "scheduling"

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading, isError, refetch } = useGetPropertyByIdQuery({ id });
  const [updateview] = useUpdateviewMutation();
  const property = data?.data;
  
  // Debug logging
  useEffect(() => {
    console.log('🔍 PropertyDetails - ID:', id);
    console.log('📦 PropertyDetails - Data:', data);
    console.log('📦 PropertyDetails - Property:', property);
    console.log('⏳ PropertyDetails - Loading:', isLoading);
    console.log('❌ PropertyDetails - Error:', isError);
  }, [id, data, property, isLoading, isError]);

  const [currentImage, setCurrentImage] = useState(0);

  // Infinite Scroll States for Similar Properties
  const [similarProperties, setSimilarProperties] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Guard reference to prevent duplicate fetching concurrent triggers
  const isFetchingRef = useRef(false);

  // Visit Scheduling Input States
  const [visitDate, setVisitDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [visitMessage, setVisitMessage] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // ===============================
  // VIEW TRACKING
  // ===============================
  useEffect(() => {
    const handleview = async () => {
      if (!property?._id) return;
      try {
        await updateview(property?._id);
      } catch (error) {
        console.log("View tracking failed", error);
      }
    };
    handleview();
  }, [property?._id]);

  // ===============================
  // RESET COMPONENT STATE ON ID MUTATION
  // ===============================
  useEffect(() => {
    setCurrentImage(0);
    setSimilarProperties([]);
    setPage(1);
    setHasMore(true);
    isFetchingRef.current = false;
    setVisitDate("");
    setTimeSlot("");
    setVisitMessage("");
    setShowBookingForm(false);
  }, [id]);

  // ===============================
  // FETCH SIMILAR PROPERTIES (PAGINATED)
  // ===============================
  const fetchSimilarProperties = async (currentPage, append = false) => {
    if (!property || isFetchingRef.current) return;

    try {
      setSimilarLoading(true);
      isFetchingRef.current = true;

      const baseUrl =
        import.meta.env.VITE_BASE_URL || "https://gharbazaar.in/api";
      const response = await fetch(
        `${baseUrl}/getSimilarProperty?page=${currentPage}&limit=5`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        },
      );

      if (response.ok) {
        const resData = await response.json();
        const incomingData = resData?.data || [];

        setSimilarProperties((prev) =>
          append ? [...prev, ...incomingData] : incomingData,
        );
        setHasMore(resData?.hasMore ?? incomingData.length === 5);
      }
    } catch (error) {
      console.error("Failed to fetch similar properties:", error);
    } finally {
      setSimilarLoading(false);
      isFetchingRef.current = false;
    }
  };

  // Run initial call when base item details are ready
  useEffect(() => {
    if (property && page === 1 && similarProperties.length === 0) {
      fetchSimilarProperties(1, false);
    }
  }, [property, id]);

  // Infinite Page Increment Trigger Engine
  useEffect(() => {
    if (page > 1 && property) {
      fetchSimilarProperties(page, true);
    }
  }, [page]);

  // ===============================
  // SCROLL TO BOTTOM INTERCEPTOR (OPTIMIZED FOR EARLY FETCH)
  // ===============================
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || similarLoading || isFetchingRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight - (scrollTop + windowHeight) < 800) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, similarLoading]);

  // ===============================
  // FAVORITE CHECK
  // ===============================
  const isFavorite = useMemo(() => {
    if (!property?._id) return false;
    return (
      bookmarks?.some((item) => item?._id === property?._id) ||
      property?.bookmarks?.some(
        (bookmarkId) => bookmarkId === user?._id || bookmarkId === user?.id,
      )
    );
  }, [bookmarks, property?._id, property?.bookmarks, user?._id, user?.id]);

  // ===============================
  // BOOKMARK
  // ===============================
  const handleBookmark = async () => {
    if (!user) {
      return toast.error("Please login first");
    }
    if (bookmarkLoading) return;

    const propertyId = property?._id;
    const wasFavorite = isFavorite;

    try {
      setBookmarkLoading(true);
      if (wasFavorite) {
        dispatch(removeBookmark(propertyId));
      } else {
        dispatch(addBookmark(property));
      }

      await toggleBookmark(propertyId).unwrap();
    } catch (error) {
      console.error(error);
      if (wasFavorite) {
        dispatch(addBookmark(property));
      } else {
        dispatch(removeBookmark(propertyId));
      }
      toast.error("Action failed");
    } finally {
      setBookmarkLoading(false);
    }
  };

  // ===============================
  // FREE VISIT BOOKING (NO PAYMENT)
  // ===============================
  const handleFreeVisitBooking = async () => {
    if (!user) {
      return toast.error("Please login first to book a visit");
    }

    if (!visitDate || !timeSlot) {
      return toast.error("Please fill in both Visit Date and Time Slot.");
    }

    const baseUrl =
      import.meta.env.VITE_BASE_URL || "https://gharbazaar.in/api";

    try {
      const visitRes = await axios.post(
        `${baseUrl}/createVisit`,
        {
          propertyId: property?._id,
          visitDate,
          timeSlot,
          message: visitMessage,
        },
        { withCredentials: true }
      );

      if (visitRes?.data?.success === false) {
        toast.error(visitRes?.data?.message || "Failed to schedule visit");
        return;
      }

      toast.success("Visit scheduled successfully!");
      setVisitDate("");
      setTimeSlot("");
      setVisitMessage("");
      setShowBookingForm(false);
      refetch();
    } catch (error) {
      console.error("Visit booking failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to schedule visit. Please try again."
      );
    }
  };

  // ===============================
  // SHARE
  // ===============================
  const handleShare = async () => {
    if (!property) return;

    const propertyLink = `https://gharbazaar.in/property/${property?._id}`;
    const message = `
${property?.title}

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}
`;

    const popup = document.createElement("div");
    popup.innerHTML = `
    <div id="gharbazaar-share-overlay"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.55);
        z-index:99999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      "
    >
      <div
        style="
          background:#fff;
          width:100%;
          max-width:420px;
          border-radius:12px;
          padding:24px;
          box-shadow:0 10px 40px rgba(0,0,0,0.2);
          font-family:sans-serif;
        "
      >
        <h2 style="margin:0 0 16px; font-size:20px; font-weight:700; color:#111827;">
          Share Property
        </h2>
        <textarea
          id="gharbazaar-share-text"
          readonly
          style="
            width:100%;
            height:160px;
            border:1px solid #e5e7eb;
            border-radius:8px;
            padding:14px;
            resize:none;
            font-size:14px;
            color:#374151;
            outline:none;
          "
        >${message}</textarea>
        <div style="display:flex; gap:12px; margin-top:18px;">
          <button
            id="gharbazaar-copy-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#1B9E4B;
              color:white;
              font-weight:600;
              cursor:pointer;
            "
          >
            Copy
          </button>
          <button
            id="gharbazaar-close-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#f3f4f6;
              color:#111827;
              font-weight:600;
              cursor:pointer;
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(popup);

    const closePopup = () => {
      popup.remove();
    };

    document
      .getElementById("gharbazaar-copy-btn")
      ?.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(message);
          closePopup();
        } catch (error) {
          console.error(error);
        }
      });

    document
      .getElementById("gharbazaar-close-btn")
      ?.addEventListener("click", closePopup);
    document
      .getElementById("gharbazaar-share-overlay")
      ?.addEventListener("click", (e) => {
        if (e.target.id === "gharbazaar-share-overlay") closePopup();
      });
  };

  // ===============================
  // RAZORPAY & VISIT SCHEDULING SYSTEM
  // Sequence:
  //   1. Validate form (date + time slot filled)
  //   2. Load Razorpay SDK
  //   3. Create order on backend (/create-order)
  //   4. Open Razorpay checkout -> user pays
  //   5. On success -> verify payment (/verify-payment)
  //   6. Only if verified -> create the visit (/createVisit) with
  //      visitDate, timeSlot, message
  //   7. Show "Visit booked successfully!" and reset the form
  // paymentLoading stays true for the ENTIRE flow (not just until the
  // Razorpay sheet opens) so the button can't be double-clicked and the
  // UI accurately reflects what's happening.
  // ===============================
  const startPayment = async ({ amount, planName }) => {
    if (!user) {
      return toast.error("Please login first to book a visit");
    }

    if (!visitDate || !timeSlot) {
      return toast.error(
        "Please fill in both Visit Date and Time Slot before continuing.",
      );
    }

    const baseUrl =
      import.meta.env.VITE_BASE_URL || "https://gharbazaar.in/api";

    try {
      setPaymentLoading(true);
      setBookingStage("order");

      // 1. Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error(
          "Razorpay SDK failed to load. Check your internet connection.",
        );
        setPaymentLoading(false);
        setBookingStage("");
        return;
      }

      // 2. Create order on backend
      const { data: orderData } = await axios.post(
        `${baseUrl}/create-order`,
        { planName },
        { withCredentials: true },
      );

      if (!orderData?.order?.id || !orderData?.key) {
        toast.error("Could not create payment order. Please try again.");
        setPaymentLoading(false);
        setBookingStage("");
        return;
      }

      // 3. Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "GharBazaar",
        description: planName,
        theme: { color: "#0D6B3F" },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || user?.phoneNumber || "",
        },
        handler: async (response) => {
          // 4. Verify payment
          try {
            setBookingStage("verifying");
            const verifyRes = await axios.post(
              `${baseUrl}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true },
            );

            if (!verifyRes?.data?.success) {
              toast.error(
                "Payment verification failed. If money was deducted, contact support.",
              );
              return;
            }
            // 5. Only after verified payment, create the visit booking
            setBookingStage("scheduling");
            try {
              const visitRes = await axios.post(
                `${baseUrl}/createVisit`,
                {
                  propertyId: property?._id,
                  visitDate,
                  timeSlot,
                  message: visitMessage,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                },
                { withCredentials: true},
              );

              if (visitRes?.data?.success === false) {
                toast.error(
                  "Payment verified, but appointment scheduling failed. Contact support.",
                );
                return;
              }

              // 6. All good
              toast.success("Visit booked successfully!");
              setVisitDate("");
              setTimeSlot("");
              setVisitMessage("");
              setShowBookingForm(false);
              refetch()
            } catch (bookingError) {
              console.error("Booking creation failed:", bookingError);
              toast.error(
                bookingError.response?.data?.message
              );
            }
          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            toast.error("Payment verification failed");
          } finally {
            setPaymentLoading(false);
            setBookingStage("");
          }
        },
        modal: {
          // fires if the user closes the Razorpay sheet without paying
          ondismiss: () => {
            setPaymentLoading(false);
            setBookingStage("");
          },
        },
      };

      new window.Razorpay(options).open();
      // NOTE: paymentLoading is intentionally NOT cleared here.
      // It stays true until the handler (payment success) or
      // modal.ondismiss (payment cancelled) fires.
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to start payment. Please try again.",
      );
      setPaymentLoading(false);
      setBookingStage("");
    }
  };

  const bookingButtonLabel = () => {
    if (bookingStage === "order") return "Creating order...";
    if (bookingStage === "verifying") return "Verifying payment...";
    if (bookingStage === "scheduling") return "Scheduling your visit...";
    if (paymentLoading) return "Initializing Gateway...";
    return "Pay ₹299 & Schedule Visit";
  };

  // ===============================
  // IMAGES
  // ===============================
  const images =
    property?.images?.length > 0
      ? property.images
      : ["https://via.placeholder.com/1200x600"];

  const previewImage = images?.[0]?.startsWith("http")
    ? images?.[0]
    : `${APP_BASE_URL}/${images?.[0]}`;

  const propertyUrl = `${APP_BASE_URL}/share/property/${property?._id}`;
  const isClosed = property?.status?.toLowerCase() === "closed";

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#1B9E4B] animate-spin" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Loading property…</p>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Home size={24} className="text-red-400" />
        </div>
        <p className="text-red-500 text-lg font-bold">Property not found</p>
        <BackButton
          onClick={() => navigate("/Recent-properties")}
          variant="light"
        />
      </div>
    );
  }
  
  const userId = user?.id.toString();
  const isBooked = property?.schedule?.includes(user?.id.toString()) || false;

  return (
    <>
      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal 
          property={property} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}

      <Helmet>
        <title>{property?.title} | GharBazaar</title>
        <meta
          name="description"
          content={property?.description || "Premium property listing"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={property?.title} />
        <meta
          property="og:description"
          content={property?.description || "Premium property listing"}
        />
        <meta property="og:image" content={previewImage} />
        <meta property="og:url" content={propertyUrl} />
        <meta property="og:site_name" content="GharBazaar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property?.title} />
        <meta
          name="twitter:description"
          content={property?.description || "Premium property listing"}
        />
        <meta name="twitter:image" content={previewImage} />
      </Helmet>

      <div className="min-h-screen bg-[#F5F0E8] pb-20">
        {/* TOP BAR BRAND GRADIENT */}
        <div className="sticky top-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <BackButton onClick={() => navigate(-1)} variant="dark" />
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                  isClosed
                    ? "bg-red-600 text-white"
                    : "bg-[#147638] text-white border border-[#1B9E4B]/30"
                }`}
              >
                {isClosed ? "Closed" : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN BODY INTERFACE */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 mt-2 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
            {/* LEFT CONTAINER: GALLERIES & MAPS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 order-1 lg:order-none">
              {/* IMAGE GALLERY */}
              <div className="flex flex-col lg:flex-row gap-3 h-[380px] sm:h-[420px] lg:h-[480px]">
                <div className="order-2 lg:order-1 flex lg:flex-col flex-row gap-2 lg:w-20 w-full overflow-x-auto lg:overflow-y-auto no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-16 h-16 lg:w-full lg:h-16 rounded overflow-hidden border-2 transition-all ${
                        currentImage === i
                          ? "border-[#1B9E4B]"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                <div className="order-1 lg:order-2 flex-1 relative overflow-hidden rounded border border-gray-100 h-[280px] sm:h-[340px] lg:h-full bg-gray-50">
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                  <img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={property?.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    onLoad={(e) => {
                      e.target.style.opacity = 1;
                    }}
                    style={{ opacity: 0 }}
                  />
                </div>
              </div>

              {/* INTEGRATED LOCATION PREVIEW BOX */}
              <div className="hidden lg:block bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/70">
                  <span className="text-base font-bold text-gray-900">
                    Location
                  </span>
                  <button
                    onClick={() => {
                      const lat = property?.locationCoordinates?.lat;
                      const lng = property?.locationCoordinates?.lng;
                      if (!lat || !lng) {
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(property?.location || "")}`,
                          "_blank",
                        );
                        return;
                      }
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                        "_blank",
                      );
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#147638] hover:text-[#1B9E4B] bg-[#1B9E4B]/10 px-3 py-1 rounded transition-colors"
                  >
                    <Map size={12} />
                    View on map
                  </button>
                </div>

                <div className="h-[220px] flex flex-col items-center justify-center bg-[#F5F9F6] border-b border-gray-100 relative">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                    <MapPin size={22} className="text-[#1B9E4B]" />
                  </div>
                  <p className="text-gray-400 text-xs text-center px-6 max-w-sm font-medium">
                    {property?.location || "Location map context"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER: ALL PROPERTY DETAILS */}
            <div className="w-full lg:w-1/2 order-2 lg:order-none">
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 space-y-4 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                      {property?.title || "Single room with kitchen"}
                    </h1>
                    <div className="flex items-center gap-1 text-gray-500 text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 flex-shrink-0">
                      <Eye size={13} className="text-gray-400" />
                      <span className="font-medium text-gray-600">
                        {property?.views || 0} views
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 text-2xl font-black text-[#1B9E4B]">
                    <span>
                      ₹{property?.price?.toLocaleString("en-IN") || "3,500"}
                    </span>
                    <span className="text-[#147638] text-xs font-normal">
                      /month
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 text-gray-600 text-sm pb-1">
                    <MapPin
                      size={14}
                      className="mt-0.5 text-[#1B9E4B] flex-shrink-0"
                    />
                    <span className="text-xs font-medium">
                      {property?.location}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    {/* Row 1: icon buttons + WhatsApp */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBookmark}
                        disabled={bookmarkLoading}
                        className={`w-10 h-10 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                          isFavorite
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Heart
                          size={16}
                          className={
                            isFavorite ? "fill-red-500 text-red-500" : ""
                          }
                        />
                      </button>

                      <button
                        onClick={handleShare}
                        className="w-10 h-10 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all flex-shrink-0"
                      >
                        <Share2 size={16} />
                      </button>

                      <button
                        disabled={isClosed}
                        onClick={() => setShowBookingModal(true)}
                        className={`flex-1 h-10 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                          isClosed
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 text-white"
                        }`}
                      >
                        <Calendar size={14} />
                        Book Now
                      </button>
                    </div>

                    {isBooked ? (
                      <>
                        <button
                          disabled={isBooked}
                          className="w-full h-10 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                        >
                          <Calendar size={14} />
                          Already Booked
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          disabled={isClosed}
                          onClick={() => setShowBookingForm(!showBookingForm)}
                          className={`w-full h-10 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                            isClosed
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : showBookingForm
                                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                : "bg-black hover:bg-gray-900 text-white"
                          }`}
                        >
                          <Calendar size={14} />
                          {showBookingForm
                            ? "Close Form"
                            : "Book Physical Visit (Free)"}
                        </button>
                      </>
                    )}
                  </div>

                  {/* VISUALLY INTERACTIVE VISIT PARAMETERS CAPTURE CARD */}
                  {showBookingForm && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3 animate-fadeIn">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                        Schedule Your Visit
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                            Visit Date *
                          </label>
                          <input
                            type="date"
                            value={visitDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setVisitDate(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#1B9E4B]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                            Preferred Time Slot *
                          </label>
                          <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#1B9E4B]"
                          >
                            <option value="">Select a Slot</option>
                            <option value="Morning (9 AM - 12 PM)">
                              Morning (9 AM - 12 PM)
                            </option>
                            <option value="Noon (12 PM - 3 PM)">
                              Noon (12 PM - 3 PM)
                            </option>
                            <option value="Evening (3 PM - 6 PM)">
                              Evening (3 PM - 6 PM)
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                          Message / Note for Agent (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={visitMessage}
                          onChange={(e) => setVisitMessage(e.target.value)}
                          placeholder="e.g., Please notify me 30 mins before arrival..."
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#1B9E4B] resize-none"
                        />
                      </div>
                      <button
                        disabled={!visitDate || !timeSlot}
                        onClick={handleFreeVisitBooking}
                        className={`w-full h-10 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                          !visitDate || !timeSlot
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#147638] hover:bg-[#1B9E4B] text-white"
                        }`}
                      >
                        Schedule Visit (Free)
                      </button>
                    </div>
                  )}
                </div>

                {/* SPECIFICATIONS GRID STRIP */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-100 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Bedroom
                    </p>
                    <p className="font-bold text-gray-800 text-xs sm:text-sm flex items-center justify-center gap-1">
                      <Bed size={13} className="text-[#1B9E4B]" />
                      {property?.propertySpecifications?.bedroom || "01"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Bathroom
                    </p>
                    <p className="font-bold text-gray-800 text-xs sm:text-sm flex items-center justify-center gap-1">
                      <Bath size={13} className="text-[#1B9E4B]" />
                      {property?.propertySpecifications?.bathroom || "01"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Area
                    </p>
                    <p className="font-bold text-gray-800 text-xs sm:text-sm">
                      {property?.propertySpecifications?.area || "1000 sq.ft"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <p className="font-bold text-[#1B9E4B] text-xs sm:text-sm uppercase">
                      {property?.status || "Active"}
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="p-5 border-b border-gray-100 space-y-2">
                  <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm font-normal">
                    {property?.description ||
                      "Comfortable semi-furnished room with kitchen and bathroom near Quantum University."}
                  </p>
                </div>

                {/* FEATURES */}
                <div className="p-5 border-b border-gray-100 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                    Property Features
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                    {property?.amenities?.length > 0
                      ? property.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-700 font-medium"
                          >
                            <Check
                              size={14}
                              className="text-[#1B9E4B] flex-shrink-0"
                              strokeWidth={3}
                            />
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))
                      : [
                          "Air Conditioning",
                          "Kitchen",
                          "Store Room",
                          "Marble Flooring",
                          "Car Parking",
                          "Garden Area",
                        ].map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700 font-medium"
                          >
                            <Check
                              size={14}
                              className="text-[#1B9E4B] flex-shrink-0"
                              strokeWidth={2.5}
                            />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                  </div>
                </div>

                {/* NEARBY AMENITIES */}
                <div className="p-5 bg-white space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                    Nearby Amenities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                    {[
                      "College Nearby",
                      "Hospitals Nearby",
                      "Market",
                      "Street Food",
                      "Public Transport",
                      "Park",
                    ].map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 font-medium"
                      >
                        <Check
                          size={14}
                          className="text-[#1B9E4B] flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE ONLY LOCATION BOX */}
            <div className="block lg:hidden w-full order-last">
              <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/70">
                  <span className="text-base font-bold text-gray-900">
                    Location
                  </span>
                  <button
                    onClick={() => {
                      const lat = property?.locationCoordinates?.lat;
                      const lng = property?.locationCoordinates?.lng;
                      if (!lat || !lng) {
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(property?.location || "")}`,
                          "_blank",
                        );
                        return;
                      }
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                        "_blank",
                      );
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#147638] hover:text-[#1B9E4B] bg-[#1B9E4B]/10 px-3 py-1 rounded transition-colors"
                  >
                    <Map size={12} />
                    View on map
                  </button>
                </div>
                <div className="h-[220px] flex flex-col items-center justify-center bg-[#F5F9F6] border-b border-gray-100 relative">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                    <MapPin size={22} className="text-[#1B9E4B]" />
                  </div>
                  <p className="text-gray-400 text-xs text-center px-6 max-w-sm font-medium">
                    {property?.location || "Location map context"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================
            KNOW MORE ABOUT PROPERTY - FULL WIDTH SECTION
        =============================== */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#F5F9F6] to-[#E6F5EC]">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Eye size={20} className="text-[#1B9E4B]" />
                Know More About Property
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Detailed information about amenities, facilities, and property specifics
              </p>
              {/* Debug info */}
              <p className="text-xs text-gray-500 mt-2">
                Property Type: {property?.type} | Has Occupancy: {property?.occupancyType ? 'Yes' : 'No'} | Has Furnishing: {property?.furnishingStatus ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="p-6">
              {/* Show message if no additional data available */}
              {!property?.occupancyType && 
               !property?.furnishingStatus && 
               !property?.preferredTenants && 
               !property?.commercialType && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">
                    Additional property details will be available soon.
                  </p>
                </div>
              )}
              {/* PG/HOSTEL SPECIFIC SECTIONS */}
              {(property?.type?.toLowerCase().includes('pg') || property?.type?.toLowerCase().includes('hostel')) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Occupancy Details */}
                  {property?.occupancyType && (
                    <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                        <Home size={18} className="text-[#1B9E4B]" />
                        Occupancy & Pricing
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-gray-600 font-medium">Current Type:</span>
                          <span className="font-bold text-[#1B9E4B] text-base">{property?.occupancyType}</span>
                        </div>
                        {property?.gender && (
                          <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                            <span className="text-gray-600 font-medium">Gender:</span>
                            <span className="font-bold text-gray-900">{property?.gender}</span>
                          </div>
                        )}
                        {property?.occupancyOptions && property.occupancyOptions.length > 0 && (
                          <div className="mt-4">
                            <p className="text-gray-800 font-bold mb-3 flex items-center gap-2">
                              <BadgeIndianRupee size={16} className="text-[#1B9E4B]" />
                              Available Sharing Options:
                            </p>
                            <div className="space-y-3">
                              {property.occupancyOptions.map((option, i) => {
                                const match = option.match(/(.+)\s+\(₹([\d,]+)\)/);
                                const sharingType = match ? match[1] : option;
                                const price = match ? match[2] : '';
                                
                                return (
                                  <div key={i} className="bg-gradient-to-r from-white to-[#E6F5EC] p-4 rounded-lg border-2 border-[#1B9E4B]/30 hover:border-[#1B9E4B] transition-all shadow-sm">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1B9E4B] flex items-center justify-center">
                                          <Home size={16} className="text-white" />
                                        </div>
                                        <span className="font-semibold text-gray-800 text-sm">{sharingType}</span>
                                      </div>
                                      {price && (
                                        <div className="text-right">
                                          <p className="text-xs text-gray-500">per month</p>
                                          <p className="text-lg font-bold text-[#1B9E4B]">₹{price}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                              <p className="text-xs text-yellow-800">
                                <strong>Note:</strong> Prices may vary based on room selection, floor, and amenities. Contact for exact pricing.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Food Details */}
                  {property?.foodIncluded && (
                    <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                        <Calendar size={18} className="text-[#1B9E4B]" />
                        Food & Meals
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Food Included:</span>
                          <span className="font-semibold text-green-600">Yes</span>
                        </div>
                        {property?.foodType && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-semibold text-gray-900">{property?.foodType}</span>
                          </div>
                        )}
                        {property?.mealsProvided && property.mealsProvided.length > 0 && (
                          <div>
                            <p className="text-gray-700 font-semibold mb-2">Meals Provided:</p>
                            <div className="flex flex-wrap gap-2">
                              {property.mealsProvided.map((meal, i) => (
                                <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-300">
                                  {meal}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {property?.foodTimings && (
                          <div className="mt-3 bg-white p-3 rounded border border-gray-200">
                            <p className="text-xs font-bold text-gray-800 mb-2">Meal Timings:</p>
                            <div className="space-y-1 text-xs">
                              {property.foodTimings.breakfast && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Breakfast:</span>
                                  <span className="font-medium">{property.foodTimings.breakfast}</span>
                                </div>
                              )}
                              {property.foodTimings.lunch && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Lunch:</span>
                                  <span className="font-medium">{property.foodTimings.lunch}</span>
                                </div>
                              )}
                              {property.foodTimings.dinner && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Dinner:</span>
                                  <span className="font-medium">{property.foodTimings.dinner}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PG Rules & Amenities */}
                  <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                    {property?.rules && property.rules.length > 0 && (
                      <div className="mb-5">
                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                          <Check size={18} className="text-[#1B9E4B]" />
                          House Rules
                        </h3>
                        <ul className="space-y-2">
                          {property.rules.map((rule, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check size={14} className="text-[#1B9E4B] mt-0.5 flex-shrink-0" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {property?.nearbyFacilities && property.nearbyFacilities.length > 0 && (
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                          <MapPin size={18} className="text-[#1B9E4B]" />
                          Nearby Facilities
                        </h3>
                        <ul className="space-y-2">
                          {property.nearbyFacilities.map((facility, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check size={14} className="text-[#1B9E4B] mt-0.5 flex-shrink-0" />
                              <span>{facility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RESIDENTIAL SPECIFIC SECTIONS */}
              {property?.type?.toLowerCase() === 'residential' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Preferences */}
                  <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                      <Home size={18} className="text-[#1B9E4B]" />
                      Property Preferences
                    </h3>
                    <div className="space-y-3 text-sm">
                      {property?.preferredTenants && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preferred For:</span>
                          <span className="font-semibold text-gray-900">{property?.preferredTenants}</span>
                        </div>
                      )}
                      {property?.petsAllowed !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pets Allowed:</span>
                          <span className={`font-semibold ${property?.petsAllowed ? 'text-green-600' : 'text-red-600'}`}>
                            {property?.petsAllowed ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                      {property?.nonVegAllowed !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Non-Veg Allowed:</span>
                          <span className={`font-semibold ${property?.nonVegAllowed ? 'text-green-600' : 'text-red-600'}`}>
                            {property?.nonVegAllowed ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                      {property?.floorNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Floor:</span>
                          <span className="font-semibold text-gray-900">{property?.floorNumber} / {property?.totalFloors}</span>
                        </div>
                      )}
                      {property?.facing && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Facing:</span>
                          <span className="font-semibold text-gray-900">{property?.facing}</span>
                        </div>
                      )}
                      {property?.ageOfProperty && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property Age:</span>
                          <span className="font-semibold text-gray-900">{property?.ageOfProperty}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Building Amenities */}
                  {property?.additionalAmenities && property.additionalAmenities.length > 0 && (
                    <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                        <Check size={18} className="text-[#1B9E4B]" />
                        Building Amenities
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {property.additionalAmenities.map((amenity, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <Check size={14} className="text-[#1B9E4B] flex-shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* COMMERCIAL SPECIFIC SECTIONS */}
              {property?.type?.toLowerCase().includes('commercial') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Commercial Details */}
                  <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                      <Home size={18} className="text-[#1B9E4B]" />
                      Commercial Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      {property?.commercialType && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-semibold text-gray-900">{property?.commercialType}</span>
                        </div>
                      )}
                      {property?.idealFor && (
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-600">Ideal For:</span>
                          <span className="font-semibold text-gray-900">{property?.idealFor}</span>
                        </div>
                      )}
                      {property?.floorNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Floor:</span>
                          <span className="font-semibold text-gray-900">{property?.floorNumber} / {property?.totalFloors}</span>
                        </div>
                      )}
                      {property?.parking && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Parking:</span>
                          <span className="font-semibold text-gray-900">{property?.parking}</span>
                        </div>
                      )}
                      {property?.powerBackup && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Power Backup:</span>
                          <span className="font-semibold text-green-600">{property?.powerBackup}</span>
                        </div>
                      )}
                      {property?.lockInPeriod && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lock-in Period:</span>
                          <span className="font-semibold text-gray-900">{property?.lockInPeriod}</span>
                        </div>
                      )}
                      {property?.maintenanceCharges && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maintenance:</span>
                          <span className="font-semibold text-gray-900">{property?.maintenanceCharges}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connectivity */}
                  {property?.connectivity && property.connectivity.length > 0 && (
                    <div className="bg-[#F5F9F6] rounded-lg p-5 border border-gray-200">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                        <MapPin size={18} className="text-[#1B9E4B]" />
                        Connectivity
                      </h3>
                      <ul className="space-y-2">
                        {property.connectivity.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check size={14} className="text-[#1B9E4B] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* FURNISHING DETAILS - FOR ALL PROPERTY TYPES */}
              {property?.furnishingStatus && (
                <div className={`bg-[#F5F9F6] rounded-lg p-5 border border-gray-200 ${(property?.type?.toLowerCase().includes('pg') || property?.type?.toLowerCase().includes('hostel') || property?.type?.toLowerCase() === 'residential' || property?.type?.toLowerCase().includes('commercial')) ? 'mt-6' : ''}`}>
                  <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                    <Check size={18} className="text-[#1B9E4B]" />
                    Furnishing Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="font-bold text-gray-900 text-sm bg-green-100 px-4 py-1.5 rounded-full border border-green-300">
                        {property?.furnishingStatus}
                      </span>
                    </div>
                    {property?.furnishingItems && property.furnishingItems.length > 0 && (
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-3">What's Included:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {property.furnishingItems.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                              <Check size={14} className="text-[#1B9E4B] mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {property?.furnishingNote && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> {property?.furnishingNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===============================
            SIMILAR PROPERTIES SECTION
        =============================== */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 mt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Similar Properties
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarProperties.map((simProperty) => (
              <RecentCard key={simProperty._id} property={simProperty} />
            ))}

            {similarLoading &&
              Array.from({ length: 1 }).map((_, index) => (
                <RecentCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>

          {!similarLoading && similarProperties.length === 0 && (
            <p className="text-gray-500 text-sm italic">
              No similar properties found matching this profile.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
