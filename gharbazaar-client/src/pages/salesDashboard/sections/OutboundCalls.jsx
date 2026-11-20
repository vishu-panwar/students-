import { useState } from "react";
import { PhoneOutgoing, Clock, User, Target, TrendingUp, CheckCircle, XCircle, Phone, Plus } from "lucide-react";

export default function OutboundCalls() {
  const [calls] = useState([
    {
      id: 1,
      leadName: "Neha Gupta",
      phone: "+91 99887 76655",
      lastCalled: "2 hours ago",
      attempts: 3,
      status: "connected",
      outcome: "Interested - Follow up scheduled",
      nextAction: "Site visit on Saturday"
    },
    {
      id: 2,
      leadName: "Vikram Mehta",
      phone: "+91 88776 65544",
      lastCalled: "5 hours ago",
      attempts: 1,
      status: "no-answer",
      outcome: "No response",
      nextAction: "Call back tomorrow"
    },
    {
      id: 3,
      leadName: "Pooja Desai",
      phone: "+91 77665 54433",
      lastCalled: "Yesterday",
      attempts: 2,
      status: "connected",
      outcome: "Requested property details via email",
      nextAction: "Send brochure and follow up"
    },
    {
      id: 4,
      leadName: "Arjun Reddy",
      phone: "+91 66554 43322",
      lastCalled: "Yesterday",
      attempts: 4,
      status: "no-answer",
      outcome: "Multiple attempts - no response",
      nextAction: "Try different time slot"
    },
    {
      id: 5,
      leadName: "Kavita Patel",
      phone: "+91 55443 32211",
      lastCalled: "2 days ago",
      attempts: 1,
      status: "connected",
      outcome: "Converted - Deal closed",
      nextAction: "Documentation pending"
    }
  ]);

  const [stats] = useState({
    totalCalls: 156,
    connected: 98,
    notConnected: 58,
    conversionRate: "12.5%"
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'connected': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'no-answer': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outbound Calls</h2>
          <p className="text-gray-600 mt-1">Manage your outgoing calls and lead follow-ups</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Start New Call
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <PhoneOutgoing className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">TOTAL CALLS</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalCalls}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">CONNECTED</p>
          <p className="text-3xl font-bold text-gray-900">{stats.connected}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">NO ANSWER</p>
          <p className="text-3xl font-bold text-gray-900">{stats.notConnected}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">CONVERSION RATE</p>
          <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}</p>
        </div>
      </div>

      {/* Call List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Recent Outbound Calls</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {calls.map((call) => (
            <div key={call.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{call.leadName}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {call.phone}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      Last called: {call.lastCalled} • Attempts: {call.attempts}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 uppercase ${getStatusColor(call.status)}`}>
                  {call.status === 'connected' ? 'CONNECTED' : 'NO ANSWER'}
                </span>
              </div>

              <div className="ml-16 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Outcome:</p>
                  <p className="text-sm text-blue-800">{call.outcome}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">Next Action:</p>
                  <p className="text-sm text-green-800">{call.nextAction}</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Again
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm">
                    Mark as Converted
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm">
                    Update Notes
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
