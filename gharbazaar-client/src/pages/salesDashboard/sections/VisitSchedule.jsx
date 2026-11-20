import { useState } from "react";
import { Calendar, MapPin, User, Clock, Plus, CheckCircle, XCircle } from "lucide-react";

export default function VisitSchedule() {
  const [visits] = useState([
    {
      id: 1,
      customerName: "Amit Verma",
      property: "Green Valley Apartments, Sector 62",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      status: "scheduled",
      notes: "Client interested in 3BHK on 5th floor"
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      property: "Skyline Towers, Greater Noida",
      date: "Dec 21, 2024",
      time: "2:30 PM",
      status: "scheduled",
      notes: "First-time buyer, needs detailed tour"
    },
    {
      id: 3,
      customerName: "Rahul Singh",
      property: "Palm Residency, Noida Extension",
      date: "Dec 18, 2024",
      time: "11:00 AM",
      status: "completed",
      notes: "Site visit completed, very interested"
    },
    {
      id: 4,
      customerName: "Neha Gupta",
      property: "Lotus Gardens, Sector 18",
      date: "Dec 17, 2024",
      time: "4:00 PM",
      status: "cancelled",
      notes: "Client cancelled due to personal reasons"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visit Schedule</h2>
          <p className="text-gray-600 mt-1">Manage property site visit appointments</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Schedule Visit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-pink-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL VISITS</p>
          <p className="text-3xl font-bold text-gray-900">23</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">SCHEDULED</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">COMPLETED</p>
          <p className="text-3xl font-bold text-gray-900">13</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">CANCELLED</p>
          <p className="text-3xl font-bold text-gray-900">2</p>
        </div>
      </div>

      {/* Visit List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Upcoming & Recent Visits</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {visits.map((visit) => (
            <div key={visit.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{visit.customerName}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4" />
                      {visit.property}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {visit.date} at {visit.time}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 uppercase flex items-center gap-2 ${getStatusColor(visit.status)}`}>
                  {getStatusIcon(visit.status)}
                  {visit.status}
                </span>
              </div>

              <div className="ml-16">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                  <p className="text-sm text-gray-900">{visit.notes}</p>
                </div>

                {visit.status === 'scheduled' && (
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm">
                      Mark Completed
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm">
                      Cancel
                    </button>
                  </div>
                )}

                {visit.status === 'completed' && (
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm">
                      Schedule Follow-up
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
