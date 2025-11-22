import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Dummy analytics data
const lineData = [
  { name: "Mon", reach: 400, engagement: 240 },
  { name: "Tue", reach: 600, engagement: 350 },
  { name: "Wed", reach: 800, engagement: 300 },
  { name: "Thu", reach: 700, engagement: 450 },
  { name: "Fri", reach: 900, engagement: 500 },
];

const barData = [
  { name: "Reels", value: 120 },
  { name: "Posts", value: 80 },
  { name: "Stories", value: 150 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Dashboard</h1>
      <p className="text-sm sm:text-base text-gray-600">Overview of your campaign performance and recommendations</p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md p-4">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700">Active Campaigns</h2>
            <p className="text-4xl font-bold mt-3">3</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md p-4">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700">Total Reach</h2>
            <p className="text-4xl font-bold mt-3">89.2k</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md p-4">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700">Avg ROI Score</h2>
            <p className="text-4xl font-bold mt-3 text-green-600">82%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line Chart */}
        <Card className="rounded-2xl shadow-md col-span-2 p-4">
          <h2 className="text-lg font-semibold mb-4">Reach & Engagement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card className="rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Content Type Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Recommended Influencers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition">
              <div className="h-14 w-14 bg-gray-300 rounded-full mb-3" />
              <h3 className="text-lg font-bold">Influencer {item}</h3>
              <p className="text-gray-500 text-sm">Food • 50k followers • 4.2% ER</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}