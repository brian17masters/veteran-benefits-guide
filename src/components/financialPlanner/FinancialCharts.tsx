
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface FinancialChartsProps {
  incomeData: any[];
  expenseData: any[];
  savingsData: any[];
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ incomeData, expenseData, savingsData }) => {
  // Chart colors
  const COLORS = ['#0A3161', '#B22234', '#FFD700', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

  return (
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
  );
};

export default FinancialCharts;
