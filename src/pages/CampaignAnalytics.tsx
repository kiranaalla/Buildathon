// import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  // BarChart,
  // Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const reachData = [
  { day: "Mon", reach: 3400 },
  { day: "Tue", reach: 5400 },
  { day: "Wed", reach: 7200 },
  { day: "Thu", reach: 6800 },
  { day: "Fri", reach: 8900 },
  { day: "Sat", reach: 10200 },
  { day: "Sun", reach: 9500 },
];

const engagementData = [
  { name: "Likes", value: 3200 },
  { name: "Comments", value: 980 },
  { name: "Shares", value: 450 },
  { name: "Saves", value: 700 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

const topInfluencers = [
  {
    name: "Priya Eats",
    avatar: "https://i.pravatar.cc/100?img=5",
    reach: 5200,
    engagement: "5.1%",
  },
  {
    name: "StreetBites",
    avatar: "https://i.pravatar.cc/100?img=12",
    reach: 4100,
    engagement: "4.4%",
  },
  {
    name: "UrbanBites",
    avatar: "https://i.pravatar.cc/100?img=25",
    reach: 3900,
    engagement: "6.2%",
  },
];

export default function CampaignAnalytics() {
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Campaign Analytics</h1>
      <p className="text-sm text-gray-600 mt-1">
        Track reach, engagement, conversions, and influencer performance.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Total Reach</div>
          <div className="text-3xl font-bold mt-1">45,200</div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Avg CTR</div>
          <div className="text-3xl font-bold mt-1">3.4%</div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Conversions</div>
          <div className="text-3xl font-bold mt-1">620</div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-600">Revenue</div>
          <div className="text-3xl font-bold mt-1">₹78,400</div>
        </div>
      </div>

      {/* Reach trend */}
      <div className="mt-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">Reach Trend (Last 7 Days)</h2>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={reachData}>
              <XAxis dataKey="day" />
              <YAxis />
              <RTooltip />
              <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Pie */}
      <div className="mt-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">Engagement Breakdown</h2>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={engagementData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {engagementData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <RTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Influencers */}
      <div className="mt-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Top Performing Influencers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topInfluencers.map((inf, idx) => (
            <div
              key={idx}
              className="p-4 shadow rounded-xl border bg-white flex items-center gap-4"
            >
              <img
                src={inf.avatar}
                className="h-14 w-14 rounded-full object-cover"
                alt={inf.name}
              />
              <div>
                <div className="font-semibold">{inf.name}</div>
                <div className="text-xs text-gray-600">Reach: {inf.reach}</div>
                <div className="text-xs text-gray-600">ER: {inf.engagement}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-4">
        * Analytics shown here are approximate demo values. In production, these numbers update from Instagram API and campaign engine.
      </div>
    </div>
  );
}
