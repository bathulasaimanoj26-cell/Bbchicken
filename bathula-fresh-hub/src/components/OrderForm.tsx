import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

type OrderType = 'chicken' | 'mutton' | 'natukodi';

interface OrderFormProps {
  onClose: () => void;
  type: OrderType;
  whatsappNumber: string;
}

export const OrderForm = ({ onClose, type, whatsappNumber }: OrderFormProps) => {
  const [quantity, setQuantity] = useState("");
  const [cut, setCut] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Try multiple approaches for better compatibility
    const orderMessage = `New Order!

Type: ${type.charAt(0).toUpperCase() + type.slice(1)}
Quantity: ${quantity} kg
Cut: ${cut || 'Not specified'}
Name: ${name}
Address: ${address}
Special Instructions: ${specialInstructions || 'None'}`;

    // Use manual encoding which works better with WhatsApp
    const manualEncoded = orderMessage
      .replace(/\n/g, '%0A')
      .replace(/ /g, '%20')
      .replace(/:/g, '%3A')
      .replace(/!/g, '%21');
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${manualEncoded}`;
    
    console.log('WhatsApp URL:', whatsappUrl); // Debug log
    console.log('Message:', orderMessage); // Debug log
    
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const cuts = type === 'chicken' 
    ? ['Whole', 'Curry Cut', 'Boneless', 'Leg Piece', 'Lollipop']
    : type === 'mutton'
    ? ['Curry Cut', 'Biryani Cut', 'Leg Piece', 'Boneless', 'Keema']
    : ['Whole Natukodi', 'Curry Cut', 'Boneless', 'Leg Piece', 'Breast Piece'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity (in kg)</Label>
            <Input
              id="quantity"
              type="number"
              min="0.5"
              step="0.5"
              placeholder="e.g., 1, 1.5, 2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label>Prefered Cut</Label>
            <RadioGroup 
              value={cut}
              onValueChange={setCut}
              className="grid grid-cols-2 gap-2 mt-2"
            >
              {cuts.map((cutOption) => (
                <div key={cutOption} className="flex items-center space-x-2">
                  <RadioGroupItem value={cutOption} id={cutOption.toLowerCase().replace(' ', '-')}/>
                  <Label htmlFor={cutOption.toLowerCase().replace(' ', '-')} className="font-normal">
                    {cutOption}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any specific instructions for the order"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Send Order via WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
