
export interface DebtRecord {
  id: string;
  date: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Overdue" | "Partially Paid" | "Paid";
  notes?: string;
  paymentHistory?: {
    date: string;
    amount: number;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalSpent: number;
  lastVisit: string;
  status: "Active" | "Inactive";
  debtRecords?: DebtRecord[];
}
