import { motion } from "framer-motion";
import { FileText, Download, FileSpreadsheet, FileDown } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { reportsData } from "../data/dummyData";

const typeIcons = {
  PDF: FileText,
  CSV: FileSpreadsheet,
  Excel: FileSpreadsheet,
};
const typeColors = { PDF: "#EF4444", CSV: "#22C55E", Excel: "#3B82F6" };

export default function ReportsPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-slate-800 mb-6">
          Reports & Exports
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportsData.map((report) => {
            const Icon = typeIcons[report.type] || FileText;
            const color = typeColors[report.type] || "#64748B";
            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: color + "15" }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">
                      {report.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span
                        className="px-2 py-1 rounded-lg font-semibold"
                        style={{ backgroundColor: color + "15", color }}
                      >
                        {report.type}
                      </span>
                      <span>{report.size}</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-100 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Generate PDF Report",
                icon: FileText,
                color: "#EF4444",
              },
              { label: "Export CSV", icon: FileSpreadsheet, color: "#22C55E" },
              {
                label: "Export Excel",
                icon: FileSpreadsheet,
                color: "#3B82F6",
              },
              { label: "Forecast Summary", icon: FileDown, color: "#F59E0B" },
            ].map(({ label, icon: Icon, color }) => (
              <button
                key={label}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Icon size={20} style={{ color }} />
                <span className="text-xs font-semibold text-slate-700">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
