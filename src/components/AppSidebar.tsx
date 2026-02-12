import { Building2, MapPin, School, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <div>
            <p className="text-xs font-bold text-sidebar-foreground leading-tight">PPG Estratégico</p>
            <p className="text-[10px] text-muted-foreground">Centro Paula Souza</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase tracking-widest">Nível de Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {views.map((v) => (
                <SidebarMenuItem key={v.id}>
                  <SidebarMenuButton
                    isActive={currentView === v.id}
                    onClick={() => onViewChange(v.id)}
                    tooltip={v.label}
                  >
                    <v.icon className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{v.label}</span>
                      <span className="text-[10px] text-muted-foreground">{v.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(currentView === "regional" || currentView === "unidade") && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-[9px] uppercase tracking-widest">Filtros</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Regional
                    </label>
                    <Select value={selectedRegional} onValueChange={onRegionalChange}>
                      <SelectTrigger className="h-8 text-xs bg-sidebar-accent border-sidebar-border">
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
                        <SelectTrigger className="h-8 text-xs bg-sidebar-accent border-sidebar-border">
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
