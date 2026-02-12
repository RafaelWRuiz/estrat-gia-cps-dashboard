import { MapPin, ArrowRight, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { problems } from "@/data/problems";

const schoolsData = [
  { name: "ETEC Paulistano", regional: "São Paulo", metasNoPrazo: 92, status: "good" as const },
  { name: "ETEC Martin Luther King", regional: "São Paulo", metasNoPrazo: 65, status: "warning" as const },
  { name: "ETEC Albert Einstein", regional: "São Paulo", metasNoPrazo: 41, status: "critical" as const },
  { name: "ETEC Mandaqui", regional: "São Paulo", metasNoPrazo: 78, status: "good" as const },
  { name: "ETEC Bento Quirino", regional: "Campinas", metasNoPrazo: 54, status: "warning" as const },
  { name: "ETEC Cons. Antônio Prado", regional: "Campinas", metasNoPrazo: 47, status: "critical" as const },
  { name: "ETEC Polivalente", regional: "Campinas", metasNoPrazo: 88, status: "good" as const },
  { name: "ETEC Rubens de Faria", regional: "Sorocaba", metasNoPrazo: 60, status: "warning" as const },
  { name: "ETEC Fernando Prestes", regional: "Sorocaba", metasNoPrazo: 35, status: "critical" as const },
  { name: "ETEC Botucatu", regional: "Sorocaba", metasNoPrazo: 83, status: "good" as const },
];

const regionals = ["São Paulo", "Campinas", "Sorocaba"];

const statusConfig = {
  good: { label: "Adequada", icon: CheckCircle2, color: "text-success", bg: "bg-success/8", border: "border-success/30", dot: "bg-success" },
  warning: { label: "Atenção", icon: Clock, color: "text-warning", bg: "bg-warning/8", border: "border-warning/30", dot: "bg-warning" },
  critical: { label: "Crítico", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/30", dot: "bg-destructive" },
};

interface RegionalOverviewPanelProps {
  onRegionalClick: (regional: string) => void;
  filterStatus?: string;
}

const RegionalOverviewPanel = ({ onRegionalClick, filterStatus }: RegionalOverviewPanelProps) => {
  let regionalStats = regionals.map((reg) => {
    const schools = schoolsData.filter((s) => s.regional === reg);
    const avgMetas = Math.round(schools.reduce((s, sc) => s + sc.metasNoPrazo, 0) / schools.length);
    const emRisco = schools.filter((s) => s.status === "critical").length;
    const regionalProblems = problems.filter((p) => p.regional === reg);
    const criticos = regionalProblems.filter((p) => p.status === "critical").length;
    const totalEscolas = schools.length;

    const status: "good" | "warning" | "critical" =
      avgMetas >= 70 && emRisco === 0 ? "good" : avgMetas < 50 || emRisco >= 2 ? "critical" : "warning";

    return { regional: reg, avgMetas, emRisco, criticos, totalEscolas, status };
  });

  if (filterStatus && filterStatus !== "Todos") {
    regionalStats = regionalStats.filter((r) => r.status === filterStatus);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full stagger-children">
      {regionalStats.map((r) => {
        const cfg = statusConfig[r.status];
        const Icon = cfg.icon;
        return (
          <button
            key={r.regional}
            onClick={() => onRegionalClick(r.regional)}
            className={`${cfg.bg} border-0 rounded-xl p-5 text-left card-hover group`}
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-foreground">{r.regional}</h3>
              </div>
              <div className={`flex items-center gap-1.5 ${cfg.color}`}>
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold">{cfg.label}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{r.avgMetas}%</p>
                <p className="text-[10px] text-muted-foreground">Metas no prazo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{r.totalEscolas}</p>
                <p className="text-[10px] text-muted-foreground">Escolas</p>
              </div>
              <div>
                <p className={`text-lg font-bold ${r.emRisco > 0 ? "text-destructive" : "text-foreground"}`}>{r.emRisco}</p>
                <p className="text-[10px] text-muted-foreground">Em risco</p>
              </div>
              <div>
                <p className={`text-lg font-bold ${r.criticos > 0 ? "text-destructive" : "text-foreground"}`}>{r.criticos}</p>
                <p className="text-[10px] text-muted-foreground">Problemas críticos</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] font-semibold">Ver detalhes da regional</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RegionalOverviewPanel;
