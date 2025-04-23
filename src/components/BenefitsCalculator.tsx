import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const rankOptions = [
  "E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9",
  "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10",
  "W-1", "W-2", "W-3", "W-4", "W-5"
];

const locationOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia"
];

interface Dependent {
  type: 'spouse' | 'child' | 'parent';
  id: string;
}

interface BenefitResult {
  name: string;
  description: string;
  eligibility: string;
  link: string;
}

const BenefitsCalculator = () => {
  const [yearsOfService, setYearsOfService] = useState("");
  const [rank, setRank] = useState("");
  const [location, setLocation] = useState("");
  const [disabilityRating, setDisabilityRating] = useState("");
  const [results, setResults] = useState<BenefitResult[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [dependents, setDependents] = useState<Dependent[]>([]);

  const addDependent = (type: 'spouse' | 'child' | 'parent') => {
    setDependents([...dependents, { type, id: Math.random().toString() }]);
  };

  const removeDependent = (id: string) => {
    setDependents(dependents.filter(dep => dep.id !== id));
  };

  const calculateDisabilityCompensation = (rating: number): string => {
    if (rating <= 0) return "0";
    if (rating <= 10) return "152.64";
    if (rating <= 20) return "301.74";
    if (rating <= 30) return "467.39";
    if (rating <= 40) return "673.28";
    if (rating <= 50) return "958.44";
    if (rating <= 60) return "1,214.03";
    if (rating <= 70) return "1,529.95";
    if (rating <= 80) return "1,778.43";
    if (rating <= 90) return "1,998.52";
    return "3,332.06"; // 100%
  };

  const calculateDependentCompensation = (baseAmount: number, rating: number): string => {
    if (rating < 30) return baseAmount.toFixed(2); // No additional compensation below 30%
    
    let additional = 0;
    const spouseCount = dependents.filter(d => d.type === 'spouse').length;
    const childCount = dependents.filter(d => d.type === 'child').length;
    const parentCount = dependents.filter(d => d.type === 'parent').length;
    
    if (rating >= 30) {
      if (spouseCount > 0) additional += 150;
      additional += childCount * 100;
      additional += parentCount * 120;
    }
    
    return (baseAmount + additional).toFixed(2);
  };

  const handleCalculate = () => {
    const sampleBenefits: BenefitResult[] = [
      {
        name: "GI Bill Education Benefits",
        description: "Covers tuition, housing, and books for higher education.",
        eligibility: `Based on ${yearsOfService} years of service, you are eligible for ${parseInt(yearsOfService) >= 3 ? '100%' : parseInt(yearsOfService) * 30 + '%'} of benefits.`,
        link: "https://www.va.gov/education/about-gi-bill-benefits/"
      },
      {
        name: "VA Home Loan",
        description: "Helps veterans purchase homes with no down payment and competitive interest rates.",
        eligibility: "Eligible with honorable service. No down payment required.",
        link: "https://www.va.gov/housing-assistance/home-loans/"
      },
      {
        name: "VA Disability Compensation",
        description: "Monthly tax-free payment for veterans with service-connected disabilities.",
        eligibility: `With a ${disabilityRating}% disability rating, you qualify for approximately $${calculateDependentCompensation(parseFloat(calculateDisabilityCompensation(parseInt(disabilityRating))), parseInt(disabilityRating))}/month including dependent benefits.`,
        link: "https://www.va.gov/disability/"
      },
      {
        name: `${location} State Veterans Benefits`,
        description: `Special state benefits for veterans living in ${location}.`,
        eligibility: "Varies by program. See state VA office for details.",
        link: `https://${location.toLowerCase().replace(/\s/g, '')}.gov/veterans` 
      }
    ];
    
    setResults(sampleBenefits);
    setHasCalculated(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Benefits Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="years-of-service">Years of Service</Label>
          <Input 
            id="years-of-service" 
            type="number" 
            placeholder="e.g., 4"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="rank">Highest Rank Achieved</Label>
          <Select value={rank} onValueChange={setRank}>
            <SelectTrigger>
              <SelectValue placeholder="Select rank" />
            </SelectTrigger>
            <SelectContent>
              {rankOptions.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="location">Current Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="disability-rating">VA Disability Rating (%)</Label>
          <Input 
            id="disability-rating" 
            type="number"
            placeholder="e.g., 30"
            min="0"
            max="100"
            value={disabilityRating}
            onChange={(e) => setDisabilityRating(e.target.value)}
          />
        </div>
      </div>
      
      <div className="md:col-span-2">
        <Label>Dependents</Label>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {dependents.map((dependent) => (
              <Card key={dependent.id} className="w-full sm:w-auto">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm capitalize">{dependent.type}</CardTitle>
                </CardHeader>
                <CardFooter className="py-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeDependent(dependent.id)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => addDependent('spouse')}
              disabled={dependents.filter(d => d.type === 'spouse').length >= 1}
            >
              Add Spouse
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addDependent('child')}
            >
              Add Child
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addDependent('parent')}
            >
              Add Parent
            </Button>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleCalculate} 
        className="w-full"
        disabled={!yearsOfService || !rank || !location || !disabilityRating}
      >
        Calculate My Benefits
      </Button>
      
      {hasCalculated && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Your Eligible Benefits</h4>
          <div className="space-y-4">
            {results.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-navy">{benefit.name}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Eligibility:</strong> {benefit.eligibility}</p>
                </CardContent>
                <CardFooter>
                  <a 
                    href={benefit.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Learn more →
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitsCalculator;
