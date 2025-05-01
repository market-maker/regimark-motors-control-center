
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { JobCard as JobCardType, Vehicle } from "@/types/job";
import { motion } from "framer-motion";

const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(4, "Year is required"),
  licensePlate: z.string().min(1, "License plate is required"),
  vin: z.string().optional(),
  color: z.string().optional(),
  mileage: z.number().optional(),
  fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid", "Gas", "Other"]).optional(),
  transmission: z.enum(["Automatic", "Manual", "Semi-automatic", "CVT", "Other"]).optional(),
  customerNotes: z.string().optional(),
});

const jobCardSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerId: z.string().optional(),
  description: z.string().min(1, "Job description is required"),
  technicianName: z.string().optional(),
  estimatedCompletionDate: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "On Hold", "Canceled"]).default("Pending"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;
type JobCardFormData = z.infer<typeof jobCardSchema>;

interface JobCardFormProps {
  onSubmit: (jobData: Partial<JobCardType>) => void;
  existingVehicle?: Vehicle;
  onCancel: () => void;
}

export const JobCardForm = ({ onSubmit, existingVehicle, onCancel }: JobCardFormProps) => {
  const [activeTab, setActiveTab] = useState("vehicle");
  
  const vehicleForm = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: existingVehicle || {
      make: "",
      model: "",
      year: new Date().getFullYear().toString(),
      licensePlate: "",
    }
  });
  
  const jobForm = useForm<JobCardFormData>({
    resolver: zodResolver(jobCardSchema),
    defaultValues: {
      customerName: "",
      description: "",
      status: "Pending",
    }
  });

  const handleVehicleSubmit = (data: VehicleFormData) => {
    setActiveTab("job");
  };

  const handleJobSubmit = (data: JobCardFormData) => {
    const vehicleData = vehicleForm.getValues();
    
    const combinedData: Partial<JobCardType> = {
      ...data,
      vehicle: {
        id: existingVehicle?.id || Math.random().toString(36).substring(2, 9),
        ...vehicleData,
        mileage: vehicleData.mileage || 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      jobNumber: `JOB-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    
    onSubmit(combinedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Job Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="vehicle">Vehicle Information</TabsTrigger>
              <TabsTrigger value="job" disabled={!vehicleForm.formState.isValid}>Job Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicle" className="space-y-4">
              <form onSubmit={vehicleForm.handleSubmit(handleVehicleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Input id="make" {...vehicleForm.register("make")} />
                    {vehicleForm.formState.errors.make && (
                      <p className="text-xs text-red-500">{vehicleForm.formState.errors.make.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input id="model" {...vehicleForm.register("model")} />
                    {vehicleForm.formState.errors.model && (
                      <p className="text-xs text-red-500">{vehicleForm.formState.errors.model.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input id="year" {...vehicleForm.register("year")} />
                    {vehicleForm.formState.errors.year && (
                      <p className="text-xs text-red-500">{vehicleForm.formState.errors.year.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate *</Label>
                    <Input id="licensePlate" {...vehicleForm.register("licensePlate")} />
                    {vehicleForm.formState.errors.licensePlate && (
                      <p className="text-xs text-red-500">{vehicleForm.formState.errors.licensePlate.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN (Optional)</Label>
                    <Input id="vin" {...vehicleForm.register("vin")} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color">Color (Optional)</Label>
                    <Input id="color" {...vehicleForm.register("color")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (Optional)</Label>
                    <Input 
                      id="mileage" 
                      type="number" 
                      min="0" 
                      {...vehicleForm.register("mileage", { 
                        valueAsNumber: true 
                      })} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select
                      onValueChange={(value) => vehicleForm.setValue("fuelType", value as any)}
                      defaultValue={vehicleForm.getValues("fuelType")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Gas">Gas</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    onValueChange={(value) => vehicleForm.setValue("transmission", value as any)}
                    defaultValue={vehicleForm.getValues("transmission")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Semi-automatic">Semi-automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerNotes">Customer Notes (Optional)</Label>
                  <Textarea id="customerNotes" {...vehicleForm.register("customerNotes")} />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Continue to Job Details
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="job" className="space-y-4">
              <form onSubmit={jobForm.handleSubmit(handleJobSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input id="customerName" {...jobForm.register("customerName")} />
                  {jobForm.formState.errors.customerName && (
                    <p className="text-xs text-red-500">{jobForm.formState.errors.customerName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea id="description" {...jobForm.register("description")} />
                  {jobForm.formState.errors.description && (
                    <p className="text-xs text-red-500">{jobForm.formState.errors.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="technicianName">Assigned Technician (Optional)</Label>
                    <Input id="technicianName" {...jobForm.register("technicianName")} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCompletionDate">Estimated Completion Date</Label>
                    <Input 
                      id="estimatedCompletionDate" 
                      type="date" 
                      {...jobForm.register("estimatedCompletionDate")} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) => jobForm.setValue("status", value as any)}
                    defaultValue={jobForm.getValues("status")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("vehicle")}>
                    Back to Vehicle
                  </Button>
                  <Button type="submit">
                    Create Job Card
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
