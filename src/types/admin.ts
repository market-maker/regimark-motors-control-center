
export interface PersonalExpense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receiptImage?: string;
  userId: string; // ID of the user who created the expense
}

export interface AdminSettings {
  id: string;
  userId: string;
  allowPersonalExpenses: boolean;
  maxExpenseAmount?: number;
  requireReceipts: boolean;
  approvalRequired: boolean;
}
