import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin-view/layout";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useToast } from "@/hooks/use-toast";
import { Response } from "@/types";
import FeatureImageList from "@/components/admin-view/feature-image"

type DashboardProps = {};

const AdminDashboard: React.FC<DashboardProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedImageUrl) {
      console.log("Uploaded Image URL updated:", uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  const dispatch = useDispatch<AppDispatch>();
  const { featureImageList } = useSelector(
    (state: RootState) => state.commonFeature
  );
  const { toast } = useToast();

  console.log(featureImageList)

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      const response = data as Response;
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
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

  const handleDeleteImage = (id: string) => {
    dispatch(deleteFeatureImage(id)).then((data) => {
      const response = data as Response;
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(getFeatureImages());
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

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 w-full"
          disabled={!imageFile}
        >
          Upload
        </Button>
        <FeatureImageList
          featureImageList={featureImageList}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
