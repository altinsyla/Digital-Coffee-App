
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Coffee, 
  Milk, 
  Droplets, 
  Thermometer, 
  Sparkles, 
  Save, 
  Check 
} from "lucide-react";
import { Product } from "@/types/product";

interface CustomOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (product: Product) => void;
}

interface CustomizationOption {
  id: string;
  name: string;
  options: string[];
  selectedOption: string;
}

const CustomOrderComponent: React.FC<CustomOrderProps> = ({ 
  isOpen, 
  onClose, 
  onAddToOrder 
}) => {
  const [step, setStep] = useState(0);
  const [orderName, setOrderName] = useState("My Custom Coffee");
  const [customizations, setCustomizations] = useState<CustomizationOption[]>([
    {
      id: "bean",
      name: "Coffee Bean",
      options: ["100% Arabica", "60/40 Blend", "Ethiopian", "Colombian"],
      selectedOption: "100% Arabica",
    },
    {
      id: "size",
      name: "Size",
      options: ["Small", "Medium", "Large"],
      selectedOption: "Medium",
    },
    {
      id: "caffeine",
      name: "Caffeine Level",
      options: ["Decaf", "Regular", "Extra Shot", "Double Shot"],
      selectedOption: "Regular",
    },
    {
      id: "milk",
      name: "Milk Type",
      options: ["Dairy", "Almond", "Soy", "Oat", "None"],
      selectedOption: "Dairy",
    },
    {
      id: "sweetener",
      name: "Sweetener",
      options: ["None", "Sugar", "Stevia", "Honey", "Caramel"],
      selectedOption: "None",
    },
    {
      id: "extras",
      name: "Add-ons",
      options: ["None", "Whipped Cream", "Chocolate Sprinkles", "Cinnamon", "Protein Powder"],
      selectedOption: "None",
    },
  ]);
  
  const [savedCustomOrders, setSavedCustomOrders] = useState<Product[]>(() => {
    const saved = localStorage.getItem("savedCustomOrders");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orderSaved, setOrderSaved] = useState(false);
  
  const handleOptionSelect = (categoryId: string, option: string) => {
    setCustomizations(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, selectedOption: option } 
          : cat
      )
    );
  };
  
  const handleSaveOrder = () => {
    // Create the custom product
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: orderName,
      description: generateDescription(),
      price: calculatePrice(),
      category: "coffee",
      custom: true
    };
    
    // Save to localStorage
    const updatedSavedOrders = [...savedCustomOrders, customProduct];
    setSavedCustomOrders(updatedSavedOrders);
    localStorage.setItem("savedCustomOrders", JSON.stringify(updatedSavedOrders));
    
    // Add to current order
    onAddToOrder(customProduct);
    
    // Show saved confirmation
    setOrderSaved(true);
    setTimeout(() => {
      setOrderSaved(false);
      onClose();
    }, 1500);
  };
  
  const calculatePrice = (): number => {
    let basePrice = 3.50; // Base price for a custom coffee
    
    // Add price modifiers based on selections
    customizations.forEach(cat => {
      switch (cat.id) {
        case "size":
          if (cat.selectedOption === "Large") basePrice += 1.00;
          else if (cat.selectedOption === "Small") basePrice -= 0.50;
          break;
        case "caffeine":
          if (cat.selectedOption === "Extra Shot") basePrice += 0.75;
          else if (cat.selectedOption === "Double Shot") basePrice += 1.50;
          break;
        case "milk":
          if (cat.selectedOption === "Almond" || 
              cat.selectedOption === "Oat") basePrice += 0.75;
          break;
        case "extras":
          if (cat.selectedOption !== "None") basePrice += 0.50;
          break;
      }
    });
    
    return parseFloat(basePrice.toFixed(2));
  };
  
  const generateDescription = (): string => {
    const beanType = customizations.find(c => c.id === "bean")?.selectedOption;
    const size = customizations.find(c => c.id === "size")?.selectedOption;
    const caffeine = customizations.find(c => c.id === "caffeine")?.selectedOption;
    const milk = customizations.find(c => c.id === "milk")?.selectedOption;
    
    return `${size} ${caffeine} coffee with ${beanType} beans and ${milk} milk`;
  };
  
  const handleNext = () => {
    if (step < customizations.length - 1) {
      setStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };
  
  const currentCategory = customizations[step];
  
  const getStepIcon = (categoryId: string) => {
    switch (categoryId) {
      case "bean": return <Coffee className="w-6 h-6" />;
      case "size": return <Thermometer className="w-6 h-6" />;
      case "caffeine": return <Sparkles className="w-6 h-6" />;
      case "milk": return <Milk className="w-6 h-6" />;
      case "sweetener": return <Droplets className="w-6 h-6" />;
      case "extras": return <Sparkles className="w-6 h-6" />;
      default: return <Coffee className="w-6 h-6" />;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => !orderSaved && onClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-xl">
            <Coffee className="w-5 h-5" />
            Create Your Custom Coffee
          </DialogTitle>
          <DialogDescription className="text-center">
            Customize every aspect of your perfect coffee
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress indicator */}
        <div className="flex justify-between mt-2 mb-4">
          {customizations.map((cat, index) => (
            <div 
              key={cat.id}
              className={`w-8 h-1 rounded-full ${
                index === step ? "bg-coffee-caramel" : 
                index < step ? "bg-coffee-espresso/50" : "bg-coffee-latte"
              }`}
            />
          ))}
        </div>
        
        {/* Current customization step */}
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            {getStepIcon(currentCategory.id)}
            <Label className="text-lg">{currentCategory.name}</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {currentCategory.options.map(option => (
              <Button
                key={option}
                type="button"
                variant={currentCategory.selectedOption === option ? "default" : "outline"}
                className={
                  currentCategory.selectedOption === option 
                    ? "bg-coffee-espresso hover:bg-coffee-mocha" 
                    : "border-coffee-latte hover:bg-coffee-latte/10"
                }
                onClick={() => handleOptionSelect(currentCategory.id, option)}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {/* Cup preview visualization could go here */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-32 bg-coffee-latte/20 rounded-b-3xl rounded-t-sm relative">
              <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-coffee-caramel/70 to-coffee-caramel/30 rounded-b-3xl">
                {/* Visual representation of customizations would go here in a real app */}
              </div>
              <div className="absolute -right-2 top-5 w-4 h-8 bg-coffee-latte/20 rounded-r-md"></div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {step > 0 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrevious}
              className="sm:mr-auto"
            >
              Previous
            </Button>
          )}
          
          {step < customizations.length - 1 ? (
            <Button 
              type="button"
              onClick={handleNext}
              className="bg-coffee-espresso hover:bg-coffee-mocha"
            >
              Next
            </Button>
          ) : (
            orderSaved ? (
              <Button 
                type="button"
                className="bg-green-600 hover:bg-green-700 w-full"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Saved!
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={handleSaveOrder}
                className="bg-coffee-caramel text-coffee-espresso hover:bg-coffee-caramel/90 w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Order
              </Button>
            )
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomOrderComponent;
