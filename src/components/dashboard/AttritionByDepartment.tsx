import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
];

export function AttritionByDepartment({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    const depts = [...new Set(data.map((e) => e.Department))];
    return depts.map((dept) => {
      const employees = data.filter((e) => e.Department === dept);
      const attrition = employees.filter((e) => e.Attrition === "Yes").length;
      return {
        name: dept === "Research & Development" ? "R&D" : dept,
        total: employees.length,
        attrition,
        rate: Math.round((attrition / employees.length) * 100),
      };
    }).sort((a, b) => b.rate - a.rate);
  }, [data]);

  return (
    <ChartCard title="Attrition Rate by Department" subtitle="Percentage of employees who left">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis type="number" tick={{ fontSize: 12 }} unit="%" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Attrition Rate"]}
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }}
          />
          <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={28} isAnimationActive={false}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
