import React from "react";
import { CartItems, Response, Cart } from "@/types";
import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity, deleteItemInCart } from "@/store/shop/cart-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useToast } from "@/hooks/use-toast";

type UserCartItemsContentProps = {
  cartItem: CartItems;
};

const UserCartItemsContent: React.FC<UserCartItemsContentProps> = ({
  cartItem,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { productList } = useSelector((state: RootState) => state.shopProducts);

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const individualPrice = (
    (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
    cartItem?.quantity
  ).toFixed(2);

  const handleUpdateQuantity = (
    getCartItem: CartItems,
    typeOfAction: string
  ) => {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item: Cart) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.user?.id ?? "",
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      const response = data as Response;

      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        toast({
          title: "Success!",
          description: response.payload.message,
          duration: 5000,
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Error!",
          description: response.error?.message,
          duration: 5000,
          variant: "destructive",
        });
      }
    });
  };

  const handleCartItemDelete = (getCartItem: CartItems) => {
    dispatch(
      deleteItemInCart({
        userId: user?.user?.id ?? "",
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      const response = data as Response;

      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        toast({
          title: "Success!",
          description: response.payload.message,
          duration: 5000,
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Error!",
          description: response.error?.message,
          duration: 5000,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <Image
        src={cartItem?.image}
        alt={cartItem?.title}
        width={50}
        height={50}
        objectFit="cover"
        className="rounded cursor-pointer"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">${individualPrice}</p>
        <Trash
          className="cursor-pointer mt-1"
          size={20}
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
};
export default UserCartItemsContent;
