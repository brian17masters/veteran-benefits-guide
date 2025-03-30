
export interface FinancialSummary {
  monthlyIncome: number;
  monthlyExpenses: number;
  surplus: number;
  savingsTarget: number;
  yearsToRetirement: number;
  currentSavings: number;
  pensionAmount: number;
  disabilityAmount: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface SavingsProjection {
  year: string;
  savings: number;
}

export const calculateFinancialSummary = (
  income: number, 
  pension: number, 
  disability: number, 
  expenses: number, 
  currentSavings: number
): FinancialSummary => {
  // Calculate monthly income
  const totalMonthlyIncome = income + pension + disability;
  
  // Calculate surplus/deficit
  const monthlySurplus = totalMonthlyIncome - expenses;
  
  // Estimate years to retirement (simple calculation)
  // Assuming retirement needs 25x annual expenses
  const annualExpenses = expenses * 12;
  const retirementNeeds = annualExpenses * 25;
  const annualSavings = monthlySurplus * 12;
  const yearsToRetirement = annualSavings > 0 
    ? Math.max(0, (retirementNeeds - currentSavings) / annualSavings)
    : 0;
  
  return {
    monthlyIncome: totalMonthlyIncome,
    monthlyExpenses: expenses,
    surplus: monthlySurplus,
    savingsTarget: retirementNeeds,
    yearsToRetirement: yearsToRetirement,
    currentSavings: currentSavings,
    pensionAmount: pension,
    disabilityAmount: disability
  };
};

export const generateIncomeData = (income: number, pension: number, disability: number): ChartData[] => {
  return [
    { name: "Regular Income", value: income },
    { name: "Military Pension", value: pension },
    { name: "Disability Benefits", value: disability }
  ];
};

export const generateExpenseData = (expenses: number): ChartData[] => {
  return [
    { name: "Housing", value: expenses * 0.35 },
    { name: "Food", value: expenses * 0.15 },
    { name: "Transportation", value: expenses * 0.15 },
    { name: "Healthcare", value: expenses * 0.10 },
    { name: "Utilities", value: expenses * 0.10 },
    { name: "Entertainment", value: expenses * 0.05 },
    { name: "Other", value: expenses * 0.10 }
  ];
};

export const generateSavingsProjection = (currentSavings: number, annualSavings: number): SavingsProjection[] => {
  const projectionData: SavingsProjection[] = [];
  let projectedSavings = currentSavings;
  
  for (let year = 0; year <= 20; year += 4) {
    projectionData.push({
      year: `Year ${year}`,
      savings: Math.round(projectedSavings)
    });
    projectedSavings += (annualSavings * 4);
  }
  
  return projectionData;
};

// New helper function to calculate dollar amount from percentage of income
export const calculateContributionAmount = (income: number, percentage: number): number => {
  return (income * percentage) / 100;
};
