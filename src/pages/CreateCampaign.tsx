import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateCampaign() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Create Campaign</h1>
      <p className="text-sm sm:text-base text-gray-600">Define your campaign details and objectives</p>

      {/* Campaign Details */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Campaign Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Campaign Name" className="rounded-xl" />
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="sales">Sales / Conversions</SelectItem>
                <SelectItem value="launch">Product Launch</SelectItem>
                <SelectItem value="footfall">Increase Footfall</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea placeholder="Campaign Description" className="rounded-xl" rows={4} />
        </CardContent>
      </Card>

      {/* Targeting */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Target Audience</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-25">18-25</SelectItem>
                <SelectItem value="25-40">25-40</SelectItem>
                <SelectItem value="40+">40+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Location (City / Area)" className="rounded-xl" />
          </div>
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Deliverables</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Number of Reels" type="number" className="rounded-xl" />
            <Input placeholder="Number of Posts" type="number" className="rounded-xl" />
            <Input placeholder="Stories (optional)" type="number" className="rounded-xl" />
          </div>

          <Textarea placeholder="Notes for Influencers (tone, do's & don'ts)" className="rounded-xl" rows={4} />
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Budget</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Budget (₹)" type="number" className="rounded-xl" />
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="escrow">Escrow</SelectItem>
                <SelectItem value="milestone">Milestone-based</SelectItem>
                <SelectItem value="upfront">Upfront</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Media Upload */}
      <Card className="rounded-2xl shadow p-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Upload Media</h2>
          <input 
            type="file" 
            multiple 
            className="w-full border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button className="w-full py-4 text-lg rounded-xl">Create Campaign</Button>
    </div>
  );
}