
import MainLayout from "../layouts/MainLayout";
import CheckoutForm from "../components/sales/CheckoutForm";

const Sales = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8 text-regimark-primary">Sales & Checkout</h1>
        <CheckoutForm />
      </div>
    </MainLayout>
  );
};

export default Sales;
