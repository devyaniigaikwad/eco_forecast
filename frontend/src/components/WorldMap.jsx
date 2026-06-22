import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { mapCountries } from "../data/dummyData";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const levelColors = {
  "very-high": "#16A34A",
  high: "#22C55E",
  medium: "#F59E0B",
  low: "#F97316",
  "very-low": "#EF4444",
};

function WorldMap({
  onCountryClick,
  height = 420,
  showZoom = true,
  compact = false,
}) {
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  const countryMap = {};
  mapCountries.forEach((c) => {
    countryMap[c.id] = c;
  });

  const handleMove = (pos) => {
    if (showZoom) setPosition(pos);
  };

  return (
    <div className="relative w-full">
      <ComposableMap
        projectionConfig={{ rotate: [-10, 0, 0], scale: compact ? 130 : 147 }}
        style={{ width: "100%", height: height }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMove}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso = geo.properties.ISO_A3 || geo.id;
                const cData = countryMap[iso];
                const fill = cData
                  ? levelColors[cData.level] || "#E2E8F0"
                  : "#E2E8F0";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#fff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: cData ? "#15803D" : "#CBD5E1",
                        cursor: cData ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e) => {
                      if (cData) {
                        setTooltip({ x: e.clientX, y: e.clientY, data: cData });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (tooltip)
                        setTooltip({ ...tooltip, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (cData && onCountryClick) onCountryClick(cData);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl min-w-[160px]">
            <p className="font-bold text-sm mb-1">{tooltip.data.name}</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Potential</span>
                <span className="text-emerald-400 font-semibold">
                  {tooltip.data.potential}/100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Solar</span>
                <span className="font-semibold">{tooltip.data.solar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wind</span>
                <span className="font-semibold">{tooltip.data.wind}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 mb-1.5">
          Energy Potential
        </p>
        <div className="space-y-1">
          {[
            { label: "Very High (80–100)", color: "#16A34A" },
            { label: "High (60–80)", color: "#22C55E" },
            { label: "Medium (40–60)", color: "#F59E0B" },
            { label: "Low (20–40)", color: "#F97316" },
            { label: "Very Low (0–20)", color: "#EF4444" },
            { label: "No Data", color: "#E2E8F0" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-3 h-2 rounded-sm inline-block"
                style={{ background: color }}
              />
              <span className="text-[10px] text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      {showZoom && (
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button
            onClick={() =>
              setPosition((p) => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }))
            }
            className="w-7 h-7 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 font-bold text-sm flex items-center justify-center"
          >
            +
          </button>
          <button
            onClick={() =>
              setPosition((p) => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }))
            }
            className="w-7 h-7 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 font-bold text-sm flex items-center justify-center"
          >
            −
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(WorldMap);
