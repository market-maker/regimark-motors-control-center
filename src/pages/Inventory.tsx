
import MainLayout from "../layouts/MainLayout";
import InventoryTable from "../components/inventory/InventoryTable";

const Inventory = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Inventory Management</h1>
        <InventoryTable />
      </div>
    </MainLayout>
  );
};

export default Inventory;
