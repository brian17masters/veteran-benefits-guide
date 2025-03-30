
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryData {
  monthlyIncome: number;
  monthlyExpenses: number;
  surplus: number;
  savingsTarget: number;
  yearsToRetirement: number;
  currentSavings: number;
  pensionAmount: number;
  disabilityAmount: number;
}

interface FinancialSummaryProps {
  summaryData: SummaryData;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summaryData }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>Based on the information you provided</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Monthly Budget</h4>
            <p className="text-muted-foreground mb-2">Income vs Expenses</p>
            <p>Income: <span className="font-bold text-green-600">${summaryData.monthlyIncome.toFixed(2)}</span></p>
            <p>Expenses: <span className="font-bold text-red-600">${summaryData.monthlyExpenses.toFixed(2)}</span></p>
            <p>Monthly Surplus: <span className={`font-bold ${summaryData.surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${summaryData.surplus.toFixed(2)}
            </span></p>
          </div>
          
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Retirement Planning</h4>
            <p className="text-muted-foreground mb-2">Saving for the future</p>
            <p>Current Savings: <span className="font-bold">${summaryData.currentSavings.toFixed(2)}</span></p>
            <p>Retirement Target: <span className="font-bold">${summaryData.savingsTarget.toFixed(2)}</span></p>
            {summaryData.surplus > 0 ? (
              <p>Years to Target: <span className="font-bold">{summaryData.yearsToRetirement.toFixed(1)}</span></p>
            ) : (
              <p className="text-red-600 font-bold">Monthly deficit - review expenses</p>
            )}
          </div>
          
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Recommendations</h4>
            <ul className="list-disc list-inside text-sm">
              {summaryData.surplus < 0 && (
                <li className="text-red-600">Reduce expenses to create a surplus</li>
              )}
              {summaryData.surplus > 0 && summaryData.surplus < (summaryData.monthlyIncome * 0.2) && (
                <li>Try to save at least 20% of your income</li>
              )}
              {summaryData.currentSavings < (summaryData.monthlyExpenses * 6) && (
                <li>Build emergency fund of 6 months expenses</li>
              )}
              <li>Review VA benefits for additional support</li>
              <li>Consider tax advantages of TSP contributions</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
