import React, { useState } from "react";
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Shield,
  FileText,
  User,
  Home,
  CreditCard,
  Camera
} from "lucide-react";
import { toast } from "react-toastify";

export default function SellerKYC() {
  const [kycStatus, setKycStatus] = useState("not_started"); // not_started, pending, verified, rejected
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    
    // Address Details
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Documents
    aadhaarNumber: "",
    panNumber: "",
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    selfie: null,
    
    // Business Details (for seller)
    businessName: "",
    businessType: "",
    gstNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      toast.success(`${fieldName} uploaded successfully!`);
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (!formData.fullName || !formData.aadhaarNumber || !formData.panNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    // API call would go here
    toast.success("KYC submitted successfully! We'll verify within 24-48 hours.");
    setKycStatus("pending");
  };

  const getStatusBadge = () => {
    const statusConfig = {
      not_started: { bg: "bg-gray-50", text: "text-gray-600", icon: AlertCircle, label: "Not Started" },
      pending: { bg: "bg-orange-50", text: "text-orange-600", icon: Clock, label: "Under Review" },
      verified: { bg: "bg-green-50", text: "text-green-600", icon: CheckCircle, label: "Verified" },
      rejected: { bg: "bg-red-50", text: "text-red-600", icon: AlertCircle, label: "Rejected" },
    };

    const config = statusConfig[kycStatus];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} font-semibold`}>
        <Icon size={20} />
        {config.label}
      </div>
    );
  };

  if (kycStatus === "verified") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-green-200 p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">KYC Verified Successfully! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Your account has been verified. You can now access all premium features.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold">
            <Shield size={20} />
            Verified Seller Account
          </div>
        </div>
      </div>
    );
  }

  if (kycStatus === "pending") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-orange-200 p-12 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={48} className="text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">KYC Under Review ⏳</h2>
          <p className="text-gray-600 mb-6">
            Your KYC documents are being verified by our team. This usually takes 24-48 hours.
            We'll notify you once the verification is complete.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-50 text-orange-700 rounded-xl font-semibold border-2 border-orange-200">
            <Clock size={20} />
            Verification in Progress
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Verification</h1>
            <p className="text-gray-600">Complete your KYC to unlock all seller features</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= s ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > s ? <CheckCircle size={20} /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-green-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm font-semibold text-gray-600">
          <span>Personal Info</span>
          <span>Documents</span>
          <span>Business Details</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User size={24} className="text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name (as per Aadhaar) *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  placeholder="Enter father's name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 mb-4">
              <Home size={24} className="text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Address Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
            >
              Continue to Documents
            </button>
          </div>
        )}

        {/* Step 2: Document Upload */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={24} className="text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Upload Documents</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number *</label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="Enter PAN number"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                { name: "aadhaarFront", label: "Aadhaar Front", icon: FileText },
                { name: "aadhaarBack", label: "Aadhaar Back", icon: FileText },
                { name: "panCard", label: "PAN Card", icon: CreditCard },
                { name: "selfie", label: "Selfie with Document", icon: Camera },
              ].map((doc) => {
                const Icon = doc.icon;
                return (
                  <div key={doc.name} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-500 transition-all">
                    <label className="cursor-pointer block text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, doc.name)}
                        className="hidden"
                      />
                      <Icon size={32} className="mx-auto text-gray-400 mb-3" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">{doc.label}</p>
                      {formData[doc.name] ? (
                        <p className="text-xs text-green-600 font-semibold">✓ Uploaded</p>
                      ) : (
                        <p className="text-xs text-gray-500">Click to upload</p>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
              >
                Continue to Business Details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Business Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Business Details (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Type</option>
                  <option value="individual">Individual Owner</option>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">LLP</option>
                  <option value="pvt_ltd">Private Limited</option>
                  <option value="public_ltd">Public Limited</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number (if applicable)</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="Enter GST number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Business details are optional but recommended for professional sellers and agencies.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Submit KYC
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <h4 className="font-bold text-gray-900 mb-3">✨ Benefits of KYC Verification</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Verified Badge</p>
              <p className="text-xs text-gray-600">Stand out with verified seller badge</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Higher Trust</p>
              <p className="text-xs text-gray-600">Get 3x more inquiries from tenants</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Premium Features</p>
              <p className="text-xs text-gray-600">Unlock advanced analytics & tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
