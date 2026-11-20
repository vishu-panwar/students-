import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Home, Store } from "lucide-react";

export default function AccountSetup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const roles = [
    {
      id: "tenant",
      title: "I'm a Tenant/Buyer",
      description: "Looking for properties to rent or buy",
      icon: Home,
      features: ["Browse properties", "Book visits", "Save favorites", "Contact owners"],
      color: "blue",
      demoLabel: "Try Demo Tenant Account"
    },
    {
      id: "owner",
      title: "I'm an Owner/Seller",
      description: "Want to list my properties for rent or sale",
      icon: Store,
      features: ["List properties", "Manage bookings", "Track inquiries", "Verify tenants"],
      color: "green",
      demoLabel: "Try Demo Owner Account"
    }
  ];

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error("Please select your role");
      return;
    }

    const role = selectedRole === "tenant" ? "client" : "seller";
    const updatedUser = {
      ...user,
      role: role,
      userType: selectedRole,
      accountSetupComplete: true
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Account setup complete!");
    
    // Redirect based on role
    if (role === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleDemoSetup = (role) => {
    const userRole = role === "tenant" ? "client" : "seller";
    const demoUser = {
      _id: "demo-user-123",
      fullName: "Demo User",
      name: "Demo User",
      email: "demo@gharbazaar.in",
      phone: "+91 9876543210",
      phoneNumber: "+91 9876543210",
      role: userRole,
      userType: role,
      accountSetupComplete: true
    };
    
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("token", "demo-token-123");
    
    toast.success(`Demo ${role} account created!`);
    
    // Redirect based on role
    if (userRole === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">GharBazaar</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GharBazaar! 🎉</h2>
          <p className="text-gray-600">Let's set up your account. Tell us who you are:</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all text-left
                  ${selectedRole === role.id 
                    ? role.color === "blue" 
                      ? "border-blue-500 bg-blue-50/50 shadow-md" 
                      : "border-green-500 bg-green-50/50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }
                `}
              >
                {/* Selected Radio Button */}
                <div className="absolute top-5 right-5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === role.id 
                      ? role.color === "blue" ? "border-blue-500 bg-blue-500" : "border-green-500 bg-green-500"
                      : "border-gray-300 bg-white"
                  }`}>
                    {selectedRole === role.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                  role.color === "blue" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">What you can do:</p>
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        role.color === "blue" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                      } text-xs`}>
                        ✓
                      </div>
                      <span className="text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Demo Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoSetup(role.id);
                  }}
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-medium transition-all ${
                    role.color === "blue"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {role.demoLabel}
                </button>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all
              ${selectedRole
                ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Continue to Dashboard →
          </button>
          
          <p className="text-xs text-gray-500 mt-3">
            You can change your role later in settings
          </p>
        </div>
      </div>
    </div>
  );
}
