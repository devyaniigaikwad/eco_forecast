import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import TrendChart from "../components/TrendChart";
import { historicalTrends, countryData } from "../data/dummyData";

const countryKeys = Object.keys(countryData);

export default function HistoricalTrendsPage() {
  const [selected, setSelected] = useState("india");

  const charts = [
    {
      title: "Solar Radiation Trend",
      data: historicalTrends.solar,
      lines: [
        { key: "value", color: "#F59E0B", label: "Solar Radiation (W/m²)" },
      ],
    },
    {
      title: "Temperature Trend",
      data: historicalTrends.temperature,
      lines: [{ key: "value", color: "#EF4444", label: "Temperature (°C)" }],
    },
    {
      title: "Wind Speed Trend",
      data: historicalTrends.windSpeed,
      lines: [{ key: "value", color: "#3B82F6", label: "Wind Speed (km/h)" }],
    },
    {
      title: "Cloud Cover Trend",
      data: historicalTrends.cloudCover,
      lines: [{ key: "value", color: "#8B5CF6", label: "Cloud Cover (%)" }],
    },
    {
      title: "Energy Potential Trend",
      data: historicalTrends.potential,
      lines: [{ key: "value", color: "#22C55E", label: "Potential Index" }],
    },
  ];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-800">
            Historical Trends
          </h1>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-4 py-2 bg-white text-slate-600"
          >
            {countryKeys.map((k) => (
              <option key={k} value={k}>
                {countryData[k].name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {charts.map(({ title, data, lines }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <TrendChart
                data={data}
                lines={lines}
                title={title}
                height={260}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
}
