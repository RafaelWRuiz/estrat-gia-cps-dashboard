import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const allSchools = [
  { name: "ETEC Paulistano", regional: "São Paulo", status: "good" },
  { name: "ETEC Martin Luther King", regional: "São Paulo", status: "warning" },
  { name: "ETEC Albert Einstein", regional: "São Paulo", status: "critical" },
  { name: "ETEC Mandaqui", regional: "São Paulo", status: "good" },
  { name: "ETEC Bento Quirino", regional: "Campinas", status: "warning" },
  { name: "ETEC Cons. Antônio Prado", regional: "Campinas", status: "critical" },
  { name: "ETEC Polivalente", regional: "Campinas", status: "good" },
  { name: "ETEC Rubens de Faria", regional: "Sorocaba", status: "warning" },
  { name: "ETEC Fernando Prestes", regional: "Sorocaba", status: "critical" },
  { name: "ETEC Botucatu", regional: "Sorocaba", status: "good" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  good: { label: "Adequada", color: "#2E7D5B" },
  warning: { label: "Atenção", color: "#D9A441" },
  critical: { label: "Crítico", color: "#C62828" },
};

interface SituacaoPieChartProps {
  filterRegional?: string;
}

const SituacaoPieChart = ({ filterRegional }: SituacaoPieChartProps) => {
  const schools = filterRegional ? allSchools.filter((s) => s.regional === filterRegional) : allSchools;
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

  const total = schools.length;

  return (
    <div className="w-full flex items-center gap-6">
      <div className="w-[200px] h-[200px] relative shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-foreground leading-none">{total}</span>
          <span className="text-[10px] text-muted-foreground mt-1">escolas</span>
        </div>
      </div>

      {/* Side labels */}
      <div className="flex flex-col gap-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
            <div>
              <span className="text-sm font-bold text-foreground">{d.value}</span>
              <span className="text-[11px] text-muted-foreground ml-1.5">{d.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SituacaoPieChart;
