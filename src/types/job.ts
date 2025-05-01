
export type JobStatus = "Pending" | "Completed" | "In Progress" | "On Hold" | "Canceled";
export type JobPriority = "Low" | "Medium" | "High" | "Critical";

export interface Part {
  name: string;
  quantity: number;
  cost: number;
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

export interface JobCard {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: JobStatus;
  priority: JobPriority;
  technicianName: string;
  createdDate: string;
  completedDate: string | null;
  description: string;
  estimatedCost: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistration: string;
  jobDescription: string;
  technicianNotes: string;
  scheduledDate: string;
  parts: Part[];
  labor: Labor;
  totalCost: number;
  vehicleAdvice: VehicleAdvice[];
}
