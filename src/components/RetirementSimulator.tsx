import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { DollarSign, PiggyBank, Calculator, Calendar, Target, TrendingUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface RetirementSimulatorProps {
  currentIncome?: number;
  currentExpenses?: number;
  currentSavings?: number;
  pensionAmount?: number;
  disabilityAmount?: number;
  age?: number;
}

const RetirementSimulator: React.FC<RetirementSimulatorProps> = ({
  currentIncome = 0,
  currentExpenses = 0,
  currentSavings = 0,
  pensionAmount = 0,
  disabilityAmount = 0,
  age = 35
}) => {
  const form = useForm({
    defaultValues: {
      retirementGoal: "maintainLifestyle",
      currentlyReceivingPension: false,
      currentlyReceivingDisability: false,
      marketPerformance: "average"
    }
  });
  
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthlyExpensesInRetirement, setMonthlyExpensesInRetirement] = useState<string>(
    currentExpenses ? currentExpenses.toString() : "0"
  );
  const [currentAge, setCurrentAge] = useState<string>(age.toString());
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [riskTolerance, setRiskTolerance] = useState<number>(50);
  
  const [currentlyReceivingPension, setCurrentlyReceivingPension] = useState<boolean>(false);
  const [currentlyReceivingDisability, setCurrentlyReceivingDisability] = useState<boolean>(false);
  
  const [retirementGoal, setRetirementGoal] = useState<"maintainLifestyle" | "growWealth">("maintainLifestyle");
  
  const [marketPerformance, setMarketPerformance] = useState<"strong" | "average" | "below">("average");
  
  const [retirementResults, setRetirementResults] = useState<{
    totalNeeded: number;
    currentSavingsAtRetirement: number;
    pensionValue: number;
    disabilityValue: number;
    shortfall: number;
    requiredMonthlySavings: number;
    yearsToRetirement: number;
    earliestRetirementAge: number;
    successProbability: number;
  }>({
    totalNeeded: 0,
    currentSavingsAtRetirement: 0,
    pensionValue: 0,
    disabilityValue: 0,
    shortfall: 0,
    requiredMonthlySavings: 0,
    yearsToRetirement: 0,
    earliestRetirementAge: 0,
    successProbability: 0
  });
  
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [assetAllocationData, setAssetAllocationData] = useState<any[]>([]);
  const [incomeSourcesData, setIncomeSourcesData] = useState<any[]>([]);
  
  const riskProfiles = {
    conservative: { stocks: 30, bonds: 60, cash: 10, expectedReturn: 5 },
    moderate: { stocks: 60, bonds: 35, cash: 5, expectedReturn: 7 },
    aggressive: { stocks: 80, bonds: 15, cash: 5, expectedReturn: 9 }
  };
  
  const marketPerformanceRates = {
    strong: { multiplier: 1.3 },
    average: { multiplier: 1.0 },
    below: { multiplier: 0.7 }
  };
  
  const handleFormSubmit = (values: any) => {
    setRetirementGoal(values.retirementGoal);
    setCurrentlyReceivingPension(values.currentlyReceivingPension);
    setCurrentlyReceivingDisability(values.currentlyReceivingDisability);
    setMarketPerformance(values.marketPerformance);
    calculateRetirement();
  };
  
  const getRiskProfile = () => {
    if (riskTolerance < 33) {
      return riskProfiles.conservative;
    } else if (riskTolerance < 66) {
      return riskProfiles.moderate;
    } else {
      return riskProfiles.aggressive;
    }
  };
  
  const calculateEarliestRetirementAge = () => {
    const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
    const currentAgeValue = parseInt(currentAge) || 35;
    const monthlySavingsTarget = monthlyExpenses;
    
    const monthlyPension = currentlyReceivingPension ? pensionAmount : 0;
    const monthlyDisability = currentlyReceivingDisability ? disabilityAmount : 0;
    const coveredExpenses = monthlyPension + monthlyDisability;
    const neededFromSavings = Math.max(0, monthlySavingsTarget - coveredExpenses);
    
    if (neededFromSavings <= 0) {
      return currentAgeValue;
    }
    
    const annualNeededFromSavings = neededFromSavings * 12;
    const totalSavingsNeeded = annualNeededFromSavings * 25;
    
    const riskProfile = getRiskProfile();
    const baseAnnualReturn = riskProfile.expectedReturn / 100;
    const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
    const annualReturn = baseAnnualReturn * marketMultiplier;
    
    let age = currentAgeValue;
    let currentSavingsValue = currentSavings;
    const monthlyContributionValue = parseFloat(monthlyContribution) || 0;
    
    while (currentSavingsValue < totalSavingsNeeded && age < 100) {
      currentSavingsValue = currentSavingsValue * (1 + annualReturn);
      currentSavingsValue += monthlyContributionValue * 12;
      age++;
    }
    
    return Math.min(age, 100);
  };
  
  const calculateSuccessProbability = () => {
    const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
    const annualExpenses = monthlyExpenses * 12;
    
    const monthlyPension = currentlyReceivingPension ? pensionAmount : 0;
    const monthlyDisability = currentlyReceivingDisability ? disabilityAmount : 0;
    const monthlyGuaranteedIncome = monthlyPension + monthlyDisability;
    const annualGuaranteedIncome = monthlyGuaranteedIncome * 12;
    
    const expensesCoveredPercentage = Math.min(1, annualGuaranteedIncome / annualExpenses) * 100;
    
    const currentAgeValue = parseInt(currentAge) || 35;
    const yearsToRetirement = retirementAge - currentAgeValue;
    const riskProfile = getRiskProfile();
    const baseAnnualReturn = riskProfile.expectedReturn / 100;
    const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
    const annualReturn = baseAnnualReturn * marketMultiplier;
    
    const savingsFutureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);
    const monthlyContributionValue = parseFloat(monthlyContribution) || 0;
    const contributionsFutureValue = monthlyContributionValue * 12 * 
      ((Math.pow(1 + annualReturn, yearsToRetirement * 12) - 1) / annualReturn);
    
    const totalSavingsAtRetirement = savingsFutureValue + contributionsFutureValue;
    
    const annualAmountNeededFromSavings = Math.max(0, annualExpenses - annualGuaranteedIncome);
    const savingsNeeded = annualAmountNeededFromSavings * 25;
    
    const savingsSufficiencyRatio = Math.min(1, totalSavingsAtRetirement / (savingsNeeded || 1)) * 100;
    
    let probability = (expensesCoveredPercentage * 0.7) + (savingsSufficiencyRatio * 0.3);
    
    return Math.min(100, probability);
  };
  
  const calculateRetirement = () => {
    const currentAgeValue = parseInt(currentAge) || 35;
    const yearsToRetirement = retirementAge - currentAgeValue;
    const monthlyExpenses = parseFloat(monthlyExpensesInRetirement) || 0;
    const annualExpenses = monthlyExpenses * 12;
    const monthlyContributionValue = parseFloat(monthlyContribution) || 0;
    
    const totalNeeded = annualExpenses * 25;
    
    const annualPension = pensionAmount * 12;
    const annualDisability = disabilityAmount * 12;
    
    const currentMonthlyGuaranteedIncome = 
      (currentlyReceivingPension ? pensionAmount : 0) + 
      (currentlyReceivingDisability ? disabilityAmount : 0);
    
    const annualAmountNeededFromSavings = Math.max(0, annualExpenses - (currentMonthlyGuaranteedIncome * 12));
    const adjustedTotalNeeded = annualAmountNeededFromSavings * 25;
    
    const pensionValue = annualPension * 25;
    const disabilityValue = annualDisability * 25;
    
    const riskProfile = getRiskProfile();
    const baseAnnualReturn = riskProfile.expectedReturn / 100;
    const marketMultiplier = marketPerformanceRates[marketPerformance].multiplier;
    const annualReturn = baseAnnualReturn * marketMultiplier;
    
    let savingsFutureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);
    
    const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
    let contributionsFutureValue = 0;
    
    if (monthlyReturn > 0) {
      contributionsFutureValue = monthlyContributionValue * 
        ((Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1) / monthlyReturn);
    } else {
      contributionsFutureValue = monthlyContributionValue * yearsToRetirement * 12;
    }
    
    const currentSavingsAtRetirement = savingsFutureValue + contributionsFutureValue;
    
    const shortfall = Math.max(0, adjustedTotalNeeded - currentSavingsAtRetirement);
    
    let requiredMonthlySavings = 0;
    
    if (shortfall > 0 && monthlyReturn > 0 && yearsToRetirement > 0) {
      requiredMonthlySavings = 
        (shortfall * monthlyReturn) / 
        (Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1);
    }
    
    const earliestRetirementAge = calculateEarliestRetirementAge();
    
    const successProbability = calculateSuccessProbability();
    
    setRetirementResults({
      totalNeeded: adjustedTotalNeeded,
      currentSavingsAtRetirement,
      pensionValue,
      disabilityValue,
      shortfall,
      requiredMonthlySavings,
      yearsToRetirement,
      earliestRetirementAge,
      successProbability
    });
    
    generateProjectionData(
      currentAgeValue,
      retirementAge,
      currentSavings,
      monthlyContributionValue,
      currentlyReceivingPension ? pensionAmount : 0,
      currentlyReceivingDisability ? disabilityAmount : 0,
      annualReturn
    );
    
    generateAssetAllocationData(riskProfile);
    
    generateIncomeSourcesData(currentSavingsAtRetirement, pensionValue, disabilityValue);
  };
  
  const generateProjectionData = (
    startAge: number,
    endAge: number,
    startSavings: number,
    monthlyContrib: number,
    pension: number,
    disability: number,
    annualReturn: number
  ) => {
    const data = [];
    let currentSavings = startSavings;
    const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
    const annualPension = pension * 12;
    const annualDisability = disability * 12;
    
    let cumulativePension = 0;
    let cumulativeDisability = 0;
    
    for (let age = startAge; age <= Math.min(endAge + 30, 100); age++) {
      const yearsPassed = age - startAge;
      
      if (age < endAge) {
        if (currentlyReceivingPension) {
          cumulativePension += annualPension;
        }
        
        if (currentlyReceivingDisability) {
          cumulativeDisability += annualDisability;
        }
        
        currentSavings = currentSavings * Math.pow(1 + annualReturn, 1) + (monthlyContrib * 12);
        
        data.push({
          age,
          savings: Math.round(currentSavings),
          pension: currentlyReceivingPension ? Math.round(cumulativePension) : 0,
          disability: currentlyReceivingDisability ? Math.round(cumulativeDisability) : 0,
          total: Math.round(currentSavings + 
            (currentlyReceivingPension ? cumulativePension : 0) + 
            (currentlyReceivingDisability ? cumulativeDisability : 0))
        });
      } else {
        const yearsSinceRetirement = age - endAge;
        
        if (currentlyReceivingPension) {
          cumulativePension += annualPension;
        } else {
          cumulativePension = annualPension * (yearsSinceRetirement + 1);
        }
        
        if (currentlyReceivingDisability) {
          cumulativeDisability += annualDisability;
        } else {
          cumulativeDisability = annualDisability * (yearsSinceRetirement + 1);
        }
        
        currentSavings = currentSavings * (1 + (annualReturn * 0.5));
        
        const expenses = parseFloat(monthlyExpensesInRetirement) * 12 || 0;
        const incomeFromPensionAndDisability = 
          (currentlyReceivingPension || yearsSinceRetirement > 0 ? annualPension : 0) + 
          (currentlyReceivingDisability || yearsSinceRetirement > 0 ? annualDisability : 0);
        const withdrawalNeeded = Math.max(0, expenses - incomeFromPensionAndDisability);
        
        currentSavings = Math.max(0, currentSavings - withdrawalNeeded);
        
        data.push({
          age,
          savings: Math.round(currentSavings),
          pension: Math.round(cumulativePension),
          disability: Math.round(cumulativeDisability),
          total: Math.round(currentSavings + cumulativePension + cumulativeDisability)
        });
      }
    }
    
    setProjectionData(data);
  };
  
  const generateAssetAllocationData = (riskProfile: any) => {
    setAssetAllocationData([
      { name: "Stocks", value: riskProfile.stocks },
      { name: "Bonds", value: riskProfile.bonds },
      { name: "Cash", value: riskProfile.cash }
    ]);
  };
  
  const generateIncomeSourcesData = (savings: number, pension: number, disability: number) => {
    setIncomeSourcesData([
      { name: "Investments", value: Math.round(savings) },
      { name: "Pension", value: Math.round(pension) },
      { name: "Disability", value: Math.round(disability) }
    ]);
  };
  
  useEffect(() => {
    calculateRetirement();
  }, []);
  
  const COLORS = ['#4CAF50', '#9E9E9E', '#FFEB3B', '#FF9800'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <Calculator className="mr-2" /> Retirement & Investment Simulator
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="bg-offwhite p-4 rounded-lg mb-6">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="mr-2 h-5 w-5" /> Retirement Goals
            </h4>
            <FormField
              control={form.control}
              name="retirementGoal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select your retirement goal:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="maintainLifestyle" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Retire as soon as possible with the same living standards
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="growWealth" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Invest and grow your retirement account to live at a higher standard
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="current-age" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Your Current Age
              </Label>
              <Input 
                id="current-age" 
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="retirement-age" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Desired Retirement Age
              </Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="retirement-age" 
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(parseInt(e.target.value) || 65)}
                />
                <span className="text-sm text-muted-foreground">
                  ({retirementResults.yearsToRetirement} years away)
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="monthly-expenses" className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" /> Monthly Expenses in Retirement
              </Label>
              <Input 
                id="monthly-expenses"
                type="number"
                value={monthlyExpensesInRetirement}
                onChange={(e) => setMonthlyExpensesInRetirement(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="monthly-contribution" className="flex items-center">
                <PiggyBank className="mr-2 h-4 w-4" /> Monthly Investment Contribution
              </Label>
              <Input 
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>
            
            {pensionAmount > 0 && (
              <div>
                <FormField
                  control={form.control}
                  name="currentlyReceivingPension"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Currently receiving military pension (${pensionAmount}/month)
                        </FormLabel>
                        <FormDescription>
                          Check if you are already receiving your military pension
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {disabilityAmount > 0 && (
              <div>
                <FormField
                  control={form.control}
                  name="currentlyReceivingDisability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Currently receiving disability compensation (${disabilityAmount}/month)
                        </FormLabel>
                        <FormDescription>
                          Check if you are already receiving your VA disability benefits
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <div className="md:col-span-2">
              <Label className="flex items-center mb-2">
                <TrendingUp className="mr-2 h-4 w-4" /> Investment Risk Tolerance
              </Label>
              <div className="flex flex-col space-y-2">
                <Slider
                  value={[riskTolerance]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => setRiskTolerance(values[0])}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
                <div className="text-center text-sm">
                  Expected Annual Return: {getRiskProfile().expectedReturn}%
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="marketPerformance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Performance Scenario</FormLabel>
                    <FormDescription>
                      Select a market performance scenario for your simulation
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="strong" />
                          </FormControl>
                          <FormLabel className="font-normal">Strong</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="average" />
                          </FormControl>
                          <FormLabel className="font-normal">Average</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="below" />
                          </FormControl>
                          <FormLabel className="font-normal">Below Average</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full"
          >
            Recalculate Retirement Plan
          </Button>
        </form>
      </Form>
      
      <div className="mt-8">
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
                <p>Total Needed: <span className="font-bold">${retirementResults.totalNeeded.toLocaleString()}</span></p>
                <p>Projected Savings: <span className="font-bold">${retirementResults.currentSavingsAtRetirement.toLocaleString()}</span></p>
                <p>Pension Value: <span className="font-bold">${retirementResults.pensionValue.toLocaleString()}</span></p>
                <p>Disability Value: <span className="font-bold">${retirementResults.disabilityValue.toLocaleString()}</span></p>
              </div>
              
              <div className="bg-offwhite p-4 rounded-lg">
                <h4 className="font-semibold text-lg">Gap Analysis</h4>
                <p className="text-muted-foreground mb-2">Planning for the future</p>
                {retirementResults.shortfall > 0 ? (
                  <>
                    <p>Projected Shortfall: <span className="font-bold text-red-600">${retirementResults.shortfall.toLocaleString()}</span></p>
                    <p>Required Monthly Savings: <span className="font-bold text-red-600">${Math.round(retirementResults.requiredMonthlySavings).toLocaleString()}</span></p>
                  </>
                ) : (
                  <p>Projected Surplus: <span className="font-bold text-green-600">${Math.abs(retirementResults.shortfall).toLocaleString()}</span></p>
                )}
                <p>Current Monthly Contribution: <span className="font-bold">${parseFloat(monthlyContribution).toLocaleString()}</span></p>
                
                {retirementGoal === "maintainLifestyle" && (
                  <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
                    <p className="font-semibold">Earliest Possible Retirement: <span className="text-green-600">Age {retirementResults.earliestRetirementAge}</span></p>
                  </div>
                )}
                
                <div className="mt-4">
                  <h5 className="font-semibold">Success Probability</h5>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className={`h-4 rounded-full ${
                        retirementResults.successProbability > 80 ? 'bg-green-500' : 
                        retirementResults.successProbability > 60 ? 'bg-green-400' :
                        retirementResults.successProbability > 40 ? 'bg-yellow-400' : 'bg-red-500'
                      }`}
                      style={{ width: `${retirementResults.successProbability}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-center">{Math.round(retirementResults.successProbability)}% likelihood of meeting retirement goals</p>
                </div>
              </div>
              
              <div className="bg-offwhite p-4 rounded-lg">
                <h4 className="font-semibold text-lg">Recommendations</h4>
                <ul className="list-disc list-inside text-sm">
                  {retirementResults.shortfall > 0 && (
                    <li className="text-red-600">Increase your monthly contribution to ${Math.round(retirementResults.requiredMonthlySavings).toLocaleString()} to meet your goal</li>
                  )}
                  {retirementResults.shortfall <= 0 && (
                    <li className="text-green-600">You're on track to meet your retirement goals!</li>
                  )}
                  {parseFloat(monthlyContribution) < (currentIncome * 0.15) && (
                    <li>Consider saving at least 15% of your income for retirement</li>
                  )}
                  {retirementGoal === "maintainLifestyle" && retirementResults.earliestRetirementAge < retirementAge && (
                    <li className="text-green-600">You could potentially retire {retirementAge - retirementResults.earliestRetirementAge} years earlier than planned</li>
                  )}
                  {currentlyReceivingPension && currentlyReceivingDisability && (
                    <li className="text-green-600">Your pension and disability benefits provide a strong foundation for retirement</li>
                  )}
                  <li>Regularly review and adjust your investment strategy</li>
                  <li>Consider meeting with a financial advisor who specializes in veteran benefits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="projection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projection">Retirement Projection</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="sources">Income Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projection">
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
          </TabsContent>
          
          <TabsContent value="allocation">
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
                      <li>Treasury bonds for safe, tax-advantaged income</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Retirement Income Sources</CardTitle>
                <CardDescription>Projected value of different income sources at retirement</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex flex-col md:flex-row items-center justify-center">
                  <div className="w-full md:w-1/2 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={incomeSourcesData}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 70,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="value" name="Value" fill="#4CAF50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 p-4">
                    <h4 className="font-semibold mb-2">Income Source Details</h4>
                    <ul className="list-none space-y-2">
                      <li>
                        <span className="font-semibold">Investments:</span> Your personal retirement savings and investments, projected to grow to ${retirementResults.currentSavingsAtRetirement.toLocaleString()} by retirement.
                      </li>
                      <li>
                        <span className="font-semibold">Pension:</span> Your military pension has a projected value of ${retirementResults.pensionValue.toLocaleString()} over your retirement.
                      </li>
                      <li>
                        <span className="font-semibold">Disability:</span> Your VA disability benefits have a projected value of ${retirementResults.disabilityValue.toLocaleString()} over your retirement.
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RetirementSimulator;
