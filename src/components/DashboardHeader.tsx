import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">PPG Estratégico CPS</h1>
            <span className="text-xs opacity-80">Centro Paula Souza — Gestão Estratégica</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FilterSelect label="Perfil" options={["Presidência", "Supervisor Regional", "Direção"]} />
          <FilterSelect label="Regional" options={["Todas", "São Paulo", "Campinas", "Sorocaba"]} />
          <FilterSelect label="Escola" options={["Todas", "ETEC Paulistano", "FATEC São Paulo", "ETEC Prof. Basilides"]} />
        </div>
      </div>
    </header>
  );
};

const FilterSelect = ({ label, options }: { label: string; options: string[] }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-wider opacity-70">{label}</label>
    <Select defaultValue={options[0]}>
      <SelectTrigger className="h-8 w-[170px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-xs">
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
