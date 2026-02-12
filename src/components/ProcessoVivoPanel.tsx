import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const monthlyData = [
  { mes: "Set", metas: 58 },
  { mes: "Out", metas: 62 },
  { mes: "Nov", metas: 60 },
  { mes: "Dez", metas: 65 },
  { mes: "Jan", metas: 68 },
  { mes: "Fev", metas: 72 },
];

const eixoData = [
  { eixo: "Permanência", count: 6 },
  { eixo: "Qualidade", count: 5 },
  { eixo: "Gestão", count: 5 },
  { eixo: "Infraestrutura", count: 5 },
  { eixo: "Comunidade", count: 4 },
];

const eixoColors = [
  "#C62828",
  "#D45050",
  "#D9A441",
  "#2E7D5B",
  "#A0AEC0",
];

const ProcessoVivoPanel = () => {
  return (
    <div className="w-full space-y-6">
      {/* KPI destaque */}
      <div className="flex items-center gap-3 bg-background rounded-md px-4 py-3">
        <div className="h-9 w-9 rounded-full bg-warning/15 flex items-center justify-center">
          <span className="text-sm font-bold text-warning">5</span>
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">Novos problemas em fev/2026</p>
          <p className="text-[10px] text-muted-foreground">+2 em relação ao mês anterior</p>
        </div>
      </div>

      {/* Evolução mensal */}
      <div>
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
          Evolução — Metas no Prazo (%)
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "hsl(0, 0%, 50%)" }} axisLine={false} tickLine={false} />
            <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: "hsl(0, 0%, 50%)" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", background: "hsl(var(--card))", padding: "8px 12px" }}
              formatter={(value: number) => [`${value}%`, "Metas no prazo"]}
            />
            <ReferenceLine
              y={80}
              stroke="hsl(0, 0%, 65%)"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{ value: "Meta: 80%", position: "right", fontSize: 9, fill: "hsl(0, 0%, 50%)" }}
            />
            <Line
              type="monotone"
              dataKey="metas"
              stroke="#C62828"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#C62828", strokeWidth: 0 }}
              activeDot={{ r: 7, fill: "#C62828", stroke: "white", strokeWidth: 2 }}
              animationBegin={300}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição por eixo */}
      <div>
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
          Problemas por Eixo Estratégico
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={eixoData} layout="vertical" barCategoryGap={6}>
            <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(0, 0%, 50%)" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="eixo" tick={{ fontSize: 10, fill: "hsl(0, 0%, 50%)" }} axisLine={false} tickLine={false} width={90} />
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", background: "hsl(var(--card))", padding: "8px 12px" }}
              formatter={(value: number) => [value, "Problemas"]}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16} animationBegin={200} animationDuration={700} animationEasing="ease-out">
              {eixoData.map((_, i) => (
                <Cell key={i} fill={eixoColors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProcessoVivoPanel;
