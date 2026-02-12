import DashboardHeader from "@/components/DashboardHeader";
import DashboardSection from "@/components/DashboardSection";
import KpiCard from "@/components/KpiCard";
import { BarChart3, School, RefreshCw, AlertTriangle, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-6 py-5 space-y-5 max-w-[1400px] w-full mx-auto">
        {/* Indicadores Principais */}
        <DashboardSection title="Indicadores Principais" icon={BarChart3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <KpiCard label="Escolas ativas" value="223" status="good" />
            <KpiCard label="Matrículas" value="312.450" status="good" />
            <KpiCard label="Evasão (%)" value="8,4%" status="warning" />
            <KpiCard label="Aproveitamento" value="76,2%" status="good" />
          </div>
        </DashboardSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DashboardSection title="Visão por Escola" icon={School} />
          <DashboardSection title="Processo Vivo" icon={RefreshCw} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DashboardSection title="Gestão por Problemas" icon={AlertTriangle} />
          <DashboardSection title="Aprendizagem Institucional" icon={BookOpen} />
        </div>
      </main>

      <footer className="px-6 py-3 text-center text-[10px] text-muted-foreground border-t">
        Centro Paula Souza — PPG Estratégico © 2026
      </footer>
    </div>
  );
};

export default Index;
