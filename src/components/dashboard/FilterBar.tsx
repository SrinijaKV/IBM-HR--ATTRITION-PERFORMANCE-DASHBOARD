import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  filters: { department: string; gender: string; overtime: string };
  onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filters.department} onValueChange={(v) => onFilterChange("department", v)}>
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Departments</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
          <SelectItem value="Research & Development">R&D</SelectItem>
          <SelectItem value="Human Resources">Human Resources</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.gender} onValueChange={(v) => onFilterChange("gender", v)}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Genders</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.overtime} onValueChange={(v) => onFilterChange("overtime", v)}>
        <SelectTrigger className="w-[150px] bg-card">
          <SelectValue placeholder="Overtime" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Overtime</SelectItem>
          <SelectItem value="Yes">Overtime: Yes</SelectItem>
          <SelectItem value="No">Overtime: No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
