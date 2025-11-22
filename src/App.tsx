import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Menu, X } from "lucide-react";

import Dashboard from "./pages/Dashboard";
import CreateCampaign from "./pages/CreateCampaign";
import InfluencerDiscovery from "./pages/InfluencerDiscovery";
import Matches from "./pages/Matches";
import Deals from "./pages/Deals";
import MediaLibrary from "./pages/MediaLibrary";
import CampaignAnalytics from "./pages/CampaignAnalytics";
import Payments from "./pages/Payments";
import SavedInfluencers from "./pages/SavedInfluencers";
import FraudInsights from "./pages/FraudInsights";
import ROICalculator from "./pages/ROICalculator";
import AutoCollabEngine from "./pages/AutoCollabEngine";
import AIContentStudio from "./pages/AIContentStudio";
import Settings from "./pages/Settings";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at Top */}
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="px-4 sm:px-6">
          <Header />
        </div>
      </div>

      {/* Main Layout Below Header */}
      <div className="flex relative mt-16">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        {/* Main Content */}
        <div className="flex-1 w-full lg:ml-64 p-4 sm:p-6 bg-gray-100 min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/discover" element={<InfluencerDiscovery />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/analytics" element={<CampaignAnalytics />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/saved" element={<SavedInfluencers />} />
          <Route path="/fraud" element={<FraudInsights />} />
          <Route path="/roi" element={<ROICalculator />} />
          <Route path="/auto" element={<AutoCollabEngine />} />
          <Route path="/ai" element={<AIContentStudio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
