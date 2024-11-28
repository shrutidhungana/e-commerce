import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin-view/layout";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useToast } from "@/hooks/use-toast";
import { Response } from "@/types";
import Image from "next/image";
import Empty from "@/components/common/Empty";

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
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" disabled = {!imageFile}>
          Upload
        </Button>
        <div className="flex flex-col gap-4 mt-5">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((featureImgItem) => (
              <div
                className="relative w-full h-[750px] overflow-hidden"
                key={featureImgItem?._id}
              >
                <Image
                  src={featureImgItem.image}
                  alt="feature-image"
                  className="  rounded-t-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))
          ) : (
            <Empty
              title="No Feature Image"
              description="No images found add some of it!"
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
