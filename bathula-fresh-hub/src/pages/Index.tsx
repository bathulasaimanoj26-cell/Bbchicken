import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { PriceSection } from "@/components/PriceSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { DeliverySection } from "@/components/DeliverySection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <PriceSection />
        <GallerySection />
        <MenuSection />
        <AboutSection />
        <TestimonialsSection />
        <DeliverySection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;