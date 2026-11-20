import { Settings as SettingsIcon, User, Bell, Shield, Globe, Mail, Phone, Save } from "lucide-react";

export default function Settings() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Vishu Panwar"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
            <input
              type="text"
              defaultValue="GBS001"
              disabled
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="sales@gharbazaar.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+91 9876543210"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "New Lead Assignments", desc: "Get notified when new leads are assigned" },
            { label: "Follow-up Reminders", desc: "Reminders for pending follow-ups" },
            { label: "Target Achievements", desc: "Notifications when you hit targets" },
            { label: "Commission Updates", desc: "Updates on commission payments" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Security</h3>
        </div>
        <div className="space-y-4">
          <button className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-left hover:bg-blue-100 transition-colors">
            <p className="font-semibold text-gray-900">Change Password</p>
            <p className="text-sm text-gray-600 mt-1">Update your account password</p>
          </button>
          <button className="w-full p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-left hover:bg-purple-100 transition-colors">
            <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security</p>
          </button>
        </div>
      </div>
    </div>
  );
}
