// Sidebar component (responsive with mobile drawer)
import { Link, useLocation } from "react-router-dom";
import {
  Home, Search, Users, BarChart, Settings, Folder, Calculator, Zap,
  Shield, FileText, DollarSign, Image as ImageIcon, MessageSquare, Sparkles, X
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const location = useLocation();
  
  const menu = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    { name: "Create Campaign", icon: <FileText />, path: "/create" },
    { name: "Influencer Discovery", icon: <Search />, path: "/discover" },
    { name: "Matches", icon: <Users />, path: "/matches" },
    { name: "Deals", icon: <MessageSquare />, path: "/deals" },
    { name: "Media Library", icon: <ImageIcon />, path: "/media" },
    { name: "Campaign Analytics", icon: <BarChart />, path: "/analytics" },
    { name: "Payments", icon: <DollarSign />, path: "/payments" },
    { name: "Saved Influencers", icon: <Folder />, path: "/saved" },
    { name: "Fraud Insights", icon: <Shield />, path: "/fraud" },
    { name: "ROI Calculator", icon: <Calculator />, path: "/roi" },
    { name: "Auto-Collab Engine", icon: <Zap />, path: "/auto" },
    { name: "AI Content Studio", icon: <Sparkles />, path: "/ai" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex bg-black text-white pl-4 pr-0 pt-4 pb-4 flex-col w-64 fixed left-0 top-16 bottom-0 z-30 overflow-visible">
        <nav className="flex flex-col space-y-2 sm:space-y-3 items-start overflow-y-auto pt-2 overflow-x-visible w-full">
          {menu.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center space-x-3 sm:space-x-4 ${isActive ? "" : "py-2 sm:py-3"} text-sm sm:text-base w-full ${
                  isActive
                    ? "sidebar-active-tab"
                    : "sidebar-inactive-tab text-white"
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-black" : "text-white ml-2"}`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen bg-black text-white pl-4 pr-0 pt-4 pb-4 flex flex-col w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-end mb-6 pt-4 pr-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-3 items-start overflow-y-auto w-full">
          {menu.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-4 py-3 w-full ${
                  isActive
                    ? "sidebar-active-tab"
                    : "sidebar-inactive-tab text-white"
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-black" : "text-white ml-2"}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
