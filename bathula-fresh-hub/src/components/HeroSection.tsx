import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-meat.jpg";

export const HeroSection = () => {
  const handleCall = () => {
    window.open("tel:+919014105470", "_self");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919014105470?text=Hi, I'd like to place an order for chicken/mutton", "_blank");
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto text-center max-w-4xl">
        <div className="mb-6">
          <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-6xl sm:text-7xl">🐔</span>
            <span className="text-6xl sm:text-7xl">🐓</span>
            <span className="text-6xl sm:text-7xl">🐐</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-4 text-foreground">
            <span className="text-primary">Bathula Brothers</span>
            <br />
            <span className="text-accent">Chicken & Mutton Center</span>
          </h1>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-foreground max-w-3xl mx-auto leading-relaxed">
          Fresh Chicken & Mutton Delivered to Your Doorstep
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button
            onClick={handleCall}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-button text-lg font-bold py-4 px-8"
          >
            <Phone className="w-6 h-6 mr-3" />
            📞 Call Now
          </Button>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto bg-success hover:bg-success/90 text-success-foreground text-lg font-bold py-4 px-8"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            💬 WhatsApp Order
          </Button>
        </div>
      </div>
    </section>
  );
};