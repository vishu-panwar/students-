import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/payments`, {
        params: { page, limit: 10 },
        withCredentials: true
      });
      setPayments(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Payment History</h1>
        <p className="text-gray-500 text-sm">Review transaction history and user payment details.</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Plan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-6 py-6"><div className="h-8 bg-gray-200 rounded-lg w-20"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.userId?.email || 'N/A'}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{payment.planName || 'N/A'}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{payment.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        payment.status === 'success' ? 'bg-green-100 text-green-700' : 
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{payment.orderId}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 transition"
        >Previous</button>
        <span className="text-sm text-gray-600">Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button 
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 transition"
        >Next</button>
      </div>
    </div>
  );
};

export default PaymentPage;