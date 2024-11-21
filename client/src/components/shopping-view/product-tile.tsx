import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Product } from "../../types";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "../../config";
import { Button } from "../ui/button";

type ShoppingProductTileProps = {
  product: Product;
  handleGetProductDetails: (productId: string) => void;
  handleAddToCart: (getCurrentProductId: string, getTotalStock: string) => void;
};

const ShoppingProductTile: React.FC<ShoppingProductTileProps> = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  let badgeContent: React.ReactNode = null;
  let badgeClass = "absolute top-2 left-2 bg-red-500 hover:bg-red-600";

  const totalStock = parseFloat(product?.totalStock ?? 0);
  const salePrice = parseFloat(product?.salePrice ?? 0);
  const price = parseFloat(product?.price ?? 0);

  if (totalStock === 0) {
    badgeContent = "Out Of Stock";
  } else if (totalStock < 10) {
    badgeContent = `Only ${product?.totalStock} items left`;
  } else if (salePrice > 0) {
    badgeContent = "Sale";
  }
  return (
    <Card className="w-full max-w-sm mx-auto cursor-pointer">
      <div onClick={() => product?._id && handleGetProductDetails(product._id)}>
        <div className="relative w-full h-[500px] ">
          {product?.image && typeof product?.image === "string" && (
            <Image
              src={product.image}
              alt={product?.title || "Product image"}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              priority
            />
          )}
          {badgeContent && <Badge className={badgeClass}>{badgeContent}</Badge>}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${price}
            </span>
            {salePrice > 0 && (
              <span className="text-lg font-bold">${salePrice}</span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            className="w-full"
              onClick={() => handleAddToCart(product?._id ?? "",
                 product?.totalStock
              )}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default ShoppingProductTile;
