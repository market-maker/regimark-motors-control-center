
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Receipt from "../Receipt";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/providers/NotificationsProvider";

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saleData: any;
  onClose: () => void;
}

const ReceiptDialog = ({ open, onOpenChange, saleData, onClose }: ReceiptDialogProps) => {
  const { addNotification } = useNotifications();
  
  // Send notification based on sale status when receipt dialog opens
  useEffect(() => {
    if (open && saleData) {
      // Add notification based on sale status
      if (saleData.status === "Pending") {
        addNotification({
          title: "Pending Sale",
          message: `Sale #${saleData.saleId} has been marked as pending.`,
          type: "sale",
          date: new Date().toISOString()
        });
      } else if (saleData.status === "Completed") {
        addNotification({
          title: "Sale Completed",
          message: `Sale #${saleData.saleId} has been completed successfully.`,
          type: "sale",
          date: new Date().toISOString()
        });
      } else if (saleData.status === "Revoked") {
        addNotification({
          title: "Sale Revoked",
          message: `Sale #${saleData.saleId} has been revoked.`,
          type: "sale",
          date: new Date().toISOString()
        });
        toast.error(`Sale #${saleData.saleId} has been revoked.`);
      }
    }
  }, [open, saleData, addNotification]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Sale Receipt 
            {saleData?.status && (
              <span className={`ml-2 text-sm px-2 py-0.5 rounded ${
                saleData.status === "Completed" ? "bg-green-100 text-green-800" :
                saleData.status === "Pending" ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }`}>
                {saleData.status}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <Receipt saleData={saleData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
