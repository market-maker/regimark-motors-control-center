
import { ReceiptStatus } from "@/types/receipt";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: ReceiptStatus;
}

export const determineStatus = (stock: number): ReceiptStatus => {
  if (stock <= 0) return "Out of Stock";
  if (stock < 5) return "Low Stock";
  return "In Stock";
};
