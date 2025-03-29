
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { toast } = useToast();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    branch: "",
    yearsOfService: "",
    rank: "",
    disabilityRating: "",
    zipCode: "",
  });
  
  // Benefits state (would be fetched from an API in a real app)
  const [benefits, setBenefits] = useState([
    { id: 1, name: "GI Bill Education Benefits", status: "Eligible", application: "Not Started" },
    { id: 2, name: "VA Home Loan", status: "Eligible", application: "Not Started" },
    { id: 3, name: "Healthcare Benefits", status: "Eligible", application: "Not Started" },
    { id: 4, name: "Disability Compensation", status: "Needs Review", application: "Not Started" },
  ]);
  
  // Financials state
  const [financials, setFinancials] = useState({
    monthlyIncome: "",
    monthlyExpenses: "",
    savingsGoal: "",
    currentSavings: "",
  });
  
  // Documents state
  const [documents, setDocuments] = useState([
    { id: 1, name: "DD-214", status: "Not Uploaded" },
    { id: 2, name: "VA Disability Decision Letter", status: "Not Uploaded" },
    { id: 3, name: "Military Service Records", status: "Not Uploaded" },
    { id: 4, name: "VA Healthcare Enrollment", status: "Not Uploaded" },
  ]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };
  
  const handleFinancialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancials({
      ...financials,
      [name]: value,
    });
  };
  
  const saveProfile = () => {
    // Validate profile data
    if (!userProfile.name || !userProfile.email || !userProfile.branch) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to a database
    setIsProfileComplete(true);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully saved.",
    });
  };
  
  const saveFinancials = () => {
    // Validate financial data
    if (!financials.monthlyIncome || !financials.monthlyExpenses) {
      toast({
        title: "Missing Information",
        description: "Please fill out at least your monthly income and expenses.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to a database
    toast({
      title: "Financial Data Updated",
      description: "Your financial information has been successfully saved.",
    });
  };
  
  const startApplication = (benefitId: number) => {
    // Update the application status
    const updatedBenefits = benefits.map(benefit => 
      benefit.id === benefitId 
        ? { ...benefit, application: "In Progress" }
        : benefit
    );
    
    setBenefits(updatedBenefits);
    
    toast({
      title: "Application Started",
      description: "Your application has been initiated. Continue in the Applications tab.",
    });
  };
  
  const uploadDocument = (documentId: number) => {
    // In a real app, this would trigger a file upload dialog
    // For now, we'll just update the status
    const updatedDocuments = documents.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: "Pending Review" }
        : doc
    );
    
    setDocuments(updatedDocuments);
    
    toast({
      title: "Document Uploaded",
      description: "Your document has been uploaded and is pending review.",
    });
  };

  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Your Veterans Benefits Dashboard</h1>
            <p className="text-xl opacity-90">
              Track your benefits, applications, and financial planning all in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="benefits">My Benefits</TabsTrigger>
              <TabsTrigger value="finances">Financial Plan</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Update your personal information to get the most accurate benefits assessment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={userProfile.name}
                        onChange={handleProfileChange}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={userProfile.email}
                        onChange={handleProfileChange}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="branch">Branch of Service</Label>
                      <Select 
                        value={userProfile.branch} 
                        onValueChange={(value) => handleSelectChange("branch", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="army">Army</SelectItem>
                          <SelectItem value="navy">Navy</SelectItem>
                          <SelectItem value="air-force">Air Force</SelectItem>
                          <SelectItem value="marines">Marines</SelectItem>
                          <SelectItem value="coast-guard">Coast Guard</SelectItem>
                          <SelectItem value="space-force">Space Force</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="yearsOfService">Years of Service</Label>
                      <Input 
                        id="yearsOfService" 
                        name="yearsOfService"
                        type="number"
                        value={userProfile.yearsOfService}
                        onChange={handleProfileChange}
                        placeholder="e.g., 4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rank">Highest Rank Achieved</Label>
                      <Select 
                        value={userProfile.rank} 
                        onValueChange={(value) => handleSelectChange("rank", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="e1">E-1</SelectItem>
                          <SelectItem value="e2">E-2</SelectItem>
                          <SelectItem value="e3">E-3</SelectItem>
                          <SelectItem value="e4">E-4</SelectItem>
                          <SelectItem value="e5">E-5</SelectItem>
                          <SelectItem value="e6">E-6</SelectItem>
                          <SelectItem value="e7">E-7</SelectItem>
                          <SelectItem value="e8">E-8</SelectItem>
                          <SelectItem value="e9">E-9</SelectItem>
                          <SelectItem value="o1">O-1</SelectItem>
                          <SelectItem value="o2">O-2</SelectItem>
                          <SelectItem value="o3">O-3</SelectItem>
                          <SelectItem value="o4">O-4</SelectItem>
                          <SelectItem value="o5">O-5</SelectItem>
                          <SelectItem value="o6">O-6</SelectItem>
                          <SelectItem value="o7">O-7</SelectItem>
                          <SelectItem value="o8">O-8</SelectItem>
                          <SelectItem value="o9">O-9</SelectItem>
                          <SelectItem value="o10">O-10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="disabilityRating">VA Disability Rating (%)</Label>
                      <Input 
                        id="disabilityRating" 
                        name="disabilityRating"
                        type="number"
                        min="0"
                        max="100"
                        value={userProfile.disabilityRating}
                        onChange={handleProfileChange}
                        placeholder="e.g., 30"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode"
                        value={userProfile.zipCode}
                        onChange={handleProfileChange}
                        placeholder="e.g., 12345"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={saveProfile}>Save Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits">
              <Card>
                <CardHeader>
                  <CardTitle>Your Benefits</CardTitle>
                  <CardDescription>
                    {isProfileComplete 
                      ? "Based on your profile, here are the benefits you may be eligible for." 
                      : "Complete your profile to see which benefits you're eligible for."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isProfileComplete ? (
                    <div className="text-center py-8">
                      <p className="mb-4">Please complete your profile to see personalized benefits information.</p>
                      <Button variant="outline" onClick={() => document.getElementById("profile-tab")?.click()}>
                        Go to Profile
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {benefits.map((benefit) => (
                        <Card key={benefit.id} className="border-2 border-muted">
                          <div className="p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{benefit.name}</h3>
                              <div className="flex gap-4 mt-2">
                                <span className={`text-sm px-2 py-1 rounded-full ${
                                  benefit.status === "Eligible" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {benefit.status}
                                </span>
                                <span className={`text-sm px-2 py-1 rounded-full ${
                                  benefit.application === "Not Started" 
                                    ? "bg-gray-100 text-gray-800" 
                                    : benefit.application === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}>
                                  {benefit.application}
                                </span>
                              </div>
                            </div>
                            <div>
                              {benefit.application === "Not Started" ? (
                                <Button variant="outline" onClick={() => startApplication(benefit.id)}>
                                  Start Application
                                </Button>
                              ) : (
                                <Button variant="outline">
                                  Continue Application
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="finances">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Planning</CardTitle>
                  <CardDescription>Track your financial goals and progress.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                      <Input 
                        id="monthlyIncome" 
                        name="monthlyIncome"
                        type="number"
                        value={financials.monthlyIncome}
                        onChange={handleFinancialsChange}
                        placeholder="e.g., 4000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                      <Input 
                        id="monthlyExpenses" 
                        name="monthlyExpenses"
                        type="number"
                        value={financials.monthlyExpenses}
                        onChange={handleFinancialsChange}
                        placeholder="e.g., 3000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="savingsGoal">Savings Goal ($)</Label>
                      <Input 
                        id="savingsGoal" 
                        name="savingsGoal"
                        type="number"
                        value={financials.savingsGoal}
                        onChange={handleFinancialsChange}
                        placeholder="e.g., 50000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currentSavings">Current Savings ($)</Label>
                      <Input 
                        id="currentSavings" 
                        name="currentSavings"
                        type="number"
                        value={financials.currentSavings}
                        onChange={handleFinancialsChange}
                        placeholder="e.g., 10000"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mb-8">
                    <Button onClick={saveFinancials}>Save Financial Information</Button>
                  </div>
                  
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold mb-4">Financial Recommendations</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="mb-2">Based on the information you've provided, here are some recommendations:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Consider contributing to the Thrift Savings Plan (TSP) for tax-advantaged retirement savings</li>
                        <li>Look into VA loan options if you're planning to purchase a home</li>
                        <li>Ensure you have an emergency fund covering 3-6 months of expenses</li>
                        <li>Review your disability rating to ensure you're receiving all entitled benefits</li>
                        <li>Consider meeting with a VA financial counselor for personalized advice</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Center</CardTitle>
                  <CardDescription>Upload and manage important documents for your benefits applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="border-2 border-muted">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{doc.name}</h3>
                            <span className={`text-sm px-2 py-1 rounded-full mt-2 inline-block ${
                              doc.status === "Not Uploaded" 
                                ? "bg-gray-100 text-gray-800" 
                                : doc.status === "Pending Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                          <div>
                            {doc.status === "Not Uploaded" ? (
                              <Button variant="outline" onClick={() => uploadDocument(doc.id)}>
                                Upload Document
                              </Button>
                            ) : (
                              <Button variant="outline" disabled={doc.status === "Approved"}>
                                {doc.status === "Approved" ? "Approved" : "View Document"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8 bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Why Documents Matter</h3>
                    <p className="mb-4">Having your military and VA documents organized and readily available can speed up the benefits application process.</p>
                    <p>Some important documents to keep on file include:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>DD-214 (Certificate of Release or Discharge from Active Duty)</li>
                      <li>VA disability rating decision letters</li>
                      <li>Military service records</li>
                      <li>Medical records</li>
                      <li>VA healthcare enrollment information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
