import { useState } from "react";
import { Target, TrendingUp, Trophy, Award, Calendar } from "lucide-react";

export default function TargetsGoals() {
  const [targets] = useState({
    monthly: {
      target: 20,
      achieved: 12,
      percentage: 60,
      revenue: { target: "₹2Cr", achieved: "₹1.2Cr" }
    },
    quarterly: {
      target: 60,
      achieved: 45,
      percentage: 75,
      revenue: { target: "₹6Cr", achieved: "₹4.5Cr" }
    },
    yearly: {
      target: 240,
      achieved: 180,
      percentage: 75,
      revenue: { target: "₹24Cr", achieved: "₹18Cr" }
    }
  });

  const [leaderboard] = useState([
    { rank: 1, name: "Amit Kumar", sales: 28, commission: "₹5.6L", badge: "🥇" },
    { rank: 2, name: "Vishu Panwar (You)", sales: 12, commission: "₹2.4L", badge: "🥈" },
    { rank: 3, name: "Priya Sharma", sales: 10, commission: "₹2.0L", badge: "🥉" },
    { rank: 4, name: "Rahul Singh", sales: 8, commission: "₹1.6L", badge: "" },
    { rank: 5, name: "Neha Gupta", sales: 7, commission: "₹1.4L", badge: "" }
  ]);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-emerald-600";
    if (percentage >= 50) return "bg-blue-600";
    return "bg-orange-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Targets & Goals</h2>
          <p className="text-gray-600 mt-1">Track your performance against targets</p>
        </div>
      </div>

      {/* Current Period Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Monthly */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">MONTHLY TARGET</p>
              <p className="text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                December 2024
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">{targets.monthly.achieved}/{targets.monthly.target}</span>
              <span className="text-lg font-bold text-blue-600">{targets.monthly.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getProgressColor(targets.monthly.percentage)}`}
                style={{ width: `${targets.monthly.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">Revenue</p>
            <p className="text-sm font-bold text-gray-900">{targets.monthly.revenue.achieved} / {targets.monthly.revenue.target}</p>
          </div>
        </div>

        {/* Quarterly */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">QUARTERLY TARGET</p>
              <p className="text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                Q4 2024
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">{targets.quarterly.achieved}/{targets.quarterly.target}</span>
              <span className="text-lg font-bold text-purple-600">{targets.quarterly.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getProgressColor(targets.quarterly.percentage)}`}
                style={{ width: `${targets.quarterly.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">Revenue</p>
            <p className="text-sm font-bold text-gray-900">{targets.quarterly.revenue.achieved} / {targets.quarterly.revenue.target}</p>
          </div>
        </div>

        {/* Yearly */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">YEARLY TARGET</p>
              <p className="text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                2024
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">{targets.yearly.achieved}/{targets.yearly.target}</span>
              <span className="text-lg font-bold text-emerald-600">{targets.yearly.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getProgressColor(targets.yearly.percentage)}`}
                style={{ width: `${targets.yearly.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">Revenue</p>
            <p className="text-sm font-bold text-gray-900">{targets.yearly.revenue.achieved} / {targets.yearly.revenue.target}</p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">Sales Leaderboard - This Month</h3>
        </div>

        <div className="space-y-3">
          {leaderboard.map((person) => (
            <div 
              key={person.rank}
              className={`p-4 rounded-xl border-2 ${
                person.name.includes('You') 
                  ? 'bg-emerald-50 border-emerald-300' 
                  : 'bg-gray-50 border-gray-200'
              } hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                    person.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    person.rank === 2 ? 'bg-gray-200 text-gray-700' :
                    person.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {person.badge || person.rank}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-600">{person.sales} Sales • {person.commission} Commission</p>
                  </div>
                </div>
                {person.name.includes('You') && (
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                    YOU
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🏆 Your Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">🎯</p>
            <p className="text-sm font-semibold">Target Achiever</p>
            <p className="text-xs opacity-80">Hit 10 targets</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">⭐</p>
            <p className="text-sm font-semibold">Rising Star</p>
            <p className="text-xs opacity-80">5 consecutive wins</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">💎</p>
            <p className="text-sm font-semibold">Top Performer</p>
            <p className="text-xs opacity-80">Top 3 this quarter</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">🔥</p>
            <p className="text-sm font-semibold">On Fire</p>
            <p className="text-xs opacity-80">7 day streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
