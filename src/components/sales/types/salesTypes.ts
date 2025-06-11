
import { Customer } from "@/types/customer";
import { ProductComponent } from "@/types/receipt";

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  isSplit?: boolean;
  components?: ProductComponent[];
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  image?: string;
  isSplit?: boolean;
  components?: ProductComponent[];
  notes?: string;
}

export interface SaleData {
  saleId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  discountAmount?: number;
  finalTotal?: number;
  cashReceived?: number;
  change?: number;
  isCredit?: boolean;
  dueDate?: string;
  status: "Completed" | "Pending" | "Revoked";
}
