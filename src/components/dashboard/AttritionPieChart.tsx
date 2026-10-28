import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

const COLORS = ["hsl(217, 91%, 60%)", "hsl(0, 84%, 60%)"];

export function AttritionPieChart({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    const yes = data.filter((e) => e.Attrition === "Yes").length;
    const no = data.length - yes;
    return [
      { name: "Stayed", value: no },
      { name: "Left", value: yes },
    ];
  }, [data]);

  const attritionRate = data.length ? Math.round((chartData[1].value / data.length) * 1000) / 10 : 0;

  return (
    <ChartCard title="Overall Attrition" subtitle={`${attritionRate}% attrition rate`}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" isAnimationActive={false}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, "Employees"]}
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 -mt-2">
        {chartData.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-muted-foreground">{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
