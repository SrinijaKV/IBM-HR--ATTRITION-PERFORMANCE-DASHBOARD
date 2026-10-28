import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "./ChartCard";
import type { Employee } from "@/hooks/useHRData";
import { useMemo } from "react";

const AGE_GROUPS = ["18-25", "26-35", "36-45", "46-55", "56+"];

function getAgeGroup(age: number) {
  if (age <= 25) return "18-25";
  if (age <= 35) return "26-35";
  if (age <= 45) return "36-45";
  if (age <= 55) return "46-55";
  return "56+";
}

export function AttritionByAge({ data }: { data: Employee[] }) {
  const chartData = useMemo(() => {
    return AGE_GROUPS.map((group) => {
      const employees = data.filter((e) => getAgeGroup(e.Age) === group);
      const attrition = employees.filter((e) => e.Attrition === "Yes").length;
      return {
        name: group,
        stayed: employees.length - attrition,
        left: attrition,
      };
    });
  }, [data]);

  return (
    <ChartCard title="Attrition by Age Group" subtitle="Stayed vs Left distribution">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }} />
          <Bar dataKey="stayed" stackId="a" fill="hsl(217, 91%, 60%)" radius={[0, 0, 0, 0]} name="Stayed" isAnimationActive={false} />
          <Bar dataKey="left" stackId="a" fill="hsl(0, 84%, 60%)" radius={[6, 6, 0, 0]} name="Left" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
