import React, { useState, useRef } from "react";
import axios from "axios";
import {
  BadgeCheck,
  Gift,
  Lock,
  UploadCloud,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react";

export default function StudentRewards() {
  const API = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    mobile: "",
    email: "",
    coupon: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ API CALL ONLY
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { data } = await axios.post(
        `${API}/useCoupon`,
        {
          couponCode: formData.coupon,
          fullName: formData.fullName,
          collegeName: formData.college,
          mobile: formData.mobile,
          email: formData.email,
        },{
          withCredentials:true
        }
      );

      setMessage(data.message);

      setFormData({
        fullName: "",
        college: "",
        mobile: "",
        email: "",
        coupon: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-4 px-2.5 md:px-3.5 lg:px-5">
      <div className="max-w-7xl mx-auto">

        {/* HEADER (UNCHANGED) */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1 bg-[#BAEDCD] text-[#000000] px-2.5 py-1 rounded text-[11px] font-semibold border border-emerald-100">
            Exclusive offers
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#11452f] mt-2">
            Student Rewards
          </h2>

          <p className="text-gray-600 mt-1 text-[11px] md:text-xs">
            Share a story on Instagram, Upload proof & Unlock your PG
          </p>
        </div>

        {/* LAYOUT (UNCHANGED) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT CARD (UNCHANGED FULL) */}
          <div className="bg-[#eef0df] rounded-xl p-4 sm:p-6 relative overflow-hidden">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1f1f1f] leading-tight max-w-xs">
              You are just one step away from your discount!!!
            </h3>

            <div className="w-12 h-0.5 bg-[#2f855a] mt-3 mb-4 rounded-full" />

            <div className="space-y-4">
              {[
                {
                  icon: <BadgeCheck className="text-white" size={15} />,
                  title: "Already have a Coupon?",
                  desc: "Verify it using your details & proof",
                },
                {
                  icon: <Gift className="text-white" size={15} />,
                  title: "Instant Discount",
                  desc: "Get discount on your bookings instantly after successful verification.",
                },
                {
                  icon: <Lock className="text-white" size={15} />,
                  title: "Secure and Private",
                  desc: "Your information is safe with us and will never be shared.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-2.5 items-start">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#167d3e] flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm">{title}</h4>
                    <p className="text-gray-600 text-[11px] sm:text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* COUPON IMAGES */}
            <div className="relative flex justify-center items-end mt-6 h-[110px] sm:h-[120px] select-none pointer-events-none">
              {/* Back coupon — rotated left, slightly lower */}
              <img
                src="/coupon-back.png"
                alt="Coupon back"
                className="absolute w-[200px] sm:w-[220px] md:w-[240px] object-contain drop-shadow-md"
                style={{ transform: "rotate(-8deg) translateX(-30px) translateY(10px)", zIndex: 1 }}
              />
              {/* Front coupon — rotated right, on top */}
              <img
                src="/coupon-front.png"
                alt="Coupon front"
                className="absolute w-[200px] sm:w-[220px] md:w-[240px] object-contain drop-shadow-lg"
                style={{ transform: "rotate(4deg) translateX(30px) translateY(0px)", zIndex: 2 }}
              />
            </div>
          </div>

          {/* RIGHT CARD (ONLY CHANGE = API + LOADER + REMOVE IMAGE STATE) */}
          <div className="bg-[#eef0df] rounded-xl p-4 sm:p-6">

            <div className="flex items-start gap-2.5 mb-4 sm:mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#167d3e] flex items-center justify-center shrink-0">
                <BadgeCheck className="text-white" size={17} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1f1f1f]">
                  Verify Your Coupon
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-xs">
                  Fill the details below to verify your coupon.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">

                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <InputField
                  label="College / Hostel Name"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                <InputField
                  label="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* COUPON */}
              <div className="mt-3">
                <InputField
                  label="Enter Coupon Code"
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleChange}
                />
              </div>

              {/* STATUS */}
              {message && (
                <p className="text-green-600 text-xs mt-2">
                  {message}
                </p>
              )}

              {error && (
                <p className="text-red-600 text-xs mt-2">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#014421] hover:bg-[#01331a] active:scale-[0.98] transition-all mt-4 py-2 sm:py-2.5 rounded-lg text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Verifying...
                  </>
                ) : (
                  "Verify & Unlock Discount"
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

// INPUT (UNCHANGED)
function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-medium mb-0.5">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] sm:text-xs outline-none focus:ring-2 focus:ring-green-700 bg-[#f8f9ef]"
      />
    </div>
  );
}