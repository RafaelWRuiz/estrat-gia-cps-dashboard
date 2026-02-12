import { Search, FileText, Target, Play, GraduationCap, ArrowRight } from "lucide-react";
import { problems, isSmartCompleta } from "@/data/problems";

const learningsCount: Record<string, number> = {
  "ETEC Paulistano": 1,
  "ETEC Martin Luther King": 1,
  "ETEC Fernando Prestes": 1,
  "ETEC Bento Quirino": 1,
  "ETEC Botucatu": 1,
  "ETEC Polivalente": 1,
  "ETEC Albert Einstein": 1,
};

interface CicloGestaoPanelProps {
  escola: string;
}

const CicloGestaoPanel = ({ escola }: CicloGestaoPanelProps) => {
  const escolaProblems = problems.filter((p) => p.escola === escola);

  const totalProblemas = escolaProblems.length;
  const comEvidencia = escolaProblems.filter((p) => p.evidencia && p.evidencia.length > 0).length;
  const smartCompletas = escolaProblems.filter(isSmartCompleta).length;
  const acoesEmExecucao = escolaProblems.filter((p) => p.totalAcoes > 0).length;
  const aprendizagens = learningsCount[escola] || 0;

  const steps = [
    {
      label: "Problemas identificados",
      value: totalProblemas,
      max: totalProblemas,
      icon: Search,
    },
    {
      label: "Evidências registradas",
      value: comEvidencia,
      max: totalProblemas,
      icon: FileText,
    },
    {
      label: "SMART definidas",
      value: smartCompletas,
      max: totalProblemas,
      icon: Target,
    },
    {
      label: "Ações em execução",
      value: acoesEmExecucao,
      max: totalProblemas,
      icon: Play,
    },
    {
      label: "Aprendizagem",
      value: aprendizagens,
      max: totalProblemas,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-stretch gap-0 overflow-x-auto">
        {steps.map((step, i) => {
          const ratio = step.max > 0 ? step.value / step.max : 0;
          const status: "complete" | "partial" | "empty" =
            ratio >= 1 ? "complete" : ratio > 0 ? "partial" : "empty";

          const statusStyles = {
            complete: {
              bg: "bg-success/8",
              border: "border-success/30",
              iconBg: "bg-success/15",
              iconColor: "text-success",
              valueColor: "text-success",
            },
            partial: {
              bg: "bg-warning/8",
              border: "border-warning/30",
              iconBg: "bg-warning/15",
              iconColor: "text-warning",
              valueColor: "text-warning",
            },
            empty: {
              bg: "bg-muted/40",
              border: "border-border",
              iconBg: "bg-muted",
              iconColor: "text-muted-foreground",
              valueColor: "text-muted-foreground",
            },
          };

          const s = statusStyles[status];
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex items-center">
              <div
                className={`${s.bg} border ${s.border} rounded-lg p-4 flex flex-col items-center gap-2 min-w-[130px] text-center`}
              >
                <div
                  className={`h-10 w-10 rounded-full ${s.iconBg} flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>
                <p className={`text-2xl font-bold ${s.valueColor}`}>{step.value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight font-medium">
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 mx-1 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-5 mt-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-success" /> Completo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-warning" /> Parcial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" /> Não iniciado
        </span>
      </div>
    </div>
  );
};

export default CicloGestaoPanel;
