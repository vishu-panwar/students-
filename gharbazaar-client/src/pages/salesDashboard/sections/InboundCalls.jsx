import { useState } from "react";
import { PhoneIncoming, Clock, User, MapPin, Home, DollarSign, Calendar, Phone, CheckCircle, XCircle } from "lucide-react";

export default function InboundCalls() {
  const [calls] = useState([
    {
      id: 1,
      customerName: "Rajesh Kumar",
      phone: "+91 98765 43210",
      time: "10:30 AM",
      date: "Today",
      propertyInterest: "3BHK Apartment, Sector 62",
      budget: "₹75L - ₹85L",
      status: "answered",
      duration: "5:32",
      notes: "Interested in property viewing this weekend"
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      phone: "+91 87654 32109",
      time: "11:15 AM",
      date: "Today",
      propertyInterest: "2BHK Flat, Greater Noida",
      budget: "₹45L - ₹55L",
      status: "missed",
      duration: "0:00",
      notes: "Call back required"
    },
    {
      id: 3,
      customerName: "Amit Verma",
      phone: "+91 76543 21098",
      time: "12:45 PM",
      date: "Today",
      propertyInterest: "Villa, Noida Extension",
      budget: "₹1.2Cr - ₹1.5Cr",
      status: "answered",
      duration: "8:15",
      notes: "High priority lead, ready to book"
    },
    {
      id: 4,
      customerName: "Sneha Gupta",
      phone: "+91 65432 10987",
      time: "2:20 PM",
      date: "Today",
      propertyInterest: "1BHK Studio, Sector 18",
      budget: "₹25L - ₹30L",
      status: "answered",
      duration: "3:45",
      notes: "First time buyer, needs guidance"
    },
    {
      id: 5,
      customerName: "Rahul Singh",
      phone: "+91 54321 09876",
      time: "3:50 PM",
      date: "Today",
      propertyInterest: "Office Space, Sector 16",
      budget: "₹80L - ₹90L",
      status: "missed",
      duration: "0:00",
      notes: "Commercial property inquiry"
    }
  ]);

  const [stats] = useState({
    total: 45,
    answered: 38,
    missed: 7,
    avgDuration: "5:32"
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'answered': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'missed': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'answered' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inbound Calls</h2>
          <p className="text-gray-600 mt-1">Track and manage incoming customer calls</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <PhoneIncoming className="w-5 h-5" />
          Log Manual Call
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <PhoneIncoming className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL CALLS</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">ANSWERED</p>
          <p className="text-3xl font-bold text-gray-900">{stats.answered}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">MISSED</p>
          <p className="text-3xl font-bold text-gray-900">{stats.missed}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">AVG DURATION</p>
          <p className="text-3xl font-bold text-gray-900">{stats.avgDuration}</p>
        </div>
      </div>

      {/* Call History */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Today's Call History</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {calls.map((call) => (
            <div key={call.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{call.customerName}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {call.phone}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      {call.time} • {call.date} • Duration: {call.duration}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 uppercase flex items-center gap-2 ${getStatusColor(call.status)}`}>
                  {getStatusIcon(call.status)}
                  {call.status}
                </span>
              </div>

              <div className="ml-16 space-y-3">
                <div className="flex items-start gap-2">
                  <Home className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Property Interest:</p>
                    <p className="text-sm text-gray-900">{call.propertyInterest}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Budget:</p>
                    <p className="text-sm text-gray-900">{call.budget}</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                  <p className="text-sm text-gray-900">{call.notes}</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                    Call Back
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm">
                    Schedule Visit
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm">
                    Add Notes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
