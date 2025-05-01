
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { JobCard as JobCardType } from "@/types/job";
import { AlertCircle, Car, Clock, Tool, User, Calendar, Wrench } from "lucide-react";
import { VehicleAdviceForm } from "./VehicleAdviceForm";
import { toast } from "sonner";

interface JobDetailsProps {
  job: JobCardType;
  onClose: () => void;
  onUpdateJob: (updatedJob: JobCardType) => void;
}

export const JobDetails = ({ job, onClose, onUpdateJob }: JobDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showAdviceForm, setShowAdviceForm] = useState(false);
  const [notes, setNotes] = useState(job.diagnosis || "");
  const [estimatedCost, setEstimatedCost] = useState(job.estimatedCost?.toString() || "");

  const handleUpdateNotes = () => {
    const updatedJob = {
      ...job,
      diagnosis: notes,
      estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined
    };
    onUpdateJob(updatedJob);
    toast.success("Job details updated successfully");
  };

  const handleAdviceSubmit = (advice: any) => {
    const updatedAdvice = [...(job.vehicleAdvice || []), advice];
    const updatedJob = {
      ...job,
      vehicleAdvice: updatedAdvice
    };
    onUpdateJob(updatedJob);
    setShowAdviceForm(false);
    toast.success("Vehicle advice added successfully");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Job Card #{job.jobNumber}</span>
            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="advice">Advice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Created On</Label>
                    <p className="font-medium">{formatDate(job.createdAt)}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <p><Badge className={getStatusColor(job.status)}>{job.status}</Badge></p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm text-muted-foreground">Customer</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={16} />
                    <p className="font-medium">{job.customerName}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Technician</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Tool size={16} />
                    <p className="font-medium">{job.technicianName || "Not assigned"}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Description</Label>
                  <p className="mt-1 text-sm">{job.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Estimated Completion</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} />
                      <p>{job.estimatedCompletionDate ? formatDate(job.estimatedCompletionDate) : "Not specified"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Completed On</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={16} />
                      <p>{job.completedDate ? formatDate(job.completedDate) : "Not completed"}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Diagnosis Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add diagnosis notes here..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <Input 
                    id="estimatedCost" 
                    type="number"
                    min="0"
                    step="0.01" 
                    value={estimatedCost} 
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                
                <Button onClick={handleUpdateNotes} className="w-full">
                  Update Job Details
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vehicle">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Car size={18} />
                    <h3 className="text-lg font-medium">
                      {job.vehicle.make} {job.vehicle.model} ({job.vehicle.year})
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">License Plate</Label>
                      <p className="font-medium">{job.vehicle.licensePlate}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">VIN</Label>
                      <p>{job.vehicle.vin || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Color</Label>
                      <p>{job.vehicle.color || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Mileage</Label>
                      <p>{job.vehicle.mileage ? `${job.vehicle.mileage} km` : "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Fuel Type</Label>
                      <p>{job.vehicle.fuelType || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Transmission</Label>
                      <p>{job.vehicle.transmission || "Not specified"}</p>
                    </div>
                  </div>
                  
                  {job.vehicle.customerNotes && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Customer Notes</Label>
                      <p className="text-sm mt-1">{job.vehicle.customerNotes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advice">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Vehicle Advice</CardTitle>
                <Button onClick={() => setShowAdviceForm(true)}>
                  Add Advice
                </Button>
              </CardHeader>
              <CardContent>
                {showAdviceForm ? (
                  <VehicleAdviceForm 
                    onSubmit={handleAdviceSubmit}
                    onCancel={() => setShowAdviceForm(false)}
                  />
                ) : (
                  <div className="space-y-4">
                    {job.vehicleAdvice && job.vehicleAdvice.length > 0 ? (
                      job.vehicleAdvice.map((advice, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Wrench size={16} />
                              <h4 className="font-medium capitalize">{advice.type}</h4>
                            </div>
                            <Badge variant={
                              advice.priority === "Low" ? "outline" : 
                              advice.priority === "Medium" ? "secondary" :
                              advice.priority === "High" ? "destructive" : "outline"
                            }>
                              {advice.priority}
                            </Badge>
                          </div>
                          <p className="text-sm">{advice.description}</p>
                          {advice.estimatedCost !== undefined && (
                            <p className="text-sm font-medium">Est. Cost: ${advice.estimatedCost.toFixed(2)}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No advice has been added for this vehicle yet.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
