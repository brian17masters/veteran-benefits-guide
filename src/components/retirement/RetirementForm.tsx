
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar, DollarSign, Percent, Target, TrendingUp } from "lucide-react";
import { MarketPerformance, RetirementGoal } from "@/utils/retirementUtils";
import { calculateContributionAmount } from "@/utils/financialCalculations";

export interface RetirementFormValues {
  retirementGoal: RetirementGoal;
  currentlyReceivingPension: boolean;
  currentlyReceivingDisability: boolean;
  marketPerformance: MarketPerformance;
}

interface RetirementFormProps {
  currentIncome: number;
  pensionAmount: number;
  disabilityAmount: number;
  retirementAge: number;
  setRetirementAge: (age: number) => void;
  monthlyExpensesInRetirement: string;
  setMonthlyExpensesInRetirement: (expenses: string) => void;
  currentAge: string;
  setCurrentAge: (age: string) => void;
  contributionPercentage: string;
  setContributionPercentage: (percentage: string) => void;
  riskTolerance: number;
  setRiskTolerance: (tolerance: number) => void;
  yearsToRetirement: number;
  onSubmit: (values: RetirementFormValues) => void;
  defaultValues: RetirementFormValues;
}

const RetirementForm: React.FC<RetirementFormProps> = ({
  currentIncome,
  pensionAmount,
  disabilityAmount,
  retirementAge,
  setRetirementAge,
  monthlyExpensesInRetirement,
  setMonthlyExpensesInRetirement,
  currentAge,
  setCurrentAge,
  contributionPercentage,
  setContributionPercentage,
  riskTolerance,
  setRiskTolerance,
  yearsToRetirement,
  onSubmit,
  defaultValues
}) => {
  const form = useForm<RetirementFormValues>({
    defaultValues
  });

  // Calculate the dollar amount from percentage
  const contributionAmount = calculateContributionAmount(
    currentIncome, 
    parseFloat(contributionPercentage) || 0
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                ({yearsToRetirement} years away)
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
            <Label htmlFor="contribution-percentage" className="flex items-center">
              <Percent className="mr-2 h-4 w-4" /> Monthly Investment Contribution
            </Label>
            <div className="flex items-center gap-4">
              <Input 
                id="contribution-percentage"
                type="number"
                value={contributionPercentage}
                onChange={(e) => setContributionPercentage(e.target.value)}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                (${contributionAmount.toFixed(0)}/month)
              </span>
            </div>
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
                Expected Annual Return: {riskTolerance < 33 ? 5 : riskTolerance < 66 ? 7 : 9}%
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
  );
};

export default RetirementForm;
