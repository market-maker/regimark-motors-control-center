
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { JobCard as JobCardType } from "@/types/job";
import { Car, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface JobCardProps {
  job: JobCardType;
  onClick?: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const statusMap = {
    scheduled: { icon: Calendar, label: "Scheduled", color: "bg-blue-100 text-blue-800" },
    "in-progress": { icon: Clock, label: "In Progress", color: "bg-amber-100 text-amber-800" },
    completed: { icon: CheckCircle, label: "Completed", color: "bg-green-100 text-green-800" },
    attention: { icon: AlertTriangle, label: "Needs Attention", color: "bg-red-100 text-red-800" }
  };

  const StatusIcon = job.status && statusMap[job.status as keyof typeof statusMap] 
    ? statusMap[job.status as keyof typeof statusMap].icon 
    : Clock;

  const statusLabel = job.status && statusMap[job.status as keyof typeof statusMap]
    ? statusMap[job.status as keyof typeof statusMap].label
    : "Unknown";

  const statusColor = job.status && statusMap[job.status as keyof typeof statusMap]
    ? statusMap[job.status as keyof typeof statusMap].color
    : "bg-gray-100 text-gray-800";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
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
              <p>{formatDate(new Date(job.createdAt))}</p>
            </div>
            {job.completedAt && (
              <div>
                <p className="font-medium">Completed</p>
                <p>{formatDate(new Date(job.completedAt))}</p>
              </div>
            )}
            {job.scheduledDate && !job.completedAt && (
              <div>
                <p className="font-medium">Scheduled</p>
                <p>{formatDate(new Date(job.scheduledDate))}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Car className="h-3 w-3 mr-1" />
          {job.parts.length} parts | ${job.totalCost.toFixed(2)}
        </div>
        {job.status !== "completed" && (
          <Button variant="secondary" size="sm">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
