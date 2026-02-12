import { CalendarRange } from "lucide-react";

const cicloInicio = 2024;
const cicloFim = 2028;
const anoAtual = 2026;
const totalAnos = cicloFim - cicloInicio + 1;
const anoCorrente = anoAtual - cicloInicio + 1;
const progresso = Math.round((anoCorrente / totalAnos) * 100);

const CicloPlurianualPanel = () => {
  return (
    <div
      className="bg-card rounded-xl p-5 flex items-center gap-5 card-hover animate-fade-up"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
        <CalendarRange className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-baseline gap-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Ciclo Estratégico do PPG
          </p>
          <span className="text-[11px] text-muted-foreground">
            Ano {anoCorrente} de {totalAnos}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-foreground shrink-0">{cicloInicio}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground shrink-0">{cicloFim}</span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-2xl font-bold text-foreground leading-none">{anoAtual}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{progresso}% do ciclo</p>
      </div>
    </div>
  );
};

export default CicloPlurianualPanel;
