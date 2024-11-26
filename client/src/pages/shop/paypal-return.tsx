import React, { useEffect } from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { capturePayment } from "@/store/shop/order-slice";
import { Response } from "@/types";

type PaypalReturnProps = {};

const PaypalReturnPage: React.FC<PaypalReturnProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { PayerID, paymentId } = query;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (paymentId && PayerID) {
      const orderId = JSON.parse(
        sessionStorage.getItem("currentOrderId") || "null"
      );

      dispatch(capturePayment({ paymentId, PayerID, orderId })).then((data) => {
        const response = data as Response;
        if (
          response.meta.requestStatus === "fulfilled" &&
          response.payload?.success
        ) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
             window.location.href = "/shop/payment-failure";
        }
      });
    }
  }, [paymentId, PayerID, dispatch]);

  return (
    <ShoppingLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-gray-800">
              Processing Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Please wait while we process your payment. This may take a few
              moments.
            </p>
          </CardContent>
        </Card>
      </div>
    </ShoppingLayout>
  );
};

export default PaypalReturnPage;
