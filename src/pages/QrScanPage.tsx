
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { QrCode, Camera, Copy, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const QrScanPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTable, setScannedTable] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { setTableNumber, tableNumber } = useCart();
  
  // Use the table number from context if available
  useEffect(() => {
    if (tableNumber !== null && scannedTable === null) {
      setScannedTable(tableNumber);
    }
  }, [tableNumber, scannedTable]);
  
  const handleScanStart = () => {
    setIsScanning(true);
    
    // Simulate a QR code scan after a brief delay
    setTimeout(() => {
      const tableNumber = Math.floor(Math.random() * 25) + 1; // Random table between 1-25
      setIsScanning(false);
      setScannedTable(tableNumber);
      setTableNumber(tableNumber);
      toast(`Table ${tableNumber} scanned successfully`);
    }, 2500);
  };
  
  const handleCopyCode = () => {
    // In a real app, this would copy a code to clipboard
    navigator.clipboard.writeText(`TABLE-${scannedTable}`).catch(err => {
      console.error('Could not copy text: ', err);
    });
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast("Table code copied to clipboard");
  };

  const handleOrderForTable = () => {
    navigate('/order');
  };
  
  const handleScanAnother = () => {
    setScannedTable(null);
    setTableNumber(null);
  };
  
  return (
    <PageContainer title="QR Scan" className="space-y-6">
      {/* Main Scan Area */}
      <div className="flex flex-col items-center justify-center">
        <div 
          className={cn(
            "w-64 h-64 border-2 rounded-lg flex items-center justify-center mb-6",
            isScanning ? "border-coffee-caramel animate-pulse" : "border-dashed border-coffee-latte"
          )}
        >
          {isScanning ? (
            <div className="relative">
              <Camera className="w-16 h-16 text-coffee-caramel animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-0.5 bg-coffee-caramel absolute top-1/2 animate-pulse"></div>
                <div className="w-0.5 h-full bg-coffee-caramel absolute left-1/2 animate-pulse"></div>
              </div>
            </div>
          ) : (
            scannedTable ? (
              <div className="text-center">
                <div className="bg-coffee-caramel/20 rounded-full p-4 inline-flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-coffee-caramel" />
                </div>
                <h3 className="text-xl font-serif font-medium mt-3">Table {scannedTable}</h3>
                <p className="text-sm text-muted-foreground">Code scanned successfully</p>
              </div>
            ) : (
              <div className="text-center">
                <QrCode className="w-12 h-12 text-coffee-mocha/40 mx-auto" />
                <p className="mt-4 text-muted-foreground">Scan a QR code to order at your table</p>
              </div>
            )
          )}
        </div>
        
        {!scannedTable ? (
          <Button 
            className={cn(
              "bg-artCoffeeGreen hover:bg-artCoffeeGreen/90",
              isScanning && "bg-coffee-mocha"
            )}
            onClick={handleScanStart}
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan QR Code"}
          </Button>
        ) : (
          <div className="space-y-4 w-full max-w-xs">
            <div className="bg-coffee-latte/30 p-4 rounded-lg">
              <div className="text-center">
                <h4 className="font-medium">Table {scannedTable}</h4>
                <p className="text-sm text-muted-foreground">Ready to order</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-coffee-caramel hover:bg-coffee-caramel/90 text-black"
              onClick={handleOrderForTable}
            >
              Order for Table {scannedTable}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full text-black"
              onClick={handleCopyCode}
            >
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Table Code
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full text-black"
              onClick={handleScanAnother}
            >
              Scan Another Code
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-center text-muted-foreground text-sm">
        <p>Having trouble scanning?</p>
        <p>Make sure the QR code is in focus and well-lit.</p>
      </div>
    </PageContainer>
  );
};

export default QrScanPage;
