import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Product, InitialProductFormData } from "../../types";

type AdminProductTileProps = {
  product: Product;
  setFormData: React.Dispatch<React.SetStateAction<InitialProductFormData>>;
    setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEditedId: React.Dispatch<React.SetStateAction<null|string>>
};

const AdminProductTile: React.FC<AdminProductTileProps> = ({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
   
}) => {
    const salePrice = parseFloat(product?.salePrice || "0");
    const price = parseFloat(product?.price || "0");
    

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="w-full h-[500px] relative">
          {product?.image && typeof product?.image === "string" && (
            <Image
              src={product.image}
              alt={product?.title || "Product image"}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          )}
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
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
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
             setCurrentEditedId(product?._id || null);
                          setFormData(product);
                          
            }}
          >
            Edit
          </Button>
          <Button>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};
export default AdminProductTile;
