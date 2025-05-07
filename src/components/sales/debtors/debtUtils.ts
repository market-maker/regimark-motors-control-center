
import { toast } from "@/components/ui/sonner";

export const getStatusColor = (status: string, highlighted: boolean = false) => {
  if (highlighted) {
    return "bg-red-100 text-red-800 font-bold animate-pulse";
  }
  
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800";
    case "Partially Paid":
      return "bg-blue-100 text-blue-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export { toast };
