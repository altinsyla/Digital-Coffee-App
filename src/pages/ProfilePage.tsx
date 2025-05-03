
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  User, 
  Settings, 
  Bell, 
  LogOut, 
  Shield, 
  CreditCard, 
  Gift, 
  HelpCircle 
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [allergies, setAllergies] = useState(user?.allergies?.join(", ") || "");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    user?.dietaryRestrictions?.join(", ") || ""
  );
  const [chronicConditions, setChronicConditions] = useState(
    user?.chronicConditions?.join(", ") || ""
  );
  
  const handleSaveProfile = () => {
    updateProfile({
      name,
      allergies: allergies ? allergies.split(",").map((item) => item.trim()) : undefined,
      dietaryRestrictions: dietaryRestrictions
        ? dietaryRestrictions.split(",").map((item) => item.trim())
        : undefined,
      chronicConditions: chronicConditions
        ? chronicConditions.split(",").map((item) => item.trim())
        : undefined,
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  
  if (!user) {
    navigate("/auth");
    return null;
  }
  
  return (
    <PageContainer title="Profile" className="space-y-6">
      {/* User Profile Header */}
      <div className="flex flex-col items-center">
        <Avatar className="w-20 h-20 mb-2">
          <AvatarFallback className="bg-coffee-caramel text-coffee-espresso text-xl">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-medium">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
        
        <div className="flex items-center mt-2">
          <span className="bg-coffee-caramel/20 text-coffee-espresso rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <Heart className="w-4 h-4 mr-1 fill-coffee-caramel text-coffee-caramel" />
            {user.loyaltyPoints} points
          </span>
        </div>
      </div>
      
      <Separator />
      
      {/* Profile Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-medium">Personal Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="allergies" className="flex justify-between">
            <span>Allergies</span>
            <span className="text-xs text-muted-foreground">(Optional, comma separated)</span>
          </Label>
          <Input
            id="allergies"
            placeholder="Nuts, Dairy, etc."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dietary" className="flex justify-between">
            <span>Dietary Restrictions</span>
            <span className="text-xs text-muted-foreground">(Optional, comma separated)</span>
          </Label>
          <Input
            id="dietary"
            placeholder="Vegan, Gluten-free, etc."
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="conditions" className="flex justify-between">
            <span>Health Conditions</span>
            <span className="text-xs text-muted-foreground">(Optional, comma separated)</span>
          </Label>
          <Input
            id="conditions"
            placeholder="Diabetes, etc."
            value={chronicConditions}
            onChange={(e) => setChronicConditions(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Health information helps us provide personalized recommendations. 
            This data is encrypted and only used for product suggestions.
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="health-suggestions">AI Health Suggestions</Label>
            <p className="text-xs text-muted-foreground">
              Use my health data for smarter product recommendations
            </p>
          </div>
          <Switch id="health-suggestions" defaultChecked />
        </div>
        
        <Button 
          className="w-full bg-artCoffeeGreen hover:bg-artCoffeeGreen/90 text-white"
          onClick={handleSaveProfile}
        >
          Save Changes
        </Button>
      </div>
      
      <Separator />
      
      {/* Quick Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-medium">Settings & Preferences</h3>
        
        <div className="space-y-2">
          <div className="flex items-center py-2">
            <CreditCard className="w-5 h-5 mr-3 text-coffee-mocha" />
            <span className="flex-1">Payment Methods</span>
            <Button variant="ghost" size="sm" className="text-black">Manage</Button>
          </div>
          
          <div className="flex items-center py-2">
            <Gift className="w-5 h-5 mr-3 text-coffee-mocha" />
            <span className="flex-1">Gift Cards</span>
            <Button variant="ghost" size="sm" className="text-black">View</Button>
          </div>
          
          <div className="flex items-center py-2">
            <Bell className="w-5 h-5 mr-3 text-coffee-mocha" />
            <span className="flex-1">Notifications</span>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center py-2">
            <Shield className="w-5 h-5 mr-3 text-coffee-mocha" />
            <span className="flex-1">Privacy Settings</span>
            <Button variant="ghost" size="sm" className="text-black">Manage</Button>
          </div>
          
          <div className="flex items-center py-2">
            <HelpCircle className="w-5 h-5 mr-3 text-coffee-mocha" />
            <span className="flex-1">Help & Support</span>
            <Button variant="ghost" size="sm" className="text-black">Contact</Button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-coffee-caramel text-black hover:bg-coffee-caramel/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
