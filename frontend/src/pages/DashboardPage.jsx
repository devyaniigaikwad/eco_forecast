import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, ChevronRight, ArrowRight } from "lucide-react";
import PageLayout from "../components/PageLayout";
import KpiCard from "../components/KpiCard";
import WorldMap from "../components/WorldMap";
import CountryCard from "../components/CountryCard";
import ForecastChart from "../components/ForecastChart";
import TrendChart from "../components/TrendChart";
import RankingTable from "../components/RankingTable";
import WeatherCard from "../components/WeatherCard";
import InsightCard from "../components/InsightCard";
import {
  kpiData,
  globalTrendData,
  topCountries,
  countryData,
  insightsData,
  weatherData,
} from "../data/dummyData";

export default function DashboardPage() {
  const navigate = useNavigate();
  const india = countryData.india;

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.id} {...kpi} />
          ))}
        </div>

        {/* Map + Country Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  Global Renewable Energy Potential Map
                </h2>
                <Info size={14} className="text-slate-400" />
              </div>
            </div>
            <WorldMap
              onCountryClick={(c) =>
                navigate(`/country-analysis?country=${c.name.toLowerCase()}`)
              }
              height={380}
            />
          </div>
          <div>
            <CountryCard data={india} />
            <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <ForecastChart
                data={india.forecast7Days}
                dataKey="output"
                xKey="day"
                title="Forecasted Energy Output (Next 7 Days)"
                height={140}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Top 5 Countries */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">
                Top 5 Countries by Potential Index
              </h2>
            </div>
            <div className="space-y-3">
              {topCountries.slice(0, 5).map((c) => (
                <div key={c.rank} className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      c.rank === 1
                        ? "bg-amber-100 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {c.rank}
                  </span>
                  <span className="text-base">{c.flag}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-700">
                      {c.country}
                    </p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${c.potential}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    {c.potential}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/energy-potential")}
              className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-2"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>

          {/* Trend Chart */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-800">
                Energy Potential Trend
              </h2>
              <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-500 bg-slate-50">
                <option>10 Years</option>
                <option>5 Years</option>
              </select>
            </div>
            <TrendChart
              data={globalTrendData}
              lines={[
                {
                  key: "potential",
                  color: "#22C55E",
                  label: "Global Avg Potential",
                },
              ]}
              height={200}
            />
          </div>

          {/* Weather Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">
                Weather Overview (India)
              </h2>
              <button
                onClick={() => navigate("/weather-analytics")}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                View Details <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {weatherData.slice(0, 6).map((w) => (
                <WeatherCard key={w.label} {...w} />
              ))}
            </div>
          </div>
        </div>

        {/* Weather Mini Cards */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Key Weather Parameters (India) – Recent Data
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {weatherData.map((w) => (
              <WeatherCard key={w.label} {...w} mini />
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              AI Insights & Recommendations
            </h2>
            <button
              onClick={() => navigate("/ai-insights")}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View Full Analytics <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insightsData.slice(0, 3).map((insight) => (
              <InsightCard key={insight.id} {...insight} />
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
