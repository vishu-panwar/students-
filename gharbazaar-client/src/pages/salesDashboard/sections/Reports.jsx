import { FileText, Download, TrendingUp, DollarSign, Users, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Generate and download performance reports</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-cyan-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">REPORTS GENERATED</p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">PERFORMANCE SCORE</p>
          <p className="text-3xl font-bold text-gray-900">87%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">REVENUE TRACKED</p>
          <p className="text-3xl font-bold text-gray-900">₹18Cr</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">CUSTOMERS SERVED</p>
          <p className="text-3xl font-bold text-gray-900">156</p>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Daily Sales Report", desc: "Today's sales activity and performance", icon: Calendar, color: "blue" },
            { title: "Monthly Performance", desc: "Complete monthly sales analysis", icon: TrendingUp, color: "emerald" },
            { title: "Commission Statement", desc: "Detailed commission breakdown", icon: DollarSign, color: "purple" },
            { title: "Lead Conversion Report", desc: "Lead to sale conversion analytics", icon: Users, color: "orange" }
          ].map((report, idx) => {
            const Icon = report.icon;
            return (
              <div key={idx} className={`p-6 border-2 rounded-xl bg-${report.color}-50 border-${report.color}-200 hover:shadow-lg transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${report.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${report.color}-600`} />
                  </div>
                  <button className={`px-4 py-2 bg-${report.color}-600 text-white rounded-lg hover:bg-${report.color}-700 transition-colors font-semibold text-sm flex items-center gap-2`}>
                    <Download className="w-4 h-4" />
                    Generate
                  </button>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{report.title}</h4>
                <p className="text-sm text-gray-600">{report.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {[
            { name: "November 2024 - Sales Report", date: "Dec 1, 2024", size: "2.4 MB" },
            { name: "Q4 2024 - Performance Analysis", date: "Nov 28, 2024", size: "3.1 MB" },
            { name: "Commission Statement - November", date: "Nov 25, 2024", size: "1.8 MB" }
          ].map((report, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-600">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
