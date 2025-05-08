
import { Customer, DebtRecord } from "@/types/customer";
import { DebtSummary, DebtorRecord } from "../types";

export const calculateDebtSummary = (allDebtRecords: Array<DebtRecord & { customerName: string; customerId: string }>): DebtSummary => {
  const totalOutstanding = allDebtRecords
    .filter(debt => debt.status !== "Paid")
    .reduce((sum, debt) => sum + debt.amount, 0);
    
  const overdueAmount = allDebtRecords
    .filter(debt => debt.status === "Overdue")
    .reduce((sum, debt) => sum + debt.amount, 0);
    
  const customerIds = new Set(allDebtRecords
    .filter(debt => debt.status !== "Paid")
    .map(debt => debt.customerId)
  );
    
  return {
    totalOutstanding,
    overdueAmount,
    totalCustomersWithDebt: customerIds.size
  };
};

export const prepareDebtorsList = (filteredCustomers: Customer[]): DebtorRecord[] => {
  return filteredCustomers.map(customer => {
    // Calculate total outstanding amount
    const outstandingAmount = (customer.debtRecords || [])
      .filter(debt => debt.status !== "Paid")
      .reduce((sum, debt) => {
        // If partially paid, calculate remaining amount
        if (debt.status === "Partially Paid" && debt.paymentHistory) {
          const paidAmount = debt.paymentHistory.reduce((total, payment) => total + payment.amount, 0);
          return sum + (debt.amount - paidAmount);
        }
        return sum + debt.amount;
      }, 0);
    
    // Determine worst status
    const hasOverdue = (customer.debtRecords || []).some(debt => debt.status === "Overdue");
    const hasPending = (customer.debtRecords || []).some(debt => debt.status === "Pending");
    const hasPartial = (customer.debtRecords || []).some(debt => debt.status === "Partially Paid");
    
    let status = "No Debts";
    if (hasOverdue) status = "Overdue";
    else if (hasPending) status = "Pending";
    else if (hasPartial) status = "Partially Paid";
    
    // Determine if this row should be highlighted
    const isHighlighted = hasOverdue;
    
    return {
      customer,
      outstandingAmount,
      status,
      isHighlighted
    };
  }).filter(record => record.outstandingAmount > 0);
};

export const updateDebtStatus = (customers: Customer[]): Customer[] => {
  const today = new Date().toISOString().split('T')[0];
  
  return customers.map(customer => {
    if (!customer.debtRecords) return customer;
    
    const updatedRecords = customer.debtRecords.map(debt => {
      // Check if debt is overdue and not paid
      if (debt.dueDate < today && debt.status !== "Paid") {
        return { ...debt, highlighted: true, status: "Overdue" as const };
      }
      return debt;
    });
    
    return {
      ...customer,
      debtRecords: updatedRecords
    };
  });
};
