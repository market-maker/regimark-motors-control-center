
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AdviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToJobCards: () => void;
}

const AdviceDialog = ({ open, onOpenChange, onGoToJobCards }: AdviceDialogProps) => {
  const [adviceType, setAdviceType] = useState<"job" | "vehicle" | "card">("job");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Advice</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Select
            value={adviceType}
            onValueChange={(value: any) => setAdviceType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select advice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="job">Job Card</SelectItem>
              <SelectItem value="vehicle">Vehicle Maintenance</SelectItem>
              <SelectItem value="card">Credit Card</SelectItem>
            </SelectContent>
          </Select>
          
          {adviceType === "job" && (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Job Card Advice</h4>
              <p className="text-sm">Creating a job card helps track vehicle service history and maintenance schedules. It allows for better organization of parts used and labor costs.</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => {
                  onOpenChange(false);
                  onGoToJobCards();
                }}
              >
                Go to Job Cards
              </Button>
            </div>
          )}
          
          {adviceType === "vehicle" && (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Vehicle Maintenance Advice</h4>
              <p className="text-sm">Regular vehicle maintenance ensures safety, extends vehicle life, and prevents costly repairs. We recommend service every 5,000-7,500 miles depending on driving conditions.</p>
              <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                <li>Oil change every 3,000-5,000 miles</li>
                <li>Tire rotation every 6,000-8,000 miles</li>
                <li>Brake inspection every 10,000 miles</li>
                <li>Air filter replacement every 15,000-30,000 miles</li>
              </ul>
            </div>
          )}
          
          {adviceType === "card" && (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Credit Card Payment Advice</h4>
              <p className="text-sm">Credit card payments are processed securely through our payment provider. All card details are encrypted and we do not store complete card numbers in our system.</p>
              <p className="text-sm mt-2">For large transactions, consider our financing options or installment plans which may offer better rates than standard credit cards.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdviceDialog;
