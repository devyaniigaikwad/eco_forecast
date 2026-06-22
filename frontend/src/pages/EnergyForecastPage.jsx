import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import { forecastData } from "../data/dummyData";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const tabs = ["Hourly", "Daily", "Weekly", "Monthly"];

export default function EnergyForecastPage() {
  const [activeTab, setActiveTab] = useState("Daily");
  const dataKey = activeTab.toLowerCase();
  const data = forecastData[dataKey];
  const xKey =
    dataKey === "hourly"
      ? "time"
      : dataKey === "daily"
        ? "day"
        : dataKey === "weekly"
          ? "week"
          : "month";

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-slate-800 mb-6">
          Energy Forecast
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab} Forecast
            </button>
          ))}
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
          <p className="text-sm font-bold text-slate-800 mb-4">
            Forecast Output – Line Chart
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
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
              <Legend />
              <Line
                type="monotone"
                dataKey="solar"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
                name="Solar"
              />
              <Line
                type="monotone"
                dataKey="wind"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                name="Wind"
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#22C55E"
                strokeWidth={2.5}
                dot={false}
                name="Total"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart + Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm font-bold text-slate-800 mb-4">
              Energy Output – Area Chart
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={data}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
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
                <Legend />
                <Area
                  type="monotone"
                  dataKey="solar"
                  stroke="#F59E0B"
                  fill="url(#gradSolar)"
                  strokeWidth={2}
                  name="Solar"
                />
                <Area
                  type="monotone"
                  dataKey="wind"
                  stroke="#3B82F6"
                  fill="url(#gradWind)"
                  strokeWidth={2}
                  name="Wind"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm font-bold text-slate-800 mb-4">
              Energy Output – Bar Chart
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
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
                <Legend />
                <Bar
                  dataKey="solar"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  name="Solar"
                />
                <Bar
                  dataKey="wind"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  name="Wind"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
