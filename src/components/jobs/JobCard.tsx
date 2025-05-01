
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Car, Wrench } from "lucide-react"; // Replaced Tool with Wrench
import { JobCard as JobCardType } from "@/types/job";

interface JobCardProps {
  job: JobCardType;
  onView: (job: JobCardType) => void;
}

const JobCard = ({ job, onView }: JobCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600";
      case "In Progress":
        return "bg-blue-500 hover:bg-blue-600";
      case "Pending":
        return "bg-amber-500 hover:bg-amber-600";
      case "On Hold":
        return "bg-purple-500 hover:bg-purple-600";
      case "Canceled":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Job #{job.jobNumber}</CardTitle>
          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{job.description}</p>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Car size={16} className="text-muted-foreground" />
            <span className="text-sm">
              {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-muted-foreground" />
            <span className="text-sm">{job.customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-muted-foreground" />
            <span className="text-sm">{job.technicianName || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm">Due: {formatDate(job.estimatedCompletionDate || '')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm">Created: {formatDate(job.createdAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onView(job)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
