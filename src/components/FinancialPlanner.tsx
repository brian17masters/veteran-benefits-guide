
import React, { useState } from "react";
import FinancialInputForm from "./financialPlanner/FinancialInputForm";
import FinancialSummary from "./financialPlanner/FinancialSummary";
import FinancialCharts from "./financialPlanner/FinancialCharts";
import {
  calculateFinancialSummary,
  generateIncomeData,
  generateExpenseData,
  generateSavingsProjection,
  FinancialSummary as FinancialSummaryType
} from "@/utils/financialCalculations";

interface FinancialPlannerProps {
  onCalculate?: (data: any) => void;
}

const FinancialPlanner: React.FC<FinancialPlannerProps> = ({ onCalculate }) => {
  const [currentIncome, setCurrentIncome] = useState("");
  const [expectedPension, setExpectedPension] = useState("");
  const [disabilityPayment, setDisabilityPayment] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Financial summary data
  const [summaryData, setSummaryData] = useState<FinancialSummaryType>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    surplus: 0,
    savingsTarget: 0,
    yearsToRetirement: 0,
    currentSavings: 0,
    pensionAmount: 0,
    disabilityAmount: 0
  });
  
  // Chart data
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [savingsData, setSavingsData] = useState<any[]>([]);

  const handleCalculate = () => {
    // Convert string inputs to numbers
    const income = parseFloat(currentIncome) || 0;
    const pension = parseFloat(expectedPension) || 0;
    const disability = parseFloat(disabilityPayment) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const currentSavings = parseFloat(savings) || 0;
    
    // Calculate summary data
    const updatedSummaryData = calculateFinancialSummary(
      income, 
      pension, 
      disability, 
      expenses, 
      currentSavings
    );
    
    setSummaryData(updatedSummaryData);
    
    // Pass data to parent component if callback provided
    if (onCalculate) {
      onCalculate(updatedSummaryData);
    }
    
    // Generate chart data
    setIncomeData(generateIncomeData(income, pension, disability));
    setExpenseData(generateExpenseData(expenses));
    
    // Generate savings projection
    const annualSavings = updatedSummaryData.surplus * 12;
    setSavingsData(generateSavingsProjection(currentSavings, annualSavings));
    
    setHasCalculated(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Financial Planner</h3>
      
      <FinancialInputForm
        currentIncome={currentIncome}
        setCurrentIncome={setCurrentIncome}
        expectedPension={expectedPension}
        setExpectedPension={setExpectedPension}
        disabilityPayment={disabilityPayment}
        setDisabilityPayment={setDisabilityPayment}
        monthlyExpenses={monthlyExpenses}
        setMonthlyExpenses={setMonthlyExpenses}
        savings={savings}
        setSavings={setSavings}
        handleCalculate={handleCalculate}
      />
      
      {hasCalculated && (
        <div className="mt-8">
          <FinancialSummary summaryData={summaryData} />
          <FinancialCharts 
            incomeData={incomeData}
            expenseData={expenseData}
            savingsData={savingsData}
          />
        </div>
      )}
    </div>
  );
};

export default FinancialPlanner;
