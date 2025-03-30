
import { getRiskProfile } from "./retirementRiskProfiles";
import { calculateContributionAmount } from "./financialCalculations";

export interface RetirementResults {
  totalNeeded: number;
  currentSavingsAtRetirement: number;
  pensionValue: number;
  disabilityValue: number;
  shortfall: number;
  requiredMonthlySavings: number;
  yearsToRetirement: number;
  earliestRetirementAge: number;
  successProbability: number;
}

export const marketPerformanceRates = {
  strong: { multiplier: 1.3 },
  average: { multiplier: 1.0 },
  below: { multiplier: 0.7 }
};

export type MarketPerformance = "strong" | "average" | "below";
export type RetirementGoal = "maintainLifestyle" | "growWealth";

export const calculateEarliestRetirementAge = (
  monthlyExpensesInRetirement: string,
  currentAge: string,
  currentlyReceivingPension: boolean,
  currentlyReceivingDisability: boolean,
  pensionAmount: number,
  disabilityAmount: number,
  currentSavings: number,
  contributionPercentage: string,
  currentIncome: number,
  riskTolerance: number,
  marketPerformance: MarketPerformance
): number => {
  const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
  const currentAgeValue = parseInt(currentAge) || 35;
  
  const monthlyPension = currentlyReceivingPension ? pensionAmount : 0;
  const monthlyDisability = currentlyReceivingDisability ? disabilityAmount : 0;
  const guaranteedIncome = monthlyPension + monthlyDisability;
  
  // Calculate expenses not covered by guaranteed income
  const expensesNeedingCoverage = Math.max(0, monthlyExpenses - guaranteedIncome);
  
  // If all expenses are covered by guaranteed income, they could retire immediately
  if (expensesNeedingCoverage <= 0) {
    return currentAgeValue;
  }
  
  const annualExpensesNeedingCoverage = expensesNeedingCoverage * 12;
  const totalSavingsNeeded = annualExpensesNeedingCoverage * 25;
  
  const riskProfile = getRiskProfile(riskTolerance);
  const baseAnnualReturn = riskProfile.expectedReturn / 100;
  const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
  const annualReturn = baseAnnualReturn * marketMultiplier;
  
  const contributionAmount = calculateContributionAmount(currentIncome, parseFloat(contributionPercentage) || 0);
  
  let age = currentAgeValue;
  let currentSavingsValue = currentSavings;
  
  while (currentSavingsValue < totalSavingsNeeded && age < 100) {
    currentSavingsValue = currentSavingsValue * (1 + annualReturn);
    currentSavingsValue += contributionAmount * 12;
    age++;
  }
  
  return Math.min(age, 100);
};

export const calculateSuccessProbability = (
  monthlyExpensesInRetirement: string,
  currentAge: string,
  retirementAge: number,
  currentlyReceivingPension: boolean,
  currentlyReceivingDisability: boolean,
  pensionAmount: number,
  disabilityAmount: number,
  currentSavings: number,
  contributionAmount: number,
  riskTolerance: number,
  marketPerformance: MarketPerformance
): number => {
  const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
  const annualExpenses = monthlyExpenses * 12;
  
  const monthlyPension = currentlyReceivingPension ? pensionAmount : 0;
  const monthlyDisability = currentlyReceivingDisability ? disabilityAmount : 0;
  const monthlyGuaranteedIncome = monthlyPension + monthlyDisability;
  const annualGuaranteedIncome = monthlyGuaranteedIncome * 12;
  
  const expensesCoveredPercentage = Math.min(1, annualGuaranteedIncome / annualExpenses) * 100;
  
  const currentAgeValue = parseInt(currentAge) || 35;
  const yearsToRetirement = retirementAge - currentAgeValue;
  const riskProfile = getRiskProfile(riskTolerance);
  const baseAnnualReturn = riskProfile.expectedReturn / 100;
  const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
  const annualReturn = baseAnnualReturn * marketMultiplier;
  
  const savingsFutureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);
  
  const contributionsFutureValue = contributionAmount * 12 * 
    ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn);
  
  const totalSavingsAtRetirement = savingsFutureValue + contributionsFutureValue;
  
  const annualAmountNeededFromSavings = Math.max(0, annualExpenses - annualGuaranteedIncome);
  const savingsNeeded = annualAmountNeededFromSavings * 25;
  
  const savingsSufficiencyRatio = Math.min(1, totalSavingsAtRetirement / (savingsNeeded || 1)) * 100;
  
  let probability = (expensesCoveredPercentage * 0.7) + (savingsSufficiencyRatio * 0.3);
  
  return Math.min(100, probability);
};

export const calculateRetirement = (
  currentAge: string,
  retirementAge: number,
  monthlyExpensesInRetirement: string,
  currentlyReceivingPension: boolean,
  currentlyReceivingDisability: boolean,
  pensionAmount: number,
  disabilityAmount: number,
  currentSavings: number,
  contributionAmount: number,
  riskTolerance: number,
  marketPerformance: MarketPerformance
): RetirementResults => {
  const currentAgeValue = parseInt(currentAge) || 35;
  const yearsToRetirement = retirementAge - currentAgeValue;
  const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
  
  // Calculate considering guaranteed income
  const monthlyPension = currentlyReceivingPension ? pensionAmount : 0;
  const monthlyDisability = currentlyReceivingDisability ? disabilityAmount : 0;
  const monthlyGuaranteedIncome = monthlyPension + monthlyDisability;
  
  // Calculate expenses not covered by guaranteed income
  const monthlyExpensesNeedingCoverage = Math.max(0, monthlyExpenses - monthlyGuaranteedIncome);
  const annualExpensesNeedingCoverage = monthlyExpensesNeedingCoverage * 12;
  
  // Total retirement needs adjusting for guaranteed income
  const adjustedTotalNeeded = annualExpensesNeedingCoverage * 25;
  
  // Value of pension and disability as retirement assets
  const annualPension = pensionAmount * 12;
  const annualDisability = disabilityAmount * 12;
  const pensionValue = annualPension * 25;
  const disabilityValue = annualDisability * 25;
  
  // Investment return calculations
  const riskProfile = getRiskProfile(riskTolerance);
  const baseAnnualReturn = riskProfile.expectedReturn / 100;
  const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
  const annualReturn = baseAnnualReturn * marketMultiplier;
  
  let savingsFutureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);
  
  const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
  let contributionsFutureValue = 0;
  
  if (monthlyReturn > 0) {
    contributionsFutureValue = contributionAmount * 
      ((Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1) / monthlyReturn);
  } else {
    contributionsFutureValue = contributionAmount * yearsToRetirement * 12;
  }
  
  const currentSavingsAtRetirement = savingsFutureValue + contributionsFutureValue;
  
  // Calculate shortfall based on adjusted needs
  const shortfall = Math.max(0, adjustedTotalNeeded - currentSavingsAtRetirement);
  
  let requiredMonthlySavings = 0;
  
  if (shortfall > 0 && monthlyReturn > 0 && yearsToRetirement > 0) {
    requiredMonthlySavings = 
      (shortfall * monthlyReturn) / 
      (Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1);
  }
  
  const earliestRetirementAge = calculateEarliestRetirementAge(
    monthlyExpensesInRetirement,
    currentAge,
    currentlyReceivingPension,
    currentlyReceivingDisability,
    pensionAmount,
    disabilityAmount,
    currentSavings,
    "15", // Default contribution percentage
    contributionAmount * 100 / 15, // Derive income from contribution
    riskTolerance,
    marketPerformance
  );
  
  const successProbability = calculateSuccessProbability(
    monthlyExpensesInRetirement,
    currentAge,
    retirementAge,
    currentlyReceivingPension,
    currentlyReceivingDisability,
    pensionAmount,
    disabilityAmount,
    currentSavings,
    contributionAmount,
    riskTolerance,
    marketPerformance
  );
  
  return {
    totalNeeded: adjustedTotalNeeded,
    currentSavingsAtRetirement,
    pensionValue,
    disabilityValue,
    shortfall,
    requiredMonthlySavings,
    yearsToRetirement,
    earliestRetirementAge,
    successProbability
  };
};

export const generateProjectionData = (
  startAge: number,
  endAge: number,
  startSavings: number,
  monthlyContrib: number,
  pension: number,
  disability: number,
  annualReturn: number,
  currentlyReceivingPension: boolean,
  currentlyReceivingDisability: boolean,
  monthlyExpensesInRetirement: string
) => {
  const data = [];
  let currentSavings = startSavings;
  const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
  const annualPension = pension * 12;
  const annualDisability = disability * 12;
  const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
  
  let cumulativePension = 0;
  let cumulativeDisability = 0;
  
  for (let age = startAge; age <= Math.min(endAge + 30, 100); age++) {
    const yearsPassed = age - startAge;
    
    if (age < endAge) {
      // Pre-retirement phase: accumulating savings
      if (currentlyReceivingPension) {
        cumulativePension += annualPension;
      }
      
      if (currentlyReceivingDisability) {
        cumulativeDisability += annualDisability;
      }
      
      currentSavings = currentSavings * Math.pow(1 + annualReturn, 1) + (monthlyContrib * 12);
      
      data.push({
        age,
        savings: Math.round(currentSavings),
        pension: currentlyReceivingPension ? Math.round(cumulativePension) : 0,
        disability: currentlyReceivingDisability ? Math.round(cumulativeDisability) : 0,
        total: Math.round(currentSavings + 
          (currentlyReceivingPension ? cumulativePension : 0) + 
          (currentlyReceivingDisability ? cumulativeDisability : 0))
      });
    } else {
      // Post-retirement phase: spending from savings
      const yearsSinceRetirement = age - endAge;
      
      // Calculate annual pension and disability, whether they start at retirement or are already receiving them
      let yearlyPensionAmount = 0;
      let yearlyDisabilityAmount = 0;
      
      if (currentlyReceivingPension) {
        // Already receiving pension, continue accumulating
        cumulativePension += annualPension;
        yearlyPensionAmount = annualPension;
      } else {
        // Start pension at retirement
        yearlyPensionAmount = annualPension;
        cumulativePension += yearlyPensionAmount;
      }
      
      if (currentlyReceivingDisability) {
        // Already receiving disability, continue accumulating
        cumulativeDisability += annualDisability;
        yearlyDisabilityAmount = annualDisability;
      } else {
        // Start disability at retirement
        yearlyDisabilityAmount = annualDisability;
        cumulativeDisability += yearlyDisabilityAmount;
      }
      
      // Investment growth (usually lower in retirement - using 50% of pre-retirement return)
      currentSavings = currentSavings * (1 + (annualReturn * 0.5));
      
      // Calculate withdrawal needed, accounting for pension and disability
      const yearlyExpenses = monthlyExpenses * 12;
      const totalGuaranteedIncome = yearlyPensionAmount + yearlyDisabilityAmount;
      const withdrawalNeeded = Math.max(0, yearlyExpenses - totalGuaranteedIncome);
      
      // Withdraw from savings
      currentSavings = Math.max(0, currentSavings - withdrawalNeeded);
      
      data.push({
        age,
        savings: Math.round(currentSavings),
        pension: Math.round(cumulativePension),
        disability: Math.round(cumulativeDisability),
        total: Math.round(currentSavings + cumulativePension + cumulativeDisability)
      });
    }
  }
  
  return data;
};

export const generateAssetAllocationData = (riskProfile: any) => {
  return [
    { name: "Stocks", value: riskProfile.stocks },
    { name: "Bonds", value: riskProfile.bonds },
    { name: "Cash", value: riskProfile.cash }
  ];
};

export const generateIncomeSourcesData = (savings: number, pension: number, disability: number) => {
  return [
    { name: "Investments", value: Math.round(savings) },
    { name: "Pension", value: Math.round(pension) },
    { name: "Disability", value: Math.round(disability) }
  ];
};
