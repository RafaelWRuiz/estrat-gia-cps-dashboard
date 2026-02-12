import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DashboardSectionProps {
  title: string;
  icon: LucideIcon;
  children?: ReactNode;
}

const DashboardSection = ({ title, icon: Icon, children }: DashboardSectionProps) => {
  return (
    <section className="bg-card rounded-md border shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3 border-b">
        <Icon className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5 min-h-[120px] flex items-center justify-center">
        {children || (
          <p className="text-xs text-muted-foreground">Conteúdo será adicionado em próxima etapa</p>
        )}
      </div>
    </section>
  );
};

export default DashboardSection;
