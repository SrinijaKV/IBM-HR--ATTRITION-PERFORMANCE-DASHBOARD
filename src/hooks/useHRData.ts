import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";

export interface Employee {
  Age: number;
  Attrition: string;
  BusinessTravel: string;
  DailyRate: number;
  Department: string;
  DistanceFromHome: number;
  Education: number;
  EducationField: string;
  EmployeeCount: number;
  EmployeeNumber: number;
  EnvironmentSatisfaction: number;
  Gender: string;
  HourlyRate: number;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: string;
  JobSatisfaction: number;
  MaritalStatus: string;
  MonthlyIncome: number;
  MonthlyRate: number;
  NumCompaniesWorked: number;
  Over18: string;
  OverTime: string;
  PercentSalaryHike: number;
  PerformanceRating: number;
  RelationshipSatisfaction: number;
  StandardHours: number;
  StockOptionLevel: number;
  TotalWorkingYears: number;
  TrainingTimesLastYear: number;
  WorkLifeBalance: number;
  YearsAtCompany: number;
  YearsInCurrentRole: number;
  YearsSinceLastPromotion: number;
  YearsWithCurrManager: number;
}

export function useHRData() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/hr-attrition.csv")
      .then((r) => r.text())
      .then((text) => {
        const result = Papa.parse<Employee>(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setData(result.data);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useFilteredData(data: Employee[], filters: { department: string; gender: string; overtime: string }) {
  return useMemo(() => {
    return data.filter((e) => {
      if (filters.department !== "All" && e.Department !== filters.department) return false;
      if (filters.gender !== "All" && e.Gender !== filters.gender) return false;
      if (filters.overtime !== "All" && e.OverTime !== filters.overtime) return false;
      return true;
    });
  }, [data, filters]);
}
