import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { KeyRound, ArrowLeft, Loader2, CheckCircle2, Clock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .gb-rp-root {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background: #ede9e0; font-family: 'DM Sans', sans-serif;
  }
  .gb-rp-back {
    position: fixed; top: 20px; left: 20px;
    display: flex; align-items: center; gap: 6px;
    background: #1e5437; color: #fff; border: none; border-radius: 10px;
    padding: 8px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.2s;
  }
  .gb-rp-back:hover { background: #174530; transform: translateX(-2px); }

  .gb-rp-card {
    background: #fff; border-radius: 24px; border: 1.5px solid #ddd8cf;
    padding: 44px 40px; width: 100%; max-width: 460px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  }
  .gb-rp-icon-wrap {
    width: 64px; height: 64px; margin: 0 auto 24px;
    background: linear-gradient(135deg, #e8f5ee 0%, #d1ead9 100%);
    border-radius: 18px; display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(30,84,55,0.15);
  }
  .gb-rp-digit {
    width: 100%; aspect-ratio: 1;
    text-align: center; font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: #1a1a1a;
    background: #faf8f4; border: 1.5px solid #d6cfc3;
    border-radius: 12px; outline: none; transition: all 0.2s;
    caret-color: #1e5437;
  }
  .gb-rp-digit:focus { border-color: #1e5437; background: #fff; box-shadow: 0 0 0 3px rgba(30,84,55,0.1); }
  .gb-rp-digit.filled { border-color: #1e5437; background: #f0f9f4; }

  .gb-rp-input {
    width: 100%; background: #faf8f4; border: 1.5px solid #d6cfc3;
    border-radius: 12px; padding: 12px 40px 12px 14px; font-size: 14px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s;
  }
  .gb-rp-input:focus { border-color: #1e5437; background: #fff; box-shadow: 0 0 0 3px rgba(30,84,55,0.1); }

  .gb-btn-reset {
    width: 100%; padding: 14px; background: #1e5437; color: #fff;
    border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
  }
  .gb-btn-reset:hover:not(:disabled) { background: #174530; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,84,55,0.22); }
  .gb-btn-reset:disabled { background: #d6cfc3; color: #a09489; cursor: not-allowed; transform: none; }

  .gb-rp-timer-track { height: 4px; background: #ede9e0; border-radius: 999px; margin: 12px 0 0; overflow: hidden; }
  .gb-rp-timer-bar { height: 100%; border-radius: 999px; transition: width 1s linear, background 1s; }

  @keyframes gb-rp-spin { to { transform: rotate(360deg); } }
  .gb-rp-spin { animation: gb-rp-spin 1s linear infinite; }
`;

export default function ResetPassword() {
  const location = useLocation();
  const navigate  = useNavigate();
  const email     = location.state?.email || "";
  const TOTAL     = 300; // 5 min

  const [otp, setOtp]               = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [timeLeft, setTime]         = useState(TOTAL);
  const [status, setStatus]         = useState({ type: "", message: "" });
  const [fieldError, setFieldError] = useState("");
  const refs = useRef([]);

  // Redirect back if no email was passed (direct URL access)
  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTime((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const pct = (timeLeft / TOTAL) * 100;
  const barColor = timeLeft < 60 ? "#dc2626" : timeLeft < 120 ? "#f59e0b" : "#1e5437";

  const handleChange = (el, i) => {
    if (isNaN(el.value)) return;
    const next = [...otp]; next[i] = el.value; setOtp(next);
    if (el.value && i < 5) refs.current[i+1]?.focus();
  };

  const handleKey = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i-1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6).split("");
    const next = [...otp];
    paste.forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    refs.current[Math.min(paste.length, 5)]?.focus();
  };

  const resendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/forgot-password`, { email });
      setTime(TOTAL);
      setOtp(new Array(6).fill(""));
      setStatus({ type: "success", message: "A new OTP has been sent" });
    } catch (err) {
      setStatus({ type: "error", message: "Could not resend OTP. Try again." });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setFieldError("");

    const code = otp.join("");
    if (code.length < 6) return;

    if (timeLeft <= 0) {
      setStatus({ type: "error", message: "OTP expired. Request a new one." });
      return;
    }
    if (newPassword.length < 6) {
      setFieldError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFieldError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/reset-password`, {
        email,
        otp: code,
        newPassword
      });
      setStatus({ type: "success", message: res.data.message || "Password reset successfully!" });
      if (res.data.success) setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Invalid OTP" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="gb-rp-root">

        <button className="gb-rp-back" onClick={() => navigate("/forgot-password")}>
          <ArrowLeft size={14}/> Back
        </button>

        <motion.div className="gb-rp-card"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>

          <div className="gb-rp-icon-wrap">
            <KeyRound size={28} color="#1e5437" />
          </div>

          <div style={{ textAlign:"center", marginBottom:24 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#1a1a1a", marginBottom:6 }}>
              Reset Password
            </h2>
            <p style={{ fontSize:14, color:"#8a7e72", lineHeight:1.55 }}>
              Enter the code sent to{" "}
              <span style={{ color:"#1e5437", fontWeight:600 }}>{email}</span>{" "}
              and choose a new password
            </p>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:10 }}>
              <Clock size={13} color={barColor} />
              <span style={{ fontSize:13, fontWeight:600, color: barColor, fontFamily:"'DM Sans',sans-serif" }}>
                {timeLeft > 0 ? `Expires in ${fmt(timeLeft)}` : "OTP Expired"}
              </span>
            </div>
            <div className="gb-rp-timer-track">
              <div className="gb-rp-timer-bar" style={{ width:`${pct}%`, background: barColor }} />
            </div>
          </div>

          <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:18 }}>

            {/* OTP Inputs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
              {otp.map((val, i) => (
                <input
                  key={i} type="text" maxLength={1}
                  ref={(el) => (refs.current[i] = el)}
                  value={val}
                  onChange={(e) => handleChange(e.target, i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  onPaste={i === 0 ? handlePaste : undefined}
                  className={`gb-rp-digit${val ? " filled" : ""}`}
                />
              ))}
            </div>

            {/* New Password */}
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#4a4035" }}>New Password</label>
              <div style={{ position:"relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="gb-rp-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#a09489", cursor:"pointer" }}
                >
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#4a4035" }}>Confirm Password</label>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="gb-rp-input"
              />
            </div>

            {fieldError && (
              <p style={{ fontSize:12, color:"#dc2626", marginTop:-8 }}>{fieldError}</p>
            )}

            {/* Status */}
            <AnimatePresence mode="wait">
              {status.message && (
                <motion.div
                  initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{
                    display:"flex", alignItems:"center", gap:8, padding:"12px 14px",
                    borderRadius:12, fontSize:13, fontWeight:500,
                    background: status.type==="success" ? "#f0f9f4" : "#fef2f2",
                    color:       status.type==="success" ? "#1e5437"  : "#c0392b",
                    border:      `1px solid ${status.type==="success" ? "#c6e8d2" : "#fecaca"}`,
                  }}>
                  {status.type==="success" && <CheckCircle2 size={15}/>}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || otp.includes("") || timeLeft <= 0}
              className="gb-btn-reset">
              {loading ? <Loader2 size={17} className="gb-rp-spin"/> : "Reset Password"}
            </button>

          </form>

          <p style={{ textAlign:"center", fontSize:13, color:"#8a7e72", marginTop:20 }}>
            Didn't receive the code?{" "}
            <button
              onClick={resendOtp}
              style={{ background:"none", border:"none", color:"#1e5437", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, padding:0 }}>
              Resend OTP
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
}