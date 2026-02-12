import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { problems } from "@/data/problems";

const TopProblemasChart = () => {
  // Count unique schools per problem name
  const problemMap = new Map<string, Set<string>>();
  problems.forEach((p) => {
    if (!problemMap.has(p.problema)) {
      problemMap.set(p.problema, new Set());
    }
    problemMap.get(p.problema)!.add(p.escola);
  });

  const data = Array.from(problemMap.entries())
    .map(([name, schools]) => ({ name, count: schools.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={220}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
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
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? "hsl(0, 72%, 51%)" : "hsl(0, 100%, 35%)"} opacity={1 - i * 0.12} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProblemasChart;
