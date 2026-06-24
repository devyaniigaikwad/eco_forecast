import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Globe, Ruler, Clock, Bell } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { countryData } from "../data/dummyData";

const countryKeys = Object.keys(countryData);

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState("metric");
  const [defaultCountry, setDefaultCountry] = useState("india");
  const [forecastHorizon, setForecastHorizon] = useState("7days");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
  });

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-slate-800 mb-6">Settings</h1>

        <div className="max-w-2xl space-y-4">
          {/* Theme */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={20} className="text-slate-500" />
                ) : (
                  <Sun size={20} className="text-amber-500" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-800">Theme</p>
                  <p className="text-xs text-slate-400">
                    Toggle between light and dark mode
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-emerald-500" : "bg-slate-300"}`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          </div>

          {/* Units */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Ruler size={20} className="text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Units</p>
                <p className="text-xs text-slate-400">
                  Select measurement system
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {["metric", "imperial"].map((u) => (
                <button
                  key={u}
                  onClick={() => setUnits(u)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                    units === u
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Default Country */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Globe size={20} className="text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Default Country
                </p>
                <p className="text-xs text-slate-400">
                  Set your default country for analysis
                </p>
              </div>
            </div>
            <select
              value={defaultCountry}
              onChange={(e) => setDefaultCountry(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-slate-600"
            >
              {countryKeys.map((k) => (
                <option key={k} value={k}>
                  {countryData[k].name}
                </option>
              ))}
            </select>
          </div>

          {/* Forecast Horizon */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={20} className="text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Forecast Horizon
                </p>
                <p className="text-xs text-slate-400">
                  Set default forecast time range
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {["24hours", "7days", "30days", "90days"].map((h) => (
                <button
                  key={h}
                  onClick={() => setForecastHorizon(h)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    forecastHorizon === h
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}
                >
                  {h.replace(/(\d+)/, "$1 ")}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Notifications
                </p>
                <p className="text-xs text-slate-400">
                  Manage notification preferences
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { key: "email", label: "Email Notifications" },
                { key: "push", label: "Push Notifications" },
                { key: "weekly", label: "Weekly Summary" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{label}</span>
                  <button
                    onClick={() =>
                      setNotifications((n) => ({ ...n, [key]: !n[key] }))
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${notifications[key] ? "bg-emerald-500" : "bg-slate-300"}`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
