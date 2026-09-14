import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2, ArrowRight, ArrowLeft, KeyRound } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email");
      return;
    }
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        { email }
      );

      toast.info(res.data.message || "OTP sent to your email");
      navigate("/reset-password", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ede9e0] flex items-center justify-center p-5 font-sans">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-[420px] bg-white rounded-[22px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-[#ddd8cf]"
      >

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-[#8a7e72] mb-6 hover:text-[#1e5437] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to login
        </button>

        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#e8f5ee] to-[#d1ead9] border border-[#1e5437]/15 flex items-center justify-center mb-5">
          <KeyRound size={24} className="text-[#1e5437]" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
          Forgot Password?
        </h1>

        <p className="text-sm text-[#8a7e72] mb-7 leading-6">
          Enter the email linked to your account and we'll send you a 6-digit OTP to reset your password.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">

            <label className="text-[13px] font-semibold text-[#4a4035]">
              Email Address
            </label>

            <div className="relative">

              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09489]">
                <Mail size={16} />
              </div>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={`w-full bg-[#faf8f4] border rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all ${
                  error
                    ? "border-red-500"
                    : "border-[#d6cfc3] focus:border-[#1e5437] focus:ring-4 focus:ring-[#1e5437]/10"
                }`}
              />

            </div>

            {error && (
              <p className="text-[11px] text-red-500">{error}</p>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e5437] hover:bg-[#174530] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-[1px] hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Send OTP
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#8a7e72]">
            Remember your password?{" "}
            <Link to="/login" className="text-[#1e5437] font-semibold">
              Log in
            </Link>
          </p>

        </form>

      </motion.div>

    </div>
  );
}