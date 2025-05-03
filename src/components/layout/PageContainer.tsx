
import React from "react";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  showBottomNav?: boolean;
  className?: string;
  hideHeaderBorder?: boolean;
}

const PageContainer = ({
  children,
  title,
  showBottomNav = true,
  className,
  hideHeaderBorder = false,
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {title && (
        <header className={cn(
          "sticky top-0 z-30 bg-background/80 backdrop-blur-md p-4",
          !hideHeaderBorder && "border-b border-coffee-latte"
        )}>
          <h1 className="text-xl font-serif font-medium text-center">{title}</h1>
        </header>
      )}
      <main className={cn("p-4", className)}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default PageContainer;
