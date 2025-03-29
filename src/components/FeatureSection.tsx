
import React from "react";
import { CalendarIcon, DollarSign, Settings, MapPin } from "lucide-react";

const features = [
  {
    title: "Benefit Calculator",
    description: "Discover all the benefits you're eligible for based on your service history, location, and other factors.",
    icon: CalendarIcon,
  },
  {
    title: "Financial Planning",
    description: "Build a comprehensive financial plan for post-service life including saving, investing, and retirement.",
    icon: DollarSign,
  },
  {
    title: "Personalized Dashboard",
    description: "Access your personalized dashboard to track your benefits, applications, and financial goals.",
    icon: Settings,
  },
  {
    title: "Location-Based Benefits",
    description: "Find local and state-specific benefits available in your area in addition to federal programs.",
    icon: MapPin,
  },
];

const FeatureSection = () => {
  return (
    <section className="section bg-offwhite">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="mb-4">Everything You Need in One Place</h2>
          <p className="text-lg text-muted-foreground">
            Our tools help you navigate the complex world of veteran benefits and financial planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
