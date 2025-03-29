
import React from "react";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import BenefitsCalculator from "@/components/BenefitsCalculator";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Calculate Your Benefits</h2>
            <p className="text-lg text-muted-foreground">
              Find out what benefits you qualify for based on your service history.
            </p>
          </div>
          <BenefitsCalculator />
        </div>
      </section>
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
