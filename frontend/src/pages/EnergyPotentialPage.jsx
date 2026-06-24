import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import RankingTable from "../components/RankingTable";
import { energyPotentialRanking } from "../data/dummyData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const distribution = [
  { name: "Very High (80–100)", value: 8, color: "#16A34A" },
  { name: "High (60–80)", value: 18, color: "#22C55E" },
  { name: "Medium (40–60)", value: 12, color: "#F59E0B" },
  { name: "Low (20–40)", value: 4, color: "#F97316" },
  { name: "Very Low (0–20)", value: 2, color: "#EF4444" },
];

export default function EnergyPotentialPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-slate-800 mb-6">
          Energy Potential Index
        </h1>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Top Countries Ranking
          </h2>
          <RankingTable data={energyPotentialRanking} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Distribution Pie */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm font-bold text-slate-800 mb-4">
              Global Score Distribution
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm font-bold text-slate-800 mb-4">
              Country Comparison – Solar vs Wind
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={energyPotentialRanking.slice(0, 8)}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="country"
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
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
                  dataKey="solarScore"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  name="Solar"
                />
                <Bar
                  dataKey="windScore"
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
