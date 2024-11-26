import React, {useState} from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import img from "@/assests/account.jpg";
import Image from "next/image";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Response, Address as AddressType} from "@/types";
import { createNewOrder } from "@/store/shop/order-slice";

type checkoutProps = {};

const ShoppingCheckout: React.FC<checkoutProps> = () => {
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { user } = useSelector((state: RootState) => state.auth);
  const { approvalURL } = useSelector((state: RootState) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState<AddressType>(null);
   const [isPaymentStart, setIsPaymemntStart] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  

   if (approvalURL) {
     window.location.href = approvalURL;
   }
  
    
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
  
  
  const handleInitiatePaypalPayment = () => {
 if (cartItems?.items?.length === 0) {
   toast({
     title: "Your cart is empty. Please add items to proceed.",
     variant: "destructive",
   });

   return;
 }
 if (currentSelectedAddress === null) {
   toast({
     title: "Please select one address to proceed.",
     variant: "destructive",
   });

   return;
 }
    
    const orderData = {
      userId: user?.user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // Assuming dispatch returns a promise for handling response
    dispatch(createNewOrder(orderData))
      .then((data) => {
        const response = data as Response;
        
        if (
          response.meta.requestStatus === "fulfilled" &&
          response.payload?.success
        ) {
          setIsPaymemntStart(true);
          toast({
            title: "Success!",
            description: response.payload.message,
            duration: 5000,
            className: "bg-green-500 text-white",
          });
        } else {
          setIsPaymemntStart(false);
          toast({
            title: "Error!",
            description: response.error?.message,
            duration: 5000,
            variant: "destructive",
            className: "text-white",
          });
        }
      })
      
  };

  

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
          <Address
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            selectedId={currentSelectedAddress}
          />
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
              <Button onClick={handleInitiatePaypalPayment} className="w-full">
                {isPaymentStart
                  ? "Processing Paypal Payment..."
                  : "Checkout with Paypal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ShoppingLayout>
  );
};
export default ShoppingCheckout;
