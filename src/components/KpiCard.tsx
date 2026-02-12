interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  status?: "good" | "warning" | "critical";
}

const statusDot: Record<string, string> = {
  good: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
};

const KpiCard = ({ label, value, subtitle, status }: KpiCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 flex flex-col gap-2 relative card-hover border-0"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          {label}
        </span>
        {status && (
          <span className={`h-2 w-2 rounded-full ${statusDot[status]}`} />
        )}
      </div>
      <span className="text-3xl font-bold text-foreground leading-none tracking-tight">
        {value}
      </span>
      {subtitle && (
        <span className="text-[11px] text-muted-foreground">{subtitle}</span>
      )}
    </div>
  );
};

export default KpiCard;
