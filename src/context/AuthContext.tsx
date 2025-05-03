
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  allergies?: string[];
  dietaryRestrictions?: string[];
  chronicConditions?: string[];
  loyaltyPoints: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("artCoffeeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any login
      const newUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
        loyaltyPoints: 75,
      };
      
      setUser(newUser);
      localStorage.setItem("artCoffeeUser", JSON.stringify(newUser));
      toast.success("Successfully logged in!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to login. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign up function
  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email,
        name,
        loyaltyPoints: 0,
      };
      
      setUser(newUser);
      localStorage.setItem("artCoffeeUser", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("artCoffeeUser");
    toast.success("Logged out successfully!");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("artCoffeeUser", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    }
  };

  const value = {
    user,
    loading,
    login,
    signUp,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
