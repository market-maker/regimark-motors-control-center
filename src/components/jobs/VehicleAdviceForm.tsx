
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface VehicleAdviceItem {
  id: string;
  type: "maintenance" | "repair" | "upgrade";
  item: string;
  condition: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  notes: string;
  estimatedCost?: number;
}

// Using named export instead of default export to fix the import error
export const VehicleAdviceForm = () => {
  const [adviceList, setAdviceList] = useState<VehicleAdviceItem[]>([]);
  const [currentAdvice, setCurrentAdvice] = useState<VehicleAdviceItem>({
    id: '',
    type: 'maintenance',
    item: '',
    condition: 'Good',
    description: '',
    priority: 'Low',
    notes: '',
    estimatedCost: undefined
  });

  const handleInputChange = (field: keyof VehicleAdviceItem, value: string | number) => {
    setCurrentAdvice({
      ...currentAdvice,
      [field]: value
    });
  };

  const handleAddAdvice = () => {
    if (!currentAdvice.item || !currentAdvice.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAdvice = {
      ...currentAdvice,
      id: Date.now().toString()
    };

    setAdviceList([...adviceList, newAdvice]);
    setCurrentAdvice({
      id: '',
      type: 'maintenance',
      item: '',
      condition: 'Good',
      description: '',
      priority: 'Low',
      notes: '',
      estimatedCost: undefined
    });

    toast.success("Vehicle advice added successfully");
  };

  const removeAdvice = (id: string) => {
    setAdviceList(adviceList.filter(item => item.id !== id));
    toast.info("Advice removed");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item">Vehicle Component</Label>
            <Input
              id="item"
              placeholder="e.g., Brakes, Engine, Transmission"
              value={currentAdvice.item}
              onChange={(e) => handleInputChange('item', e.target.value)}
              className="shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Advice Type</Label>
            <Select
              value={currentAdvice.type}
              onValueChange={(value) => handleInputChange('type', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="upgrade">Upgrade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Current Condition</Label>
            <Select
              value={currentAdvice.condition}
              onValueChange={(value) => handleInputChange('condition', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the recommendation"
              value={currentAdvice.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="h-24 shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={currentAdvice.priority}
                onValueChange={(value) => handleInputChange('priority', value as "Low" | "Medium" | "High" | "Critical")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
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
              <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
              <Input
                id="estimatedCost"
                type="number"
                placeholder="0.00"
                value={currentAdvice.estimatedCost || ''}
                onChange={(e) => handleInputChange('estimatedCost', parseFloat(e.target.value) || 0)}
                className="shadow-sm hover:shadow-md transition-shadow"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional information or specific details"
          value={currentAdvice.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="h-24 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>
      
      <Button 
        onClick={handleAddAdvice}
        className="w-full btn-3d"
      >
        Add Recommendation
      </Button>
      
      {adviceList.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Current Recommendations</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto p-2">
            {adviceList.map((advice) => (
              <Card key={advice.id} className="dashboard-card-glow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{advice.item}</h4>
                      <p className="text-sm text-muted-foreground">{advice.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          advice.priority === 'Low' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                            : advice.priority === 'Medium' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                            : advice.priority === 'High' 
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {advice.priority}
                        </span>
                        <span className="text-xs">{advice.type}</span>
                        {advice.estimatedCost && (
                          <span className="text-xs">${advice.estimatedCost.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeAdvice(advice.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
