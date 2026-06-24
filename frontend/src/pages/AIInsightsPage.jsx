import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import InsightCard from "../components/InsightCard";
import { insightsData, globalTrendData } from "../data/dummyData";
import TrendChart from "../components/TrendChart";

export default function AIInsightsPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <BrainCircuit size={22} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">AI Insights</h1>
            <p className="text-sm text-slate-400">
              Machine Learning powered predictions and recommendations
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: Sparkles,
              label: "Predictions",
              value: "24",
              color: "#22C55E",
            },
            {
              icon: Lightbulb,
              label: "Recommendations",
              value: "12",
              color: "#F59E0B",
            },
            {
              icon: Target,
              label: "Opportunities",
              value: "8",
              color: "#3B82F6",
            },
            {
              icon: TrendingUp,
              label: "Trend Alerts",
              value: "6",
              color: "#8B5CF6",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} style={{ color }} />
                <span className="text-xs text-slate-400 font-medium">
                  {label}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </div>

        {/* All Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {insightsData.map((insight) => (
            <InsightCard key={insight.id} {...insight} />
          ))}
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-emerald-500" />
            <p className="text-sm font-bold text-slate-800">
              AI-Powered Trend Analysis
            </p>
          </div>
          <TrendChart
            data={globalTrendData}
            lines={[
              {
                key: "potential",
                color: "#22C55E",
                label: "Global Potential Index",
              },
            ]}
            height={260}
          />
        </div>
      </motion.div>
    </PageLayout>
  );
}
