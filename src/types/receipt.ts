
export interface ReceiptTemplate {
  id: string;
  name: string;
  description: string;
  filename: string;
  previewUrl: string;
  dateCreated: string;
  dateModified: string;
  isDefault: boolean;
  type: "receipt" | "invoice";
}

export type ReceiptStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface ProductComponent {
  id: string;
  name: string;
  quantity: number;
  originalProductId: string;
  originalProductName: string;
  dateExtracted: string;
}

export interface SplitProduct {
  id: string;
  originalProductId: string;
  originalProductName: string;
  components: ProductComponent[];
  dateCreated: string;
  notes: string;
}
