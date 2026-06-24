import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Globe,
  Calendar,
  Leaf,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left - Logo + Tagline (visible on smaller screens when sidebar might be hidden) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="text-emerald-500" />
          <span className="font-bold text-slate-800 text-sm hidden lg:inline">
            EcoForecast
          </span>
          <span className="text-slate-400 text-xs hidden xl:inline ml-1">
            Renewable Energy Forecasting System
          </span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Country..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
        <button className="ml-2 lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <Menu size={20} />
        </button>
      </div>

      {/* Right - Filters + Notifications + Avatar */}
      <div className="flex items-center gap-3">
        {/* Worldwide Filter */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-sm text-slate-600">
          <Globe size={14} className="text-slate-400" />
          <span>Worldwide</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {/* Date Range */}
        <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-sm text-slate-600">
          <Calendar size={14} className="text-slate-400" />
          <span>2015 – 2025</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700 leading-tight">
              Admin
            </p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
          <ChevronDown size={14} className="text-slate-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
}
