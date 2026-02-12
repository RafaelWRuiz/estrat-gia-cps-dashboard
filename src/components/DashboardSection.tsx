import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DashboardSectionProps {
  title: string;
  icon: LucideIcon;
  children?: ReactNode;
}

const DashboardSection = ({ title, icon: Icon, children }: DashboardSectionProps) => {
  return (
    <section className="bg-card rounded-xl card-hover border-0 animate-fade-up"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex items-center gap-2.5 px-6 py-4">
        <div className="h-7 w-7 rounded-md bg-primary/8 flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
        <h2 className="text-[13px] font-bold text-foreground tracking-tight">{title}</h2>
      </div>
      <div className="px-6 pb-6 min-h-[100px] flex items-center justify-center">
        {children || (
          <p className="text-xs text-muted-foreground italic">
            Conteúdo será adicionado em próxima etapa
          </p>
        )}
      </div>
    </section>
  );
};

export default DashboardSection;
