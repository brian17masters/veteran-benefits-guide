
import React, { useState } from "react";
import FinancialInputForm from "./financialPlanner/FinancialInputForm";
import FinancialSummary from "./financialPlanner/FinancialSummary";
import FinancialCharts from "./financialPlanner/FinancialCharts";
import FinancialChatbot, { FinancialInfo } from "./chatbot/FinancialChatbot";
import {
  calculateFinancialSummary,
  generateIncomeData,
  generateExpenseData,
  generateSavingsProjection,
  FinancialSummary as FinancialSummaryType
} from "@/utils/financialCalculations";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
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

  const handleChatbotInfoCollected = (info: FinancialInfo) => {
    if (info.currentIncome) setCurrentIncome(info.currentIncome);
    if (info.expectedPension) setExpectedPension(info.expectedPension);
    if (info.disabilityPayment) setDisabilityPayment(info.disabilityPayment);
    if (info.monthlyExpenses) setMonthlyExpenses(info.monthlyExpenses);
    if (info.savings) setSavings(info.savings);
    
    // Automatically calculate after getting all information
    setTimeout(() => {
      handleCalculate();
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Financial Planner</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsChatbotOpen(true)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Chat Assistant</span>
        </Button>
      </div>
      
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

      <FinancialChatbot 
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onInfoCollected={handleChatbotInfoCollected}
      />
    </div>
  );
};

export default FinancialPlanner;
