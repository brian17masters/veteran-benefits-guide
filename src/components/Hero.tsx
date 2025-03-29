
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="animate-fade-up mb-4">
            Navigate Your Veterans Benefits with Confidence
          </h1>
          <p className="text-xl opacity-90 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Discover all the benefits you've earned, plan your financial future, and make the most of your service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="bg-gold text-navy hover:bg-gold/90">
              Calculate My Benefits
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
