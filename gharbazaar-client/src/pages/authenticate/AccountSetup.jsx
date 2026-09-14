import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AccountSetup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const roles = [
    {
      id: "tenant",
      title: "I'm a Tenant/Buyer",
      description: "Looking for properties to rent or buy",
      icon: "🏠",
      features: ["Browse properties", "Book visits", "Save favorites", "Contact owners"],
      color: "blue"
    },
    {
      id: "owner",
      title: "I'm an Owner/Seller",
      description: "Want to list my properties for rent or sale",
      icon: "🔑",
      features: ["List properties", "Manage bookings", "Track inquiries", "Verify tenants"],
      color: "green"
    }
  ];

  const handleContinue = () => {
    console.log("Continue clicked, selectedRole:", selectedRole);
    
    if (!selectedRole) {
      toast.error("Please select your role");
      return;
    }

    // Update user role in localStorage
    const updatedUser = {
      ...user,
      role: selectedRole === "tenant" ? "client" : "seller", // Map to actual backend roles
      userType: selectedRole, // Keep original selection
      accountSetupComplete: true
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log("Navigating to pricing page for role:", selectedRole);
    toast.success("Account setup complete!");
    
    // Navigate to pricing/benefits page with user type
    navigate("/pricing-benefits", { state: { userType: selectedRole } });
  };

  const handleDemoSetup = (role) => {
    console.log("Demo setup clicked for role:", role);
    
    // Create demo user with selected role
    const demoUser = {
      _id: "demo-user-123",
      fullName: "Demo User",
      name: "Demo User",
      email: "demo@gharbazaar.in",
      phone: "+91 9876543210",
      phoneNumber: "+91 9876543210",
      role: role === "tenant" ? "client" : "seller", // Map to actual backend roles
      userType: role, // Keep original selection
      accountSetupComplete: true
    };
    
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("token", "demo-token-123");
    
    console.log("Demo user created:", demoUser);
    toast.success(`Demo ${role} account created!`);
    
    // Navigate to pricing page with user type
    navigate("/pricing-benefits", { state: { userType: role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src="/logo.jpeg" alt="GharBazaar" className="h-12 w-auto" />
            <h1 className="text-3xl font-bold text-gray-900">GharBazaar</h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome to GharBazaar! 🎉</h2>
          <p className="text-lg text-gray-600">Let's set up your account. Tell us who you are:</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                relative p-8 rounded-2xl border-2 transition-all text-left
                ${selectedRole === role.id 
                  ? role.color === "blue" 
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-105" 
                    : "border-green-500 bg-green-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }
              `}
            >
              {/* Selected Indicator */}
              {selectedRole === role.id && (
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${role.color === "blue" ? "bg-blue-500" : "bg-green-500"}`}>
                  <span className="text-white text-xl">✓</span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-4xl ${role.color === "blue" ? "bg-blue-100" : "bg-green-100"}`}>
                {role.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-6">{role.description}</p>

              {/* Features */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">What you can do:</p>
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${role.color === "blue" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"} text-xs`}>
                      ✓
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Demo Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDemoSetup(role.id);
                }}
                className={`mt-6 w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                  role.color === "blue"
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Try Demo {role.id === "tenant" ? "Tenant" : "Owner"} Account
              </button>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              px-12 py-4 rounded-xl font-bold text-lg transition-all
              ${selectedRole
                ? "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Continue to Dashboard →
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            You can change your role later in settings
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-gray-900 mb-1">Secure Platform</h4>
            <p className="text-xs text-gray-600">Your data is protected</p>
          </div>
          <div>
            <div className="text-3xl mb-2">✓</div>
            <h4 className="font-semibold text-gray-900 mb-1">Verified Properties</h4>
            <p className="text-xs text-gray-600">All listings verified</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💬</div>
            <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
            <p className="text-xs text-gray-600">We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
