
export interface ReceiptTemplate {
  id: string;
  name: string;
  description: string;
  filename: string;
  previewUrl: string;
  dateCreated: string;
  dateModified: string;
  isDefault: boolean;
}

export type ReceiptStatus = "In Stock" | "Low Stock" | "Out of Stock";
