import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { problems } from "@/data/problems";

interface TopProblemasChartProps {
  filterRegional?: string;
}

const TopProblemasChart = ({ filterRegional }: TopProblemasChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
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

  const colors = [
    "#C62828",
    "#D45050",
    "#D9A441",
    "#A0AEC0",
    "#CBD5E0",
  ];

  return (
    <div className="w-full animate-fade-up">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}
          onMouseLeave={() => setActiveIndex(undefined)}>
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
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              background: "hsl(var(--card))",
              padding: "8px 12px",
            }}
            cursor={{ fill: "rgba(0,0,0,0.03)", radius: 4 }}
          />
          <Bar
            dataKey="count"
            radius={[0, 6, 6, 0]}
            barSize={20}
            animationBegin={200}
            animationDuration={700}
            animationEasing="ease-out"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={colors[i] || colors[colors.length - 1]}
                opacity={activeIndex !== undefined && activeIndex !== i ? 0.35 : 1}
                style={{ transition: "opacity 0.2s ease" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProblemasChart;
