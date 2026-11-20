import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Phone, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function SalesDashboard() {
  const [salesPerson, setSalesPerson] = useState(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    pendingFollowups: 0,
    revenue: 0,
    callsMade: 0,
    meetingsScheduled: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [leadsData, setLeadsData] = useState([]);

  useEffect(() => {
    // Get sales person from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setSalesPerson(user);

    // Mock data - Replace with API calls
    setStats({
      totalLeads: 45,
      convertedLeads: 12,
      pendingFollowups: 8,
      revenue: 185000,
      callsMade: 156,
      meetingsScheduled: 23
    });

    setRecentActivities([
      {
        id: 1,
        type: "call",
        title: "Called Client - Rajesh Kumar",
        description: "Interested in 3BHK Apartment in Noida",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: 2,
        type: "meeting",
        title: "Site Visit Scheduled",
        description: "Mr. Sharma - DLF Garden City",
        time: "5 hours ago",
        status: "scheduled"
      },
      {
        id: 3,
        type: "conversion",
        title: "Lead Converted",
        description: "₹1,50,000 commission earned",
        time: "1 day ago",
        status: "success"
      },
      {
        id: 4,
        type: "followup",
        title: "Follow-up Pending",
        description: "Ms. Priya - 2BHK Flat inquiry",
        time: "2 days ago",
        status: "pending"
      }
    ]);

    setLeadsData([
      {
        id: 1,
        name: "Amit Verma",
        phone: "+91 98765 43210",
        property: "3BHK Apartment, Sector 62",
        budget: "₹75L - ₹85L",
        status: "hot",
        lastContact: "Today, 2:30 PM",
        nextFollowup: "Tomorrow, 11:00 AM"
      },
      {
        id: 2,
        name: "Neha Gupta",
        phone: "+91 87654 32109",
        property: "2BHK Flat, Greater Noida",
        budget: "₹45L - ₹55L",
        status: "warm",
        lastContact: "Yesterday, 4:15 PM",
        nextFollowup: "In 2 days, 3:00 PM"
      },
      {
        id: 3,
        name: "Rahul Sharma",
        phone: "+91 76543 21098",
        property: "Villa, Noida Extension",
        budget: "₹1.2Cr - ₹1.5Cr",
        status: "hot",
        lastContact: "Today, 10:00 AM",
        nextFollowup: "Today, 5:00 PM"
      },
      {
        id: 4,
        name: "Pooja Singh",
        phone: "+91 65432 10987",
        property: "1BHK Studio, Sector 18",
        budget: "₹25L - ₹30L",
        status: "cold",
        lastContact: "3 days ago",
        nextFollowup: "Next week"
      }
    ]);
  }, []);

  const conversionRate = stats.totalLeads > 0 
    ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)
    : 0;

  const getStatusColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-100 text-red-700 border-red-300';
      case 'warm': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'cold': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getActivityIcon = (type, status) => {
    if (type === 'call') return <Phone className="w-4 h-4" />;
    if (type === 'meeting') return <Calendar className="w-4 h-4" />;
    if (type === 'conversion') return <CheckCircle className="w-4 h-4" />;
    if (type === 'followup') return <AlertCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getActivityStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'scheduled': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-emerald-50 border-emerald-200';
      case 'pending': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Good Afternoon, {salesPerson?.name || 'Sales Executive'}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Track your performance and manage leads
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
                View Target
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Add New Lead
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Leads */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
                <p className="text-sm text-emerald-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Converted Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.convertedLeads}</p>
                <p className="text-sm text-emerald-600 mt-1">{conversionRate}% conversion rate</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{(stats.revenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-emerald-600 mt-1">₹45K this week</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Calls Made */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calls Made</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.callsMade}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Meetings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meetings Scheduled</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.meetingsScheduled}</p>
                <p className="text-sm text-gray-500 mt-1">8 this week</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Pending Follow-ups */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Follow-ups</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingFollowups}</p>
                <p className="text-sm text-orange-600 mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Leads */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">My Active Leads</h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {leadsData.map((lead) => (
                <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{lead.phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Property:</span> {lead.property}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Budget:</span> {lead.budget}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Last Contact:</span> {lead.lastContact}
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                      Follow Up
                    </button>
                  </div>
                  <div className="text-xs text-orange-600 mt-2">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Next Follow-up: {lead.nextFollowup}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`p-4 rounded-lg border ${getActivityStatusColor(activity.status)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      activity.status === 'success' ? 'text-emerald-600' :
                      activity.status === 'scheduled' ? 'text-blue-600' :
                      activity.status === 'pending' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {getActivityIcon(activity.type, activity.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
