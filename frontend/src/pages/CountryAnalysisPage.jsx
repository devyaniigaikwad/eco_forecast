import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageLayout from "../components/PageLayout";
import CountryCard from "../components/CountryCard";
import ForecastChart from "../components/ForecastChart";
import TrendChart from "../components/TrendChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { countryData } from "../data/dummyData";

const countryKeys = Object.keys(countryData);

export default function CountryAnalysisPage() {
  const [selected, setSelected] = useState("india");
  const data = countryData[selected] || countryData.india;

  const contributionData = [
    { name: "Solar", value: data.solarScore, color: "#F59E0B" },
    { name: "Wind", value: data.windScore, color: "#3B82F6" },
    { name: "Hydro", value: data.hydroScore, color: "#06B6D4" },
  ];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{data.flag}</span>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{data.name}</h1>
              <p className="text-sm text-slate-400">
                Country Analysis & Forecast
              </p>
            </div>
          </div>
          <div className="relative">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="appearance-none text-sm border border-slate-200 rounded-xl px-4 py-2 pr-8 bg-white text-slate-600 cursor-pointer"
            >
              {countryKeys.map((k) => (
                <option key={k} value={k}>
                  {countryData[k].name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Potential Score",
              value: `${data.potential}/100`,
              color: "#22C55E",
            },
            {
              label: "Forecast Output",
              value: data.forecastOutput,
              color: "#F59E0B",
            },
            {
              label: "Efficiency Score",
              value: `${data.efficiency}%`,
              color: "#3B82F6",
            },
            {
              label: "Peak Generation",
              value: data.peakTime,
              color: "#8B5CF6",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <TrendChart
              data={data.historical}
              lines={[
                { key: "potential", color: "#22C55E", label: "Potential" },
                { key: "solar", color: "#F59E0B", label: "Solar" },
                { key: "wind", color: "#3B82F6", label: "Wind" },
              ]}
              title="Historical Trend (2015–2025)"
              height={280}
            />
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <ForecastChart
              data={data.forecast7Days}
              dataKey="output"
              xKey="day"
              title="Future Forecast (Next 7 Days)"
              height={280}
            />
          </div>
        </div>

        {/* Solar vs Wind */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-800 mb-4">
            Solar vs Wind vs Hydro Contribution
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={contributionData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {contributionData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </PageLayout>
  );
}
