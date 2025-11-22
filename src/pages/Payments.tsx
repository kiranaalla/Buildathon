import { useState } from "react";

interface Payment {
  id: number;
  influencer: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

const mockPayments: Payment[] = [
  { id: 1, influencer: "Priya Eats", amount: 2500, status: "Completed", date: "Nov 20, 2025" },
  { id: 2, influencer: "StreetBites", amount: 1800, status: "Pending", date: "Nov 21, 2025" },
  { id: 3, influencer: "UrbanBites", amount: 3200, status: "Completed", date: "Nov 18, 2025" },
  { id: 4, influencer: "CafeCrush", amount: 2100, status: "Failed", date: "Nov 15, 2025" },
];

export default function Payments() {
  const [filter, setFilter] = useState<"All" | Payment["status"]>("All");

  const filtered = mockPayments.filter(
    (p) => filter === "All" || p.status === filter
  );

  const statusColor = (status: Payment["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Failed":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="text-sm text-gray-600 mt-1">
        Track all payments made to influencers across your campaigns.
      </p>

      {/* Filters */}
      <div className="mt-4 flex items-center gap-3">
        <select
          className="border rounded-lg p-2 bg-gray-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="mt-6 bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Influencer</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.influencer}</td>
                <td className="p-3 font-semibold">₹{p.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{p.date}</td>
                <td className="p-3">
                  <button className="text-blue-600">Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

