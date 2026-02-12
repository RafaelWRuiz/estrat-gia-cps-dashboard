interface KpiCardProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  status?: "good" | "warning" | "critical";
}

const statusColors: Record<string, string> = {
  good: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
};

const KpiCard = ({ label, value, status }: KpiCardProps) => {
  return (
    <div className="bg-card border rounded-md p-4 flex flex-col gap-1 relative overflow-hidden">
      {status && (
        <div className={`absolute top-0 left-0 w-full h-1 ${statusColors[status]}`} />
      )}
      <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
  );
};

export default KpiCard;
