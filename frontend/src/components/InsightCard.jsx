import {
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const typeIcons = {
  prediction: BrainCircuit,
  trend: TrendingUp,
  warning: AlertTriangle,
  opportunity: Lightbulb,
};

export default function InsightCard({
  title,
  description,
  badge,
  color,
  type = "prediction",
}) {
  const Icon = typeIcons[type] || BrainCircuit;
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: color + "15", color }}
        >
          {badge}
        </span>
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
