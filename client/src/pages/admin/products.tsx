import React, { useState } from "react";
import AdminLayout from "@/components/admin-view/layout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import { InitialProductFormData } from "@/types";
import ProductImageUpload from "@/components/admin-view/image-upload";

type productsProps = {};

const initialFormData: InitialProductFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts: React.FC<productsProps> = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] =
    useState<InitialProductFormData>(initialFormData);
 const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AdminLayout>
      <>
        <div className="mb-5 w-full flex justify-end">
          <Button onClick={() => setOpenCreateProductsDialog(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Sheet
            open={openCreateProductsDialog}
            onOpenChange={() => {
              setOpenCreateProductsDialog(false);
            }}
          >
            <SheetContent side="right" className="overflow-auto">
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
              </SheetHeader>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
              />
              <div className="py-6">
                <CommonForm
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={"Add"}
                  onSubmit={onSubmit}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    </AdminLayout>
  );
};
export default AdminProducts;
