import { TrendingUp, TrendingDown, Minus, FileText } from "lucide-react";

const schoolsData = [
  { name: "ETEC Paulistano", regional: "São Paulo", metasNoPrazo: 92 },
  { name: "ETEC Martin Luther King", regional: "São Paulo", metasNoPrazo: 65 },
  { name: "ETEC Albert Einstein", regional: "São Paulo", metasNoPrazo: 41 },
  { name: "ETEC Mandaqui", regional: "São Paulo", metasNoPrazo: 78 },
  { name: "ETEC Bento Quirino", regional: "Campinas", metasNoPrazo: 54 },
  { name: "ETEC Cons. Antônio Prado", regional: "Campinas", metasNoPrazo: 47 },
  { name: "ETEC Polivalente", regional: "Campinas", metasNoPrazo: 88 },
  { name: "ETEC Rubens de Faria", regional: "Sorocaba", metasNoPrazo: 60 },
  { name: "ETEC Fernando Prestes", regional: "Sorocaba", metasNoPrazo: 35 },
  { name: "ETEC Botucatu", regional: "Sorocaba", metasNoPrazo: 83 },
];

const regionals = ["São Paulo", "Campinas", "Sorocaba"];
const metasAtual = 72;
const metasAnterior = 68;

const SinteseExecutivaPanel = () => {
  // Desempenho geral
  const desempenho =
    metasAtual > 75
      ? { label: "desempenho adequado", color: "text-success" }
      : metasAtual >= 60
        ? { label: "situação de atenção", color: "text-warning" }
        : { label: "situação crítica", color: "text-destructive" };

  // Regional de maior risco
  const regionalStats = regionals.map((reg) => {
    const schools = schoolsData.filter((s) => s.regional === reg);
    const avg = Math.round(schools.reduce((s, sc) => s + sc.metasNoPrazo, 0) / schools.length);
    return { regional: reg, avg };
  });
  const worst = [...regionalStats].sort((a, b) => a.avg - b.avg)[0];

  // Tendência
  const diff = metasAtual - metasAnterior;
  const tendencia =
    diff > 0
      ? { label: "melhora", icon: TrendingUp, color: "text-success" }
      : diff < 0
        ? { label: "queda", icon: TrendingDown, color: "text-destructive" }
        : { label: "estabilidade", icon: Minus, color: "text-muted-foreground" };

  const TendIcon = tendencia.icon;

  return (
    <div
      className="bg-card rounded-xl p-6 flex items-start gap-5 card-hover animate-fade-up"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
          Situação da Rede
        </p>
        <p className="text-[13px] text-foreground leading-relaxed">
          A rede apresenta{" "}
          <span className={`font-bold ${desempenho.color}`}>{desempenho.label}</span>.
          A Regional de{" "}
          <span className="font-bold text-foreground">{worst.regional}</span>{" "}
          concentra o maior risco ({worst.avg}% das metas no prazo).
          O resultado apresentou{" "}
          <span className={`font-bold ${tendencia.color}`}>{tendencia.label}</span>{" "}
          em relação ao mês anterior.
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 mt-1">
        <TendIcon className={`h-4 w-4 ${tendencia.color}`} />
        <span className={`text-xs font-semibold ${tendencia.color}`}>
          {diff > 0 ? "+" : ""}{diff}%
        </span>
      </div>
    </div>
  );
};

export default SinteseExecutivaPanel;
