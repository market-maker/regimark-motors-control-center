
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface VehicleAdvice {
  type: "maintenance" | "repair" | "upgrade";
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedCost?: number;
}

interface VehicleAdviceFormProps {
  onSubmit: (advice: VehicleAdvice) => void;
  onCancel: () => void;
  initialAdvice?: VehicleAdvice;
}

export const VehicleAdviceForm = ({ 
  onSubmit, 
  onCancel,
  initialAdvice
}: VehicleAdviceFormProps) => {
  const [type, setType] = useState<"maintenance" | "repair" | "upgrade">(
    initialAdvice?.type || "maintenance"
  );
  const [description, setDescription] = useState(initialAdvice?.description || "");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Critical">(
    initialAdvice?.priority || "Medium"
  );
  const [estimatedCost, setEstimatedCost] = useState<number | undefined>(
    initialAdvice?.estimatedCost || undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description) {
      toast.error("Description is required");
      return;
    }
    
    const advice: VehicleAdvice = {
      type,
      description,
      priority,
      estimatedCost
    };
    
    onSubmit(advice);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialAdvice ? "Edit" : "Add"} Vehicle Advice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select advice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="upgrade">Upgrade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the advice or recommendation"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimatedCost">Estimated Cost (Optional)</Label>
            <Input 
              id="estimatedCost" 
              type="number"
              min="0"
              step="0.01"
              value={estimatedCost || ""}
              onChange={(e) => setEstimatedCost(e.target.value ? parseFloat(e.target.value) : undefined)}
              placeholder="0.00"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {initialAdvice ? "Update" : "Add"} Advice
        </Button>
      </CardFooter>
    </Card>
  );
};
