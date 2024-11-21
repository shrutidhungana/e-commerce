import React from 'react';
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import UserCartItemsContent from "./cart-items-content";
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';


type UserCartWrapperProps = {
    
};

const UserCartWrapper: React.FC<UserCartWrapperProps> = () => {
    const router = useRouter()
    
    return (
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4"></div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1000</span>
          </div>
        </div>
            <Button className="w-full mt-6" onClick={() => {
                router.push("/shop/checkout")
            }}>
                Checkout
        </Button>
      </SheetContent>
    );
}
export default UserCartWrapper;