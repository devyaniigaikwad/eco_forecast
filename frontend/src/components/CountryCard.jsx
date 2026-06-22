import { Zap, Clock, Gauge, TrendingUp } from "lucide-react";

export default function CountryCard({ data }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{data.flag}</span>
        <div>
          <h3 className="font-bold text-slate-800">{data.name}</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
            High Potential
          </span>
        </div>
      </div>

      {/* Gauge */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#22C55E"
              strokeWidth="8"
              strokeDasharray={`${data.potential * 2.64} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-800">
              {data.potential}
            </span>
            <span className="text-[10px] text-slate-400">/100</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 font-medium mb-4">
        Potential Index
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: Zap,
            label: "Forecasted Output",
            value: data.forecastOutput,
            color: "#F59E0B",
          },
          {
            icon: Clock,
            label: "Peak Generation",
            value: data.peakTime,
            color: "#3B82F6",
          },
          {
            icon: Gauge,
            label: "Efficiency",
            value: `${data.efficiency}%`,
            color: "#22C55E",
          },
          {
            icon: TrendingUp,
            label: "Trend (YoY)",
            value: `↑${data.trend}%`,
            color: "#22C55E",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-3">
            <Icon size={14} style={{ color }} className="mb-1" />
            <p className="text-[10px] text-slate-400">{label}</p>
            <p className="text-sm font-bold text-slate-700">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
