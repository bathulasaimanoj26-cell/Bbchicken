import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ContactSection = () => {
  const handleCall = () => {
    window.open("tel:+919014105470", "_self");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919014105470?text=Hi, I'd like to know more about your chicken and mutton options", "_blank");
  };

  const handleDirections = () => {
    window.open("https://maps.google.com/?q=Boduppal,+Hyderabad", "_blank");
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-center mb-12 text-foreground">
          Get in <span className="text-primary">Touch</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">Phone Number</h3>
                    <p className="text-muted-foreground">Call us for instant orders</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-primary mb-4">+91 90141 05470</p>
                <Button
                  onClick={handleCall}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground">Quick & easy ordering</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-success mb-4">+91 90141 05470</p>
                <Button
                  onClick={handleWhatsApp}
                  variant="secondary"
                  className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Order
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">Address</h3>
                    <p className="text-muted-foreground">Visit our shop</p>
                  </div>
                </div>
                <p className="text-card-foreground mb-4 leading-relaxed">
                  Bathula Brothers Chicken & Mutton Center<br />
                  Main Road, Boduppal<br />
                  Hyderabad, Telangana - 500092
                </p>
                <Button
                  onClick={handleDirections}
                  variant="outline"
                  className="w-full font-semibold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">Working Hours</h3>
                    <p className="text-muted-foreground">We're open daily</p>
                  </div>
                </div>
                <div className="text-card-foreground">
                  <p><strong>Mon - Sat:</strong> 6:00 AM - 9:00 PM</p>
                  <p><strong>Sunday:</strong> 6:00 AM - 8:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps Embed */}
          <div className="h-[600px] rounded-lg overflow-hidden shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6785829973754!2d78.54330131489071!3d17.42100188804774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99d6e6b3a4a3%3A0x6e8e1b8b8b8b8b8b!2sBoduppal%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bathula Brothers Location - Boduppal, Hyderabad"
            ></iframe>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-16 text-center bg-gradient-hero p-8 rounded-2xl shadow-card">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-white">
            Ready to Order Fresh Meat?
          </h3>
          <p className="text-white/90 text-lg mb-6">
            Call us now or send a WhatsApp message for instant ordering!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={handleCall}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              📞 Call Now
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              variant="secondary"
              className="bg-success hover:bg-success/90 text-success-foreground font-bold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              💬 WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};