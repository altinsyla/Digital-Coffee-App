
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, Zap, Clock, Heart, Star } from "lucide-react";

interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const featuredCoffees: CoffeeItem[] = [
  {
    id: "1",
    name: "Artisanal Cappuccino",
    description: "Rich espresso with silky steamed milk and a touch of foam",
    image: "cappuccino",
    price: 4.50,
  },
  {
    id: "2",
    name: "Cold Brew",
    description: "Smooth, low-acidity coffee brewed for 18 hours",
    image: "coldbrew",
    price: 5.25,
  },
  {
    id: "3",
    name: "Caramel Macchiato",
    description: "Espresso with vanilla, caramel and steamed milk",
    image: "macchiato",
    price: 5.75,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);
  
  const handleCustomizeClick = () => {
    navigate("/order");
  };
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <PageContainer className="space-y-6" hideHeaderBorder>
      {/* Header with user welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif">Good Morning,</h2>
          <h1 className="text-3xl font-serif font-bold">{user.name}</h1>
        </div>
        <div className="flex items-center">
        <span
          className="text-coffee-espresso rounded-full px-2 py-1 text-white font-medium flex items-center"
          style={{ backgroundColor: "#275548" }}
        >
          <Heart className="w-3 h-3 mr-1" />
          {user.loyaltyPoints} pts
        </span>
        </div>
      </div>
      
      {/* Coffee Steam Animation */}
      <div className="relative h-56 overflow-hidden rounded-2xl coffee-card-premium">
        <div className="absolute -top-4 left-8 flex justify-center space-x-2 opacity-30">
          <div className="steam animate-steam delay-100"></div>
          <div className="steam animate-steam delay-300"></div>
          <div className="steam animate-steam delay-500"></div>
        </div>
        
        <div className="h-full flex flex-col justify-between text-white p-2">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-coffee-cream/90">Good Morning Boost</h3>
            <p className="text-2xl font-serif font-bold">Your Usual?</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-coffee-caramel/20 rounded-full flex items-center justify-center">
                <Coffee className="w-6 h-6 text-coffee-white" />
              </div>
              <div>
                <h4 className="font-medium text-coffee-cream">Americano</h4>
                <p className="text-sm text-coffee-cream/70">Medium • Extra Shot</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-white hover:bg-artCoffeeGreen text-black hover:text-white"
                onClick={() => navigate("/order")}
              >
                Order Now
              </Button>
              <Button 
                variant="outline" 
                className="border-coffee-cream/30 hover:bg-artCoffeeGreen text-black hover:text-white"
                onClick={handleCustomizeClick}
              >
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
      <Button 
        variant="outline" 
        className="group flex flex-col h-auto py-4 border-coffee-latte text-black group-hover:text-white"
        onClick={() => navigate("/order")}
      >
        <Coffee className="h-5 w-5 mb-1 group-hover:text-white" />
        <span className="text-xs group-hover:text-white">Order</span>
      </Button>

      <Button 
        variant="outline" 
        className="group flex flex-col h-auto py-4 border-coffee-latte text-black group-hover:text-white"
        onClick={() => navigate("/qr-scan")}
      >
        <Zap className="h-5 w-5 mb-1 group-hover:text-white" />
        <span className="text-xs group-hover:text-white">Quick Scan</span>
      </Button>

      <Button 
        variant="outline" 
        className="group flex flex-col h-auto py-4 border-coffee-latte text-black group-hover:text-white"
        onClick={() => navigate("/loyalty")}
      >
        <Heart className="h-5 w-5 mb-1 group-hover:text-white" />
        <span className="text-xs group-hover:text-white">Loyalty</span>
      </Button>
      </div>
      
      {/* Featured Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-serif font-medium">Featured Items</h2>
          <Button variant="ghost" size="sm" className="text-black">
            See All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredCoffees.map((coffee) => (
            <Card key={coffee.id} className="overflow-hidden border-coffee-latte/50">
              <div className="p-4 flex items-center space-x-3">
                <div className="w-16 h-16 bg-coffee-latte/30 rounded-lg flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-coffee-espresso/70" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{coffee.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{coffee.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium">${coffee.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-coffee-caramel text-coffee-caramel" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
