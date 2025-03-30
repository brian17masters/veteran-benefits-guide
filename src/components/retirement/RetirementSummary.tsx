
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RetirementResults } from "@/utils/retirementUtils";

interface RetirementSummaryProps {
  results: RetirementResults;
  retirementAge: number;
  contributionAmount: number;
  contributionPercentage: string;
  retirementGoal: "maintainLifestyle" | "growWealth";
}

const RetirementSummary: React.FC<RetirementSummaryProps> = ({
  results,
  retirementAge,
  contributionAmount,
  contributionPercentage,
  retirementGoal
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Retirement Summary</CardTitle>
        <CardDescription>Based on your inputs and current financial situation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Retirement Needs</h4>
            <p className="text-muted-foreground mb-2">At age {retirementAge}</p>
            <p>Total Needed: <span className="font-bold">${results.totalNeeded.toLocaleString()}</span></p>
            <p>Projected Savings: <span className="font-bold">${results.currentSavingsAtRetirement.toLocaleString()}</span></p>
            <p>Pension Value: <span className="font-bold">${results.pensionValue.toLocaleString()}</span></p>
            <p>Disability Value: <span className="font-bold">${results.disabilityValue.toLocaleString()}</span></p>
          </div>
          
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Gap Analysis</h4>
            <p className="text-muted-foreground mb-2">Planning for the future</p>
            {results.shortfall > 0 ? (
              <>
                <p>Projected Shortfall: <span className="font-bold text-red-600">${results.shortfall.toLocaleString()}</span></p>
                <p>Required Monthly Savings: <span className="font-bold text-red-600">${Math.round(results.requiredMonthlySavings).toLocaleString()}</span></p>
              </>
            ) : (
              <p>Projected Surplus: <span className="font-bold text-green-600">${Math.abs(results.shortfall).toLocaleString()}</span></p>
            )}
            <p>Current Monthly Contribution: <span className="font-bold">${contributionAmount.toFixed(0)}</span> ({contributionPercentage}% of income)</p>
            
            {retirementGoal === "maintainLifestyle" && (
              <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
                <p className="font-semibold">Earliest Possible Retirement: <span className="text-green-600">Age {results.earliestRetirementAge}</span></p>
              </div>
            )}
            
            <div className="mt-4">
              <h5 className="font-semibold">Success Probability</h5>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div 
                  className={`h-4 rounded-full ${
                    results.successProbability > 80 ? 'bg-green-500' : 
                    results.successProbability > 60 ? 'bg-green-400' :
                    results.successProbability > 40 ? 'bg-yellow-400' : 'bg-red-500'
                  }`}
                  style={{ width: `${results.successProbability}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-center">{Math.round(results.successProbability)}% likelihood of meeting retirement goals</p>
            </div>
          </div>
          
          <div className="bg-offwhite p-4 rounded-lg">
            <h4 className="font-semibold text-lg">Recommendations</h4>
            <ul className="list-disc list-inside text-sm">
              {results.shortfall > 0 && (
                <li className="text-red-600">Increase your monthly contribution to ${Math.round(results.requiredMonthlySavings).toLocaleString()} to meet your goal</li>
              )}
              {results.shortfall <= 0 && (
                <li className="text-green-600">You're on track to meet your retirement goals!</li>
              )}
              {parseFloat(contributionPercentage) < 15 && (
                <li>Consider saving at least 15% of your income for retirement</li>
              )}
              {retirementGoal === "maintainLifestyle" && results.earliestRetirementAge < retirementAge && (
                <li className="text-green-600">You could potentially retire {retirementAge - results.earliestRetirementAge} years earlier than planned</li>
              )}
              <li>Regularly review and adjust your investment strategy</li>
              <li>Consider meeting with a financial advisor who specializes in veteran benefits</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetirementSummary;
