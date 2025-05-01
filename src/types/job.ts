
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  vin?: string;
  color?: string;
  mileage?: number;
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "Gas" | "Other";
  transmission?: "Automatic" | "Manual" | "Semi-automatic" | "CVT" | "Other";
  customerNotes?: string;
}

export interface JobCard {
  id: string;
  createdAt: string;
  updatedAt: string;
  jobNumber: string;
  status: "Pending" | "In Progress" | "Completed" | "On Hold" | "Canceled";
  vehicle: Vehicle;
  customerId: string;
  customerName: string;
  technicianId?: string;
  technicianName?: string;
  description: string;
  diagnosis?: string;
  estimatedCost?: number;
  finalCost?: number;
  estimatedCompletionDate?: string;
  completedDate?: string;
  partsUsed?: {
    id: string;
    name: string;
    quantity: number;
    cost: number;
  }[];
  laborHours?: number;
  laborCost?: number;
  recommendations?: string[];
  vehicleAdvice?: {
    type: "maintenance" | "repair" | "upgrade";
    description: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    estimatedCost?: number;
  }[];
}
