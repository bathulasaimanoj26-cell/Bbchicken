import { Star } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Best quality chicken in the area! Always fresh and the delivery is super fast. Been ordering from Bathula Brothers for over a year now.",
      name: "Rajesh Kumar",
      title: "Boduppal • ⭐⭐⭐⭐⭐"
    },
    {
      quote: "The mutton is always tender and fresh. Great service and they deliver within 30 minutes. Highly recommend for quality meat!",
      name: "Priya Sharma",
      title: "Peerzadiguda • ⭐⭐⭐⭐⭐"
    },
    {
      quote: "Excellent chicken pieces, very clean and hygienic. The WhatsApp ordering is so convenient. Best meat shop in Boduppal!",
      name: "Mohammed Ali",
      title: "Boduppal • ⭐⭐⭐⭐⭐"
    },
    {
      quote: "Fresh mutton every time! The brothers are very honest about quality and pricing. Free delivery is a bonus. Very satisfied customer.",
      name: "Lakshmi Reddy",
      title: "Ghatkesar • ⭐⭐⭐⭐⭐"
    },
    {
      quote: "Been buying from them for 3 years. Consistent quality and service. The chicken is always fresh and properly cleaned. Trustworthy shop!",
      name: "Suresh Babu",
      title: "Boduppal • ⭐⭐⭐⭐⭐"
    },
    {
      quote: "Amazing quality mutton! Perfect cuts and very fresh. The delivery is always on time. Best meat shop in the locality without doubt!",
      name: "Kavitha Devi",
      title: "Keesara • ⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4 text-card-foreground">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our fresh meat and service.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <div className="relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-8"
          />
        </div>

        {/* Overall Rating Summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/10 text-primary px-8 py-4 rounded-full animate-fade-in hover:bg-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 text-accent fill-accent"
                />
              ))}
            </div>
            <div className="text-lg font-semibold">
              5.0/5 Rating from 150+ Happy Customers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};