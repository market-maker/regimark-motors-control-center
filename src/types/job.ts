export type JobStatus = "Pending" | "pending" | "Completed" | "completed" | "In Progress" | "in progress" | "in-progress" | "On Hold" | "on hold" | "Canceled" | "canceled" | "Scheduled" | "scheduled";
export type JobPriority = "Low" | "Medium" | "High" | "Critical" | "none" | "low" | "medium";

export interface Part {
  id?: string;
  name: string;
  quantity: number;
  cost: number;
  price?: number;
  isSplit?: boolean;
  notes?: string;
}

export interface Labor {
  hours: number;
  rate: number;
}

export interface VehicleAdvice {
  id: string;
  type: "maintenance" | "repair" | "upgrade";
  item: string;
  condition: string;
  description: string;
  priority: JobPriority;
  notes: string;
  estimatedCost?: number;
}

export interface Vehicle {
  id?: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  registration?: string;
  vin?: string;
  color?: string;
  mileage?: number;
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "Gas" | "Other";
  transmission?: "Automatic" | "Manual" | "Semi-automatic" | "CVT" | "Other";
  customerNotes?: string;
  engineType?: string;
  transmissionType?: string;
}

export interface JobCard {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerId?: string;
  status: JobStatus;
  priority: JobPriority;
  technicianName: string;
  technicianId?: string;
  createdDate: string;
  createdAt?: string;
  completedDate: string | null;
  completedAt?: string | null;
  description: string;
  estimatedCost: number;
  finalCost?: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistration: string;
  jobDescription: string;
  jobNumber?: string;
  diagnosis?: string;
  technicianNotes: string;
  scheduledDate: string;
  estimatedCompletionDate?: string;
  parts: Part[];
  labor: Labor;
  laborHours?: number;
  laborCost?: number;
  totalCost: number;
  vehicleAdvice: VehicleAdvice[];
  partsUsed?: Part[];
  recommendations?: string[];
  vehicle?: Vehicle;
  updatedAt?: string;
}
