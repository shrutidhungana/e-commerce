import React, { useState, useEffect } from "react";
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
import { InitialProductFormData, RegisterResponse, HandleDelete, Response } from "@/types";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { AppDispatch, RootState } from "@/store/store";
import AdminProductTile from "@/components/admin-view/product-tile";
import {
  addNewProduct,
  deleteAddedProduct,
  editAddedProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

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
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

  const { toast } = useToast();
  const { productList } = useSelector(
    (state: RootState) => state.adminProducts
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editAddedProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
         
          const response = data as Response
          if (
            response.meta.requestStatus === "fulfilled" &&
            response.payload?.success
          ) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setImageFile(null);
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
              className: "text-white",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          const response = data as Response

          if (
            response.meta.requestStatus === "fulfilled" &&
            response.payload?.success
          ) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setImageFile(null);
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
              className: "text-white",
            });
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      ?.map((key) => formData[key] !== "")
      ?.every((item) => item);
  };

  const handleDelete: HandleDelete = (getCurrentProductId) => {
    dispatch(deleteAddedProduct(getCurrentProductId)).then((data) => {
     
       const response = data as Response
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(fetchAllProducts());
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
          className: "text-white",
        });
      }

    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <AdminLayout>
      <>
        <div className="mb-5 w-full flex justify-end">
          <Button onClick={() => setOpenCreateProductsDialog(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList?.map((productItem) => (
                <AdminProductTile
                  key={productItem?._id}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              ))
            : null}
        </div>
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </>
    </AdminLayout>
  );
};
export default AdminProducts;
