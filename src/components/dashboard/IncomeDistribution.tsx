import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

const INCOME_RANGES = ["<3K", "3-5K", "5-8K", "8-12K", "12K+"];

function getRange(income: number) {
  if (income < 3000) return "<3K";
  if (income < 5000) return "3-5K";
  if (income < 8000) return "5-8K";
  if (income < 12000) return "8-12K";
  return "12K+";
}

export function IncomeDistribution({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    return INCOME_RANGES.map((range) => {
      const employees = data.filter((e) => getRange(e.MonthlyIncome) === range);
      const attrition = employees.filter((e) => e.Attrition === "Yes").length;
      return {
        name: range,
        stayed: employees.length - attrition,
        left: attrition,
      };
    });
  }, [data]);

  return (
    <ChartCard title="Monthly Income vs Attrition" subtitle="Income distribution by retention">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }} />
          <Bar dataKey="stayed" stackId="a" fill="hsl(174, 72%, 41%)" name="Stayed" isAnimationActive={false} />
          <Bar dataKey="left" stackId="a" fill="hsl(38, 92%, 50%)" radius={[6, 6, 0, 0]} name="Left" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
