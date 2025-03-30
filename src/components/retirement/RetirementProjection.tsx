
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RetirementProjectionProps {
  projectionData: any[];
}

const RetirementProjection: React.FC<RetirementProjectionProps> = ({ projectionData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Fund Projection</CardTitle>
        <CardDescription>How your retirement funds may grow over time</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={projectionData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="age" 
              label={{ 
                value: 'Age', 
                position: 'insideBottomRight', 
                offset: -25 
              }} 
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              label={{ 
                value: 'Value ($)', 
                angle: -90, 
                position: 'insideLeft' 
              }}  
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              labelFormatter={(label) => `Age: ${label}`}
            />
            <Legend />
            <Area type="monotone" dataKey="savings" name="Investments" stackId="1" fill="#4CAF50" stroke="#4CAF50" />
            <Area type="monotone" dataKey="pension" name="Pension" stackId="1" fill="#9E9E9E" stroke="#9E9E9E" />
            <Area type="monotone" dataKey="disability" name="Disability" stackId="1" fill="#FFEB3B" stroke="#FFEB3B" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RetirementProjection;
