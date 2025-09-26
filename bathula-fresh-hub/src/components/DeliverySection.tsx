import { Truck, Clock, MapPin, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const DeliverySection = () => {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4 text-card-foreground">
            <span className="text-accent">Free Delivery</span> within 3 KM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide fast and reliable delivery service to ensure your fresh meat reaches you in perfect condition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">No charges within 3 KM radius</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Quick Service</h3>
              <p className="text-sm text-muted-foreground">Delivery within 30-45 minutes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Coverage Area</h3>
              <p className="text-sm text-muted-foreground">Boduppal & surrounding areas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Safe Packaging</h3>
              <p className="text-sm text-muted-foreground">Hygienic & temperature controlled</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full font-semibold text-lg">
            <MapPin className="w-5 h-5" />
            Free Delivery within 3 KM of Boduppal, Hyderabad
          </div>
        </div>
      </div>
    </section>
  );
};