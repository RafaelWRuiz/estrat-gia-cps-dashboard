import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const schools = [
  { name: "ETEC Paulistano", status: "good" },
  { name: "ETEC Martin Luther King", status: "warning" },
  { name: "ETEC Albert Einstein", status: "critical" },
  { name: "ETEC Mandaqui", status: "good" },
  { name: "ETEC Bento Quirino", status: "warning" },
  { name: "ETEC Cons. Antônio Prado", status: "critical" },
  { name: "ETEC Polivalente", status: "good" },
  { name: "ETEC Rubens de Faria", status: "warning" },
  { name: "ETEC Fernando Prestes", status: "critical" },
  { name: "ETEC Botucatu", status: "good" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  good: { label: "Adequada", color: "hsl(152, 60%, 42%)" },
  warning: { label: "Atenção", color: "hsl(43, 96%, 50%)" },
  critical: { label: "Crítico", color: "hsl(0, 72%, 51%)" },
};

const SituacaoPieChart = () => {
  const counts = schools.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(counts).map(([status, value]) => ({
    name: statusConfig[status].label,
    value,
    color: statusConfig[status].color,
  }));

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-[280px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} escola${value > 1 ? "s" : ""}`, name]}
              contentStyle={{
                fontSize: "11px",
                borderRadius: "6px",
                border: "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-card)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] text-muted-foreground">
              {d.name} ({d.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SituacaoPieChart;
