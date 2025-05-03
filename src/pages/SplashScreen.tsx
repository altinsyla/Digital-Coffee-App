
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const animationTimer = setTimeout(() => setAnimation(true), 300);
    
    // Navigate away after 3 seconds
    const navigationTimer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className={`transition-all duration-1000 ${animation ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
        <img 
          src="/lovable-uploads/39a6a25b-56d0-4f02-9aa9-97290f716156.png" 
          alt="Art Coffee Logo" 
          className="w-44 h-auto"
        />
      </div>
      <div className="mt-8">
        <div className="flex space-x-2 justify-center items-center">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-3 h-3 rounded-full bg-artCoffeeGreen/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
