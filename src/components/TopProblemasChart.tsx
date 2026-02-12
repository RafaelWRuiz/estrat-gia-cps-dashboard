import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { problems } from "@/data/problems";

interface TopProblemasChartProps {
  filterRegional?: string;
}

const TopProblemasChart = ({ filterRegional }: TopProblemasChartProps) => {
  const filtered = filterRegional ? problems.filter((p) => p.regional === filterRegional) : problems;
  const problemMap = new Map<string, Set<string>>();
  filtered.forEach((p) => {
    if (!problemMap.has(p.problema)) {
      problemMap.set(p.problema, new Set());
    }
    problemMap.get(p.problema)!.add(p.escola);
  });

  const data = Array.from(problemMap.entries())
    .map(([name, schools]) => ({ name, count: schools.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Gradient from institutional red to neutral gray
  const colors = [
    "#C62828",
    "#D45050",
    "#D9A441",
    "#A0AEC0",
    "#CBD5E0",
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={220}
            tick={{ fontSize: 11, fill: "hsl(0, 0%, 50%)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value} escola${value > 1 ? "s" : ""}`, "Afetadas"]}
            contentStyle={{
              fontSize: "11px",
              borderRadius: "6px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
              background: "hsl(var(--card))",
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i] || colors[colors.length - 1]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProblemasChart;
