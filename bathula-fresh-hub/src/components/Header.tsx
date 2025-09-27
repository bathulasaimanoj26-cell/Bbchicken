import { Phone, MessageCircle, ShoppingCart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { OrderForm } from "./OrderForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const handleCall = () => {
    window.open("tel:+919014105470", "_self");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919014105470?text=Hi, I'd like to place an order for chicken/mutton", "_blank");
  };

  const [showOrderForm, setShowOrderForm] = useState<false | 'chicken' | 'mutton'>(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  const handleAdminLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">B</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="font-heading font-bold text-xl sm:text-2xl text-primary">
                  Bathula Brothers
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Chicken & Mutton Center
                </p>
              </div>
              {/* Small Admin Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAdminClick}
                className="ml-2 h-8 w-8 p-0 opacity-50 hover:opacity-100 transition-opacity"
                title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowOrderForm('chicken')}
                  variant="default"
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold w-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Chicken
                </Button>
                <Button
                  onClick={() => setShowOrderForm('mutton')}
                  variant="default"
                  size="sm"
                  className="bg-rose-700 hover:bg-rose-800 text-white font-semibold w-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Mutton
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCall}
                  variant="outline"
                  size="sm"
                  className="font-semibold w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  size="sm"
                  className="font-semibold w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {showOrderForm && (
        <div className="fixed inset-0 z-[100]">
          <OrderForm 
            type={showOrderForm} 
            onClose={() => setShowOrderForm(false)} 
            whatsappNumber="919014105470"
          />
        </div>
      )}
      
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={handleAdminLogout}
            variant="outline"
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};