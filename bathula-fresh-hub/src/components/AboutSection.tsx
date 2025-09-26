import { CheckCircle, Clock, MapPin } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-8 text-card-foreground">
          Why Choose <span className="text-primary">Bathula Brothers</span>?
        </h2>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          We provide farm-fresh chicken and mutton with the highest quality standards. 
          Free delivery within 3 KM of Boduppal, Hyderabad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-card-foreground">
              Farm Fresh
            </h3>
            <p className="text-muted-foreground">
              Premium quality chicken and mutton sourced directly from trusted farms
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-card-foreground">
              Quick Delivery
            </h3>
            <p className="text-muted-foreground">
              Fast and reliable delivery service within 3 KM radius
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-card-foreground">
              Free Delivery
            </h3>
            <p className="text-muted-foreground">
              No delivery charges within 3 KM of Boduppal area
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};