import { Building2, MapPin, School } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ViewType = "presidencia" | "regional" | "unidade";

const regionals = ["São Paulo", "Campinas", "Sorocaba"];

const schoolsByRegional: Record<string, string[]> = {
  "São Paulo": ["ETEC Paulistano", "FATEC São Paulo", "ETEC Martin Luther King", "ETEC Albert Einstein"],
  "Campinas": ["FATEC Campinas", "ETEC Bento Quirino", "ETEC Cons. Antônio Prado"],
  "Sorocaba": ["FATEC Sorocaba", "ETEC Rubens de Faria", "ETEC Fernando Prestes"],
};

interface AppSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedRegional: string;
  onRegionalChange: (regional: string) => void;
  selectedSchool: string;
  onSchoolChange: (school: string) => void;
}

const views = [
  { id: "presidencia" as const, label: "Visão Presidência", icon: Building2, description: "Rede completa" },
  { id: "regional" as const, label: "Visão Regional", icon: MapPin, description: "Por regional" },
  { id: "unidade" as const, label: "Visão Unidade", icon: School, description: "Por escola" },
];

export function AppSidebar({
  currentView,
  onViewChange,
  selectedRegional,
  onRegionalChange,
  selectedSchool,
  onSchoolChange,
}: AppSidebarProps) {
  const availableSchools = schoolsByRegional[selectedRegional] || [];

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <div>
            <p className="text-xs font-bold text-foreground leading-tight">PPG Estratégico</p>
            <p className="text-[10px] text-muted-foreground">Centro Paula Souza</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase tracking-widest px-5">Nível de Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-1 px-3 mt-1">
              {views.map((v) => {
                const isActive = currentView === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => onViewChange(v.id)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                      isActive
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full" />
                    )}
                    <v.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs leading-tight ${isActive ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
                        {v.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{v.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {(currentView === "regional" || currentView === "unidade") && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-[9px] uppercase tracking-widest px-5">Filtros</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-5 space-y-3 mt-1">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Regional
                    </label>
                    <Select value={selectedRegional} onValueChange={onRegionalChange}>
                      <SelectTrigger className="h-8 text-xs bg-muted border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {regionals.map((r) => (
                          <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {currentView === "unidade" && (
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                        Escola
                      </label>
                      <Select value={selectedSchool} onValueChange={onSchoolChange}>
                        <SelectTrigger className="h-8 text-xs bg-muted border-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSchools.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
