
import { motion } from "framer-motion";
import { useDebtors } from "./debtors/useDebtors";
import DebtorsSearch from "./debtors/DebtorsSearch";
import DebtorsTable from "./debtors/DebtorsTable";
import DebtSummaryCard from "./debtors/DebtSummaryCard";
import CustomerDebtDetails from "./debtors/CustomerDebtDetails";
import AddDebtDialog from "./debtors/AddDebtDialog";
import RecordPaymentDialog from "./debtors/RecordPaymentDialog";

const DebtorsList = () => {
  const {
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
  } = useDebtors();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const debtors = prepareDebtorsList();
  const debtSummary = calculateDebtSummary();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <DebtorsSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="md:col-span-2">
          <DebtorsTable 
            debtors={debtors}
            onSelectCustomer={setSelectedCustomer}
            onShowAddDebtDialog={(customer) => {
              setSelectedCustomer(customer);
              setShowAddDebtDialog(true);
            }}
          />
        </motion.div>

        <motion.div>
          <DebtSummaryCard summary={debtSummary} />
        </motion.div>
      </motion.div>

      {selectedCustomer && (
        <CustomerDebtDetails 
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onRecordPayment={(debt) => {
            setSelectedDebt(debt);
            setShowPaymentDialog(true);
          }}
        />
      )}

      <AddDebtDialog 
        open={showAddDebtDialog}
        onOpenChange={setShowAddDebtDialog}
        customer={selectedCustomer}
        debtAmount={debtAmount}
        setDebtAmount={setDebtAmount}
        debtDueDate={debtDueDate}
        setDebtDueDate={setDebtDueDate}
        debtNotes={debtNotes}
        setDebtNotes={setDebtNotes}
        onAddDebt={handleAddDebt}
      />

      <RecordPaymentDialog 
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        selectedDebt={selectedDebt}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        onRecordPayment={handleRecordPayment}
      />
    </motion.div>
  );
};

export default DebtorsList;
