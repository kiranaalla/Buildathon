import React, { useState } from "react";

interface Deal {
  id: number;
  influencer: string;
  avatar: string;
  payout: number;
  deliverables: string;
  status: "Pending Content" | "Under Review" | "Scheduled" | "Posted";
  date: string;
}

const mockDeals: Deal[] = [
  {
    id: 1,
    influencer: "Priya Eats",
    avatar: "https://i.pravatar.cc/100?img=5",
    payout: 2500,
    deliverables: "1 Reel + 1 Story",
    status: "Pending Content",
    date: "Nov 20, 2025",
  },
  {
    id: 2,
    influencer: "StreetBites",
    avatar: "https://i.pravatar.cc/100?img=12",
    payout: 1800,
    deliverables: "1 Post",
    status: "Under Review",
    date: "Nov 18, 2025",
  },
  {
    id: 3,
    influencer: "UrbanBites",
    avatar: "https://i.pravatar.cc/100?img=25",
    payout: 3200,
    deliverables: "1 Reel",
    status: "Scheduled",
    date: "Nov 15, 2025",
  },
  {
    id: 4,
    influencer: "CafeCrush",
    avatar: "https://i.pravatar.cc/100?img=40",
    payout: 2100,
    deliverables: "1 Story + 1 Post",
    status: "Posted",
    date: "Nov 10, 2025",
  },
];

export default function DealsPage() {
  const [search, setSearch] = useState("");

  const filteredDeals = mockDeals.filter((deal) =>
    deal.influencer.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status: Deal["status"]) => {
    switch (status) {
      case "Pending Content":
        return "text-yellow-600 bg-yellow-100";
      case "Under Review":
        return "text-blue-600 bg-blue-100";
      case "Scheduled":
        return "text-purple-600 bg-purple-100";
      case "Posted":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Deals</h1>
      <p className="text-sm text-gray-600 mt-1">
        Manage all ongoing and completed influencer deals.
      </p>

      {/* Search */}
      <div className="mt-4">
        <input
          className="w-80 bg-gray-50 p-2 border rounded-lg outline-none"
          placeholder="Search influencers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Deals Table */}
      <div className="mt-6 bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="text-left p-3">Influencer</th>
              <th className="text-left p-3">Deliverables</th>
              <th className="text-left p-3">Payout</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDeals.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No deals found.
                </td>
              </tr>
            )}

            {filteredDeals.map((deal) => (
              <tr key={deal.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={deal.avatar}
                      alt={deal.influencer}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{deal.influencer}</span>
                  </div>
                </td>

                <td className="p-3 text-sm">{deal.deliverables}</td>

                <td className="p-3 font-semibold text-sm">₹{deal.payout}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      deal.status
                    )}`}
                  >
                    {deal.status}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-500">{deal.date}</td>

                <td className="p-3">
                  <button className="text-blue-600 text-sm mr-4">
                    View Details
                  </button>
                  <button className="text-red-600 text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
