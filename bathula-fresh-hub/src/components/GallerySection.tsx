import { InfiniteMovingImages } from "@/components/ui/infinite-moving-images";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";

export const GallerySection = () => {
  const galleryImages = [
    {
      src: image1,
      alt: "Fresh meat preparation - Image 1"
    },
    {
      src: image2,
      alt: "Quality chicken cuts - Image 2"
    },
    {
      src: image3,
      alt: "Premium mutton selection - Image 3"
    },
    {
      src: image4,
      alt: "Clean preparation area - Image 4"
    },
    {
      src: image5,
      alt: "Fresh daily delivery - Image 5"
    },
    {
      src: image6,
      alt: "Expert meat cutting - Image 6"
    },
    {
      src: image7,
      alt: "Quality assurance - Image 7"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4 text-foreground">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a look at our fresh meat preparation, quality cuts, and clean facilities. 
            We maintain the highest standards of hygiene and freshness.
          </p>
        </div>

        {/* Infinite Moving Images */}
        <div className="relative overflow-hidden">
          <InfiniteMovingImages
            images={galleryImages}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-8"
          />
        </div>

        {/* Quality Assurance Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/10 text-primary px-8 py-4 rounded-full animate-fade-in hover:bg-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-2xl">📸</div>
            <div className="text-lg font-semibold">
              Fresh Quality • Hygienic Preparation • Daily Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
