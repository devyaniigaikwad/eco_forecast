export default function RankingTable({ data, limit = 10 }) {
  const rows = data.slice(0, limit);
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">
              Rank
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">
              Country
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">
              Potential Index
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">
              Forecast Output
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 pb-3">
              Efficiency
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.rank}
              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 pr-4">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    row.rank === 1
                      ? "bg-amber-100 text-amber-600"
                      : row.rank === 2
                        ? "bg-slate-100 text-slate-600"
                        : row.rank === 3
                          ? "bg-orange-100 text-orange-600"
                          : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {row.rank}
                </span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{row.flag}</span>
                  <span className="text-sm font-medium text-slate-700">
                    {row.country}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${row.potential}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    {row.potential}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4 text-sm text-slate-600 font-medium">
                {row.forecast}
              </td>
              <td className="py-3">
                <span className="text-sm font-semibold text-slate-700">
                  {row.efficiency}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
