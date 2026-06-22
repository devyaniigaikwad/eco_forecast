import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import GlobalMapPage from "./pages/GlobalMapPage";
import CountryAnalysisPage from "./pages/CountryAnalysisPage";
import EnergyForecastPage from "./pages/EnergyForecastPage";
import HistoricalTrendsPage from "./pages/HistoricalTrendsPage";
import WeatherAnalyticsPage from "./pages/WeatherAnalyticsPage";
import EnergyPotentialPage from "./pages/EnergyPotentialPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/global-map" element={<GlobalMapPage />} />
        <Route path="/country-analysis" element={<CountryAnalysisPage />} />
        <Route path="/energy-forecast" element={<EnergyForecastPage />} />
        <Route path="/historical-trends" element={<HistoricalTrendsPage />} />
        <Route path="/weather-analytics" element={<WeatherAnalyticsPage />} />
        <Route path="/energy-potential" element={<EnergyPotentialPage />} />
        <Route path="/ai-insights" element={<AIInsightsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
