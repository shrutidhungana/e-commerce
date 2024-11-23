import React from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import img from "@/assests/account.jpg";
import Image from "next/image";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

type checkoutProps = {};

const ShoppingCheckout: React.FC<checkoutProps> = () => {
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
    const { user } = useSelector((state: RootState) => state.auth);
    
    const totalCartAmount =
      cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.reduce(
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
    <ShoppingLayout>
      <div className="flex flex-col">
        <div className="relative h-[450px] w-full overflow-hidden">
          <Image
            src={img}
            alt="Account"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent cartItem={item} key={item?._id} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  ${totalCartAmount?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button className="w-full">Checkout with Paypal</Button>
            </div>
          </div>
        </div>
      </div>
    </ShoppingLayout>
  );
};
export default ShoppingCheckout;
