import { useState } from "react";
import { problems, eixos, type Problem } from "@/data/problems";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

const statusConfig = {
  good: { dot: "bg-success", label: "Bom", icon: CheckCircle2, textColor: "text-success" },
  warning: { dot: "bg-warning", label: "Atenção", icon: Clock, textColor: "text-warning" },
  critical: { dot: "bg-destructive", label: "Crítico", icon: AlertCircle, textColor: "text-destructive" },
};

interface ProblemsPanelProps {
  filterRegional?: string;
  filterEscola?: string;
  showOnlyDelayed?: boolean;
}

const ProblemsPanel = ({ filterRegional, filterEscola, showOnlyDelayed }: ProblemsPanelProps) => {
  const [eixoFilter, setEixoFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState(showOnlyDelayed ? "Todos" : "critical");

  // Base filter by regional/escola
  const baseProblems = problems.filter((p) => {
    if (filterEscola && p.escola !== filterEscola) return false;
    if (filterRegional && p.regional !== filterRegional) return false;
    if (showOnlyDelayed && p.acoesAtrasadas === 0) return false;
    return true;
  });

  const criticalCount = baseProblems.filter((p) => p.status === "critical").length;

  const filtered = baseProblems.filter((p) => {
    if (eixoFilter !== "Todos" && p.eixo !== eixoFilter) return false;
    if (statusFilter === "good" && p.status !== "good") return false;
    if (statusFilter === "warning" && p.status !== "warning") return false;
    if (statusFilter === "critical" && p.status !== "critical") return false;
    return true;
  });

  return (
    <div className="w-full space-y-4">
      {/* Critical highlight */}
      {!showOnlyDelayed && (
        <div className="flex items-center gap-3 bg-destructive/5 rounded-md px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-base font-bold text-destructive">{criticalCount}</span>
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">
              Problemas críticos{filterRegional ? ` — ${filterRegional}` : filterEscola ? ` — ${filterEscola}` : " na rede"}
            </p>
            <p className="text-[10px] text-muted-foreground">Requerem atenção imediata da gestão</p>
          </div>
        </div>
      )}

      {showOnlyDelayed && (
        <div className="flex items-center gap-3 bg-warning/5 rounded-md px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
            <span className="text-base font-bold text-warning">
              {baseProblems.reduce((s, p) => s + p.acoesAtrasadas, 0)}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Ações atrasadas</p>
            <p className="text-[10px] text-muted-foreground">Necessitam acompanhamento imediato</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Eixo</label>
          <Select value={eixoFilter} onValueChange={setEixoFilter}>
            <SelectTrigger className="h-7 w-[220px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos" className="text-xs">Todos os eixos</SelectItem>
              {eixos.map((e) => (
                <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {!showOnlyDelayed && (
          <div className="flex flex-col gap-0.5">
            <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-7 w-[130px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos" className="text-xs">Todos</SelectItem>
                <SelectItem value="good" className="text-xs">Bom</SelectItem>
                <SelectItem value="warning" className="text-xs">Atenção</SelectItem>
                <SelectItem value="critical" className="text-xs">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} problema(s)</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProblemCard key={p.id} problem={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground italic col-span-2 py-4 text-center">
            Nenhum problema encontrado com os filtros selecionados.
          </p>
        )}
      </div>
    </div>
  );
};

const ProblemCard = ({ problem: p }: { problem: Problem }) => {
  const cfg = statusConfig[p.status];
  const StatusIcon = cfg.icon;

  return (
    <div
      className="bg-background rounded-md p-4 space-y-2.5 border-l-[3px] transition-shadow duration-200"
      style={{
        borderLeftColor: p.status === "critical" ? "hsl(var(--destructive))" : p.status === "warning" ? "hsl(var(--warning))" : "hsl(var(--success))",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xs font-bold text-foreground leading-snug">{p.problema}</h4>
        <div className={`flex items-center gap-1 shrink-0 ${cfg.textColor}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold">{cfg.label}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
        <span>{p.regional} · {p.escola}</span>
        <span className="font-medium">{p.eixo}</span>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Evidência:</span> {p.evidencia}
      </p>

      <p className="text-[11px] text-foreground">
        <span className="font-semibold">Meta SMART:</span> {p.metaSmart}
      </p>

      <div className="flex items-center gap-4 pt-1">
        <span className="text-[10px] text-muted-foreground">
          Ações: <span className="font-semibold text-foreground">{p.totalAcoes}</span>
        </span>
        {p.acoesAtrasadas > 0 && (
          <span className="text-[10px] text-destructive font-semibold">
            {p.acoesAtrasadas} atrasada(s)
          </span>
        )}
      </div>
    </div>
  );
};

export default ProblemsPanel;
