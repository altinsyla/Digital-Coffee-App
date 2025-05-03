
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-coffee-caramel rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Index;
