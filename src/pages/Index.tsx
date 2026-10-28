import { useState } from "react";
import { useHRData, useFilteredData } from "@/hooks/useHRData";
import { KPICard } from "@/components/dashboard/KPICard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AttritionByDepartment } from "@/components/dashboard/AttritionByDepartment";
import { AttritionByAge } from "@/components/dashboard/AttritionByAge";
import { AttritionPieChart } from "@/components/dashboard/AttritionPieChart";
import { JobRoleChart } from "@/components/dashboard/JobRoleChart";
import { IncomeDistribution } from "@/components/dashboard/IncomeDistribution";
import { OvertimeChart } from "@/components/dashboard/OvertimeChart";
import { ExportPdfButton } from "@/components/dashboard/ExportPdfButton";
import { Users, UserMinus, TrendingDown, DollarSign, Briefcase } from "lucide-react";

const Index = () => {
  const { data, loading } = useHRData();
  const [filters, setFilters] = useState({ department: "All", gender: "All", overtime: "All" });
  const filtered = useFilteredData(data, filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-3 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalEmployees = filtered.length;
  const attritionCount = filtered.filter((e) => e.Attrition === "Yes").length;
  const attritionRate = totalEmployees ? ((attritionCount / totalEmployees) * 100).toFixed(1) : "0";
  const avgIncome = totalEmployees
    ? Math.round(filtered.reduce((sum, e) => sum + e.MonthlyIncome, 0) / totalEmployees)
    : 0;
  const avgAge = totalEmployees
    ? Math.round(filtered.reduce((sum, e) => sum + e.Age, 0) / totalEmployees)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-card-foreground">HR Employee Attrition Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Executive Overview · {totalEmployees.toLocaleString()} employees analyzed</p>
          </div>
          <div className="flex items-center gap-3">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <ExportPdfButton targetId="dashboard-export-root" />
          </div>
        </div>
      </header>

      <main id="dashboard-export-root" className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <KPICard
            title="Total Employees"
            value={totalEmployees.toLocaleString()}
            trend="neutral"
            trendLabel="Active workforce"
            delay={0}
          />
          <KPICard
            title="Attrition Count"
            value={attritionCount.toLocaleString()}
            trend="down"
            trendLabel={`${attritionRate}% of total`}
            delay={80}
          />
          <KPICard
            title="Attrition Rate"
            value={`${attritionRate}%`}
            trend="down"
            trendLabel="Needs attention"
            delay={160}
          />
          <KPICard
            title="Avg Monthly Income"
            value={`$${avgIncome.toLocaleString()}`}
            trend="up"
            trendLabel="Per employee"
            delay={240}
          />
          <KPICard
            title="Average Age"
            value={`${avgAge} yrs`}
            trend="neutral"
            trendLabel="Workforce median"
            delay={320}
          />
        </div>

        {/* Row 2: Pie + Department + Overtime */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AttritionPieChart data={filtered} />
          <AttritionByDepartment data={filtered} />
          <OvertimeChart data={filtered} />
        </div>

        {/* Row 3: Age + Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AttritionByAge data={filtered} />
          <IncomeDistribution data={filtered} />
        </div>

        {/* Row 4: Job Role - full width */}
        <JobRoleChart data={filtered} />

        <footer className="text-center text-xs text-muted-foreground pb-4">
          HR Analytics Dashboard · Data: IBM HR Employee Attrition Dataset · {filtered.length.toLocaleString()} records
        </footer>
      </main>
    </div>
  );
};

export default Index;
