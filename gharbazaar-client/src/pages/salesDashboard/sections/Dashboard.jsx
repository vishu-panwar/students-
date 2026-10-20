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
  ArrowDown
} from "lucide-react";

export default function Dashboard({ salesPerson }) {
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
