
import { useState, useEffect } from "react";
import { Customer, DebtRecord } from "@/types/customer";
import { useNotifications } from "@/providers/NotificationsProvider";
import { DebtSummary, DebtorRecord } from "./types";

// Mock customers with debts
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City",
    totalSpent: 1250.50,
    lastVisit: "2023-04-15",
    status: "Active",
    debtRecords: [
      {
        id: "d1",
        date: "2023-04-01",
        amount: 250.50,
        dueDate: "2023-05-01",
        status: "Overdue",
        notes: "For car parts"
      },
      {
        id: "d2",
        date: "2023-03-15",
        amount: 120.75,
        dueDate: "2023-04-15",
        status: "Paid",
        paymentHistory: [
          {
            date: "2023-04-10",
            amount: 120.75
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, Town",
    totalSpent: 875.25,
    lastVisit: "2023-04-20",
    status: "Active",
    debtRecords: [
      {
        id: "d3",
        date: "2023-04-10",
        amount: 350.00,
        dueDate: "2023-05-10",
        status: "Pending"
      }
    ]
  }
];

export const useDebtors = () => {
  const { addNotification } = useNotifications();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddDebtDialog, setShowAddDebtDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtRecord | null>(null);
  
  // Form fields
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDueDate, setDebtDueDate] = useState("");
  const [debtNotes, setDebtNotes] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  
  // Check for overdue debts and highlight them
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let hasOverdueDebts = false;
    
    const updatedCustomers = customers.map(customer => {
      if (!customer.debtRecords) return customer;
      
      const updatedRecords = customer.debtRecords.map(debt => {
        // Check if debt is overdue and not paid
        if (debt.dueDate < today && debt.status !== "Paid") {
          hasOverdueDebts = true;
          return { ...debt, highlighted: true, status: "Overdue" as const };
        }
        return debt;
      });
      
      return {
        ...customer,
        debtRecords: updatedRecords
      };
    });
    
    if (hasOverdueDebts) {
      // Send notification about overdue debts
      addNotification({
        title: "Overdue Debts Alert",
        message: "There are customers with overdue debts that need attention.",
        type: "debtor",
        linkTo: "/sales?tab=debtors"
      });
    }
    
    setCustomers(updatedCustomers);
  }, [addNotification]);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get all debt records across all customers
  const allDebtRecords = customers.flatMap(customer => 
    (customer.debtRecords || []).map(debt => ({
      ...debt,
      customerName: customer.name,
      customerId: customer.id
    }))
  );
  
  const handleAddDebt = () => {
    if (!selectedCustomer) return;
    if (!debtAmount || !debtDueDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newDebt: DebtRecord = {
      id: `d${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(debtAmount),
      dueDate: debtDueDate,
      status: "Pending",
      notes: debtNotes
    };
    
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          debtRecords: [...(customer.debtRecords || []), newDebt]
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    setShowAddDebtDialog(false);
    setDebtAmount("");
    setDebtDueDate("");
    setDebtNotes("");
    toast.success(`Debt record added for ${selectedCustomer.name}`);
  };
  
  const handleRecordPayment = () => {
    if (!selectedDebt || !selectedCustomer) return;
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
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
    
    const updatedCustomers = customers.map(customer => {
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
    
    setCustomers(updatedCustomers);
    setShowPaymentDialog(false);
    setPaymentAmount("");
    toast.success(`Payment recorded successfully`);
  };
  
  const calculateDebtSummary = (): DebtSummary => {
    const totalOutstanding = allDebtRecords
      .filter(debt => debt.status !== "Paid")
      .reduce((sum, debt) => sum + debt.amount, 0);
      
    const overdueAmount = allDebtRecords
      .filter(debt => debt.status === "Overdue")
      .reduce((sum, debt) => sum + debt.amount, 0);
      
    const totalCustomersWithDebt = customers.filter(customer => 
      (customer.debtRecords || []).some(debt => debt.status !== "Paid")
    ).length;
    
    return {
      totalOutstanding,
      overdueAmount,
      totalCustomersWithDebt
    };
  };
  
  const prepareDebtorsList = (): DebtorRecord[] => {
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

  return {
    searchTerm,
    setSearchTerm,
    selectedCustomer,
    setSelectedCustomer,
    showAddDebtDialog,
    setShowAddDebtDialog,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedDebt,
    setSelectedDebt,
    debtAmount,
    setDebtAmount,
    debtDueDate,
    setDebtDueDate,
    debtNotes,
    setDebtNotes,
    paymentAmount,
    setPaymentAmount,
    handleAddDebt,
    handleRecordPayment,
    calculateDebtSummary,
    prepareDebtorsList,
    customers
  };
};
