
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { JobCard as JobCardType } from "@/types/job";
import { Car, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface JobCardProps {
  job: JobCardType;
  onClick?: () => void;
  isSelected?: boolean;
}

const JobCard = ({ job, onClick, isSelected }: JobCardProps) => {
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

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`} 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate">{job.vehicleMake} {job.vehicleModel}</h3>
          <Badge className={statusColor}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusLabel}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {job.vehicleRegistration} ({job.vehicleYear})
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Customer</p>
            <p className="text-sm">{job.customerName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Description</p>
            <p className="text-sm line-clamp-2">{job.jobDescription}</p>
          </div>
          <div className="flex justify-between text-sm">
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
      </CardContent>
      <CardFooter className="border-t pt-2 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Car className="h-3 w-3 mr-1" />
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
