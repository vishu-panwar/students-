import { 
  Users, 
  Home, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Phone,
  FileText,
  ArrowUp,
  ArrowDown,
  PhoneIncoming,
  PhoneOutgoing,
  Target,
  Award
} from "lucide-react";

export default function Dashboard({ salesPerson }) {
  const stats = {
    totalLeads: { value: 45, change: "+12%", trend: "up" },
    inboundCalls: { value: 38, change: "+8%", trend: "up" },
    outboundCalls: { value: 156, change: "+15%", trend: "up" },
    convertedSales: { value: 12, change: "+21%", trend: "up" }
  };

  const performanceStats = {
    revenue: "â‚¹1.85L",
    commission: "â‚¹37,000",
    conversionRate: "26.7%",
    avgDealSize: "â‚¹15,400"
  };

  const recentActivities = [
    {
      id: 1,
      icon: PhoneIncoming,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Inbound Call - Rajesh Kumar",
      description: "Interested in 3BHK Apartment",
      time: "10 mins ago",
      status: "ANSWERED",
      statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
      id: 2,
      icon: PhoneOutgoing,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Outbound Call - Priya Sharma",
      description: "Follow-up for site visit",
      time: "25 mins ago",
      status: "CONNECTED",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Sale Closed - Amit Verma",
      description: "â‚¹85L property deal closed",
      time: "1 hour ago",
      status: "COMPLETED",
      statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
      id: 4,
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Follow-up Reminder",
      description: "Neha Gupta - 2BHK inquiry",
      time: "2 hours ago",
      status: "PENDING",
      statusColor: "bg-orange-100 text-orange-700"
    }
  ];

  const topLeads = [
    { name: "Amit Verma", property: "3BHK Apartment", budget: "â‚¹75L-â‚¹85L", status: "hot", lastContact: "Today" },
    { name: "Priya Sharma", property: "2BHK Flat", budget: "â‚¹45L-â‚¹55L", status: "warm", lastContact: "Yesterday" },
    { name: "Rahul Singh", property: "Villa", budget: "â‚¹1.2Cr", status: "hot", lastContact: "Today" }
  ];

  const monthlyTargets = {
    salesTarget: 20,
    salesAchieved: 12,
    revenueTarget: "â‚¹2Cr",
    revenueAchieved: "â‚¹1.2Cr"
  };

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
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sales Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome back, {salesPerson?.name || 'Vishu'}. Here's your sales performance overview.</p>
      </div>

      {/* Top Stats Grid - Sales Focused */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Leads */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.totalLeads.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.totalLeads.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.totalLeads.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">TOTAL LEADS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalLeads.value}</p>
        </div>

        {/* Inbound Calls */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
              <PhoneIncoming className="w-7 h-7 text-indigo-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.inboundCalls.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.inboundCalls.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.inboundCalls.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">INBOUND CALLS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.inboundCalls.value}</p>
        </div>

        {/* Outbound Calls */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <PhoneOutgoing className="w-7 h-7 text-purple-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.outboundCalls.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.outboundCalls.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.outboundCalls.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">OUTBOUND CALLS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.outboundCalls.value}</p>
        </div>

        {/* Converted Sales */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.convertedSales.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.convertedSales.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.convertedSales.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">CONVERTED SALES</p>
          <p className="text-4xl font-bold text-gray-900">{stats.convertedSales.value}</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-emerald-700">{performanceStats.revenue}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Commission Earned</p>
          <p className="text-3xl font-bold text-purple-700">{performanceStats.commission}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Conversion Rate</p>
          <p className="text-3xl font-bold text-blue-700">{performanceStats.conversionRate}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Avg Deal Size</p>
          <p className="text-3xl font-bold text-orange-700">{performanceStats.avgDealSize}</p>
        </div>
      </div>

      {/* Middle Row - Monthly Targets & Top Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Targets */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-900">Monthly Targets</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Sales Target</span>
                <span className="text-lg font-bold text-gray-900">
                  {monthlyTargets.salesAchieved}/{monthlyTargets.salesTarget}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                  style={{ width: `${(monthlyTargets.salesAchieved / monthlyTargets.salesTarget) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {Math.round((monthlyTargets.salesAchieved / monthlyTargets.salesTarget) * 100)}% Complete
              </p>
            </div>

            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Revenue Target</span>
                <span className="text-lg font-bold text-gray-900">
                  {monthlyTargets.revenueAchieved}/{monthlyTargets.revenueTarget}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">60% Complete</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-900">ðŸŽ¯ Keep Going!</span>
              <span className="text-sm font-bold text-emerald-700">8 more sales to target</span>
            </div>
          </div>
        </div>

        {/* Top Priority Leads */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">ðŸ”¥ Hot Leads</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {topLeads.map((lead, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{lead.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{lead.property}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-semibold">{lead.budget}</span>
                  <span className="text-gray-500">Last: {lead.lastContact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-200">
          <div className="p-6 border-b-2 border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Sales Activities</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                View All
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-12 h-12 ${activity.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{activity.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${activity.statusColor}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Add New Lead</p>
                <p className="text-xs opacity-80">Create lead entry</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Make Call</p>
                <p className="text-xs opacity-80">Start outbound call</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Schedule Visit</p>
                <p className="text-xs opacity-80">Book site visit</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">View Reports</p>
                <p className="text-xs opacity-80">Performance analytics</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
