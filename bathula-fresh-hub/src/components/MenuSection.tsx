import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { OrderForm } from "./OrderForm";
import natukodiImg from "@/assets/natukodi.jpg";

export const MenuSection = () => {
  const [showOrderForm, setShowOrderForm] = useState<false | 'chicken' | 'mutton' | 'natukodi'>(false);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-center mb-12 text-foreground">
          Our <span className="text-primary">Fresh Menu</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chicken Card */}
          <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-button">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🐓</div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-card-foreground">
                Fresh Chicken
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Farm-fresh chicken cuts including whole chicken, breast pieces, drumsticks, 
                and more. All cuts are cleaned and prepared fresh daily.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                <li>• Whole Chicken</li>
                <li>• Breast Pieces</li>
                <li>• Drumsticks & Thighs</li>
                <li>• Boneless Cuts</li>
              </ul>
              <Button
                onClick={() => setShowOrderForm('chicken')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button font-semibold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Chicken
              </Button>
            </CardContent>
          </Card>

          {/* Mutton Card */}
          <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-button">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🐐</div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-card-foreground">
                Fresh Mutton
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Premium quality mutton cuts from healthy goats. All cuts are expertly 
                prepared and delivered fresh to maintain the best taste and quality.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                <li>• Mutton Curry Cut</li>
                <li>• Leg Pieces</li>
                <li>• Shoulder Cuts</li>
                <li>• Boneless Mutton</li>
              </ul>
              <Button
                onClick={() => setShowOrderForm('mutton')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button font-semibold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Mutton
              </Button>
            </CardContent>
          </Card>

          {/* Natukodi Card */}
          <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-button">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={natukodiImg} 
                  alt="Fresh Natukodi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-card-foreground">
                Fresh Natukodi
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Premium country chicken (Natukodi) raised naturally. Known for its rich flavor 
                and nutritional value. Perfect for traditional recipes and healthy meals.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                <li>• Whole Natukodi</li>
                <li>• Curry Cut</li>
                <li>• Boneless Cuts</li>
                <li>• Breast Pieces</li>
              </ul>
              <Button
                onClick={() => setShowOrderForm('natukodi')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button font-semibold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Natukodi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showOrderForm && (
        <div className="fixed inset-0 z-[100]">
          <OrderForm 
            type={showOrderForm} 
            onClose={() => setShowOrderForm(false)} 
            whatsappNumber="919014105470"
          />
        </div>
      )}
    </section>
  );
};