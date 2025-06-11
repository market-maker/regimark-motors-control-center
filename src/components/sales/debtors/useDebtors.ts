import { useState, useEffect } from "react";
import { Customer, DebtRecord } from "@/types/customer";
import { useNotifications } from "@/providers/NotificationsProvider";
import { DebtSummary, DebtorRecord } from "./types";
import { toast } from "sonner";
import { calculateDebtSummary, prepareDebtorsList, updateDebtStatus } from "./utils/debtCalculations";
import { addDebtRecord, recordDebtPayment } from "./utils/debtOperations";

export const useDebtors = () => {
  const { addNotification } = useNotifications();
  // Start with empty customers array instead of mock data
  const [customers, setCustomers] = useState<Customer[]>([]);
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
    const updatedCustomers = updateDebtStatus(customers);
    
    // Check for overdue debts
    const hasOverdueDebts = updatedCustomers.some(customer => 
      (customer.debtRecords || []).some(debt => debt.status === "Overdue")
    );
    
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
  }, [addNotification, customers]);
  
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
    
    const updatedCustomers = addDebtRecord(
      customers,
      selectedCustomer,
      debtAmount,
      debtDueDate,
      debtNotes
    );
    
    setCustomers(updatedCustomers);
    setShowAddDebtDialog(false);
    setDebtAmount("");
    setDebtDueDate("");
    setDebtNotes("");
    toast.success(`Debt record added for ${selectedCustomer.name}`);
  };
  
  const handleRecordPayment = () => {
    const updatedCustomers = recordDebtPayment(
      customers,
      selectedCustomer,
      selectedDebt,
      paymentAmount
    );
    
    setCustomers(updatedCustomers);
    setShowPaymentDialog(false);
    setPaymentAmount("");
    toast.success(`Payment recorded successfully`);
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
    calculateDebtSummary: () => calculateDebtSummary(allDebtRecords),
    prepareDebtorsList: () => prepareDebtorsList(filteredCustomers),
    customers
  };
};
