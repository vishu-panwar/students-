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
    revenue: "₹1.85L",
    commission: "₹37,000",
    conversionRate: "26.7%",
    avgDealSize: "₹15,400"
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
      description: "₹85L property deal closed",
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
    { name: "Amit Verma", property: "3BHK Apartment", budget: "₹75L-₹85L", status: "hot", lastContact: "Today" },
    { name: "Priya Sharma", property: "2BHK Flat", budget: "₹45L-₹55L", status: "warm", lastContact: "Yesterday" },
    { name: "Rahul Singh", property: "Villa", budget: "₹1.2Cr", status: "hot", lastContact: "Today" }
  ];

  const monthlyTargets = {
    salesTarget: 20,
    salesAchieved: 12,
    revenueTarget: "₹2Cr",
    revenueAchieved: "₹1.2Cr"
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
              <span className="text-sm font-semibold text-emerald-900">🎯 Keep Going!</span>
              <span className="text-sm font-bold text-emerald-700">8 more sales to target</span>
            </div>
          </div>
        </div>

        {/* Top Priority Leads */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">🔥 Hot Leads</h3>
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
  const stats = {
    totalUsers: { value: 20, change: "+12%", trend: "up" },
    propertyOwners: { value: 10, change: "+4%", trend: "up" },
    totalTenants: { value: 10, change: "-5%", trend: "down" },
    activeListings: { value: 0, change: "+21%", trend: "up" }
  };

  const recentActivities = [
    {
      id: 1,
      icon: Home,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "New Listing: Green Valley",
      user: "Rakesh Kumar",
      time: "2 mins ago",
      status: "APPROVED",
      statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
      id: 2,
      icon: AlertCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Refund Request #2041",
      user: "Sneha Singh",
      time: "15 mins ago",
      status: "PENDING",
      statusColor: "bg-orange-100 text-orange-700"
    },
    {
      id: 3,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "New Landlord Signed Up",
      user: "Priya Sharma",
      time: "45 mins ago",
      status: "ACTIVE",
      statusColor: "bg-blue-100 text-blue-700"
    }
  ];

  const propertyStatus = {
    occupied: 0,
    available: 10
  };

  const revenue = {
    today: "₹45,200",
    thisMonth: "₹12,40,000",
    yearToDate: "₹1,48,000"
  };

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600 mt-2">Welcome back, {salesPerson?.name || 'Vishu'}. Here's what's happening today.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.totalUsers.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.totalUsers.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.totalUsers.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">REGISTERED USERS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalUsers.value}</p>
        </div>

        {/* Property Owners */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.propertyOwners.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.propertyOwners.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.propertyOwners.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">PROPERTY OWNERS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.propertyOwners.value}</p>
        </div>

        {/* Total Tenants */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.totalTenants.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.totalTenants.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.totalTenants.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">TOTAL TENANTS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalTenants.value}</p>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-orange-600" />
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              stats.activeListings.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.activeListings.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {stats.activeListings.change}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">ACTIVE LISTINGS</p>
          <p className="text-4xl font-bold text-gray-900">{stats.activeListings.value}</p>
        </div>
      </div>

      {/* Middle Row - Property Status & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Property Status */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Property Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">Occupied</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{propertyStatus.occupied}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-emerald-600"
                style={{ width: `${propertyStatus.occupied}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">Available ({propertyStatus.available})</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{100 - propertyStatus.occupied}%</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">PENDING VERIFICATION</span>
              <span className="text-2xl font-bold text-orange-600">0 requests</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Revenue</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
              Gross ▼
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Today</p>
              <p className="text-3xl font-bold text-gray-900">{revenue.today}</p>
            </div>

            <div className="pt-4 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-2">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{revenue.thisMonth}</p>
            </div>

            <div className="pt-4 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Year to Date</p>
              <p className="text-2xl font-bold text-gray-900">{revenue.yearToDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-200">
          <div className="p-6 border-b-2 border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                View All
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-600 border-b border-gray-200">
                    <th className="pb-3">EVENT</th>
                    <th className="pb-3">USER</th>
                    <th className="pb-3">DATE</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                            </div>
                            <span className="font-medium text-gray-900">{activity.title}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-700">{activity.user}</td>
                        <td className="py-4 text-gray-600 text-sm">{activity.time}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${activity.statusColor}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Hero Banners</p>
                <p className="text-xs opacity-80">Manage banners</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Broadcast</p>
                <p className="text-xs opacity-80">Send messages</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Invoices</p>
                <p className="text-xs opacity-80">View invoices</p>
              </div>
            </button>

            <button className="w-full p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all text-left flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">My Documents</p>
                <p className="text-xs opacity-80">Access files</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">COUPON MANAGEMENT</p>
              <p className="text-3xl font-bold text-gray-900">12 <span className="text-lg">open</span></p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">VISIT SCHEDULE</p>
              <p className="text-3xl font-bold text-gray-900">8 <span className="text-lg">upcoming</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
