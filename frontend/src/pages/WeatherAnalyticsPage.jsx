import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import WeatherCard from "../components/WeatherCard";
import TrendChart from "../components/TrendChart";
import { weatherData, historicalTrends } from "../data/dummyData";

export default function WeatherAnalyticsPage() {
  const trendCharts = [
    {
      title: "Temperature History",
      data: historicalTrends.temperature,
      lines: [{ key: "value", color: "#EF4444", label: "°C" }],
    },
    {
      title: "Solar Radiation History",
      data: historicalTrends.solar,
      lines: [{ key: "value", color: "#F59E0B", label: "W/m²" }],
    },
    {
      title: "Wind Speed History",
      data: historicalTrends.windSpeed,
      lines: [{ key: "value", color: "#3B82F6", label: "km/h" }],
    },
    {
      title: "Cloud Cover History",
      data: historicalTrends.cloudCover,
      lines: [{ key: "value", color: "#8B5CF6", label: "%" }],
    },
  ];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-slate-800 mb-2">
          Weather Analytics
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          India – Current Weather Parameters
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {weatherData.map((w) => (
            <WeatherCard key={w.label} {...w} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {trendCharts.map(({ title, data, lines }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <TrendChart
                data={data}
                lines={lines}
                title={title}
                height={240}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
}
