import React, { useState } from "react";
import {
  IndianRupee,
  Calendar,
  TrendingUp,
  Download,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Building2,
  User,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

export default function SellerPayments() {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("30days");

  // Mock data
  const paymentStats = [
    {
      label: "Total Earnings",
      value: "₹4,52,000",
      change: "+12.5%",
      icon: IndianRupee,
      color: "green",
    },
    {
      label: "Pending Payments",
      value: "₹1,20,000",
      change: "3 payments",
      icon: Clock,
      color: "orange",
    },
    {
      label: "This Month",
      value: "₹85,000",
      change: "+8.2%",
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Available Balance",
      value: "₹2,45,000",
      change: "Ready to withdraw",
      icon: Wallet,
      color: "purple",
    },
  ];

  const transactions = [
    {
      id: "TXN-2025-10001",
      propertyName: "3BHK Luxury Apartment",
      tenantName: "Rahul Sharma",
      amount: "₹35,000",
      type: "rent",
      status: "completed",
      date: "28 Aug, 2025",
      time: "2:30 PM",
      paymentMethod: "UPI",
      bookingId: "GB-2025-10482",
    },
    {
      id: "TXN-2025-10002",
      propertyName: "2BHK Sea View Flat",
      tenantName: "Priya Patel",
      amount: "₹45,000",
      type: "rent",
      status: "completed",
      date: "27 Aug, 2025",
      time: "11:00 AM",
      paymentMethod: "Credit Card",
      bookingId: "GB-2025-99821",
    },
    {
      id: "TXN-2025-10003",
      propertyName: "Office Space BKC",
      tenantName: "Tech Solutions Pvt Ltd",
      amount: "₹1,50,000",
      type: "rent",
      status: "pending",
      date: "26 Aug, 2025",
      time: "4:15 PM",
      paymentMethod: "Bank Transfer",
      bookingId: "GB-2025-88765",
    },
    {
      id: "TXN-2025-10004",
      propertyName: "Studio Apartment",
      tenantName: "Amit Kumar",
      amount: "₹22,000",
      type: "security",
      status: "completed",
      date: "25 Aug, 2025",
      time: "9:45 AM",
      paymentMethod: "UPI",
      bookingId: "GB-2025-77654",
    },
    {
      id: "TXN-2025-10005",
      propertyName: "3BHK Luxury Apartment",
      tenantName: "Vikram Singh",
      amount: "₹35,000",
      type: "rent",
      status: "failed",
      date: "24 Aug, 2025",
      time: "6:30 PM",
      paymentMethod: "Credit Card",
      bookingId: "GB-2025-55555",
    },
  ];

  const tabs = [
    { id: "all", label: "All Transactions", count: transactions.length },
    { id: "completed", label: "Completed", count: transactions.filter(t => t.status === "completed").length },
    { id: "pending", label: "Pending", count: transactions.filter(t => t.status === "pending").length },
    { id: "failed", label: "Failed", count: transactions.filter(t => t.status === "failed").length },
  ];

  const getFilteredTransactions = () => {
    if (activeTab === "all") return transactions;
    return transactions.filter(t => t.status === activeTab);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: "bg-green-50", text: "text-green-600", label: "Completed", icon: CheckCircle },
      pending: { bg: "bg-orange-50", text: "text-orange-600", label: "Pending", icon: Clock },
      failed: { bg: "bg-red-50", text: "text-red-600", label: "Failed", icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const getPaymentTypeBadge = (type) => {
    const typeConfig = {
      rent: { bg: "bg-blue-50", text: "text-blue-600", label: "Rent Payment" },
      security: { bg: "bg-purple-50", text: "text-purple-600", label: "Security Deposit" },
      maintenance: { bg: "bg-gray-50", text: "text-gray-600", label: "Maintenance" },
    };

    const config = typeConfig[type] || typeConfig.rent;

    return (
      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredTransactions = getFilteredTransactions();

  const handleWithdraw = () => {
    alert("Withdraw functionality will be implemented with payment gateway integration");
  };

  const handleDownloadInvoice = (txnId) => {
    alert(`Downloading invoice for ${txnId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600">Track earnings, payments, and transaction history</p>
        </div>

        <button
          onClick={handleWithdraw}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          <Wallet size={20} />
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {paymentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-full bg-${stat.color}-50 flex items-center justify-center`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-600 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Bank Account Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-2">Primary Bank Account</p>
            <h3 className="text-2xl font-bold mb-1">HDFC Bank</h3>
            <p className="text-sm opacity-90 mb-4">Account: •••• •••• •••• 4589</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs opacity-75">IFSC Code</p>
                <p className="font-semibold">HDFC0001234</p>
              </div>
              <div>
                <p className="text-xs opacity-75">Account Type</p>
                <p className="font-semibold">Savings</p>
              </div>
            </div>
          </div>
          <div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-all">
              Change Bank
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex overflow-x-auto flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  min-w-[140px] px-6 py-4 text-sm font-semibold
                  border-b-2 transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "border-green-600 text-green-600 bg-green-50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 px-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <IndianRupee size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-600">You don't have any transactions in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Property & Tenant Info */}
                <div className="md:col-span-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusBadge(txn.status)}
                      {getPaymentTypeBadge(txn.type)}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 truncate">{txn.propertyName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <User size={12} className="text-gray-400" />
                      <p className="text-xs text-gray-600">{txn.tenantName}</p>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="md:col-span-2 flex items-center">
                  <div className="text-center w-full">
                    <p className="text-xs text-gray-500 mb-1">Amount</p>
                    <p className="text-2xl font-bold text-green-700">{txn.amount}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="md:col-span-3 bg-gray-50 rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Payment Method:</span>
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1">
                        <CreditCard size={12} />
                        {txn.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Transaction ID:</span>
                      <span className="text-xs font-bold text-gray-900">{txn.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Booking ID:</span>
                      <span className="text-xs font-bold text-gray-900">{txn.bookingId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200">
                      <Calendar size={12} />
                      {txn.date} at {txn.time}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex flex-col justify-center gap-2">
                  {txn.status === "completed" && (
                    <>
                      <button
                        onClick={() => handleDownloadInvoice(txn.id)}
                        className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Download size={16} />
                        Invoice
                      </button>
                      <button className="w-full px-3 py-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                        View Details
                      </button>
                    </>
                  )}
                  {txn.status === "pending" && (
                    <div className="text-center">
                      <p className="text-xs text-orange-600 font-semibold mb-2">⏳ Processing...</p>
                      <p className="text-xs text-gray-500">Est. 2-3 business days</p>
                    </div>
                  )}
                  {txn.status === "failed" && (
                    <button className="w-full px-3 py-2 bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                      Retry Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 16v-4M12 8h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-900 mb-1">Payment Protection</p>
          <p className="text-xs text-blue-700">
            All payments are processed securely through GharBazaar. Funds are held in escrow until tenant confirms move-in. 
            Withdrawals typically process within 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
