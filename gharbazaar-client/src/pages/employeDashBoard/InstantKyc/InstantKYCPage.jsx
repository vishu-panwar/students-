import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Upload, User, Phone, MapPin, CreditCard, Mail, CheckCircle2 } from 'lucide-react';

export default function InstantKYCPage() {
  // Form State matching updated backend payload
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    contactNumber: '',
    currentAddress: '',
    aadhaarNumber: '',
  });

  const [files, setFiles] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const [previews, setPreviews] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);

  // Handle Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Selection & Local Preview
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      const file = selectedFiles[0];
      setFiles((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  // Mock Auto-Fill Helper for Fast Testing
  const simulateUserData = () => {
    setFormData({
      email: 'alex.mercer@gmail.com',
      fullName: 'Alex Mercer',
      contactNumber: '9876543210',
      currentAddress: '123 Green Avenue, Sector 4, New Delhi, 110001',
      aadhaarNumber: '364758920134',
    });
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare Multipart FormData
    const dataToSend = new FormData();
    
    // Append Text fields
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });
    
    // Append Files
    if (files.aadhaarFront) dataToSend.append('aadhaarFront', files.aadhaarFront);
    if (files.aadhaarBack) dataToSend.append('aadhaarBack', files.aadhaarBack);

    try {
      // Sent to backend. withCredentials verifies the Manager session token on the backend
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/registerKyc`, dataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccessResponse(response.data);
      } else {
        alert(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      const errorMsg = error.response?.data?.message || 'An error occurred while connecting to the server.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/40 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-8 text-white relative">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <ShieldCheck className="h-8 w-8 text-emerald-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Express Verification Engine</h1>
              <p className="text-emerald-100 text-sm mt-1">Directly provision user access accounts and bypass manual review pipelines instantly.</p>
            </div>
          </div>
        </div>

        {/* Success View */}
        {successResponse ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Account Created & Verified!</h2>
            <p className="text-slate-500 mt-2 max-w-md">
              Target profile <strong>{successResponse.data.user.email}</strong> is ready. Status updated directly to <span className="text-emerald-600 font-semibold">Verified</span> by you.
            </p>
            <button 
              onClick={() => {
                setSuccessResponse(null);
                setFormData({ email: '', fullName: '', contactNumber: '', currentAddress: '', aadhaarNumber: '' });
                setPreviews({ aadhaarFront: null, aadhaarBack: null });
                setFiles({ aadhaarFront: null, aadhaarBack: null });
              }}
              className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md transition-colors"
            >
              Verify Another User
            </button>
          </div>
        ) : (
          /* Main Submission Form */
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Target Account Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block"></span>
                  Step 1: User Destination Account
                </h3>
                <button
                  type="button"
                  onClick={simulateUserData}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-1.5 px-3 rounded-lg border border-emerald-200 transition-colors"
                >
                  ⚡ Autofill Demo Data
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <label className="block text-xs font-medium text-slate-500 mb-1">User Registration Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* KYC Details Section */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block"></span>
                Step 2: Legal Identity Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name (As on Documents)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="contactNumber"
                      required
                      pattern="[6-9]\d{9}"
                      title="10 digit Indian Phone number starting with 6, 7, 8 or 9"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <textarea
                      name="currentAddress"
                      required
                      rows="2"
                      value={formData.currentAddress}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm resize-none"
                      placeholder="Street address, City, State, Country, ZIP code"
                    ></textarea>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Aadhaar Number (12 Digits)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="aadhaarNumber"
                      required
                      maxLength="12"
                      pattern="\d{12}"
                      title="Please provide a valid 12-digit Aadhaar number sequence."
                      value={formData.aadhaarNumber}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm tracking-widest font-semibold"
                      placeholder="000011112222"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Document Uploads Area */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block"></span>
                Step 3: Document Attachments
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Aadhaar Front Card upload box */}
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-emerald-400 transition-colors bg-slate-50/50 flex flex-col items-center justify-center text-center relative group min-h-[160px]">
                  {previews.aadhaarFront ? (
                    <div className="w-full h-full relative">
                      <img src={previews.aadhaarFront} alt="Front preview" className="object-cover max-h-28 rounded-lg mx-auto" />
                      <p className="text-xs text-emerald-600 font-medium mt-2">Aadhaar Front Selected</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
                      <span className="text-xs font-semibold text-slate-700">Aadhaar Front View</span>
                      <span className="text-[11px] text-slate-400 mt-1">PNG, JPG files required</span>
                    </>
                  )}
                  <input
                    type="file"
                    name="aadhaarFront"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Aadhaar Back Card upload box */}
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-emerald-400 transition-colors bg-slate-50/50 flex flex-col items-center justify-center text-center relative group min-h-[160px]">
                  {previews.aadhaarBack ? (
                    <div className="w-full h-full relative">
                      <img src={previews.aadhaarBack} alt="Back preview" className="object-cover max-h-28 rounded-lg mx-auto" />
                      <p className="text-xs text-emerald-600 font-medium mt-2">Aadhaar Back Selected</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
                      <span className="text-xs font-semibold text-slate-700">Aadhaar Back View</span>
                      <span className="text-[11px] text-slate-400 mt-1">PNG, JPG files required</span>
                    </>
                  )}
                  <input
                    type="file"
                    name="aadhaarBack"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Action Submit Trigger Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-700/10 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Executing Admin Override Setup...</span>
                  </>
                ) : (
                  <span>Force Registration & Approve KYC Instantly</span>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}