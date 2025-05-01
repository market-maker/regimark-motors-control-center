
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Receipt from "../Receipt";

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saleData: any;
  onClose: () => void;
}

const ReceiptDialog = ({ open, onOpenChange, saleData, onClose }: ReceiptDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Sale Receipt</DialogTitle>
        </DialogHeader>
        <Receipt saleData={saleData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
