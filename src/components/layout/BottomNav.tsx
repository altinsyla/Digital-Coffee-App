
import { Link, useLocation } from "react-router-dom";
import { Home, User, Coffee, QrCode, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/home",
    },
    {
      label: "Order",
      icon: Coffee,
      path: "/order",
    },
    {
      label: "Scan",
      icon: QrCode,
      path: "/qr-scan",
    },
    {
      label: "Loyalty",
      icon: Heart,
      path: "/loyalty",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-2 rounded-t-xl z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center py-1"
            >
            <div 
  className={cn(
    "p-2 rounded-full transition-all",
    isActive 
      ? "text-white"  // Font color white when active
      : "text-coffee-mocha/70 hover:text-coffee-espresso"
  )}
  style={isActive ? { backgroundColor: "#275548" } : {}}
>
                <item.icon className="w-5 h-5" />
              </div>
              <span 
                className={cn(
                  "text-xs mt-1",
                  isActive 
                    ? "text-coffee-espresso font-medium" 
                    : "text-coffee-mocha/70"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
