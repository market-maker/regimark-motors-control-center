
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Car, User, Tool, ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { JobCard as JobCardType } from "@/types/job";
import { motion, AnimatePresence } from "framer-motion";

interface JobCardProps {
  job: JobCardType;
  onViewDetails?: (job: JobCardType) => void;
}

export const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "In Progress": return "bg-blue-500";
      case "Completed": return "bg-green-500";
      case "On Hold": return "bg-orange-500";
      case "Canceled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg font-semibold">Job #{job.jobNumber}</span>
                <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              </CardTitle>
              <CardDescription className="mt-1">{formatDate(job.createdAt)}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Car size={16} className="flex-shrink-0" />
              <span>{job.vehicle.make} {job.vehicle.model} ({job.vehicle.year}) - {job.vehicle.licensePlate}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} className="flex-shrink-0" />
              <span>{job.customerName}</span>
            </div>
            
            <p className="text-sm line-clamp-2">{job.description}</p>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-4 space-y-4 overflow-hidden"
              >
                {job.diagnosis && (
                  <div>
                    <h4 className="text-sm font-medium">Diagnosis</h4>
                    <p className="text-sm">{job.diagnosis}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium">Timeline</h4>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      <span>Created: {formatDate(job.createdAt)}</span>
                    </div>
                    {job.estimatedCompletionDate && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={14} />
                        <span>Est. Completion: {formatDate(job.estimatedCompletionDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {job.technicianName && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tool size={14} className="flex-shrink-0" />
                    <span>Technician: {job.technicianName}</span>
                  </div>
                )}
                
                {job.vehicleAdvice && job.vehicleAdvice.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Wrench size={14} />
                      Vehicle Advice
                    </h4>
                    <ul className="mt-1 space-y-2">
                      {job.vehicleAdvice.map((advice, index) => (
                        <li key={index} className="text-xs p-2 bg-muted rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium capitalize">{advice.type}</span>
                            <Badge variant={
                              advice.priority === "Low" ? "outline" : 
                              advice.priority === "Medium" ? "secondary" :
                              advice.priority === "High" ? "destructive" : "outline"
                            }>
                              {advice.priority}
                            </Badge>
                          </div>
                          <p className="mt-1">{advice.description}</p>
                          {advice.estimatedCost !== undefined && (
                            <p className="mt-1 font-medium">Est. Cost: ${advice.estimatedCost.toFixed(2)}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.estimatedCost !== undefined && (
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-sm">Estimated Cost:</span>
                    <span className="font-medium">${job.estimatedCost.toFixed(2)}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => onViewDetails && onViewDetails(job)}
          >
            View Full Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
