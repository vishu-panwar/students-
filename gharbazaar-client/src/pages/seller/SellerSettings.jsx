import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Save,
  Eye,
  EyeOff,
  Building2,
  Globe,
  FileText,
  Trash2,
} from "lucide-react";

export default function SellerSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [profileData, setProfileData] = useState({
    fullName: user.fullName || "Demo Seller",
    email: user.email || "seller@gharbazaar.in",
    phone: user.phone || "+91 9876543210",
    address: "Andheri West, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
    gst: "",
    pan: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    newLeads: true,
    bookingUpdates: true,
    paymentAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
  });

  const sections = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payment", label: "Payment Settings", icon: CreditCard },
    { id: "documents", label: "Business Documents", icon: FileText },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  const handleSaveProfile = () => {
    // API call to update profile
    alert("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    // API call to update notification settings
    alert("Notification settings updated!");
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
        <p className="text-gray-600">Update your personal information and seller details</p>
      </div>

      {/* Profile Photo */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold">
            {profileData.fullName.charAt(0)}
          </div>
          <div>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2 mb-2">
              <Camera size={18} />
              Change Photo
            </button>
            <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={profileData.city}
              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number (Optional)</label>
            <input
              type="text"
              placeholder="22AAAAA0000A1Z5"
              value={profileData.gst}
              onChange={(e) => setProfileData({ ...profileData, gst: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number</label>
            <input
              type="text"
              placeholder="ABCDE1234F"
              value={profileData.pan}
              onChange={(e) => setProfileData({ ...profileData, pan: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveProfile}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
      >
        <Save size={20} />
        Save Changes
      </button>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security & Privacy</h2>
        <p className="text-gray-600">Manage your password and security settings</p>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters with letters and numbers</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all">
          Update Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all">
            Enable
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Trash2 size={24} className="text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-1">Delete Account</h3>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
        <p className="text-gray-600">Choose how you want to receive notifications</p>
      </div>

      {/* Notification Channels */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
            { key: "smsNotifications", label: "SMS Notifications", desc: "Receive notifications via text message" },
            { key: "pushNotifications", label: "Push Notifications", desc: "Receive push notifications in browser" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings[item.key]}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "newLeads", label: "New Leads", desc: "When you receive a new property inquiry" },
            { key: "bookingUpdates", label: "Booking Updates", desc: "When booking status changes" },
            { key: "paymentAlerts", label: "Payment Alerts", desc: "When you receive payments" },
            { key: "messageAlerts", label: "Message Alerts", desc: "When you receive new messages" },
            { key: "marketingEmails", label: "Marketing Emails", desc: "Tips, offers, and product updates" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings[item.key]}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveNotifications}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
      >
        <Save size={20} />
        Save Preferences
      </button>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Settings</h2>
        <p className="text-gray-600">Manage your bank accounts and payment methods</p>
      </div>

      {/* Primary Bank Account */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-sm opacity-90">Primary Bank Account</p>
              <p className="font-bold">HDFC Bank</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Primary</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs opacity-75">Account Number</p>
            <p className="font-semibold">•••• •••• •••• 4589</p>
          </div>
          <div>
            <p className="text-xs opacity-75">IFSC Code</p>
            <p className="font-semibold">HDFC0001234</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Account Holder</p>
            <p className="font-semibold">{profileData.fullName}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Account Type</p>
            <p className="font-semibold">Savings</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-all">
            Edit Details
          </button>
          <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-all">
            Remove
          </button>
        </div>
      </div>

      {/* Add Bank Account */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Bank Account</h3>
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-semibold hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-2">
          <CreditCard size={20} />
          Add Bank Account
        </button>
      </div>
    </div>
  );

  const renderHelpSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h2>
        <p className="text-gray-600">Get help and contact our support team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <HelpCircle size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Help Center</h3>
          <p className="text-sm text-gray-600 mb-4">Browse our help articles and FAQs</p>
          <button className="text-green-600 font-semibold text-sm hover:underline">Visit Help Center →</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Phone size={24} className="text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
          <button className="text-green-600 font-semibold text-sm hover:underline">Start Chat →</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <span className="text-gray-700">support@gharbazaar.in</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gray-400" />
            <span className="text-gray-700">+91 1800-123-4567 (Toll Free)</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gray-400" />
            <span className="text-gray-700">Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-3 sticky top-4">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all
                      ${
                        activeSection === section.id
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          {activeSection === "profile" && renderProfileSection()}
          {activeSection === "security" && renderSecuritySection()}
          {activeSection === "notifications" && renderNotificationsSection()}
          {activeSection === "payment" && renderPaymentSection()}
          {activeSection === "help" && renderHelpSection()}
          {activeSection === "documents" && (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Business Documents section coming soon...</p>
            </div>
          )}
          {activeSection === "preferences" && (
            <div className="text-center py-12">
              <Globe size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Preferences section coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
