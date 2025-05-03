
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotComponent from "@/components/order/ChatbotComponent";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

// Sample products for the chatbot to recommend
const sampleProducts: Product[] = [
  {
    id: "c1",
    name: "Espresso",
    description: "Pure, rich coffee shot",
    price: 2.75,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1510591509098-f4b5d5919d06?w=500&h=500&fit=crop"
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
    id: "p1",
    name: "Croissant",
    description: "Buttery, flaky pastry",
    price: 3.50,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop"
  },
  {
    id: "s1",
    name: "Pumpkin Spice Latte",
    description: "Seasonal favorite with real pumpkin",
    price: 5.75,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1569437254919-ff0c9d063e8e?w=500&h=500&fit=crop"
  },
];

const ChatbotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { addToCart } = useCart();
  
  const handleToggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  
  const handleAddProductToCart = (product: Product) => {
    addToCart(product);
  };
  
  return (
    <>
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={handleToggleChatbot}
          className={`rounded-full w-12 h-12 shadow-xl flex items-center justify-center ${
            isChatbotOpen ? "bg-gray-300 hover:bg-gray-400" : "bg-artCoffeeGreen hover:bg-artCoffeeGreen/80"
          }`}
        >
          {isChatbotOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {isChatbotOpen && (
        <ChatbotComponent 
          products={sampleProducts}
          onAddProduct={handleAddProductToCart}
          onClose={handleToggleChatbot}
        />
      )}
    </>
  );
};

export default ChatbotButton;
