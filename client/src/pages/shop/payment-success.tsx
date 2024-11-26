import React from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/router";

type PaymentSuccessProps = {};

const PaymentSuccessPage: React.FC<PaymentSuccessProps> = () => {
  const router = useRouter();

  return (
    <ShoppingLayout>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-3xl font-bold">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Thank you for your purchase. Your order has been successfully
              processed.
            </CardDescription>
          </CardHeader>
          <div className="mt-6 text-center">
            <Button
              className="w-full bg-white text-black hover:bg-gray-200"
              onClick={() => router.push("/shop/account")}
            >
              View Orders
            </Button>
          </div>
        </Card>
      </div>
    </ShoppingLayout>
  );
};

export default PaymentSuccessPage;
