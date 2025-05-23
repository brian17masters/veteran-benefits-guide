
import React from "react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="text-white py-16" 
             style={{
               backgroundImage: "linear-gradient(to bottom, rgba(44, 110, 73, 0.9), rgba(44, 110, 73, 0.95)), url('/veterans-support.jpg')",
               backgroundSize: "cover",
               backgroundPosition: "center"
             }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Ready to Maximize Your Veterans Benefits?</h2>
          <p className="text-lg opacity-90 mb-8">
            Create your personalized benefits plan today and take the first step toward a secure financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-grey text-forestGreen hover:bg-grey/90">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
