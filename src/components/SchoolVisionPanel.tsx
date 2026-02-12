const schools = [
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

const statusColor: Record<string, string> = {
  good: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
};

const statusLabel: Record<string, string> = {
  good: "Bom",
  warning: "Atenção",
  critical: "Crítico",
};

const regionals = ["São Paulo", "Campinas", "Sorocaba"];

interface SchoolVisionPanelProps {
  filterRegional?: string;
}

const SchoolVisionPanel = ({ filterRegional }: SchoolVisionPanelProps) => {
  const filtered = filterRegional ? schools.filter((s) => s.regional === filterRegional) : schools;
  const ranked = [...filtered].sort((a, b) => b.metasNoPrazo - a.metasNoPrazo);
  const topRisk = [...filtered].sort((a, b) => a.metasNoPrazo - b.metasNoPrazo).slice(0, 5);
  const activeRegionals = filterRegional ? [filterRegional] : regionals;

  return (
    <div className="w-full space-y-6">
      {/* Top 5 escolas em risco */}
      <div>
        <h3 className="text-[11px] font-bold text-destructive uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-destructive" />
          Top {Math.min(5, topRisk.length)} Escolas em Maior Risco
        </h3>
        <div className="space-y-2">
          {topRisk.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 bg-destructive/5 rounded-md px-3 py-2.5">
              <span className="text-xs font-bold text-destructive w-5 text-center">{i + 1}º</span>
              <div className="flex-1">
                <span className="text-xs font-semibold text-foreground">{s.name}</span>
                <span className="text-[10px] text-muted-foreground ml-2">{s.regional}</span>
              </div>
              <span className="text-sm font-bold text-destructive">{s.metasNoPrazo}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Semáforo por regional */}
      {!filterRegional && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeRegionals.map((reg) => (
            <div key={reg}>
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                {reg}
              </h3>
              <div className="space-y-2">
                {schools
                  .filter((s) => s.regional === reg)
                  .map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between bg-background rounded-md px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusColor[s.status]}`} />
                        <span className="text-xs text-foreground">{s.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{statusLabel[s.status]}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ranking */}
      <div>
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
          Ranking — Metas no Prazo
        </h3>
        <div className="space-y-1.5">
          {ranked.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-4 text-right">{i + 1}.</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${statusColor[s.status]} transition-all duration-500`}
                    style={{ width: `${s.metasNoPrazo}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {s.metasNoPrazo}%
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground w-[160px] truncate">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolVisionPanel;
