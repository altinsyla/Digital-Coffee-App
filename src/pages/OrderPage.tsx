
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Coffee, Cookie, Plus, Heart, Zap, Search, ShoppingBag, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomOrderComponent from "@/components/order/CustomOrderComponent";
import CartDrawer from "@/components/order/CartDrawer";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Products data with images
const products: Product[] = [
  // Coffee
  {
    id: "c1",
    name: "Espresso",
    description: "Pure, rich coffee shot",
    price: 2.75,
    category: "coffee",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1s6y7zOF2_xARrIkmFwlpnt_Ph0w4d4kCw&s"
  },
  {
    id: "c2",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 4.50,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&h=500&fit=crop"
  },
  {
    id: "c3",
    name: "Latte",
    description: "Espresso with lots of steamed milk",
    price: 4.75,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=500&fit=crop"
  },
  {
    id: "c4",
    name: "Cold Brew",
    description: "Smooth, cold-extracted coffee",
    price: 5.25,
    category: "coffee",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F9eada0d203bfb580d801b478edd553465c7afb52"
  },
  {
    id: "c5",
    name: "Americano",
    description: "Espresso diluted with hot water",
    price: 3.50,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&h=500&fit=crop"
  },
  {
    id: "c6",
    name: "Flat White",
    description: "Espresso with velvety steamed milk",
    price: 4.95,
    category: "coffee",
    image: "https://prod-app.breville.com/original/recipe/1724048842/Flat+White-Leaf+Latte+1080x1440.jpg"
  },
  
  // Pastry
  {
    id: "p1",
    name: "Croissant",
    description: "Buttery, flaky pastry",
    price: 3.50,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop"
  },
  {
    id: "p2",
    name: "Chocolate Muffin",
    description: "Rich, chocolate chip muffin",
    price: 4.25,
    category: "pastry",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZArWNCDn0cVwlm7USmqniaNakVU0T58bvQ&s"
  },
  {
    id: "p3",
    name: "Cinnamon Roll",
    description: "Sweet, swirled pastry with icing",
    price: 4.50,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&h=500&fit=crop"
  },
  {
    id: "p4",
    name: "Blueberry Scone",
    description: "Flaky pastry with fresh blueberries",
    price: 3.95,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?w=500&h=500&fit=crop"
  },
  {
    id: "p5",
    name: "Pain au Chocolat",
    description: "Chocolate-filled croissant",
    price: 3.95,
    category: "pastry",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/06/PainAuChoc-0ff983a.jpg?resize=900%2C471"
  },
  
  // Drinks (non-coffee)
  {
    id: "d1",
    name: "Matcha Latte",
    description: "Green tea powder with steamed milk",
    price: 5.50,
    category: "drink",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg"
  },
  {
    id: "d2",
    name: "Chai Tea Latte",
    description: "Spiced tea with steamed milk",
    price: 5.25,
    category: "drink",
    image: "https://www.modernfarmhouseeats.com/wp-content/uploads/2022/01/starbucks-chai-tea-latte-12.jpg"
  },
  {
    id: "d3",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed oranges",
    price: 4.75,
    category: "drink",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop"
  },
  {
    id: "d4", 
    name: "Iced Tea",
    description: "Chilled tea with lemon",
    price: 3.95,
    category: "drink",
    image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&h=500&fit=crop"
  },
  {
    id: "d5",
    name: "Hot Chocolate",
    description: "Rich chocolate with steamed milk",
    price: 4.50,
    category: "drink",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&h=500&fit=crop"
  },
  
  // Seasonal
  {
    id: "s1",
    name: "Pumpkin Spice Latte",
    description: "Seasonal favorite with real pumpkin",
    price: 5.75,
    category: "seasonal",
    image: "https://coffeecopycat.com/wp-content/uploads/2023/10/IcedPumpkinSpiceLatte-1200-x-1200.jpg"
  },
  {
    id: "s2",
    name: "Gingerbread Latte",
    description: "Holiday spice blend with espresso",
    price: 5.95,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&h=500&fit=crop"
  },
  {
    id: "s3",
    name: "Mint Chocolate Mocha",
    description: "Festive mint with chocolate and espresso",
    price: 5.95,
    category: "seasonal",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12AQtEzCUaCcU1GieIIPR5Rx6E2K-KuD9ig&s"
  }
];

const OrderPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("coffee");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { addToCart, totalItems, tableNumber } = useCart();
  
  const filteredProducts = products.filter(
    (product) => 
      product.category === activeTab || 
      activeTab === "all"
  ).filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  
  const handleCustomOrderClick = () => {
    setIsCustomOrderOpen(true);
  };
  
  const handleCartClick = () => {
    if (totalItems === 0) {
      toast("Your cart is empty");
      return;
    }
    setIsCartOpen(true);
  };
  
  return (
    <PageContainer title="Order" className="space-y-6">
      {/* Top Bar with Cart Button */}
      <div className="fixed top-[72px] right-4 z-30">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-artCoffeeGreen text-white hover:bg-artCoffeeGreen/80 rounded-full shadow-lg"
          onClick={handleCartClick}
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-artCoffeeGreen text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
      
      {/* Table Number Indicator */}
      {tableNumber && (
        <div className="bg-artCoffeeGreen/10 py-2 px-4 rounded-lg text-center mb-4">
          <p className="text-sm">
            Ordering for <span className="font-medium">Table {tableNumber}</span>
          </p>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="w-full bg-muted pl-10 pr-4 py-2 rounded-full text-sm focus-visible:ring-artCoffeeGreen"
          placeholder="Search drinks or pastries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Custom Order Button */}
      <div className="coffee-card">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-artCoffeeGreen/20 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-artCoffeeGreen" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-serif font-medium">Custom Coffee</h3>
            <p className="text-sm text-muted-foreground">Create your perfect drink</p>
          </div>
        </div>
        <Button
          className="w-full mt-4 bg-artCoffeeGreen hover:bg-artCoffeeGreen/80"
          onClick={handleCustomOrderClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Order
        </Button>
      </div>
      
      {/* Product Categories */}
      <Tabs defaultValue="coffee" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="coffee">
            <Coffee className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Coffee</span>
          </TabsTrigger>
          <TabsTrigger value="drink">
            <Droplets className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Drinks</span>
          </TabsTrigger>
          <TabsTrigger value="pastry">
            <Cookie className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Pastry</span>
          </TabsTrigger>
          <TabsTrigger value="seasonal">
            <Heart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Seasonal</span>
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        {/* Tab content - using the same component for all tabs with filtered data */}
        <TabsContent value={activeTab} className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No items found matching your search.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden flex border-artCoffeeGreen/20">
                <div className="flex-none w-20 h-20">
                  {product.image ? (
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      {product.category === 'coffee' && <Coffee className="w-6 h-6 text-artCoffeeGreen/70" />}
                      {product.category === 'pastry' && <Cookie className="w-6 h-6 text-artCoffeeGreen/70" />}
                      {product.category === 'drink' && <Droplets className="w-6 h-6 text-artCoffeeGreen/70" />}
                      {product.category === 'seasonal' && <Heart className="w-6 h-6 text-artCoffeeGreen/70" />}
                    </div>
                  )}
                </div>
                <div className="p-4 flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                    <span className="font-medium mt-1 block">${product.price.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="h-auto px-4 rounded-none border-l border-artCoffeeGreen/20 hover:bg-artCoffeeGreen/10"
                  onClick={() => handleAddToCart(product)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
      
      {/* Custom Order Dialog */}
      <CustomOrderComponent 
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        onAddToOrder={handleAddToCart}
      />
      
      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </PageContainer>
  );
};

export default OrderPage;
