import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Hero_lifestyle_boxer_briefs_image_d1177196.png";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium boxer briefs lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            data-testid="text-hero-title"
          >
            Premium Comfort.
            <br />
            <span className="text-primary">Bold Style.</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-xl"
            data-testid="text-hero-subtitle"
          >
            Experience unparalleled comfort with our premium collection of men's boxer briefs.
            Crafted for the modern man who demands quality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                data-testid="button-shop-now"
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
                data-testid="button-view-collection"
              >
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
