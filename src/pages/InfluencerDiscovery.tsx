import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Slider from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Dummy influencer data
const influencers = [
  {
    id: 1,
    name: "Aditi Rao",
    niche: "Food",
    followers: 52000,
    engagement: 4.5,
    authenticity: 82,
    location: "Bangalore",
    roi: 78,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Rohit Cinematics",
    niche: "Travel",
    followers: 89000,
    engagement: 3.8,
    authenticity: 75,
    location: "Hyderabad",
    roi: 71,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    name: "FitWithKavya",
    niche: "Fitness",
    followers: 43000,
    engagement: 5.1,
    authenticity: 88,
    location: "Mumbai",
    roi: 83,
    image: "https://via.placeholder.com/80",
  },
];

export default function InfluencerDiscovery() {
  const [followerRange, setFollowerRange] = useState([0, 100]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Influencer Discovery</h1>
      <p className="text-gray-600">Find the perfect influencers powered by AI, ROI scoring, and authenticity analysis.</p>

      {/* Search & Filters */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl w-full">
            <Search className="h-5 w-5 text-gray-500" />
            <Input placeholder="Search influencer name or keyword" className="bg-transparent border-none ml-3" />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Niche */}
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>

            {/* Location */}
            <Input placeholder="Location (City / Locality)" className="rounded-xl" />

            {/* Gender */}
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Audience Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Follower Range */}
            <div>
              <p className="font-medium mb-2">Follower Range (K)</p>
              <Slider
                defaultValue={[20, 80]}
                min={0}
                max={200}
                step={5}
                className="w-full"
                onValueChange={(value: number[]) => setFollowerRange(value)}
              />
              <p className="text-sm text-gray-600 mt-2">{followerRange[0]}K - {followerRange[1]}K</p>
            </div>

            {/* Engagement Rate */}
            <div>
              <p className="font-medium mb-2">Minimum Engagement Rate (%)</p>
              <Slider defaultValue={[3]} min={0} max={10} step={0.5} className="w-full" />
            </div>
          </div>

          {/* Authenticity Score */}
          <div>
            <p className="font-medium mb-2">Minimum Authenticity Score</p>
            <Slider defaultValue={[60]} min={0} max={100} step={5} className="w-full" />
          </div>

        </CardContent>
      </Card>

      {/* Influencer Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {influencers.map((inf) => (
          <Card key={inf.id} className="rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img src={inf.image} className="h-16 w-16 rounded-full bg-gray-200" />
                <div>
                  <h3 className="text-lg font-bold">{inf.name}</h3>
                  <p className="text-gray-500 text-sm">{inf.niche} • {inf.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center mt-4">
                <div>
                  <p className="text-lg font-bold">{inf.followers / 1000}k</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{inf.engagement}%</p>
                  <p className="text-xs text-gray-500">Eng. Rate</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{inf.authenticity}%</p>
                  <p className="text-xs text-gray-500">Authenticity</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-center">
                <p className="text-blue-600 font-semibold">ROI Score: {inf.roi}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}