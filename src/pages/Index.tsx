import DashboardHeader from "@/components/DashboardHeader";
import DashboardSection from "@/components/DashboardSection";
import KpiCard from "@/components/KpiCard";
import SituacaoGeralCard from "@/components/SituacaoGeralCard";
import SchoolVisionPanel from "@/components/SchoolVisionPanel";
import ProblemsPanel from "@/components/ProblemsPanel";
import ProcessoVivoPanel from "@/components/ProcessoVivoPanel";
import AprendizagemPanel from "@/components/AprendizagemPanel";
import { BarChart3, School, RefreshCw, AlertTriangle, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-8 py-7 space-y-7 max-w-[1440px] w-full mx-auto">
        {/* Situação Geral */}
        <SituacaoGeralCard metasNoPrazo={72} escolasEmRisco={14} />

        {/* Indicadores Principais */}
        <DashboardSection title="Indicadores Principais" icon={BarChart3}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full">
            <KpiCard label="Metas no Prazo" value="72%" subtitle="das metas vigentes" status="good" />
            <KpiCard label="Escolas em Risco" value="14" subtitle="abaixo do esperado" status="critical" />
            <KpiCard label="Metas SMART" value="58%" subtitle="completas" status="warning" />
            <KpiCard label="Ações Atrasadas" value="37" subtitle="pendentes de resolução" status="critical" />
            <KpiCard label="Problemas Críticos" value="9" subtitle="em aberto" status="critical" />
            <KpiCard label="Novos no Mês" value="5" subtitle="problemas registrados" status="warning" />
          </div>
        </DashboardSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          <DashboardSection title="Visão por Escola" icon={School}>
            <SchoolVisionPanel />
          </DashboardSection>
          <DashboardSection title="Processo Vivo" icon={RefreshCw}>
            <ProcessoVivoPanel />
          </DashboardSection>
        </div>

        <DashboardSection title="Gestão por Problemas" icon={AlertTriangle}>
          <ProblemsPanel />
        </DashboardSection>

        <DashboardSection title="Aprendizagem Institucional" icon={BookOpen}>
          <AprendizagemPanel />
        </DashboardSection>
      </main>

      <footer className="px-8 py-4 text-center text-[10px] text-muted-foreground">
        Centro Paula Souza — PPG Estratégico © 2026
      </footer>
    </div>
  );
};

export default Index;
