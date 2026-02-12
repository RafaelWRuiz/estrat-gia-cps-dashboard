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
import { eixos } from "@/data/problems";

export type ViewType = "presidencia" | "regional" | "unidade";

const regionals = ["São Paulo", "Campinas", "Sorocaba"];
const eixosList = eixos;

const schoolsByRegional: Record<string, string[]> = {
  "São Paulo": ["ETEC Paulistano", "ETEC Martin Luther King", "ETEC Albert Einstein", "ETEC Mandaqui"],
  "Campinas": ["ETEC Bento Quirino", "ETEC Cons. Antônio Prado", "ETEC Polivalente"],
  "Sorocaba": ["ETEC Rubens de Faria", "ETEC Fernando Prestes", "ETEC Botucatu"],
};

interface AppSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedRegional: string;
  onRegionalChange: (regional: string) => void;
  selectedSchool: string;
  onSchoolChange: (school: string) => void;
  selectedEixo: string;
  onEixoChange: (eixo: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
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
  selectedEixo,
  onEixoChange,
  selectedStatus,
  onStatusChange,
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

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase tracking-widest px-5">Filtros</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-5 space-y-3 mt-1">
              {/* Presidência: Regional (opcional) */}
              {currentView === "presidencia" && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Regional
                  </label>
                  <Select value={selectedRegional} onValueChange={onRegionalChange}>
                    <SelectTrigger className="h-8 text-xs bg-muted border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas" className="text-xs">Todas</SelectItem>
                      {regionals.map((r) => (
                        <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Regional: Escola (opcional) */}
              {currentView === "regional" && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Escola
                  </label>
                  <Select value={selectedSchool} onValueChange={onSchoolChange}>
                    <SelectTrigger className="h-8 text-xs bg-muted border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas" className="text-xs">Todas</SelectItem>
                      {availableSchools.map((s) => (
                        <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Regional + Unidade: Eixo estratégico */}
              {(currentView === "regional" || currentView === "unidade") && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Eixo Estratégico
                  </label>
                  <Select value={selectedEixo} onValueChange={onEixoChange}>
                    <SelectTrigger className="h-8 text-xs bg-muted border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos" className="text-xs">Todos</SelectItem>
                      {eixosList.map((e) => (
                        <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Todos os níveis: Status */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Status
                </label>
                <Select value={selectedStatus} onValueChange={onStatusChange}>
                  <SelectTrigger className="h-8 text-xs bg-muted border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos" className="text-xs">Todos</SelectItem>
                    <SelectItem value="good" className="text-xs">Adequada</SelectItem>
                    <SelectItem value="warning" className="text-xs">Atenção</SelectItem>
                    <SelectItem value="critical" className="text-xs">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
