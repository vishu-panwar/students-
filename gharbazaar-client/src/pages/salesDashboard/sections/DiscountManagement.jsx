import { useState } from "react";
import { Tag, Percent, Calendar, Users, Plus } from "lucide-react";

export default function DiscountManagement() {
  const [discounts] = useState([
    {
      id: 1,
      code: "FIRST10",
      description: "10% off for first-time buyers",
      discount: "10%",
      validTill: "Dec 31, 2024",
      used: 45,
      maxUses: 100,
      status: "active"
    },
    {
      id: 2,
      code: "NEWYEAR2025",
      description: "New Year Special - ₹50,000 off",
      discount: "₹50,000",
      validTill: "Jan 15, 2025",
      used: 12,
      maxUses: 50,
      status: "active"
    },
    {
      id: 3,
      code: "FESTIVE15",
      description: "Festival Offer - 15% discount",
      discount: "15%",
      validTill: "Dec 25, 2024",
      used: 89,
      maxUses: 100,
      status: "active"
    },
    {
      id: 4,
      code: "LUXURY20",
      description: "Luxury properties - 20% off",
      discount: "20%",
      validTill: "Nov 30, 2024",
      used: 100,
      maxUses: 100,
      status: "expired"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'expired': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Discount Management</h2>
          <p className="text-gray-600 mt-1">Create and manage discount codes</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">ACTIVE DISCOUNTS</p>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL USES</p>
          <p className="text-3xl font-bold text-gray-900">246</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">AVG DISCOUNT</p>
          <p className="text-3xl font-bold text-gray-900">12.5%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">EXPIRING SOON</p>
          <p className="text-3xl font-bold text-gray-900">1</p>
        </div>
      </div>

      {/* Discount List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">All Discount Codes</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {discounts.map((discount) => (
            <div key={discount.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <code className="px-4 py-2 bg-gray-900 text-white rounded-lg font-mono font-bold text-lg">
                      {discount.code}
                    </code>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 uppercase ${getStatusColor(discount.status)}`}>
                      {discount.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{discount.description}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Valid till: {discount.validTill}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-600">{discount.discount}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Usage</span>
                    <span className="text-sm font-bold text-gray-900">{discount.used}/{discount.maxUses}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-red-600"
                      style={{ width: `${(discount.used / discount.maxUses) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm">
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm">
                  Copy Code
                </button>
                {discount.status === 'active' && (
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold text-sm">
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
