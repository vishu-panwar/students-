import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../../../socket/socket';

const VisitSchedules = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/visit-schedules`, {
        params: { page, status: statusFilter, limit: 10 },
        withCredentials: true
      });
      setVisits(response.data.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (visitId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/update-visitSchedule/${visitId}`, { status: newStatus }, { withCredentials: true });
      fetchVisits();
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  useEffect(() => { fetchVisits(); }, [page, statusFilter]);

  useEffect(() => {
    const handleNewEnquiry = (data) => {
      if (data.type === "Visit") fetchVisits();
    };
    socket.on("newEnquiry", handleNewEnquiry);
    return () => { socket.off("newEnquiry", handleNewEnquiry); };
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Visit Schedules</h1>
        <select 
          className="bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-sm"
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          {['pending', 'approved', 'rejected', 'completed', 'cancelled'].map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Property</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User Info</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Schedule</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-6"><div className="h-16 w-16 bg-gray-200 rounded-lg"></div></td>
                  <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                  <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                  <td className="px-6 py-6"><div className="h-8 bg-gray-200 rounded-lg w-20"></div></td>
                </tr>
            )) : visits.map((visit) => (
              <tr key={visit._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={visit.property?.images[0]} alt="property" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                  <div>
                    <p className="font-bold text-gray-900">{visit.property?.title}</p>
                    <p className="text-xs text-gray-500">{visit.property?.location}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <p className="font-medium text-gray-900">{visit.user?.fullName}</p>
                  <p className="text-gray-500">{visit.user?.email}</p>
                </td>
                <td className="px-6 py-4 text-sm">
                  <p className="text-gray-900">{new Date(visit.visitDate).toLocaleDateString()}</p>
                  <p className="text-gray-500">{visit.timeSlot}</p>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={visit.status} 
                    onChange={(e) => handleUpdateStatus(visit._id, e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg py-1.5 px-3 text-sm font-medium"
                  >
                    {['pending', 'approved', 'rejected', 'completed', 'cancelled'].map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitSchedules;