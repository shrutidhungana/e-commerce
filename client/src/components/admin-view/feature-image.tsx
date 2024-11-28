import React from 'react';
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Empty from "../common/Empty";
import { Image as ImageType} from "../../types"; 

type FeatureImageProps = {
  featureImageList: Array<ImageType>;
  handleDeleteImage: (id: string) => void;
};

const FeatureImageList:React.FC<FeatureImageProps> = ({featureImageList, handleDeleteImage}) => {
    
    return (
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <Card key={featureImgItem?._id} className="shadow-md">
              <CardContent>
                <div
                  className="relative w-full h-[750px] overflow-hidden"
                  key={featureImgItem?._id}
                >
                  <Image
                    src={featureImgItem.image}
                    alt="feature-image"
                    className="rounded-t-lg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-center border-t border-gray-200">
                <Button
                  className="px-4 py-2 font-semibold text-sm border border-gray-800 rounded-md"
                  onClick={() => handleDeleteImage(featureImgItem._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Empty
            title="No Feature Image"
            description="No images found, add some!"
          />
        )}
      </div>
    );
}
export default FeatureImageList;