
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AssetAllocationProps {
  assetAllocationData: any[];
  riskTolerance: number;
}

const COLORS = ['#4CAF50', '#9E9E9E', '#FFEB3B', '#FF9800'];

const AssetAllocation: React.FC<AssetAllocationProps> = ({ 
  assetAllocationData,
  riskTolerance
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Asset Allocation</CardTitle>
        <CardDescription>Based on your risk tolerance ({riskTolerance}%)</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h4 className="font-semibold mb-2">Portfolio Strategy</h4>
            <p className="mb-4">This allocation is based on your risk tolerance and time horizon. As you approach retirement, consider gradually shifting to a more conservative allocation.</p>
            <h4 className="font-semibold mb-2">Investment Vehicles to Consider</h4>
            <ul className="list-disc list-inside text-sm">
              <li>TSP: Low-cost funds available to military/federal employees</li>
              <li>IRAs: Traditional or Roth for tax advantages</li>
              <li>Taxable brokerage accounts for additional flexibility</li>
              <li>Treasury bonds for safe, guaranteed returns</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
