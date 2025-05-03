import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Coffee,
  QrCode,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EXCLUDED_ROUTES = ["/", "/auth", "/splash"]; // hide nav here

const BottomNav = () => {
  const location = useLocation();

  if (EXCLUDED_ROUTES.includes(location.pathname)) return null;

  const navItems = [
    { label: "Home",      icon: Home,        path: "/home" },
    { label: "Order",     icon: Coffee,      path: "/order" },
    { label: "Scan",      icon: QrCode,      path: "/qr-scan" },
    { label: "Wholesale", icon: ShoppingBag, path: "/wholesale" }, // 🆕
    { label: "Loyalty",   icon: Heart,       path: "/loyalty" },
    { label: "Profile",   icon: User,        path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-2 rounded-t-xl z-50">
      <ul className="flex justify-around items-center">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <li key={path}>
              <Link
                to={path}
                className="flex flex-col items-center justify-center py-1"
              >
                <div
                  className={cn(
                    "p-2 rounded-full transition-all",
                    isActive
                      ? "text-white"
                      : "text-coffee-mocha/70 hover:text-coffee-espresso"
                  )}
                  style={isActive ? { backgroundColor: "#275548" } : {}}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs mt-1",
                    isActive
                      ? "text-coffee-espresso font-medium"
                      : "text-coffee-mocha/70"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
