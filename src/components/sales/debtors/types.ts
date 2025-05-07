
import { Customer, DebtRecord } from "@/types/customer";

export interface DebtSummary {
  totalOutstanding: number;
  overdueAmount: number;
  totalCustomersWithDebt: number;
}

export interface DebtorRecord {
  customer: Customer;
  outstandingAmount: number;
  status: string;
  isHighlighted: boolean;
}
