import { useState } from "react";
import { TrendingUp, DollarSign, Home, Calendar, Award, CheckCircle } from "lucide-react";

export default function SalesTracking() {
  const [sales] = useState([
    {
      id: 1,
      propertyName: "Green Valley Apartments",
      customerName: "Amit Verma",
      saleAmount: "₹85,00,000",
      commission: "₹1,50,000",
      date: "Dec 15, 2024",
      status: "completed",
      paymentStatus: "received"
    },
    {
      id: 2,
      propertyName: "Skyline Towers",
      customerName: "Priya Sharma",
      saleAmount: "₹1,20,00,000",
      commission: "₹2,40,000",
      date: "Dec 12, 2024",
      status: "completed",
      paymentStatus: "pending"
    },
    {
      id: 3,
      propertyName: "Palm Residency",
      customerName: "Rahul Singh",
      saleAmount: "₹65,00,000",
      commission: "₹1,30,000",
      date: "Dec 10, 2024",
      status: "completed",
      paymentStatus: "received"
    },
    {
      id: 4,
      propertyName: "Lotus Gardens",
      customerName: "Neha Gupta",
      saleAmount: "₹45,00,000",
      commission: "₹90,000",
      date: "Dec 8, 2024",
      status: "in-progress",
      paymentStatus: "advance-received"
    },
    {
      id: 5,
      propertyName: "Royal Heights",
      customerName: "Vikram Reddy",
      saleAmount: "₹95,00,000",
      commission: "₹1,90,000",
      date: "Dec 5, 2024",
      status: "completed",
      paymentStatus: "received"
    }
  ]);

  const [stats] = useState({
    totalSales: 12,
    totalRevenue: "₹9.5Cr",
    totalCommission: "₹19.5L",
    avgDealSize: "₹79.2L"
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'received': return 'bg-emerald-50 text-emerald-700';
      case 'pending': return 'bg-orange-50 text-orange-700';
      case 'advance-received': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Tracking</h2>
          <p className="text-gray-600 mt-1">Monitor your sales performance and commissions</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL SALES</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalSales}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL REVENUE</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">COMMISSION EARNED</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalCommission}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">AVG DEAL SIZE</p>
          <p className="text-3xl font-bold text-gray-900">{stats.avgDealSize}</p>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Recent Sales</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {sales.map((sale) => (
            <div key={sale.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{sale.propertyName}</h4>
                    <p className="text-sm text-gray-600 mt-1">Customer: {sale.customerName}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {sale.date}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 uppercase ${getStatusColor(sale.status)}`}>
                  {sale.status}
                </span>
              </div>

              <div className="ml-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">Sale Amount</p>
                  <p className="text-xl font-bold text-blue-600">{sale.saleAmount}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <p className="text-xs text-gray-600 mb-1">Your Commission</p>
                  <p className="text-xl font-bold text-purple-600">{sale.commission}</p>
                </div>

                <div className={`p-4 rounded-xl border-2 ${getPaymentStatusColor(sale.paymentStatus)} border-current`}>
                  <p className="text-xs mb-1">Payment Status</p>
                  <p className="text-sm font-bold uppercase">
                    {sale.paymentStatus.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="ml-16 flex items-center gap-3 mt-4">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
