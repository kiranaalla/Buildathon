import { Bell, User, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-0 rounded-xl">
      {/* Branding */}
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 bg-blue-600 rounded-lg" />
        <h2 className="text-lg sm:text-xl font-bold tracking-wide">BrandBlazers</h2>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl w-1/3">
        <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search influencers, campaigns..."
          className="bg-transparent outline-none ml-3 w-full text-sm sm:text-base"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 cursor-pointer hover:text-black transition" />
        
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
          <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-300 rounded-full" />
          <span className="hidden sm:inline font-medium text-sm sm:text-base">Business User</span>
        </div>
      </div>
    </header>
  );
}

