
import React from "react";
import BenefitsCalculator from "@/components/BenefitsCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

const benefitCategories = [
  {
    id: "education",
    title: "Education & Training",
    description: "Benefits to help you pursue your education goals",
    benefits: [
      {
        name: "Post-9/11 GI Bill",
        description: "Helps pay for school or job training for veterans who served after September 10, 2001.",
        eligibility: "At least 90 days of aggregate service after 9/10/01, or at least 30 days if discharged for a service-connected disability."
      },
      {
        name: "Montgomery GI Bill (MGIB)",
        description: "Provides education benefits to veterans and servicemembers who have served on active duty.",
        eligibility: "Active duty service with honorable discharge and enrollment in the program."
      },
      {
        name: "Veteran Readiness and Employment (VR&E)",
        description: "Helps veterans with service-connected disabilities prepare for and find suitable employment.",
        eligibility: "Veterans with service-connected disabilities rated at least 10%."
      },
      {
        name: "Yellow Ribbon Program",
        description: "Helps pay for out-of-state, private school, or graduate school tuition that the Post-9/11 GI Bill doesn't cover.",
        eligibility: "Eligible for Post-9/11 GI Bill at the 100% benefit level."
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Medical benefits for veterans and their families",
    benefits: [
      {
        name: "VA Health Care",
        description: "Comprehensive healthcare services for eligible veterans.",
        eligibility: "Most veterans who served in active military service are eligible for VA health care benefits."
      },
      {
        name: "CHAMPVA",
        description: "Health care for families of veterans with 100% service-connected disabilities.",
        eligibility: "Spouses and children of veterans with permanent, total service-connected disabilities."
      },
      {
        name: "Veterans Dental Care",
        description: "Dental care services for eligible veterans.",
        eligibility: "Veterans with service-connected dental conditions, former POWs, and others based on specific criteria."
      },
      {
        name: "Mental Health Services",
        description: "Specialized mental health services for veterans.",
        eligibility: "Veterans enrolled in VA health care are eligible for mental health services."
      }
    ]
  },
  {
    id: "housing",
    title: "Housing & Home Loans",
    description: "Benefits to help with housing needs",
    benefits: [
      {
        name: "VA Home Loan",
        description: "Helps veterans buy, build, or refinance a home with favorable terms.",
        eligibility: "Veterans, active duty service members, and some surviving spouses with qualifying service."
      },
      {
        name: "Adapted Housing Grants",
        description: "Financial assistance for veterans with certain service-connected disabilities to adapt or acquire housing.",
        eligibility: "Veterans with specific service-connected disabilities that affect mobility."
      },
      {
        name: "Native American Direct Loan (NADL)",
        description: "Helps Native American veterans finance homes on Federal Trust Land.",
        eligibility: "Native American veterans or veterans married to Native Americans."
      },
      {
        name: "Housing Assistance for Homeless Veterans",
        description: "Programs to help homeless veterans find and maintain housing.",
        eligibility: "Veterans who are homeless or at risk of homelessness."
      }
    ]
  },
  {
    id: "disability",
    title: "Disability",
    description: "Compensation and support for service-connected disabilities",
    benefits: [
      {
        name: "Disability Compensation",
        description: "Monthly tax-free payment for veterans disabled during service.",
        eligibility: "Veterans with disabilities that resulted from diseases or injuries during military service."
      },
      {
        name: "Aid & Attendance",
        description: "Increased monthly pension for veterans who need help with daily activities.",
        eligibility: "Veterans receiving VA pension who require the aid of another person."
      },
      {
        name: "Automobile Allowance",
        description: "One-time payment to help purchase a vehicle for veterans with certain disabilities.",
        eligibility: "Veterans with qualifying service-connected disabilities such as loss of limbs."
      },
      {
        name: "Clothing Allowance",
        description: "Annual payment for veterans whose clothing is damaged by prosthetics or medications.",
        eligibility: "Veterans who use prosthetics or orthopedic devices for service-connected disabilities."
      }
    ]
  }
];

const Benefits = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Veterans Benefits Guide</h1>
            <p className="text-xl opacity-90">
              Comprehensive information about all the benefits you've earned through your military service.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Calculate Your Eligibility</h2>
            <p className="text-lg text-muted-foreground">
              Use our calculator to determine which benefits you qualify for based on your service.
            </p>
          </div>
          <BenefitsCalculator />
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Explore Benefits by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find detailed information about various veteran benefits programs.
            </p>
          </div>
          
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {benefitCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {benefitCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.benefits.map((benefit, index) => (
                        <Card key={index} className="border-2 border-muted">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{benefit.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-2">{benefit.description}</p>
                            <p className="text-sm">
                              <strong>Eligibility:</strong> {benefit.eligibility}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Need Help Applying?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The application process can be complex. Here are resources to help you navigate it successfully.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">VA Regional Offices</h3>
                <p className="mb-3">Visit a local VA office for in-person assistance with your benefits application.</p>
                <a href="https://www.va.gov/find-locations/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Find a Location
                </a>
              </Card>
              
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">Veterans Service Organizations</h3>
                <p className="mb-3">Get free help from trained professionals who can guide you through the process.</p>
                <a href="https://www.va.gov/vso/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Find a VSO
                </a>
              </Card>
              
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">Online Application Guides</h3>
                <p className="mb-3">Step-by-step instructions for applying for various VA benefits online.</p>
                <a href="https://www.va.gov/claim-or-appeal-status/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Application Guides
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Benefits;
