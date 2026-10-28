import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

export function JobRoleChart({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    const roles = [...new Set(data.map((e) => e.JobRole))];
    return roles
      .map((role) => {
        const employees = data.filter((e) => e.JobRole === role);
        const attrition = employees.filter((e) => e.Attrition === "Yes").length;
        return {
          name: role,
          rate: Math.round((attrition / employees.length) * 100),
          count: attrition,
        };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [data]);

  return (
    <ChartCard title="Attrition Rate by Job Role" subtitle="Top roles with highest attrition" className="col-span-2">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Attrition Rate"]}
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }}
          />
          <Bar dataKey="rate" fill="hsl(262, 83%, 58%)" radius={[0, 6, 6, 0]} barSize={20} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
