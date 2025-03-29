
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    quote: "This platform helped me discover VA benefits I didn't even know I was eligible for. The financial planning tools were exactly what I needed for my transition to civilian life.",
    name: "James R.",
    role: "Army Veteran, 12 Years of Service"
  },
  {
    quote: "After using the benefits calculator, I realized I was leaving money on the table. Now I'm taking full advantage of my education benefits to get my degree.",
    name: "Sarah L.",
    role: "Air Force Veteran, 8 Years of Service"
  },
  {
    quote: "The retirement planning tools helped me understand exactly what I needed to save each month. I feel much more confident about my financial future now.",
    name: "Michael T.",
    role: "Navy Veteran, 20 Years of Service"
  }
];

const TestimonialSection = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="mb-4">What Veterans Are Saying</h2>
          <p className="text-lg text-muted-foreground">
            Hear from veterans who have used our platform to transform their financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-offwhite border-none">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl text-gold">"</div>
                <p className="italic mb-4">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
