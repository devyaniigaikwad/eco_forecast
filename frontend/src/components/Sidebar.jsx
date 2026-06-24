import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  MapPin,
  TrendingUp,
  BarChart3,
  CloudSun,
  Award,
  BrainCircuit,
  FileText,
  Settings,
  Leaf,
  Zap,
} from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/global-map", label: "Global Map", icon: Globe },
  { path: "/country-analysis", label: "Country Analysis", icon: MapPin },
  { path: "/energy-forecast", label: "Energy Forecast", icon: TrendingUp },
  { path: "/historical-trends", label: "Historical Trends", icon: BarChart3 },
  { path: "/weather-analytics", label: "Weather Analytics", icon: CloudSun },
  { path: "/energy-potential", label: "Energy Potential Index", icon: Award },
  { path: "/ai-insights", label: "AI Insights", icon: BrainCircuit },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[240px] flex flex-col z-50"
      style={{ background: "#0F172A" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
          <Leaf size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">
            EcoForecast
          </h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Promo Banner */}
      <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border border-emerald-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={16} className="text-emerald-400" />
          <span className="text-emerald-400 text-xs font-semibold">
            Green Energy
          </span>
        </div>
        <p className="text-white text-xs font-medium mb-1">Green Today</p>
        <p className="text-white text-xs font-medium">Better Tomorrow</p>
        <button className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
          Data Source
        </button>
      </div>
    </aside>
  );
}
