
import React, { useState, useRef, useEffect } from "react";
import { Bot, Coffee, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  productRecommendation?: Product | null;
}

interface ChatbotComponentProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onClose: () => void;
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = ({ products, onAddProduct, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your coffee assistant. What kind of drink are you looking for today?",
      isUser: false,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Process the message and generate a response
    setTimeout(() => {
      const recommendation = generateRecommendation(input, products);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: recommendation.message,
        isUser: false,
        timestamp: Date.now(),
        productRecommendation: recommendation.product
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const generateRecommendation = (userInput: string, products: Product[]): { message: string; product: Product | null } => {
    const input = userInput.toLowerCase();
    
    // Simple recommendation logic based on keywords
    if (input.includes("tired") || input.includes("energy") || input.includes("strong")) {
      const coffee = products.find(p => p.name === "Espresso" || p.name === "Cold Brew");
      return {
        message: `I recommend a ${coffee?.name}. It's perfect when you need energy!`,
        product: coffee || null
      };
    } else if (input.includes("sweet") || input.includes("sugar") || input.includes("flavor")) {
      const coffee = products.find(p => p.name === "Latte" || p.name === "Cappuccino");
      return {
        message: `How about a ${coffee?.name}? It's smooth and can be customized with flavors!`,
        product: coffee || null
      };
    } else if (input.includes("food") || input.includes("eat") || input.includes("hungry")) {
      const food = products.find(p => p.category === "pastry");
      return {
        message: `I'd suggest a ${food?.name}. It pairs well with most of our coffees!`,
        product: food || null
      };
    } else if (input.includes("special") || input.includes("seasonal") || input.includes("unique")) {
      const seasonal = products.find(p => p.category === "seasonal");
      return {
        message: `Try our seasonal ${seasonal?.name}! It's a customer favorite right now.`,
        product: seasonal || null
      };
    }
    
    // Default recommendation
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
      message: `Based on what you've said, I think you might enjoy our ${randomProduct.name}. Would you like to add it to your order?`,
      product: randomProduct
    };
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col h-[80vh]">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-coffee-caramel" />
            <h2 className="font-medium">Coffee Assistant</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={cn(
                "flex flex-col max-w-[80%] rounded-lg p-3 mb-2",
                message.isUser 
                  ? "bg-coffee-espresso text-white ml-auto" 
                  : "bg-coffee-latte/20 mr-auto"
              )}
            >
              <div className="text-sm">{message.text}</div>
              
              {message.productRecommendation && (
                <div className="mt-2 p-2 bg-white rounded shadow-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-coffee-latte/30 rounded-full flex items-center justify-center mr-2">
                      <Coffee className="w-4 h-4 text-coffee-espresso/70" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{message.productRecommendation.name}</p>
                      <p className="text-xs text-muted-foreground">${message.productRecommendation.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs w-full border-coffee-caramel text-coffee-espresso hover:bg-coffee-latte/20"
                    onClick={() => onAddProduct(message.productRecommendation!)}
                  >
                    Add to Order
                  </Button>
                </div>
              )}
              
              <span className="text-xs opacity-70 mt-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about coffee recommendations..."
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              className="bg-coffee-espresso hover:bg-coffee-mocha"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
