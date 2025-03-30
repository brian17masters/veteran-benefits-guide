
import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRiskProfile } from "@/utils/retirementRiskProfiles";
import { calculateContributionAmount } from "@/utils/financialCalculations";
import {
  RetirementGoal,
  MarketPerformance,
  calculateRetirement,
  generateProjectionData,
  generateAssetAllocationData,
  generateIncomeSourcesData,
  RetirementResults
} from "@/utils/retirementUtils";

// Import our new components
import RetirementForm, { RetirementFormValues } from "@/components/retirement/RetirementForm";
import RetirementSummary from "@/components/retirement/RetirementSummary";
import RetirementProjection from "@/components/retirement/RetirementProjection";
import AssetAllocation from "@/components/retirement/AssetAllocation";
import IncomeSources from "@/components/retirement/IncomeSources";

interface RetirementSimulatorProps {
  currentIncome?: number;
  currentExpenses?: number;
  currentSavings?: number;
  pensionAmount?: number;
  disabilityAmount?: number;
  age?: number;
}

const RetirementSimulator: React.FC<RetirementSimulatorProps> = ({
  currentIncome = 0,
  currentExpenses = 0,
  currentSavings = 0,
  pensionAmount = 0,
  disabilityAmount = 0,
  age = 35
}) => {
  // Form state
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthlyExpensesInRetirement, setMonthlyExpensesInRetirement] = useState<string>(
    currentExpenses ? currentExpenses.toString() : "0"
  );
  const [currentAge, setCurrentAge] = useState<string>(age.toString());
  const [contributionPercentage, setContributionPercentage] = useState<string>("15");
  const [riskTolerance, setRiskTolerance] = useState<number>(50);
  
  // Results state
  const [retirementResults, setRetirementResults] = useState<RetirementResults>({
    totalNeeded: 0,
    currentSavingsAtRetirement: 0,
    pensionValue: 0,
    disabilityValue: 0,
    shortfall: 0,
    requiredMonthlySavings: 0,
    yearsToRetirement: 0,
    earliestRetirementAge: 0,
    successProbability: 0
  });
  
  // Chart data state
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [assetAllocationData, setAssetAllocationData] = useState<any[]>([]);
  const [incomeSourcesData, setIncomeSourcesData] = useState<any[]>([]);
  
  // Form values state
  const [formValues, setFormValues] = useState<RetirementFormValues>({
    retirementGoal: "maintainLifestyle",
    currentlyReceivingPension: false,
    currentlyReceivingDisability: false,
    marketPerformance: "average"
  });
  
  // Calculate the dollar amount from percentage
  const contributionAmount = calculateContributionAmount(
    currentIncome, 
    parseFloat(contributionPercentage) || 0
  );

  const handleFormSubmit = (values: RetirementFormValues) => {
    setFormValues(values);
    calculateRetirementPlan(values);
  };
  
  const calculateRetirementPlan = (values: RetirementFormValues = formValues) => {
    const { 
      retirementGoal, 
      currentlyReceivingPension, 
      currentlyReceivingDisability, 
      marketPerformance 
    } = values;
    
    // Calculate main retirement results
    const results = calculateRetirement(
      currentAge,
      retirementAge,
      monthlyExpensesInRetirement,
      currentlyReceivingPension,
      currentlyReceivingDisability,
      pensionAmount,
      disabilityAmount,
      currentSavings,
      contributionAmount,
      riskTolerance,
      marketPerformance
    );
    
    setRetirementResults(results);
    
    // Generate risk profile
    const riskProfile = getRiskProfile(riskTolerance);
    const baseAnnualReturn = riskProfile.expectedReturn / 100;
    const marketMultiplier = marketPerformance === "strong" ? 1.3 : 
                             marketPerformance === "average" ? 1.0 : 0.7;
    const annualReturn = baseAnnualReturn * marketMultiplier;
    
    // Generate projection data
    const currentAgeValue = parseInt(currentAge) || 35;
    const projData = generateProjectionData(
      currentAgeValue,
      retirementAge,
      currentSavings,
      contributionAmount,
      pensionAmount,
      disabilityAmount,
      annualReturn,
      currentlyReceivingPension,
      currentlyReceivingDisability,
      monthlyExpensesInRetirement
    );
    setProjectionData(projData);
    
    // Generate asset allocation data
    const assetData = generateAssetAllocationData(riskProfile);
    setAssetAllocationData(assetData);
    
    // Generate income sources data
    const incomeData = generateIncomeSourcesData(
      results.currentSavingsAtRetirement, 
      results.pensionValue, 
      results.disabilityValue
    );
    setIncomeSourcesData(incomeData);
  };
  
  // Initial calculation on component mount
  useEffect(() => {
    calculateRetirementPlan();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <Calculator className="mr-2" /> Retirement & Investment Simulator
      </h3>
      
      <RetirementForm
        currentIncome={currentIncome}
        pensionAmount={pensionAmount}
        disabilityAmount={disabilityAmount}
        retirementAge={retirementAge}
        setRetirementAge={setRetirementAge}
        monthlyExpensesInRetirement={monthlyExpensesInRetirement}
        setMonthlyExpensesInRetirement={setMonthlyExpensesInRetirement}
        currentAge={currentAge}
        setCurrentAge={setCurrentAge}
        contributionPercentage={contributionPercentage}
        setContributionPercentage={setContributionPercentage}
        riskTolerance={riskTolerance}
        setRiskTolerance={setRiskTolerance}
        yearsToRetirement={retirementResults.yearsToRetirement}
        onSubmit={handleFormSubmit}
        defaultValues={formValues}
      />
      
      <div className="mt-8">
        <RetirementSummary
          results={retirementResults}
          retirementAge={retirementAge}
          contributionAmount={contributionAmount}
          contributionPercentage={contributionPercentage}
          retirementGoal={formValues.retirementGoal}
        />
        
        <Tabs defaultValue="projection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projection">Retirement Projection</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="sources">Income Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projection">
            <RetirementProjection projectionData={projectionData} />
          </TabsContent>
          
          <TabsContent value="allocation">
            <AssetAllocation 
              assetAllocationData={assetAllocationData}
              riskTolerance={riskTolerance}
            />
          </TabsContent>
          
          <TabsContent value="sources">
            <IncomeSources incomeSourcesData={incomeSourcesData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RetirementSimulator;
