
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { JobCard as JobCardType, VehicleAdvice } from "@/types/job";
import { Car, Calendar, AlertTriangle, CheckCircle, Clock, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface JobCardProps {
  job: JobCardType;
  onClick?: () => void;
  isSelected?: boolean;
}

const JobCard = ({ job, onClick, isSelected }: JobCardProps) => {
  const [showAdvice, setShowAdvice] = useState(false);
  const [showAdviceForm, setShowAdviceForm] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState<VehicleAdvice>({
    id: '',
    type: 'maintenance',
    item: '',
    condition: 'Good',
    description: '',
    priority: 'Low',
    notes: '',
    estimatedCost: undefined
  });
  
  // Normalize status to lowercase for consistent comparison
  const normalizedStatus = job.status ? job.status.toLowerCase() : "";
  
  const statusMap = {
    "scheduled": { icon: Calendar, label: "Scheduled", color: "bg-blue-100 text-blue-800" },
    "in-progress": { icon: Clock, label: "In Progress", color: "bg-amber-100 text-amber-800" },
    "in progress": { icon: Clock, label: "In Progress", color: "bg-amber-100 text-amber-800" },
    "completed": { icon: CheckCircle, label: "Completed", color: "bg-green-100 text-green-800" },
    "attention": { icon: AlertTriangle, label: "Needs Attention", color: "bg-red-100 text-red-800" },
    "pending": { icon: Clock, label: "Pending", color: "bg-gray-100 text-gray-800" }
  };

  const StatusIcon = normalizedStatus && statusMap[normalizedStatus as keyof typeof statusMap] 
    ? statusMap[normalizedStatus as keyof typeof statusMap].icon 
    : Clock;

  const statusLabel = normalizedStatus && statusMap[normalizedStatus as keyof typeof statusMap]
    ? statusMap[normalizedStatus as keyof typeof statusMap].label
    : "Unknown";

  const statusColor = normalizedStatus && statusMap[normalizedStatus as keyof typeof statusMap]
    ? statusMap[normalizedStatus as keyof typeof statusMap].color
    : "bg-gray-100 text-gray-800";

  // Safely handle date formatting
  const formatSafeDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return formatDate(new Date(dateString));
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  const handleInputChange = (field: keyof VehicleAdvice, value: string | number) => {
    setCurrentAdvice({
      ...currentAdvice,
      [field]: value
    });
  };

  const addAdvice = () => {
    if (!currentAdvice.item || !currentAdvice.description) {
      // We would show an error toast here
      return;
    }

    // In a real app, we would send this to the server
    console.log("New advice:", currentAdvice);
    
    setShowAdviceForm(false);
    // We would refresh the job data here
  };

  // Render advice items if available
  const renderVehicleAdvice = () => {
    if (!job.vehicleAdvice || job.vehicleAdvice.length === 0) {
      return (
        <div className="py-2 text-center text-sm text-muted-foreground">
          No vehicle advice available
        </div>
      );
    }

    return (
      <div className="space-y-2 mt-2">
        {job.vehicleAdvice.map((advice: VehicleAdvice) => (
          <div key={advice.id} className="bg-muted p-2 rounded-md text-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium">{advice.item}: </span>
                <span>{advice.description}</span>
              </div>
              <Badge className={
                advice.priority.toLowerCase() === "low" ? "bg-blue-100 text-blue-800" :
                advice.priority.toLowerCase() === "medium" ? "bg-amber-100 text-amber-800" :
                advice.priority.toLowerCase() === "high" ? "bg-orange-100 text-orange-800" :
                "bg-red-100 text-red-800"
              }>
                {advice.priority}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {advice.notes && <p>{advice.notes}</p>}
              {advice.estimatedCost && <p className="font-medium">Est. cost: ${advice.estimatedCost.toFixed(2)}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Vehicle advice form
  const renderAdviceForm = () => {
    return (
      <div className="space-y-4 p-2 border-t mt-2">
        <h4 className="font-medium">Add Vehicle Recommendation</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="item">Component</Label>
            <Input
              id="item"
              placeholder="e.g., Brakes, Engine"
              value={currentAdvice.item}
              onChange={(e) => handleInputChange('item', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="type">Type</Label>
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
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the recommendation"
            value={currentAdvice.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={currentAdvice.priority}
              onValueChange={(value) => handleInputChange('priority', value as any)}
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
          
          <div>
            <Label htmlFor="estimatedCost">Est. Cost ($)</Label>
            <Input
              id="estimatedCost"
              type="number"
              placeholder="0.00"
              value={currentAdvice.estimatedCost || ''}
              onChange={(e) => handleInputChange('estimatedCost', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => setShowAdviceForm(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={addAdvice}>
            Add Recommendation
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : ''
      } max-w-full`} 
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl truncate">{job.vehicleMake} {job.vehicleModel}</h3>
          <Badge className={`${statusColor} text-sm px-2 py-1`}>
            <StatusIcon className="h-3.5 w-3.5 mr-1" />
            {statusLabel}
          </Badge>
        </div>
        <p className="text-base text-muted-foreground">
          {job.vehicleRegistration} ({job.vehicleYear})
        </p>
      </CardHeader>
      <CardContent className="pb-3 space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-base font-medium">Customer</p>
            <p className="text-base">{job.customerName}</p>
          </div>
          <div>
            <p className="text-base font-medium">Description</p>
            <p className="text-base line-clamp-3">{job.jobDescription}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-base">
            <div>
              <p className="font-medium">Created</p>
              <p>{formatSafeDate(job.createdAt || job.createdDate)}</p>
            </div>
            {(job.completedAt || job.completedDate) && (
              <div>
                <p className="font-medium">Completed</p>
                <p>{formatSafeDate(job.completedAt || job.completedDate)}</p>
              </div>
            )}
            {job.scheduledDate && !(job.completedAt || job.completedDate) && (
              <div>
                <p className="font-medium">Scheduled</p>
                <p>{formatSafeDate(job.scheduledDate)}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Vehicle Advice Section - Collapsible */}
        <Collapsible 
          open={showAdvice} 
          onOpenChange={setShowAdvice}
          className="border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full flex items-center justify-between"
              onClick={(e) => {
                e.stopPropagation();
                setShowAdvice(!showAdvice);
              }}
            >
              <span>Vehicle Recommendations</span>
              {showAdvice ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            {showAdviceForm ? renderAdviceForm() : (
              <>
                {renderVehicleAdvice()}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAdviceForm(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Recommendation
                </Button>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex items-center text-base text-muted-foreground">
          <Car className="h-4 w-4 mr-1" />
          {job.parts && job.parts.length} parts | ${job.totalCost ? job.totalCost.toFixed(2) : "0.00"}
        </div>
        {normalizedStatus !== "completed" && (
          <Button variant="secondary" size="sm">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
