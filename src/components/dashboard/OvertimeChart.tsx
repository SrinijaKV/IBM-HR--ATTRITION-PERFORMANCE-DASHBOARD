import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

const COLORS = ["hsl(160, 84%, 39%)", "hsl(38, 92%, 50%)"];

export function OvertimeChart({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    const otYes = data.filter((e) => e.OverTime === "Yes");
    const otNo = data.filter((e) => e.OverTime === "No");
    const rateYes = otYes.length ? Math.round((otYes.filter((e) => e.Attrition === "Yes").length / otYes.length) * 100) : 0;
    const rateNo = otNo.length ? Math.round((otNo.filter((e) => e.Attrition === "Yes").length / otNo.length) * 100) : 0;
    return [
      { name: "Overtime", rate: rateYes, count: otYes.length },
      { name: "No Overtime", rate: rateNo, count: otNo.length },
    ];
  }, [data]);

  return (
    <ChartCard title="Overtime Impact on Attrition" subtitle="Attrition rate comparison">
      <div className="flex items-center justify-center gap-8 py-6">
        {chartData.map((item, i) => (
          <div key={item.name} className="text-center">
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4"
              style={{ borderColor: COLORS[i] }}
            >
              <span className="text-2xl font-bold text-card-foreground">{item.rate}%</span>
            </div>
            <p className="mt-2 text-sm font-medium text-card-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.count} employees</p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
