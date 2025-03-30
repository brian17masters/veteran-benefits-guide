
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinancialInputFormProps {
  currentIncome: string;
  setCurrentIncome: (value: string) => void;
  expectedPension: string;
  setExpectedPension: (value: string) => void;
  disabilityPayment: string;
  setDisabilityPayment: (value: string) => void;
  monthlyExpenses: string;
  setMonthlyExpenses: (value: string) => void;
  savings: string;
  setSavings: (value: string) => void;
  handleCalculate: () => void;
}

const FinancialInputForm: React.FC<FinancialInputFormProps> = ({
  currentIncome,
  setCurrentIncome,
  expectedPension,
  setExpectedPension,
  disabilityPayment,
  setDisabilityPayment,
  monthlyExpenses,
  setMonthlyExpenses,
  savings,
  setSavings,
  handleCalculate,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="current-income">Monthly Income ($)</Label>
          <Input 
            id="current-income" 
            type="number"
            placeholder="e.g., 4000"
            value={currentIncome}
            onChange={(e) => setCurrentIncome(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="pension">Expected Monthly Pension ($)</Label>
          <Input 
            id="pension"
            type="number"
            placeholder="e.g., 2000"
            value={expectedPension}
            onChange={(e) => setExpectedPension(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="disability">Monthly Disability Payment ($)</Label>
          <Input 
            id="disability"
            type="number"
            placeholder="e.g., 1500"
            value={disabilityPayment}
            onChange={(e) => setDisabilityPayment(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="expenses">Monthly Expenses ($)</Label>
          <Input 
            id="expenses"
            type="number"
            placeholder="e.g., 3500"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="savings">Current Savings ($)</Label>
          <Input 
            id="savings"
            type="number"
            placeholder="e.g., 50000"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleCalculate} 
        className="w-full"
        disabled={!currentIncome || !monthlyExpenses}
      >
        Generate Financial Plan
      </Button>
    </>
  );
};

export default FinancialInputForm;
