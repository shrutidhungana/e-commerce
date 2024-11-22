import React from 'react';
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import UserCartItemsContent from "./cart-items-content";
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import {  CartItems } from '@/types';


type UserCartWrapperProps = {
  cartItems: Array<CartItems>;
  setOpenCartSheet: (openCartSheet: boolean) => void;

};

const UserCartWrapper: React.FC<UserCartWrapperProps> = ({cartItems, setOpenCartSheet}) => {
  const router = useRouter();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
    
    return (
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems && cartItems?.length > 0
            ? cartItems?.map((item) => <UserCartItemsContent cartItem={item} key={item?.id } />)
            : null}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount?.toFixed(2)}</span>
          </div>
        </div>
        <Button
          className="w-full mt-6"
          onClick={() => {
            router.push("/shop/checkout");
            setOpenCartSheet(false);
          }}
        >
          Checkout
        </Button>
      </SheetContent>
    );
}
export default UserCartWrapper;