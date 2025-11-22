
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from "recharts";

const COLORS = ["#ef4444", "#10b981", "#f59e0b"];

const influencerFraudData = [
  {
    id: 1,
    name: "Priya Eats",
    avatar: "https://i.pravatar.cc/100?img=5",
    fakeFollowers: 12,
    engagementQuality: 83,
    growthSpike: false,
  },
  {
    id: 2,
    name: "StreetBites",
    avatar: "https://i.pravatar.cc/100?img=12",
    fakeFollowers: 34,
    engagementQuality: 68,
    growthSpike: true,
  },
  {
    id: 3,
    name: "UrbanBites",
    avatar: "https://i.pravatar.cc/100?img=25",
    fakeFollowers: 8,
    engagementQuality: 91,
    growthSpike: false,
  },
];

export default function FraudInsights() {
  const overallFraudScore = [
    { name: "Real Followers", value: 78 },
    { name: "Suspicious", value: 15 },
    { name: "Bots", value: 7 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Fraud Insights</h1>
      <p className="text-sm text-gray-600 mt-1">
        AI-powered detection of fake followers, bot activity, and suspicious patterns.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">AVG Fake Followers</div>
          <div className="text-3xl font-bold mt-1">18%</div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Engagement Quality</div>
          <div className="text-3xl font-bold mt-1">81%</div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Bot-Risk Score</div>
          <div className="text-3xl font-bold mt-1">7%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Overall Audience Authenticity</h2>

        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={overallFraudScore}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {overallFraudScore.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Influencers Table */}
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Influencer Risk Analysis</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Influencer</th>
              <th className="text-left p-3">Fake Followers</th>
              <th className="text-left p-3">Engagement Quality</th>
              <th className="text-left p-3">Growth Spike</th>
              <th className="text-left p-3">Risk Level</th>
            </tr>
          </thead>

          <tbody>
            {influencerFraudData.map((inf) => {
              const risk =
                inf.fakeFollowers > 30
                  ? "High"
                  : inf.fakeFollowers > 15
                  ? "Medium"
                  : "Low";

              const color =
                risk === "High"
                  ? "text-red-600 bg-red-100"
                  : risk === "Medium"
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-green-600 bg-green-100";

              return (
                <tr key={inf.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={inf.avatar}
                        alt={inf.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className="font-medium">{inf.name}</span>
                    </div>
                  </td>

                  <td className="p-3">{inf.fakeFollowers}%</td>
                  <td className="p-3">{inf.engagementQuality}%</td>
                  <td className="p-3">
                    {inf.growthSpike ? (
                      <span className="text-red-500 font-semibold">Yes</span>
                    ) : (
                      <span className="text-green-600">No</span>
                    )}
                  </td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full ${color}`}>
                      {risk}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-xs text-gray-500">
        * Fraud detection uses AI models analyzing growth, engagement legitimacy, audience quality, and suspicious patterns.
      </div>
    </div>
  );
}
