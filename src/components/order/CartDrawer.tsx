
import { ShoppingBag, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    totalPrice,
    clearCart,
    tableNumber
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast("Your cart is empty");
      return;
    }
    
    if (!tableNumber) {
      toast("Please scan a table QR code first");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast("Order placed successfully!");
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 1500);
  };
  
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 justify-center">
            <ShoppingBag className="w-5 h-5" />
            Your Order
            {tableNumber && (
              <span className="text-coffee-caramel ml-2">
                (Table {tableNumber})
              </span>
            )}
          </DrawerTitle>
        </DrawerHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              Your cart is empty
            </p>
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            <div className="px-4 pb-0 overflow-y-auto max-h-[50vh]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center justify-between border-b border-coffee-latte/30 pb-3"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <DrawerFooter className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                className="bg-coffee-espresso hover:bg-coffee-mocha w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Checkout
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="w-full"
              >
                Clear Cart
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
