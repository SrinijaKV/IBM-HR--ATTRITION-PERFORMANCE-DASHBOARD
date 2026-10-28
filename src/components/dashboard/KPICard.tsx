import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  delay?: number;
}

export function KPICard({ title, value, subtitle, trend = "neutral", trendLabel, delay = 0 }: KPICardProps) {
  const trendIcon = {
    up: <TrendingUp className="h-4 w-4 text-kpi-up" />,
    down: <TrendingDown className="h-4 w-4 text-kpi-down" />,
    neutral: <Minus className="h-4 w-4 text-kpi-neutral" />,
  };

  const trendColor = {
    up: "text-kpi-up",
    down: "text-kpi-down",
    neutral: "text-kpi-neutral",
  };

  return (
    <div
      className="rounded-lg bg-card p-5 shadow-sm border border-border opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-card-foreground">{value}</p>
      {(subtitle || trendLabel) && (
        <div className="mt-2 flex items-center gap-1.5">
          {trend && trendIcon[trend]}
          <span className={`text-xs font-medium ${trendColor[trend]}`}>{trendLabel}</span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
