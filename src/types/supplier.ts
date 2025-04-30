
export interface SupplierProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  paymentTerms: string;
  notes?: string;
  products: SupplierProduct[];
}
