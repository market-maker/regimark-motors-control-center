
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { JobCard, Vehicle } from "@/types/job"; // Import Vehicle type

interface JobCardFormProps {
  onSubmit?: (jobCard: JobCard) => void;
  onCancel?: () => void;
  initialData?: JobCard;
}

// Mock technicians
const technicians = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" }
];

// Mock customers
const customers = [
  { id: "1", name: "Alice Brown" },
  { id: "2", name: "Bob Wilson" },
  { id: "3", name: "Carol White" }
];

const JobCardForm = ({ onSubmit, onCancel, initialData }: JobCardFormProps) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;
  
  // Form state
  const [jobNumber, setJobNumber] = useState(initialData?.jobNumber || `JOB-${Date.now().toString().slice(-6)}`);
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed" | "On Hold" | "Canceled">(initialData?.status || "Pending");
  const [customerId, setCustomerId] = useState(initialData?.customerId || "");
  const [customerName, setCustomerName] = useState(initialData?.customerName || "");
  const [technicianId, setTechnicianId] = useState(initialData?.technicianId || "");
  const [technicianName, setTechnicianName] = useState(initialData?.technicianName || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [diagnosis, setDiagnosis] = useState(initialData?.diagnosis || "");
  const [estimatedCost, setEstimatedCost] = useState<number | undefined>(initialData?.estimatedCost);
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(initialData?.estimatedCompletionDate || "");
  
  // Vehicle information
  const [make, setMake] = useState(initialData?.vehicle.make || "");
  const [model, setModel] = useState(initialData?.vehicle.model || "");
  const [year, setYear] = useState(initialData?.vehicle.year || "");
  const [licensePlate, setLicensePlate] = useState(initialData?.vehicle.licensePlate || "");
  const [vin, setVin] = useState(initialData?.vehicle.vin || "");
  const [color, setColor] = useState(initialData?.vehicle.color || "");
  const [mileage, setMileage] = useState<number | undefined>(initialData?.vehicle.mileage);
  const [fuelType, setFuelType] = useState<"Petrol" | "Diesel" | "Electric" | "Hybrid" | "Gas" | "Other" | undefined>(initialData?.vehicle.fuelType);
  const [transmission, setTransmission] = useState<"Automatic" | "Manual" | "Semi-automatic" | "CVT" | "Other" | undefined>(initialData?.vehicle.transmission);
  const [customerNotes, setCustomerNotes] = useState(initialData?.vehicle.customerNotes || "");
  
  // Additional options
  const [createInvoice, setCreateInvoice] = useState(false);
  const [sendNotification, setSendNotification] = useState(false);
  
  const handleSelectCustomer = (id: string) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setCustomerId(customer.id);
      setCustomerName(customer.name);
    }
  };
  
  const handleSelectTechnician = (id: string) => {
    const technician = technicians.find(t => t.id === id);
    if (technician) {
      setTechnicianId(technician.id);
      setTechnicianName(technician.name);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!customerName || !description || !make || !model || !year || !licensePlate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create vehicle object
    const vehicle: Vehicle = {
      id: initialData?.vehicle.id || `VEH-${Date.now().toString().slice(-6)}`,
      make, // This is required by the Vehicle interface
      model, // This is required by the Vehicle interface
      year, // This is required by the Vehicle interface
      licensePlate, // This is required by the Vehicle interface
      vin,
      color,
      mileage,
      fuelType,
      transmission,
      customerNotes
    };
    
    // Create job card object
    const jobCard: JobCard = {
      id: initialData?.id || `ID-${Date.now().toString().slice(-6)}`,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      jobNumber,
      status,
      vehicle,
      customerId,
      customerName,
      technicianId,
      technicianName,
      description,
      diagnosis: diagnosis || undefined,
      estimatedCost,
      estimatedCompletionDate: estimatedCompletionDate || undefined,
      // We're not modifying the other fields from initialData if they exist
      finalCost: initialData?.finalCost,
      completedDate: initialData?.completedDate,
      partsUsed: initialData?.partsUsed || [],
      laborHours: initialData?.laborHours,
      laborCost: initialData?.laborCost,
      recommendations: initialData?.recommendations || [],
      vehicleAdvice: initialData?.vehicleAdvice || []
    };
    
    if (onSubmit) {
      onSubmit(jobCard);
    } else {
      // If no onSubmit prop is provided, we'll simulate success
      toast.success(`Job card ${isEdit ? "updated" : "created"} successfully`);
      setTimeout(() => navigate('/jobs'), 1500);
    }
    
    // Extra actions based on options
    if (createInvoice) {
      toast.info("Invoice creation initiated");
    }
    
    if (sendNotification) {
      toast.info(`Notification will be sent to ${customerName}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobNumber">Job Number *</Label>
              <Input 
                id="jobNumber" 
                value={jobNumber}
                onChange={(e) => setJobNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                value={status} 
                onValueChange={(value: any) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select 
                value={customerId} 
                onValueChange={handleSelectCustomer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technician">Technician</Label>
              <Select 
                value={technicianId} 
                onValueChange={handleSelectTechnician}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map(technician => (
                    <SelectItem key={technician.id} value={technician.id}>
                      {technician.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                placeholder="Describe the job to be done"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea 
                id="diagnosis" 
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows={3}
                placeholder="Enter your diagnosis"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
                <Input 
                  id="estimatedCost" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={estimatedCost || ''}
                  onChange={(e) => setEstimatedCost(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedCompletionDate">Estimated Completion</Label>
                <Input 
                  id="estimatedCompletionDate" 
                  type="date"
                  value={estimatedCompletionDate}
                  onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input 
                  id="make" 
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input 
                  id="model" 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input 
                  id="year" 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate *</Label>
                <Input 
                  id="licensePlate" 
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input 
                  id="vin" 
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input 
                  id="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input 
                  id="mileage" 
                  type="number"
                  min="0"
                  value={mileage || ''}
                  onChange={(e) => setMileage(e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select 
                  value={fuelType} 
                  onValueChange={(value: any) => setFuelType(value)}
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
              
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select 
                  value={transmission} 
                  onValueChange={(value: any) => setTransmission(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerNotes">Customer Notes</Label>
              <Textarea 
                id="customerNotes" 
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={3}
                placeholder="Enter customer notes or special instructions"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={createInvoice}
              onCheckedChange={setCreateInvoice}
              id="create-invoice"
            />
            <Label htmlFor="create-invoice" className="cursor-pointer">
              Create Invoice After Submission
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={sendNotification}
              onCheckedChange={setSendNotification}
              id="send-notification"
            />
            <Label htmlFor="send-notification" className="cursor-pointer">
              Send Notification to Customer
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel || (() => navigate('/jobs'))}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Update" : "Create"} Job Card
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JobCardForm;
