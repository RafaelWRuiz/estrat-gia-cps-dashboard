import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardHeader = () => {
  return (
    <header>
      {/* Thin red institutional stripe */}
      <div className="bg-primary h-1.5" />
      
      <div className="bg-card border-b px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight leading-tight">
              PPG Estratégico CPS
            </h1>
            <span className="text-[10px] text-muted-foreground tracking-wide">
              Centro Paula Souza — Gestão Estratégica
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FilterSelect label="Perfil" options={["Presidência", "Supervisor Regional", "Direção"]} />
          <FilterSelect label="Regional" options={["Todas", "São Paulo", "Campinas", "Sorocaba"]} />
          <FilterSelect label="Escola" options={["Todas", "ETEC Paulistano", "FATEC São Paulo", "ETEC Prof. Basilides"]} />
        </div>
      </div>
    </header>
  );
};

const FilterSelect = ({ label, options }: { label: string; options: string[] }) => (
  <div className="flex flex-col gap-0.5">
    <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
      {label}
    </label>
    <Select defaultValue={options[0]}>
      <SelectTrigger className="h-7 w-[165px] border-border bg-background text-xs text-foreground shadow-none focus:ring-1 focus:ring-primary/30">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="text-xs">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default DashboardHeader;
