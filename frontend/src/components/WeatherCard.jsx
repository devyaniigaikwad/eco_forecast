import {
  Thermometer,
  Sun,
  Wind,
  Droplets,
  Cloud,
  Gauge,
  Compass,
  CloudRain,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const iconMap = {
  thermometer: Thermometer,
  sun: Sun,
  wind: Wind,
  droplets: Droplets,
  cloud: Cloud,
  gauge: Gauge,
  compass: Compass,
  cloudRain: CloudRain,
};

export default function WeatherCard({
  label,
  value,
  unit,
  icon,
  color,
  data,
  mini = false,
}) {
  const Icon = iconMap[icon] || Sun;
  const chartData = (data || []).map((v, i) => ({ i, v }));

  if (mini) {
    return (
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
        <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-800">{value}</span>
            <span className="text-xs text-slate-400 ml-1">{unit}</span>
          </div>
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.2}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
      {chartData.length > 0 && (
        <div className="h-12 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`wg-${icon}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                fill={`url(#wg-${icon})`}
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
