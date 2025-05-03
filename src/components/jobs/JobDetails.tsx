
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/lib/utils";
import { JobCard } from "@/types/job";
import { 
  Car, Calendar, User, Phone, FileText, 
  Wrench, PackageCheck, AlertTriangle, Info
} from "lucide-react";

interface JobDetailsProps {
  job: JobCard;
  onClose: () => void;
  onUpdate: (job: JobCard) => void;
}

const JobDetails = ({ job, onClose, onUpdate }: JobDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");
  
  // Normalize status to lowercase for consistent comparison
  const normalizedStatus = job.status ? job.status.toLowerCase() : "";
  
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "completed": return "bg-green-100 text-green-800";
      case "in progress": 
      case "in-progress": return "bg-amber-100 text-amber-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const markAsInProgress = () => {
    onUpdate({
      ...job,
      status: "in-progress"
    });
  };
  
  const markAsCompleted = () => {
    onUpdate({
      ...job,
      status: "completed",
      completedAt: new Date().toISOString()
    });
  };

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {job.vehicleMake} {job.vehicleModel} ({job.vehicleYear})
          </h2>
          <p className="text-muted-foreground">
            Registration: {job.vehicleRegistration}
          </p>
        </div>
        <Badge className={getStatusColor(normalizedStatus)}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="advice">Vehicle Advice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-4 w-4" /> Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Make</p>
                <p>{job.vehicleMake}</p>
              </div>
              <div>
                <p className="font-medium">Model</p>
                <p>{job.vehicleModel}</p>
              </div>
              <div>
                <p className="font-medium">Year</p>
                <p>{job.vehicleYear}</p>
              </div>
              <div>
                <p className="font-medium">Registration</p>
                <p>{job.vehicleRegistration}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Name</p>
                <p>{job.customerName}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p>{job.customerPhone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="font-medium">Customer ID</p>
                <p>{job.customerId || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-4 w-4" /> Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Description</p>
                <p>{job.jobDescription}</p>
              </div>
              <div>
                <p className="font-medium">Technician Notes</p>
                <p>{job.technicianNotes || "No notes added yet."}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                {job.scheduledDate && (
                  <div>
                    <p className="font-medium">Scheduled</p>
                    <p>{formatSafeDate(job.scheduledDate)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PackageCheck className="mr-2 h-4 w-4" /> Parts Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!job.parts || job.parts.length === 0 ? (
                <p className="text-muted-foreground">No parts added to this job.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-12 font-medium">
                    <div className="col-span-6">Part</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Total</div>
                  </div>
                  <div className="divide-y">
                    {job.parts.map((part, index) => (
                      <div key={part.id || `part-${index}`} className="grid grid-cols-12 py-2">
                        <div className="col-span-6">{part.name}</div>
                        <div className="col-span-2">{part.quantity}</div>
                        <div className="col-span-2">${part.cost.toFixed(2)}</div>
                        <div className="col-span-2">${(part.quantity * part.cost).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-4 font-medium">
                    <div>Parts Subtotal</div>
                    <div>${job.parts.reduce((sum, part) => sum + (part.quantity * part.cost), 0).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="labor">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-4 w-4" /> Labor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!job.labor ? (
                <p className="text-muted-foreground">No labor information recorded for this job.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="font-medium">Hours</p>
                      <p>{job.labor.hours}</p>
                    </div>
                    <div>
                      <p className="font-medium">Rate</p>
                      <p>${job.labor.rate.toFixed(2)}/hr</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 font-medium">
                    <div>Labor Subtotal</div>
                    <div>${(job.labor.hours * job.labor.rate).toFixed(2)}</div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <div>Job Total</div>
                      <div>${job.totalCost ? job.totalCost.toFixed(2) : "0.00"}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-4 w-4" /> Vehicle Inspection & Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!job.vehicleAdvice || job.vehicleAdvice.length === 0 ? (
                <p className="text-muted-foreground">No inspection data or advice recorded for this vehicle.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-12 font-medium">
                    <div className="col-span-3">Item</div>
                    <div className="col-span-3">Condition</div>
                    <div className="col-span-4">Notes</div>
                    <div className="col-span-2">Priority</div>
                  </div>
                  <div className="divide-y">
                    {job.vehicleAdvice.map((advice) => (
                      <div key={advice.id} className="grid grid-cols-12 py-2">
                        <div className="col-span-3">{advice.item}</div>
                        <div className="col-span-3">
                          <Badge variant={
                            advice.condition === "Good" ? "outline" :
                            advice.condition === "Fair" ? "secondary" :
                            "destructive"
                          } className="font-normal">
                            {advice.condition}
                          </Badge>
                        </div>
                        <div className="col-span-4">{advice.notes}</div>
                        <div className="col-span-2">
                          {advice.priority !== "none" && (
                            <Badge variant={
                              advice.priority === "low" || advice.priority === "Low" ? "outline" :
                              advice.priority === "medium" || advice.priority === "Medium" ? "secondary" :
                              "destructive"
                            }>
                              {advice.priority}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="space-x-2">
          {normalizedStatus === "scheduled" && (
            <Button onClick={markAsInProgress}>
              Mark as In Progress
            </Button>
          )}
          {(normalizedStatus === "in progress" || normalizedStatus === "in-progress") && (
            <Button onClick={markAsCompleted}>
              Mark as Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
