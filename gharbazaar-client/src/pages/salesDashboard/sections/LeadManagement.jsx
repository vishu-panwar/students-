import { useState } from "react";
import { Users, Plus, Filter, Search } from "lucide-react";

export default function LeadManagement() {
  const [leads] = useState([
    { id: 1, name: "Amit Verma", phone: "+91 9876543210", property: "3BHK Apartment", budget: "₹75L-₹85L", status: "hot", source: "Website", assignedTo: "You" },
    { id: 2, name: "Priya Sharma", phone: "+91 8765432109", property: "2BHK Flat", budget: "₹45L-₹55L", status: "warm", source: "Referral", assignedTo: "You" },
    { id: 3, name: "Rahul Singh", phone: "+91 7654321098", property: "Villa", budget: "₹1.2Cr-₹1.5Cr", status: "hot", source: "Direct Call", assignedTo: "You" },
    { id: 4, name: "Neha Gupta", phone: "+91 6543210987", property: "1BHK Studio", budget: "₹25L-₹30L", status: "cold", source: "Website", assignedTo: "You" }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-orange-100 text-orange-700';
      case 'cold': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
          <p className="text-gray-600 mt-1">Manage and track all your leads</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-1">TOTAL LEADS</p>
          <p className="text-3xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-1">HOT LEADS</p>
          <p className="text-3xl font-bold text-red-600">12</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-1">WARM LEADS</p>
          <p className="text-3xl font-bold text-orange-600">18</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-1">COLD LEADS</p>
          <p className="text-3xl font-bold text-blue-600">15</p>
        </div>
      </div>

      {/* Lead Table */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">NAME</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">CONTACT</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">PROPERTY</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">BUDGET</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">STATUS</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">SOURCE</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                <td className="px-6 py-4 text-gray-900">{lead.property}</td>
                <td className="px-6 py-4 text-gray-900">{lead.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
