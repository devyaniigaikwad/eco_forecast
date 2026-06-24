import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import PageLayout from "../components/PageLayout";
import WorldMap from "../components/WorldMap";
import { mapCountries } from "../data/dummyData";

const continents = [
  "All",
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
];
const energyTypes = ["All", "Solar", "Wind", "Hydro", "Combined"];

export default function GlobalMapPage() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2025);
  const [continent, setContinent] = useState("All");
  const [energyType, setEnergyType] = useState("All");

  return (
    <PageLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-800">
            Global Energy Map
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600"
            >
              {Array.from({ length: 11 }, (_, i) => 2015 + i).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600"
            >
              {continents.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600"
            >
              {energyTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-[calc(100vh-200px)]">
          <WorldMap
            onCountryClick={(c) =>
              navigate(`/country-analysis?country=${c.name.toLowerCase()}`)
            }
            height={560}
          />
        </div>
      </motion.div>
    </PageLayout>
  );
}
