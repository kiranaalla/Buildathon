import React, { useState } from "react";

interface Influencer {
  id: number;
  name: string;
  niche: string;
  followers: number;
  engagement: number;
  authenticity: number;
  avatar: string;
}

const mockSavedInfluencers: Influencer[] = [
  {
    id: 1,
    name: "Priya Eats",
    niche: "Food",
    followers: 128000,
    engagement: 5.4,
    authenticity: 82,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "StreetBites",
    niche: "Food",
    followers: 97000,
    engagement: 4.8,
    authenticity: 78,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "UrbanBites",
    niche: "Lifestyle",
    followers: 55000,
    engagement: 6.1,
    authenticity: 88,
    avatar: "https://i.pravatar.cc/100?img=25",
  },
];

export default function SavedInfluencersPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(mockSavedInfluencers);

  const filtered = saved.filter((inf) =>
    inf.name.toLowerCase().includes(search.toLowerCase())
  );

  const removeInfluencer = (id: number) => {
    setSaved(saved.filter((inf) => inf.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Saved Influencers</h1>
      <p className="text-sm text-gray-600 mt-1">
        Organized list of influencers you’ve shortlisted for future campaigns.
      </p>

      {/* Search Bar */}
      <div className="mt-4 flex items-center gap-3">
        <input
          className="w-80 bg-gray-50 border rounded-lg p-2 outline-none"
          placeholder="Search influencers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Influencer Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="text-gray-500 text-sm col-span-3">
            No influencers match your search.
          </div>
        )}

        {filtered.map((inf) => (
          <div
            key={inf.id}
            className="p-4 bg-white rounded-xl shadow flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={inf.avatar}
                alt={inf.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{inf.name}</div>
                <div className="text-xs text-gray-500">
                  {inf.niche} • {Math.round(inf.followers / 1000)}k followers
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-sm font-semibold">{inf.engagement}%</div>
                <div className="text-xs text-gray-500">Eng</div>
              </div>

              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-sm font-semibold">{inf.authenticity}%</div>
                <div className="text-xs text-gray-500">Auth</div>
              </div>

              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-sm font-semibold">
                  {Math.round((inf.engagement * inf.authenticity) / 10)}
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between">
              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">
                View Profile
              </button>

              <button
                onClick={() => removeInfluencer(inf.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
