import { AlertTriangle, ArrowRight, MapPin } from "lucide-react";
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

interface RegionalRiscoDestaqueProps {
  onRegionalClick: (regional: string) => void;
}

const RegionalRiscoDestaque = ({ onRegionalClick }: RegionalRiscoDestaqueProps) => {
  const stats = regionals.map((reg) => {
    const schools = schoolsData.filter((s) => s.regional === reg);
    const avgMetas = Math.round(schools.reduce((s, sc) => s + sc.metasNoPrazo, 0) / schools.length);
    const emRisco = schools.filter((s) => s.status === "critical").length;
    return { regional: reg, avgMetas, emRisco };
  });

  // Sort by lowest metas, then highest risk
  const worst = [...stats].sort((a, b) => a.avgMetas - b.avgMetas || b.emRisco - a.emRisco)[0];

  return (
    <button
      onClick={() => onRegionalClick(worst.regional)}
      className="w-full bg-destructive/5 border border-destructive/20 rounded-lg p-5 flex items-center gap-5 text-left transition-all duration-200 hover:shadow-md group"
    >
      <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
          Regional com Maior Risco
        </p>
        <p className="text-base font-bold text-destructive leading-tight flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {worst.regional}
        </p>
      </div>

      <div className="flex gap-6 shrink-0">
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">{worst.avgMetas}%</p>
          <p className="text-[10px] text-muted-foreground">Metas no prazo</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">{worst.emRisco}</p>
          <p className="text-[10px] text-muted-foreground">Escolas em risco</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <span className="text-[11px] font-semibold">Ver</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </button>
  );
};

export default RegionalRiscoDestaque;
