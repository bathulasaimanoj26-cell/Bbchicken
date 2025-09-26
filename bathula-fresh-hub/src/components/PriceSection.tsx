import { TrendingUp, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/use-products";

export const PriceSection = () => {
  const { getPriceData, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading prices...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error loading prices: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  const priceData = getPriceData();

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "same";
  };

  const todaysPrices = [
    {
      type: "Chicken",
      price: `₹${priceData.chicken.current}`,
      unit: "per kg",
      previousPrice: `₹${priceData.chicken.previous}`,
      trend: getTrend(priceData.chicken.current, priceData.chicken.previous),
      freshness: "Fresh Today",
      icon: "🐔",
      gradient: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-600"
    },
    {
      type: "Mutton",
      price: `₹${priceData.mutton.current}`,
      unit: "per kg", 
      previousPrice: `₹${priceData.mutton.previous}`,
      trend: getTrend(priceData.mutton.current, priceData.mutton.previous),
      freshness: "Fresh Today",
      icon: "🐐",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      textColor: "text-red-600"
    },
    {
      type: "Natukodi",
      price: `₹${priceData.natukodi?.current || 380}`,
      unit: "per kg",
      previousPrice: `₹${priceData.natukodi?.previous || 370}`,
      trend: getTrend(priceData.natukodi?.current || 380, priceData.natukodi?.previous || 370),
      freshness: "Fresh Today",
      icon: "🐓",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-600"
    }
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "📈" : "📉";
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-red-500" : "text-green-500";
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <Badge variant="outline" className="text-sm font-medium">
              Live Prices
            </Badge>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4 text-foreground">
            Today's <span className="text-primary">Fresh Meat Prices</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Updated daily with the freshest quality meat at competitive prices
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Boduppal, Hyderabad</span>
            <span>•</span>
            <span>{getCurrentDate()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {todaysPrices.map((item, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${item.gradient} border-2 ${item.borderColor} hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105 group cursor-pointer animate-slide-in-${index + 1}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl group-hover:animate-bounce-soft transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.type}
                      </h3>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.freshness}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <span className={getTrendColor(item.trend)}>
                        {getTrendIcon(item.trend)}
                      </span>
                      <span className="text-muted-foreground line-through">
                        {item.previousPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className={`font-heading font-bold text-4xl ${item.textColor} group-hover:text-primary transition-colors duration-300`}>
                      {item.price}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {item.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {item.trend === "up" ? "Price increased" : "Price decreased"} from yesterday
                    </span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/10 text-primary px-8 py-4 rounded-full animate-fade-in hover:bg-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-2xl">📞</div>
            <div className="text-lg font-semibold">
              Call +919014105470 for bulk orders & special prices
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Prices may vary based on market conditions • Free delivery on orders above ₹500
          </p>
        </div>
      </div>
    </section>
  );
};
