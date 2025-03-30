
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
  
  // Calculate how much of the expenses are covered by guaranteed income (pension + disability)
  const guaranteedIncome = pension + disability;
  const expensesNeedingCoverage = Math.max(0, expenses - guaranteedIncome);
  
  // Estimate years to retirement (simple calculation)
  // Adjusting retirement needs based on expenses not covered by guaranteed income
  const annualExpensesNeedingCoverage = expensesNeedingCoverage * 12;
  const retirementNeeds = annualExpensesNeedingCoverage * 25;
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

// New function to calculate retirement needs accounting for guaranteed income
export const calculateRetirementNeedsWithGuaranteedIncome = (
  monthlyExpenses: number,
  monthlyPension: number,
  monthlyDisability: number
): number => {
  // Calculate how much monthly expense is not covered by guaranteed income
  const guaranteedMonthlyIncome = monthlyPension + monthlyDisability;
  const monthlyExpensesNeedingCoverage = Math.max(0, monthlyExpenses - guaranteedMonthlyIncome);
  
  // Convert to annual amount and multiply by 25 (4% rule)
  const annualExpensesNeedingCoverage = monthlyExpensesNeedingCoverage * 12;
  return annualExpensesNeedingCoverage * 25;
};
