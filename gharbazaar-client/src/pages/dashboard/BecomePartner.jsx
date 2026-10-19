import { useState } from "react";
import {
  Building2,
  Award,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle2,
  Upload,
  User,
  Briefcase,
  Target,
  Shield,
  TrendingUp,
  Clock,
  Save,
  Camera,
  X,
} from "lucide-react";

export default function BecomePartner() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [profileData, setProfileData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    partnerType: "Real Estate Broker",
    company: "",
    location: "",
    city: "",
    experience: "",
    specializations: [],
    description: "",
    profileImage: null,
    documents: [],
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializationOptions = [
    "Residential",
    "Commercial",
    "Luxury Homes",
    "PG Rooms",
    "Plots & Land",
    "Rental Properties",
    "High-Rise Buildings",
    "Villas",
    "Apartments",
    "Co-living Spaces",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecializationToggle = (spec) => {
    const current = profileData.specializations;
    if (current.includes(spec)) {
      setProfileData({
        ...profileData,
        specializations: current.filter((s) => s !== spec),
      });
    } else {
      setProfileData({
        ...profileData,
        specializations: [...current, spec],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert("Partner profile created successfully! Our team will verify and approve within 24-48 hours.");
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-16">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Become a Partner</h1>
            <p className="text-gray-600 mt-1">
              Create your partner profile to connect with thousands of buyers and sellers
            </p>
          </div>
        </div>

        {/* BENEFITS BANNER */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-4">Why Become a Partner?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="font-semibold">Get More Leads</p>
                <p className="text-sm text-emerald-50">Reach 1000s of potential clients</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Award size={20} />
              </div>
              <div>
                <p className="font-semibold">Build Credibility</p>
                <p className="text-sm text-emerald-50">Verified badge & ratings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Target size={20} />
              </div>
              <div>
                <p className="font-semibold">Grow Your Business</p>
                <p className="text-sm text-emerald-50">Featured listings & promotions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE FORM */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Partner Profile</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in your details to get verified as a trusted partner</p>
        </div>

        <div className="p-8 space-y-8">
          {/* PROFILE IMAGE */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Profile Photo</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                {previewImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setProfileData({ ...profileData, profileImage: null });
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
                  <Camera size={20} />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG or JPEG. Max 5MB</p>
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Partner Type *</label>
              <select
                required
                value={profileData.partnerType}
                onChange={(e) => setProfileData({ ...profileData, partnerType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
              >
                <option value="Real Estate Broker">Real Estate Broker</option>
                <option value="Builder">Builder</option>
                <option value="Developer">Developer</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                required
                value={profileData.company}
                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience *</label>
              <input
                type="number"
                required
                min="0"
                max="50"
                value={profileData.experience}
                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
                placeholder="Delhi, Mumbai..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Address / Location *</label>
            <input
              type="text"
              required
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50"
              placeholder="Office address / locality"
            />
          </div>

          {/* SPECIALIZATIONS */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Specializations * <span className="text-gray-500 font-normal">(Select at least 2)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {specializationOptions.map((spec) => {
                const isSelected = profileData.specializations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              About You *
            </label>
            <textarea
              required
              rows={5}
              value={profileData.description}
              onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-gray-50 resize-none"
              placeholder="Tell us about your experience, achievements, and what makes you a great partner..."
            />
            <p className="text-xs text-gray-500 mt-2">Minimum 50 characters</p>
          </div>

          {/* TERMS */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Verification Process</p>
                <p className="text-sm text-gray-700">
                  Once you submit this form, our team will verify your details and documents within 24-48 hours. 
                  You'll receive a confirmation email once approved. Verified partners get a badge and appear in our partner directory.
                </p>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting || profileData.specializations.length < 2}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Clock size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Submit for Approval
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
