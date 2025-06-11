import { Customer, DebtRecord } from "@/types/customer";
import { toast } from "sonner";

export const addDebtRecord = (
  customers: Customer[], 
  selectedCustomer: Customer,
  debtAmount: string,
  debtDueDate: string, 
  debtNotes: string
): Customer[] => {
  if (!selectedCustomer) return customers;
  if (!debtAmount || !debtDueDate) {
    toast.error("Please fill in all required fields");
    return customers;
  }
  
  const newDebt: DebtRecord = {
    id: `d${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: parseFloat(debtAmount),
    dueDate: debtDueDate,
    status: "Pending",
    notes: debtNotes
  };
  
  return customers.map(customer => {
    if (customer.id === selectedCustomer.id) {
      return {
        ...customer,
        debtRecords: [...(customer.debtRecords || []), newDebt]
      };
    }
    return customer;
  });
};

export const recordDebtPayment = (
  customers: Customer[],
  selectedCustomer: Customer | null, 
  selectedDebt: DebtRecord | null,
  paymentAmount: string
): Customer[] => {
  if (!selectedDebt || !selectedCustomer) return customers;
  if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
    toast.error("Please enter a valid payment amount");
    return customers;
  }
  
  const paymentAmountNum = parseFloat(paymentAmount);
  const remainingAmount = selectedDebt.amount - paymentAmountNum;
  
  let newStatus: "Paid" | "Partially Paid" | "Pending" | "Overdue" = "Paid";
  if (remainingAmount > 0) {
    newStatus = "Partially Paid";
  }
  
  const payment = {
    date: new Date().toISOString().split('T')[0],
    amount: paymentAmountNum
  };
  
  return customers.map(customer => {
    if (customer.id === selectedCustomer.id) {
      const updatedDebtRecords = (customer.debtRecords || []).map(debt => {
        if (debt.id === selectedDebt.id) {
          return {
            ...debt,
            status: newStatus,
            paymentHistory: [...(debt.paymentHistory || []), payment]
          };
        }
        return debt;
      });
      
      return {
        ...customer,
        debtRecords: updatedDebtRecords
      };
    }
    return customer;
  });
};
