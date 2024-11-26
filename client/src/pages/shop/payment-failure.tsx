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

type PaymentFailureProps = {};

const PaymentFailurePage: React.FC<PaymentFailureProps> = () => {
  const router = useRouter();

  return (
    <ShoppingLayout>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-3xl font-bold text-red-500">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              We’re sorry, but your payment could not be processed. Please try
              again or contact support for assistance.
            </CardDescription>
          </CardHeader>
          <div className="mt-6 text-center space-y-4">
            <Button
              className="w-full bg-white text-black hover:bg-gray-200"
              onClick={() => router.push("/shop/checkout")}
            >
              Retry Payment
            </Button>
           
          </div>
        </Card>
      </div>
    </ShoppingLayout>
  );
};

export default PaymentFailurePage;
