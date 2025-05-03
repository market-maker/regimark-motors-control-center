
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { JobCard as JobCardType, VehicleAdvice } from "@/types/job";
import { Car, Calendar, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: JobCardType;
  onClick?: () => void;
  isSelected?: boolean;
}

const JobCard = ({ job, onClick, isSelected }: JobCardProps) => {
  const [showAdvice, setShowAdvice] = useState(false);
  
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
        
        {/* Vehicle Advice Section - Toggleable */}
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowAdvice(!showAdvice);
            }}
          >
            <Plus className="h-4 w-4" />
            {showAdvice ? "Hide" : "Show"} Vehicle Advice
          </Button>
          
          {showAdvice && (
            <div className="mt-3 border-t pt-3">
              <p className="font-medium mb-2">Vehicle Recommendations</p>
              {renderVehicleAdvice()}
            </div>
          )}
        </div>
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
