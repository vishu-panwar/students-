import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";

export default function BookingStep2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading } = useGetPropertyByIdQuery({ id });
  const property = data?.data;

  // Form states
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("in-Indian");
  const [gender, setGender] = useState("Male");
  const [countryOfResidence, setCountryOfResidence] = useState("in-India");
  const [passportNumber, setPassportNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [yearEnrollment, setYearEnrollment] = useState("");
  const [medicalConditions, setMedicalConditions] = useState(false);

  const handleContinue = () => {
    if (!dob || !fullAddress || !city) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Application details saved!");
    // Navigate to step 3 payment
    navigate(`/booking-step3/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1B9E4B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const monthlyRent = property?.price || 10000;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thanks {user?.name || "Test"}, let's save your spot.
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Follow up the booking by filling out the details to reserve this property.
          </p>

          {/* Steps */}
          <div className="flex items-center justify-center gap-8 max-w-2xl mx-auto">
            {/* Step 1 - Completed */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M9 11H15M9 15H15M21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">STEP1</p>
                <p className="text-sm font-bold text-gray-900">Booking Details</p>
              </div>
              <div className="w-20 h-px bg-green-600"></div>
            </div>

            {/* Step 2 - Active */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center border-2 border-green-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21M7 14H7.01M11 14H11.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-600">STEP2</p>
                <p className="text-sm font-bold text-gray-900">Payment</p>
              </div>
              <div className="w-20 h-px bg-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400">STEP3</p>
                <p className="text-sm font-bold text-gray-400">Booking Confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
                <button className="text-sm text-red-500 font-semibold">Edit</button>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>unknown</span>
                <span>+911234567890</span>
                <span>test@gmail.com</span>
              </div>
            </div>

            {/* Accommodation Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Accommodation Details</h3>
                <button className="text-sm text-red-500 font-semibold">Edit</button>
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <span>Standard Studio</span>
                <span>51 weeks</span>
                <span>12 Sep, 2026 - 5 Sep, 2027</span>
              </div>
            </div>

            {/* Application Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Application Details</h3>

              <div className="space-y-4">
                {/* Date of Birth & Nationality */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    >
                      <option value="in-Indian">in-Indian</option>
                      <option value="us-American">us-American</option>
                      <option value="uk-British">uk-British</option>
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === g}
                          onChange={() => setGender(g)}
                          className="w-4 h-4 text-[#E91E63]"
                        />
                        <span className="text-sm text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country & Passport */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
                    <select
                      value={countryOfResidence}
                      onChange={(e) => setCountryOfResidence(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    >
                      <option value="in-India">in-India</option>
                      <option value="us-USA">us-USA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport/ID Number</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="5545545"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Full Address</label>
                  <input
                    type="text"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="NA"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="NA"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                    <input
                      type="text"
                      value={stateProvince}
                      onChange={(e) => setStateProvince(e.target.value)}
                      placeholder="NA"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select University Name</label>
                  <input
                    type="text"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    placeholder="HuB-International Business School"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                {/* Course & Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Enrollment Status</label>
                    <input
                      type="text"
                      value={yearEnrollment}
                      onChange={(e) => setYearEnrollment(e.target.value)}
                      placeholder="First Year Undergraduate"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={medicalConditions}
                      onChange={(e) => setMedicalConditions(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">I have some medical conditions</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Emergency Contact Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Emergency Contact Details</h3>
              
              <div className="space-y-4">
                {/* Emergency Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="spouse">Spouse</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone Number & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 1234567890"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Full address"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Guarantor Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Guarantor Details</h3>
              
              <div className="space-y-4">
                {/* Guarantor Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guarantor Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="spouse">Spouse</option>
                    <option value="employer">Employer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 1234567890"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="Enter occupation"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter complete address"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button - At the end */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <button
                onClick={handleContinue}
                className="w-full bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold py-3 rounded-lg transition-all text-lg"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right - Property Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img
                src={property?.images?.[0] || "https://via.placeholder.com/400x200"}
                alt={property?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{property?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{property?.location}</p>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-semibold">Standard Studio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">51 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available From</span>
                    <span className="font-semibold">12 Sep, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-semibold">From £325/week</span>
                  </div>
                </div>

                <button className="w-full text-sm text-[#1B9E4B] font-semibold py-2">
                  View Price Summary →
                </button>
              </div>
            </div>

            {/* Applicable Offers */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-500">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Applicable Offers</h3>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">£500</span>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hot Pick: Lock In Your Spot & Snag £500 CASHBACK!</p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-red-500 hover:text-red-600">View</button>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50">
                <span className="text-base font-semibold text-gray-900">Cancellation Policy (6)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Payment Policy */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50">
                <span className="text-base font-semibold text-gray-900">Payment Policy (4)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Expandable Sections */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Instant Booking */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10H21M7 3V6M17 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Instant Booking</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Lowest Price Guaranteed */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-600">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Lowest Price Guaranteed</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Verified Properties */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Verified Properties</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* 24x7 Personal Assistance */}
              <div className="border-b border-gray-200">
                <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-orange-600">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">24x7 Personal Assistance</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* 10.7K+ Reviews */}
              <div>
                <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">10.7K+ Reviews</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
