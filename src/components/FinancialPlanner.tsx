
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

const FinancialPlanner = () => {
  const [currentIncome, setCurrentIncome] = useState("");
  const [expectedPension, setExpectedPension] = useState("");
  const [disabilityPayment, setDisabilityPayment] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Financial summary data
  const [summaryData, setSummaryData] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    surplus: 0,
    savingsTarget: 0,
    yearsToRetirement: 0,
    currentSavings: 0,
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
    
    // Update summary data
    setSummaryData({
      monthlyIncome: totalMonthlyIncome,
      monthlyExpenses: expenses,
      surplus: monthlySurplus,
      savingsTarget: retirementNeeds,
      yearsToRetirement: yearsToRetirement,
      currentSavings: currentSavings,
    });
    
    // Create pie chart data for income
    setIncomeData([
      { name: "Regular Income", value: income },
      { name: "Military Pension", value: pension },
      { name: "Disability Benefits", value: disability }
    ]);
    
    // Create pie chart data for budget
    setExpenseData([
      { name: "Housing", value: expenses * 0.35 },
      { name: "Food", value: expenses * 0.15 },
      { name: "Transportation", value: expenses * 0.15 },
      { name: "Healthcare", value: expenses * 0.10 },
      { name: "Utilities", value: expenses * 0.10 },
      { name: "Entertainment", value: expenses * 0.05 },
      { name: "Other", value: expenses * 0.10 }
    ]);
    
    // Create savings projection data (5 year projection)
    const projectionData = [];
    let projectedSavings = currentSavings;
    
    for (let year = 0; year <= 20; year += 4) {
      projectionData.push({
        year: `Year ${year}`,
        savings: Math.round(projectedSavings)
      });
      projectedSavings += (annualSavings * 4);
    }
    
    setSavingsData(projectionData);
    setHasCalculated(true);
  };
  
  // Chart colors
  const COLORS = ['#0A3161', '#B22234', '#FFD700', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Financial Planner</h3>
      
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
      
      {hasCalculated && (
        <div className="mt-8">
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
          
          <Tabs defaultValue="income" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income">Income Breakdown</TabsTrigger>
              <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
              <TabsTrigger value="projection">Savings Projection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="income">
              <Card>
                <CardHeader>
                  <CardTitle>Income Sources</CardTitle>
                  <CardDescription>Breakdown of your monthly income</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                  <CardDescription>Estimated monthly expense breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => {
                        if (typeof value === 'number') {
                          return `$${value.toFixed(2)}`;
                        }
                        return `$${value}`;
                      }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projection">
              <Card>
                <CardHeader>
                  <CardTitle>20-Year Savings Projection</CardTitle>
                  <CardDescription>How your savings could grow over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={savingsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <Tooltip formatter={(value) => {
                        if (typeof value === 'number') {
                          return `$${value.toLocaleString()}`;
                        }
                        return `$${value}`;
                      }} />
                      <Legend />
                      <Bar dataKey="savings" name="Projected Savings" fill="#0A3161" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default FinancialPlanner;
