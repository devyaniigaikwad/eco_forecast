import { motion } from "framer-motion";
import {
  Globe,
  Leaf,
  Trophy,
  Zap,
  Target,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const iconMap = {
  globe: Globe,
  leaf: Leaf,
  trophy: Trophy,
  zap: Zap,
  target: Target,
  calendar: Calendar,
};

export default function KpiCard({
  label,
  value,
  sub,
  icon,
  color,
  trend,
  trendUp,
}) {
  const Icon = iconMap[icon] || Globe;
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trendUp
              ? "text-emerald-600 bg-emerald-50"
              : "text-red-500 bg-red-50"
          }`}
        >
          {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </div>
      </div>
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400">{sub}</span>
      </div>
    </motion.div>
  );
}
