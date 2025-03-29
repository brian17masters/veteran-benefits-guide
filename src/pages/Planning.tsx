
import React from "react";
import FinancialPlanner from "@/components/FinancialPlanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";

const Planning = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Financial Planning for Veterans</h1>
            <p className="text-xl opacity-90">
              Tools and resources to help you plan for a secure financial future after your service.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Your Financial Planning Tool</h2>
            <p className="text-lg text-muted-foreground">
              Create a personalized financial plan based on your unique situation.
            </p>
          </div>
          <FinancialPlanner />
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Financial Resources for Veterans</h2>
            <p className="text-lg text-muted-foreground">
              Explore different aspects of financial planning tailored for veterans.
            </p>
          </div>
          
          <Tabs defaultValue="retirement" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
              <TabsTrigger value="investing">Investing</TabsTrigger>
              <TabsTrigger value="debt">Debt Management</TabsTrigger>
              <TabsTrigger value="housing">Housing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="retirement">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Planning for Veterans</CardTitle>
                  <CardDescription>Strategies to ensure a comfortable retirement</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Military Pension Considerations</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Your military pension is a valuable asset for retirement planning. Here are key points to consider:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Military pensions provide steady, inflation-adjusted income for life</li>
                          <li>The amount is based on years of service and final base pay or high-3 average</li>
                          <li>Consider the tax implications of your pension in different states</li>
                          <li>If you chose the Blended Retirement System (BRS), remember to maximize your TSP contributions</li>
                          <li>Understand the Survivor Benefit Plan (SBP) and its implications for your spouse</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Thrift Savings Plan (TSP) Strategies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">The TSP is a powerful retirement savings vehicle for military members and veterans:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Low expense ratios make TSP funds very cost-effective</li>
                          <li>Consider your asset allocation based on your retirement timeline</li>
                          <li>You can keep your TSP after leaving service or roll it over to an IRA</li>
                          <li>Traditional vs. Roth TSP: consider your current and future tax situations</li>
                          <li>You can take loans from your TSP account under certain conditions</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Social Security and Military Service</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Understanding how military service affects your Social Security benefits:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Military service earns you Social Security credits</li>
                          <li>Special earnings credits may be added to your record for military service</li>
                          <li>You can receive both military retirement and Social Security benefits</li>
                          <li>Consider optimal timing for claiming Social Security benefits</li>
                          <li>If you have a VA disability rating, explore how this interacts with Social Security Disability</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Retirement Income Planning</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Creating a comprehensive income strategy for retirement:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Calculate your total retirement income from all sources (pension, TSP, Social Security, VA benefits)</li>
                          <li>Consider a withdrawal strategy that maximizes tax efficiency</li>
                          <li>Plan for healthcare costs with TRICARE For Life and Medicare</li>
                          <li>Develop a strategy for required minimum distributions (RMDs) from retirement accounts</li>
                          <li>Consider part-time work or consulting to supplement retirement income if desired</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="investing">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Strategies for Veterans</CardTitle>
                  <CardDescription>Building wealth through smart investment choices</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>TSP Investment Options</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Understanding the TSP funds available to you:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li><strong>G Fund:</strong> Government securities with protection from loss</li>
                          <li><strong>F Fund:</strong> Fixed income index tracking bonds</li>
                          <li><strong>C Fund:</strong> Common stock index tracking S&P 500</li>
                          <li><strong>S Fund:</strong> Small/mid-cap stocks not in the S&P 500</li>
                          <li><strong>I Fund:</strong> International stock index</li>
                          <li><strong>Lifecycle Funds:</strong> Target date funds that adjust risk as you approach retirement</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Beyond TSP: Additional Investment Vehicles</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Expanding your investment portfolio beyond the TSP:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li><strong>IRAs:</strong> Traditional or Roth options for additional tax-advantaged savings</li>
                          <li><strong>Taxable Brokerage Accounts:</strong> Flexible investment accounts without contribution limits</li>
                          <li><strong>Real Estate:</strong> Using VA loans for investment properties</li>
                          <li><strong>529 Plans:</strong> For education savings if you plan to transfer GI Bill benefits</li>
                          <li><strong>HSAs:</strong> Health Savings Accounts if eligible through current employer</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Asset Allocation Strategies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Creating a balanced portfolio based on your goals:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Consider your military pension as a "bond-like" asset in your overall allocation</li>
                          <li>VA disability benefits can be viewed as an inflation-adjusted annuity</li>
                          <li>Match your investment risk to your time horizon and goals</li>
                          <li>Diversify across asset classes to reduce overall portfolio risk</li>
                          <li>Rebalance your portfolio periodically to maintain your target allocation</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Avoiding Investment Pitfalls</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Common investment mistakes to avoid:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Be wary of financial advisors specifically targeting military/veterans</li>
                          <li>Understand all fees before investing in any product</li>
                          <li>Avoid high-cost insurance products marketed as investments</li>
                          <li>Don't chase performance or try to time the market</li>
                          <li>Beware of affinity fraud targeting the military and veteran community</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="debt">
              <Card>
                <CardHeader>
                  <CardTitle>Debt Management for Veterans</CardTitle>
                  <CardDescription>Strategies to reduce debt and improve financial health</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Understanding the Servicemembers Civil Relief Act (SCRA)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">The SCRA provides important financial protections:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Interest rate caps of 6% on pre-service obligations during active duty</li>
                          <li>Protection from default judgments in civil cases</li>
                          <li>Protection from repossession without a court order</li>
                          <li>Some SCRA protections continue after active service ends</li>
                          <li>Know your rights when dealing with creditors</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Debt Prioritization Strategies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Effective approaches to paying down debt:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li><strong>Debt Avalanche:</strong> Pay highest interest debt first to minimize total interest</li>
                          <li><strong>Debt Snowball:</strong> Pay smallest balances first for psychological wins</li>
                          <li>Always make minimum payments on all debts</li>
                          <li>Consider balance transfer offers for high-interest credit card debt</li>
                          <li>Look into consolidation loans if you have good credit</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Student Loan Management</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Options for handling education debt:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Explore Public Service Loan Forgiveness if you work in public service</li>
                          <li>Disability discharge for veterans with 100% disability rating</li>
                          <li>Income-driven repayment plans can lower monthly payments</li>
                          <li>Military service may qualify for special deferment or forbearance options</li>
                          <li>Consider refinancing if you have good credit and stable income</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>VA Loan Considerations</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Managing mortgage debt with VA loans:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>VA loans offer competitive interest rates with no PMI</li>
                          <li>Consider refinancing with an Interest Rate Reduction Refinance Loan (IRRRL)</li>
                          <li>Understand VA loan entitlement for multiple properties</li>
                          <li>VA offers assistance if you're struggling with mortgage payments</li>
                          <li>Native American Direct Loans (NADL) for eligible Native American veterans</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="housing">
              <Card>
                <CardHeader>
                  <CardTitle>Housing Financial Strategies</CardTitle>
                  <CardDescription>Making the most of your VA home loan benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>VA Loan Benefits</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Understanding the advantages of VA home loans:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>No down payment required (in most cases)</li>
                          <li>No private mortgage insurance (PMI)</li>
                          <li>Competitive interest rates</li>
                          <li>Limited closing costs</li>
                          <li>No prepayment penalties</li>
                          <li>Assistance if you have trouble making payments</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>VA Loan Eligibility and Entitlement</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Understanding your VA loan entitlement:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Basic entitlement is $36,000</li>
                          <li>Bonus entitlement provides additional backing</li>
                          <li>You can use your entitlement multiple times</li>
                          <li>Entitlement can be restored after loan payoff or property sale</li>
                          <li>Calculate your maximum loan amount based on entitlement and county loan limits</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>VA Loan Investment Strategies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Using VA loans for wealth building:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Multi-unit properties: Buy up to a 4-unit building and live in one unit</li>
                          <li>House hacking: Rent out rooms in your primary residence</li>
                          <li>Buy, live, rent, repeat: Use your VA loan, live in the home for a period, then rent it out and buy another</li>
                          <li>VA loans can't be used for pure investment properties - you must intend to occupy</li>
                          <li>Using Interest Rate Reduction Refinance Loan (IRRRL) to lower payments on existing VA loans</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Special Housing Programs for Disabled Veterans</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Housing assistance for veterans with service-connected disabilities:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li><strong>Specially Adapted Housing (SAH) Grant:</strong> Up to $101,754 for severely disabled veterans</li>
                          <li><strong>Special Housing Adaptation (SHA) Grant:</strong> Up to $20,387 for home modifications</li>
                          <li><strong>Temporary Residence Adaptation (TRA) Grant:</strong> For temporarily living in a family member's home</li>
                          <li>VA funding for home modifications through the HISA grant</li>
                          <li>Property tax exemptions available in many states for disabled veterans</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Financial Education Resources</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Additional resources to help you navigate your financial journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">Free Financial Counseling</h3>
                <p className="mb-3">Get personalized financial advice from accredited counselors through Military OneSource.</p>
                <a href="https://www.militaryonesource.mil/financial-legal/personal-finance/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Card>
              
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">Veteran Entrepreneur Resources</h3>
                <p className="mb-3">Programs and funding sources for veterans looking to start or grow a business.</p>
                <a href="https://www.sba.gov/business-guide/grow-your-business/veteran-owned-businesses" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Explore Resources
                </a>
              </Card>
              
              <Card className="text-center p-6">
                <h3 className="text-lg font-semibold mb-3">Financial Calculators</h3>
                <p className="mb-3">Tools to help you calculate everything from loan payments to retirement savings.</p>
                <a href="https://www.investor.gov/financial-tools-calculators" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Use Calculators
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

export default Planning;
