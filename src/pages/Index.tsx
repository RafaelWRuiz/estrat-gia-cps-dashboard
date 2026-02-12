import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar, { type ViewType } from "@/components/AppSidebar";
import DashboardSection from "@/components/DashboardSection";
import KpiCard from "@/components/KpiCard";
import SituacaoGeralCard from "@/components/SituacaoGeralCard";
import RegionalRiscoDestaque from "@/components/RegionalRiscoDestaque";
import RegionalOverviewPanel from "@/components/RegionalOverviewPanel";
import SchoolVisionPanel from "@/components/SchoolVisionPanel";
import ProblemsPanel from "@/components/ProblemsPanel";
import ProcessoVivoPanel from "@/components/ProcessoVivoPanel";
import AprendizagemPanel from "@/components/AprendizagemPanel";
import SituacaoPieChart from "@/components/SituacaoPieChart";
import TopProblemasChart from "@/components/TopProblemasChart";
import { BarChart3, School, RefreshCw, AlertTriangle, BookOpen, Building2, MapPin, PieChart } from "lucide-react";
import { problems } from "@/data/problems";

const schoolsByRegional: Record<string, string[]> = {
  "São Paulo": ["ETEC Paulistano", "ETEC Martin Luther King", "ETEC Albert Einstein", "ETEC Mandaqui"],
  Campinas: ["ETEC Bento Quirino", "ETEC Cons. Antônio Prado", "ETEC Polivalente"],
  Sorocaba: ["ETEC Rubens de Faria", "ETEC Fernando Prestes", "ETEC Botucatu"],
};

const viewLabels: Record<ViewType, { label: string; icon: typeof Building2 }> = {
  presidencia: { label: "Visão Presidência — Rede Completa", icon: Building2 },
  regional: { label: "Visão Regional", icon: MapPin },
  unidade: { label: "Visão Unidade", icon: School },
};

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("presidencia");
  const [selectedRegional, setSelectedRegional] = useState("Todas");
  const [selectedSchool, setSelectedSchool] = useState("Todas");
  const [selectedEixo, setSelectedEixo] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const handleRegionalChange = (regional: string) => {
    setSelectedRegional(regional);
    setSelectedSchool("Todas");
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSelectedEixo("Todos");
    setSelectedStatus("Todos");
    if (view === "presidencia") {
      setSelectedRegional("Todas");
    } else if (view === "regional" && (selectedRegional === "Todas" || !selectedRegional)) {
      setSelectedRegional("São Paulo");
    }
    if (view === "regional") {
      setSelectedSchool("Todas");
    } else if (view === "unidade" && (selectedSchool === "Todas" || !selectedSchool)) {
      const reg = selectedRegional === "Todas" ? "São Paulo" : selectedRegional;
      setSelectedRegional(reg);
      setSelectedSchool(schoolsByRegional[reg]?.[0] || "");
    }
  };

  const handleRegionalClick = (regional: string) => {
    setSelectedRegional(regional);
    setSelectedSchool("Todas");
    setSelectedEixo("Todos");
    setSelectedStatus("Todos");
    setCurrentView("regional");
  };

  // Compute filtered stats
  const filteredProblems =
    currentView === "presidencia"
      ? problems
      : currentView === "regional"
        ? problems.filter((p) => p.regional === selectedRegional)
        : problems.filter((p) => p.escola === selectedSchool);

  const totalAcoesAtrasadas = filteredProblems.reduce((s, p) => s + p.acoesAtrasadas, 0);
  const metasNoPrazo = currentView === "presidencia" ? 72 : currentView === "regional" ? (selectedRegional === "São Paulo" ? 69 : selectedRegional === "Campinas" ? 63 : 59) : 72;
  const escolasEmRisco = currentView === "presidencia" ? 3 : filteredProblems.filter((p) => p.status === "critical").length;

  const ViewIcon = viewLabels[currentView].icon;
  const viewSubtitle =
    currentView === "regional"
      ? `Regional ${selectedRegional}`
      : currentView === "unidade"
        ? selectedSchool
        : "";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          selectedRegional={selectedRegional}
          onRegionalChange={handleRegionalChange}
          selectedSchool={selectedSchool}
          onSchoolChange={setSelectedSchool}
          selectedEixo={selectedEixo}
          onEixoChange={setSelectedEixo}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header>
            <div className="bg-primary h-1.5" />
            <div className="bg-card border-b px-6 py-3 flex items-center gap-3">
              <SidebarTrigger />
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2.5">
                <ViewIcon className="h-4 w-4 text-primary" />
                <div>
                  <h1 className="text-sm font-bold text-foreground leading-tight">
                    PPG Estratégico CPS
                  </h1>
                  <span className="text-[10px] text-muted-foreground">
                    {viewLabels[currentView].label}
                    {viewSubtitle && ` — ${viewSubtitle}`}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6 space-y-6 max-w-[1440px] w-full mx-auto">
            {currentView === "presidencia" && (
              <PresidenciaView
                metasNoPrazo={metasNoPrazo}
                escolasEmRisco={escolasEmRisco}
                onRegionalClick={handleRegionalClick}
                filterRegional={selectedRegional !== "Todas" ? selectedRegional : undefined}
                filterStatus={selectedStatus}
              />
            )}
            {currentView === "regional" && (
              <RegionalView
                regional={selectedRegional}
                metasNoPrazo={metasNoPrazo}
                escolasEmRisco={escolasEmRisco}
                filterEscola={selectedSchool !== "Todas" ? selectedSchool : undefined}
                filterEixo={selectedEixo}
                filterStatus={selectedStatus}
              />
            )}
            {currentView === "unidade" && (
              <UnidadeView
                escola={selectedSchool}
                regional={selectedRegional}
                metasNoPrazo={metasNoPrazo}
                filterEixo={selectedEixo}
                filterStatus={selectedStatus}
              />
            )}
          </main>

          <footer className="px-6 py-3 text-center text-[10px] text-muted-foreground">
            Centro Paula Souza — PPG Estratégico © 2026
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

/* ─── Visão Presidência ─── */
const PresidenciaView = ({
  metasNoPrazo,
  escolasEmRisco,
  onRegionalClick,
  filterRegional,
  filterStatus,
}: {
  metasNoPrazo: number;
  escolasEmRisco: number;
  onRegionalClick: (regional: string) => void;
  filterRegional?: string;
  filterStatus: string;
}) => (
  <>
    <RegionalRiscoDestaque onRegionalClick={onRegionalClick} />

    <SituacaoGeralCard metasNoPrazo={metasNoPrazo} escolasEmRisco={escolasEmRisco} />

    <DashboardSection title="Indicadores Principais" icon={BarChart3}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full">
        <KpiCard label="Metas no Prazo" value="72%" subtitle="das metas vigentes" status="good" />
        <KpiCard label="Regionais" value="3" subtitle="ativas na rede" status="good" />
        <KpiCard label="Escolas em Risco" value={String(escolasEmRisco)} subtitle="abaixo do esperado" status="critical" />
        <KpiCard label="Ações Atrasadas" value="37" subtitle="pendentes de resolução" status="critical" />
        <KpiCard label="Problemas Críticos" value="9" subtitle="em aberto" status="critical" />
        <KpiCard label="Novos no Mês" value="5" subtitle="problemas registrados" status="warning" />
      </div>
    </DashboardSection>

    <DashboardSection title="Desempenho por Regional" icon={MapPin}>
      <RegionalOverviewPanel onRegionalClick={onRegionalClick} filterStatus={filterStatus} />
    </DashboardSection>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardSection title="Situação das Escolas na Rede" icon={PieChart}>
        <SituacaoPieChart filterRegional={filterRegional} />
      </DashboardSection>
      <div className="lg:col-span-2">
        <DashboardSection title="Principais Problemas da Rede" icon={BarChart3}>
          <TopProblemasChart filterRegional={filterRegional} />
        </DashboardSection>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardSection title="Processo Vivo" icon={RefreshCw}>
        <ProcessoVivoPanel />
      </DashboardSection>
      <DashboardSection title="Aprendizagem Institucional" icon={BookOpen}>
        <AprendizagemPanel />
      </DashboardSection>
    </div>
  </>
);

/* ─── Visão Regional ─── */
const RegionalView = ({
  regional,
  metasNoPrazo,
  escolasEmRisco,
  filterEscola,
  filterEixo,
  filterStatus,
}: {
  regional: string;
  metasNoPrazo: number;
  escolasEmRisco: number;
  filterEscola?: string;
  filterEixo: string;
  filterStatus: string;
}) => (
  <>
    <SituacaoGeralCard metasNoPrazo={metasNoPrazo} escolasEmRisco={escolasEmRisco} />

    <DashboardSection title={`Ranking de Escolas — ${regional}`} icon={School}>
      <SchoolVisionPanel filterRegional={regional} />
    </DashboardSection>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardSection title={`Situação das Escolas — ${regional}`} icon={PieChart}>
        <SituacaoPieChart filterRegional={regional} />
      </DashboardSection>
      <div className="lg:col-span-2">
        <DashboardSection title={`Principais Problemas — ${regional}`} icon={BarChart3}>
          <TopProblemasChart filterRegional={regional} />
        </DashboardSection>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardSection title="Evolução das Metas" icon={RefreshCw}>
        <ProcessoVivoPanel />
      </DashboardSection>
      <DashboardSection title={`Gestão por Problemas — ${regional}`} icon={AlertTriangle}>
        <ProblemsPanel filterRegional={regional} filterEscola={filterEscola} filterEixo={filterEixo} filterStatus={filterStatus} />
      </DashboardSection>
    </div>

    <DashboardSection title={`Aprendizagem Institucional — ${regional}`} icon={BookOpen}>
      <AprendizagemPanel filterRegional={regional} />
    </DashboardSection>
  </>
);

/* ─── Visão Unidade ─── */
const UnidadeView = ({
  escola,
  regional,
  metasNoPrazo,
  filterEixo,
  filterStatus,
}: {
  escola: string;
  regional: string;
  metasNoPrazo: number;
  filterEixo: string;
  filterStatus: string;
}) => (
  <>
    <SituacaoGeralCard metasNoPrazo={metasNoPrazo} escolasEmRisco={0} />

    <DashboardSection title={`Indicadores — ${escola}`} icon={BarChart3}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
        <KpiCard label="Metas no Prazo" value={`${metasNoPrazo}%`} subtitle="da escola" status={metasNoPrazo >= 70 ? "good" : metasNoPrazo >= 50 ? "warning" : "critical"} />
        <KpiCard
          label="Problemas Críticos"
          value={String(problems.filter((p) => p.escola === escola && p.status === "critical").length)}
          subtitle="em aberto"
          status="critical"
        />
        <KpiCard
          label="Ações Atrasadas"
          value={String(problems.filter((p) => p.escola === escola).reduce((s, p) => s + p.acoesAtrasadas, 0))}
          subtitle="pendentes"
          status="warning"
        />
        <KpiCard
          label="Total de Ações"
          value={String(problems.filter((p) => p.escola === escola).reduce((s, p) => s + p.totalAcoes, 0))}
          subtitle="registradas"
          status="good"
        />
      </div>
    </DashboardSection>

    <DashboardSection title={`Problemas — ${escola}`} icon={AlertTriangle}>
      <ProblemsPanel filterEscola={escola} filterEixo={filterEixo} filterStatus={filterStatus} />
    </DashboardSection>

    <DashboardSection title="Ações Atrasadas" icon={BarChart3}>
      <ProblemsPanel filterEscola={escola} showOnlyDelayed filterEixo={filterEixo} />
    </DashboardSection>

    <DashboardSection title="Aprendizagem Institucional" icon={BookOpen}>
      <AprendizagemPanel filterEscola={escola} />
    </DashboardSection>
  </>
);

export default Index;
