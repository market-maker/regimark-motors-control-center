
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, Percent } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  isCredit: boolean;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  cashReceived: number;
  setCashReceived: (amount: number) => void;
  cardNumber: string;
  setCardNumber: (cardNum: string) => void;
  discountType: "none" | "percentage" | "fixed";
  setDiscountType: (type: "none" | "percentage" | "fixed") => void;
  discountValue: number;
  setDiscountValue: (value: number) => void;
  saleStatus: "Completed" | "Pending" | "Revoked";
  setSaleStatus: (status: "Completed" | "Pending" | "Revoked") => void;
  handleCompleteSale: () => void;
  isProcessing: boolean;
  onOpenAdviceDialog: () => void;
  cartItemsCount: number;
}

const PaymentSummarySection = ({
  subtotal,
  tax,
  total,
  isCredit,
  paymentMethod,
  setPaymentMethod,
  cashReceived,
  setCashReceived,
  cardNumber,
  setCardNumber,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  saleStatus,
  setSaleStatus,
  handleCompleteSale,
  isProcessing,
  onOpenAdviceDialog,
  cartItemsCount,
}: PaymentSummaryProps) => {
  // Calculate discounted total
  let discountAmount = 0;
  let finalTotal = total;
  
  if (discountType === "percentage" && discountValue > 0) {
    discountAmount = total * (discountValue / 100);
    finalTotal = total - discountAmount;
  } else if (discountType === "fixed" && discountValue > 0) {
    discountAmount = Math.min(discountValue, total); // Prevent negative total
    finalTotal = total - discountAmount;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {/* Discount section */}
            <div className="pt-2">
              <Label htmlFor="discount-type">Discount</Label>
              <div className="flex items-center gap-2 mt-1">
                <Select 
                  value={discountType} 
                  onValueChange={(value) => setDiscountType(value as any)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Discount</SelectItem>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative flex-1">
                  <Input
                    type="number"
                    min="0"
                    step={discountType === "percentage" ? "1" : "0.01"}
                    max={discountType === "percentage" ? "100" : undefined}
                    value={discountValue || ""}
                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    disabled={discountType === "none"}
                    className={discountType === "percentage" ? "pl-7" : ""}
                  />
                  {discountType === "percentage" && (
                    <Percent className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            
            {discountType !== "none" && discountValue > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-red-500">-${discountAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Final Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </>
            )}
            
            {/* Sale status section */}
            <div className="pt-2">
              <Label htmlFor="sale-status">Sale Status</Label>
              <Select 
                value={saleStatus} 
                onValueChange={(value) => setSaleStatus(value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sale status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isCredit && (
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select 
                defaultValue={paymentMethod} 
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">
                    <div className="flex items-center">
                      <Banknote className="mr-2 h-4 w-4" />
                      Cash
                    </div>
                  </SelectItem>
                  <SelectItem value="card">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isCredit && paymentMethod === "cash" && (
            <div className="space-y-2">
              <Label htmlFor="cashReceived">Cash Received</Label>
              <Input 
                id="cashReceived" 
                type="number" 
                min={total} 
                value={cashReceived || ''}
                onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
              />
              {cashReceived > total && (
                <div className="flex justify-between text-sm mt-2">
                  <span>Change Due:</span>
                  <span className="font-medium">${(cashReceived - finalTotal).toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {!isCredit && paymentMethod === "card" && (
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="XXXX XXXX XXXX XXXX" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
          )}

          {/* Customer advice button */}
          <Button 
            variant="outline" 
            type="button" 
            className="w-full" 
            onClick={onOpenAdviceDialog}
          >
            Show Customer Advice
          </Button>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleCompleteSale}
            disabled={isProcessing || cartItemsCount === 0 || saleStatus === "Revoked"}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Complete ${isCredit ? "Credit " : ""}Sale (${saleStatus})`
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PaymentSummarySection;
