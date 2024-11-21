import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Label } from "../ui/label";

type productDetailsProps = {
  productDetails: Product | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddToCart: (getCurrentProductId: string, getTotalStock: string) => void;
};

const ProductDetailsDialog: React.FC<productDetailsProps> = ({
  productDetails,
  open,
  setOpen,
  handleAddToCart,
}) => {
  const salePrice = parseFloat(productDetails?.salePrice ?? "0");
  const price = parseFloat(productDetails?.price ?? "0");
  const totalStock = parseFloat(productDetails?.totalStock ?? "0");

  const handleDialogClose = () => {
     setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          {productDetails?.image &&
            typeof productDetails?.image === "string" && (
              <Image
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                objectFit="cover"
                className="aspect-square w-full"
              />
            )}
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              ${price}
            </p>
            {salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id??"",
                    productDetails?.totalStock??""
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Shruti</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This is awesome.</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <Input placeholder="Write A Review" />
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductDetailsDialog;
