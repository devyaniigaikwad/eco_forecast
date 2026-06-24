import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function TrendChart({
  data,
  lines,
  xKey = "year",
  title,
  height = 280,
}) {
  return (
    <div>
      {title && (
        <p className="text-sm font-semibold text-slate-700 mb-3">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
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
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ fontWeight: 600, color: "#1E293B" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {lines.map(({ key, color, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={false}
              name={label || key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
