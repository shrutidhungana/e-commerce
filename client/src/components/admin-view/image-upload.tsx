import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { apiEndpoints } from "@/utils/api";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

type ProductImageUploadProps = {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadedImageUrl: string;
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageLoadingState: boolean;
  setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { image } = apiEndpoints;
  const { toast } = useToast();

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    if (imageFile) {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(image, data);

      if (response?.data?.success) {
        setUploadedImageUrl(response?.data?.result?.url);
        setImageLoadingState(false);
        toast({
          title: "Success!",
          description: response.data.message,
          duration: 5000,
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Error!",
          description: response.data.error,
          duration: 5000,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  const renderImageUploadContent = () => {
    if (!imageFile) {
      return (
        <Label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center h-32 cursor-pointer"
        >
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
          <span>Drag & drop or click to upload image</span>
        </Label>
      );
    }

    if (imageLoadingState) {
      return <Skeleton className="h-10 bg-gray-100" />;
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileIcon className="w-8 text-primary mr-2 h-8" />
        </div>
        <p className="text-sm font-medium">{imageFile.name}</p>
        <Button
          className="text-muted-foreground hover:text-foreground"
          variant="ghost"
          size="icon"
          onClick={handleRemoveImage}
          aria-label="Remove file"
        >
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Remove File</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
        />
        {renderImageUploadContent()}
      </div>
    </div>
  );
};

export default ProductImageUpload;
