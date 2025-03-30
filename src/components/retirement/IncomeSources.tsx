
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface IncomeSourcesProps {
  incomeSourcesData: any[];
}

const IncomeSources: React.FC<IncomeSourcesProps> = ({ incomeSourcesData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Income Sources</CardTitle>
        <CardDescription>Breakdown of your retirement income</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={incomeSourcesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                <Legend />
                <Bar dataKey="value" name="Value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h4 className="font-semibold mb-2">Income Source Strategy</h4>
            <p className="mb-4">Your retirement income will come from several sources. Understanding each one helps create a balanced withdrawal strategy.</p>
            <h4 className="font-semibold mb-2">Maximizing Your Income</h4>
            <ul className="list-disc list-inside text-sm">
              <li>Consider delaying Social Security to increase benefits</li>
              <li>Develop a tax-efficient withdrawal strategy</li>
              <li>Understand required minimum distributions (RMDs)</li>
              <li>Explore VA benefit enhancements you may qualify for</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeSources;
