import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

interface SituacaoGeralProps {
  metasNoPrazo: number;
  escolasEmRisco: number;
}

const SituacaoGeralCard = ({ metasNoPrazo, escolasEmRisco }: SituacaoGeralProps) => {
  const status =
    metasNoPrazo >= 70 && escolasEmRisco < 10
      ? "good"
      : metasNoPrazo < 50 || escolasEmRisco >= 20
        ? "critical"
        : "warning";

  const config = {
    good: {
      bg: "bg-success/8",
      border: "border-success/30",
      icon: CheckCircle2,
      iconColor: "text-success",
      label: "Situação Favorável",
      desc: "A maioria das metas está no prazo e poucas escolas em risco.",
    },
    warning: {
      bg: "bg-warning/8",
      border: "border-warning/30",
      icon: AlertTriangle,
      iconColor: "text-warning",
      label: "Atenção Necessária",
      desc: "Indicadores em zona intermediária. Acompanhamento recomendado.",
    },
    critical: {
      bg: "bg-destructive/8",
      border: "border-destructive/30",
      icon: Shield,
      iconColor: "text-destructive",
      label: "Situação Crítica",
      desc: "Indicadores abaixo do aceitável. Ação imediata requerida.",
    },
  };

  const c = config[status];
  const Icon = c.icon;

  return (
    <div className={`${c.bg} border-0 rounded-xl p-6 flex items-center gap-5 card-hover animate-fade-up`}
      style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className={`h-14 w-14 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`h-7 w-7 ${c.iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
          Situação Geral do PPG
        </p>
        <p className={`text-lg font-bold ${c.iconColor} leading-tight`}>{c.label}</p>
        <p className="text-[11px] text-muted-foreground mt-1">{c.desc}</p>
      </div>
      <div className="flex gap-6 shrink-0">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{metasNoPrazo}%</p>
          <p className="text-[10px] text-muted-foreground">Metas no prazo</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{escolasEmRisco}</p>
          <p className="text-[10px] text-muted-foreground">Escolas em risco</p>
        </div>
      </div>
    </div>
  );
};

export default SituacaoGeralCard;
