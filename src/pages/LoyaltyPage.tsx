
import { useAuth } from "@/context/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Coffee, Gift, Calendar, Heart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: any;
  available: boolean;
}

const rewards: Reward[] = [
  {
    id: "r1",
    name: "Free Cappuccino",
    description: "Any size cappuccino, on us!",
    points: 50,
    icon: Coffee,
    available: true,
  },
  {
    id: "r2",
    name: "Croissant & Coffee Bundle",
    description: "A pastry with your favorite coffee",
    points: 75,
    icon: Gift,
    available: true,
  },
  {
    id: "r3",
    name: "250g Coffee Bag",
    description: "Take our signature blend home",
    points: 150,
    icon: Coffee,
    available: false,
  },
  {
    id: "r4",
    name: "Birthday Special",
    description: "Free drink on your birthday",
    points: 25,
    icon: Calendar,
    available: false,
  },
];

const LoyaltyPage = () => {
  const { user } = useAuth();
  const loyaltyPoints = user?.loyaltyPoints || 0;
  
  // Calculate next reward threshold
  const nextRewardPoints = rewards
    .filter(reward => reward.points > loyaltyPoints)
    .sort((a, b) => a.points - b.points)[0]?.points || loyaltyPoints + 25;
  
  const progress = (loyaltyPoints / nextRewardPoints) * 100;
  
  return (
    <PageContainer title="Loyalty Rewards" className="space-y-6">
      {/* Points Card */}
      <Card className="coffee-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-coffee-mocha/70">Your Points</h2>
              <h3 className="text-3xl font-serif font-bold">{loyaltyPoints}</h3>
            </div>
            <div className="w-12 h-12 bg-coffee-caramel/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-coffee-black" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next reward</span>
              <span>{loyaltyPoints} / {nextRewardPoints} points</span>
            </div>
            <div className="loyalty-progress">
              <div className="loyalty-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Double Points Promo */}
      <div className="bg-coffee-caramel/10 rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-coffee-caramel/20 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-coffee-caramel" />
        </div>
        <div>
          <h3 className="font-medium">Double Points Wednesday</h3>
          <p className="text-sm text-muted-foreground">Today! 5:00 PM - 8:00 PM</p>
        </div>
      </div>
      
      {/* Available Rewards */}
      <div className="space-y-3">
        <h3 className="text-lg font-serif font-medium">Available Rewards</h3>
        
        {rewards.map((reward) => (
          <div 
            key={reward.id}
            className={cn(
              "border rounded-lg p-4 flex items-center space-x-3",
              reward.available 
                ? "border-coffee-caramel/50" 
                : "border-coffee-latte opacity-60"
            )}
          >
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                reward.available 
                  ? "bg-coffee-caramel/20" 
                  : "bg-coffee-latte/30"
              )}
            >
              <reward.icon className={cn(
                "w-6 h-6",
                reward.available 
                  ? "text-coffee-caramel" 
                  : "text-coffee-mocha/40"
              )} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{reward.name}</h4>
                <span className="text-sm font-medium flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {reward.points}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{reward.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Separator />
      
      {/* Points History */}
      <div className="space-y-3">
        <h3 className="text-lg font-serif font-medium">Points History</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Cappuccino + Croissant</p>
              <p className="text-sm text-muted-foreground">May 2, 2025</p>
            </div>
            <span className="text-coffee-caramel font-medium">+8 pts</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Cold Brew</p>
              <p className="text-sm text-muted-foreground">Apr 29, 2025</p>
            </div>
            <span className="text-coffee-caramel font-medium">+5 pts</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Reward: Free Espresso</p>
              <p className="text-sm text-muted-foreground">Apr 27, 2025</p>
            </div>
            <span className="text-coffee-mocha font-medium">-30 pts</span>
          </div>
        </div>
        
        <Button variant="ghost" className="w-full">View Full History</Button>
      </div>
    </PageContainer>
  );
};

export default LoyaltyPage;
