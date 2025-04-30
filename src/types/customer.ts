
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
  highlighted?: boolean; // Whether this debt should be highlighted (for overdue debts)
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

export interface Sale {
  id: string;
  date: string;
  customer: Customer;
  items: SaleItem[];
  total: number;
  subtotal: number;
  tax: number;
  status: "Completed" | "Pending" | "Revoked";
  discount?: {
    type: "Percentage" | "Fixed";
    value: number;
  };
  paymentMethod: "Cash" | "Card" | "Credit";
  storeId: string; // The store where the sale was made
}

export interface SaleItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  type: "Main" | "Secondary";
  address?: string;
  phone?: string;
  email?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "sale" | "inventory" | "debtor" | "system";
  read: boolean;
  date: string;
  linkTo?: string; // URL to navigate to when clicked
}

export interface PersonalExpense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receiptImage?: string;
  userId: string; // ID of the user who created the expense
}
