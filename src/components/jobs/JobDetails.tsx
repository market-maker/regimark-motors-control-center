
import { useState } from "react";
import { JobCard } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VehicleAdviceForm } from "./VehicleAdviceForm";
import { Check, X, Calendar, Clock, Car, User, Wrench, PenLine, Settings, FileSpreadsheet } from "lucide-react"; // Replaced Tool with Wrench

interface JobDetailsProps {
  job: JobCard;
  onEdit?: (job: JobCard) => void;
  onClose: () => void;
}

const JobDetails = ({ job, onEdit, onClose }: JobDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAdviceForm, setShowAdviceForm] = useState(false);
  
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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return 'Not set';
    return `$${amount.toFixed(2)}`;
  };
  
  const handleAddAdvice = (advice: any) => {
    // Here we would typically update the job with the new advice
    // For now, we'll just close the dialog
    setShowAdviceForm(false);
    // In a real application, you would dispatch an action or call a mutation
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Job #{job.jobNumber}</h2>
            <p className="text-muted-foreground">Created: {formatDate(job.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
                <PenLine className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="advice">Advice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
                    <p>{job.customerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Technician</h4>
                    <p>{job.technicianName || 'Unassigned'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                  <p>{job.description}</p>
                </div>
                
                {job.diagnosis && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Diagnosis</h4>
                    <p>{job.diagnosis}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Estimated Cost</h4>
                    <p>{formatCurrency(job.estimatedCost)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Final Cost</h4>
                    <p>{formatCurrency(job.finalCost)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Labor Hours</h4>
                    <p>{job.laborHours || 'Not set'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Estimated Completion</h4>
                    <p>{formatDate(job.estimatedCompletionDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Completed Date</h4>
                    <p>{formatDate(job.completedDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {job.partsUsed && job.partsUsed.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Parts Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-2">Part Name</th>
                          <th className="text-center p-2">Quantity</th>
                          <th className="text-right p-2">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.partsUsed.map(part => (
                          <tr key={part.id} className="border-t">
                            <td className="p-2">{part.name}</td>
                            <td className="text-center p-2">{part.quantity}</td>
                            <td className="text-right p-2">${part.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="border-t bg-muted">
                          <td colSpan={2} className="p-2 text-right font-medium">Total:</td>
                          <td className="p-2 text-right font-medium">
                            ${job.partsUsed.reduce((sum, part) => sum + (part.cost * part.quantity), 0).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="vehicle" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Make</h4>
                    <p>{job.vehicle.make}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Model</h4>
                    <p>{job.vehicle.model}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Year</h4>
                    <p>{job.vehicle.year}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">License Plate</h4>
                    <p>{job.vehicle.licensePlate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">VIN</h4>
                    <p>{job.vehicle.vin || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Color</h4>
                    <p>{job.vehicle.color || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Mileage</h4>
                    <p>{job.vehicle.mileage ? `${job.vehicle.mileage.toLocaleString()} miles` : 'Not recorded'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Fuel Type</h4>
                    <p>{job.vehicle.fuelType || 'Not specified'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Transmission</h4>
                  <p>{job.vehicle.transmission || 'Not specified'}</p>
                </div>
                
                {job.vehicle.customerNotes && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer Notes</h4>
                    <p className="text-sm">{job.vehicle.customerNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advice" className="pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Vehicle Advice</CardTitle>
                <Button size="sm" onClick={() => setShowAdviceForm(true)}>Add Advice</Button>
              </CardHeader>
              <CardContent>
                {job.vehicleAdvice && job.vehicleAdvice.length > 0 ? (
                  <div className="space-y-4">
                    {job.vehicleAdvice.map((advice, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium capitalize">{advice.type}</h4>
                            <p className="text-sm text-muted-foreground">{advice.description}</p>
                          </div>
                          <Badge 
                            className={
                              advice.priority === "Critical" ? "bg-red-500" :
                              advice.priority === "High" ? "bg-amber-500" :
                              advice.priority === "Medium" ? "bg-blue-500" :
                              "bg-green-500"
                            }
                          >
                            {advice.priority}
                          </Badge>
                        </div>
                        {advice.estimatedCost !== undefined && (
                          <p className="text-sm mt-2">
                            Estimated Cost: ${advice.estimatedCost.toFixed(2)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No advice records found. Add vehicle advice to help the customer maintain their vehicle.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            {job.status !== "Completed" && (
              <Button className="bg-green-500 hover:bg-green-600">
                <Check className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
            )}
            {job.status !== "Canceled" && job.status !== "Completed" && (
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Job
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle Advice Form Dialog */}
      <Dialog open={showAdviceForm} onOpenChange={setShowAdviceForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Vehicle Advice</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <VehicleAdviceForm 
              onSubmit={handleAddAdvice} 
              onCancel={() => setShowAdviceForm(false)} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobDetails;
