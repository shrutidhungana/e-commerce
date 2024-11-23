import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Address } from "@/types";

type AddressCardProps = {
  addressInfo: Address;
};

const AddressCard: React.FC<AddressCardProps> = ({ addressInfo }) => {
  return (
    <Card className="border border-gray-800 shadow-lg rounded-lg max-w-md mx-auto">
      <CardContent className="p-6 grid gap-4">
        <div>
          <Label className="block text-sm font-bold text-gray-700">
            Address:
          </Label>
          <p className="text-gray-900 text-base">{addressInfo?.address}</p>
        </div>
        <div>
          <Label className="block text-sm font-bold text-gray-700">City:</Label>
          <p className="text-gray-900 text-base">{addressInfo?.city}</p>
        </div>
        <div>
          <Label className="block text-sm font-bold text-gray-700">
            Pincode:
          </Label>
          <p className="text-gray-900 text-base">{addressInfo?.pincode}</p>
        </div>
        <div>
          <Label className="block text-sm font-bold text-gray-700">
            Phone:
          </Label>
          <p className="text-gray-900 text-base">{addressInfo?.phone}</p>
        </div>
        <div>
          <Label className="block text-sm font-bold text-gray-700">
            Notes:
          </Label>
          <p className="text-gray-900 text-base">{addressInfo?.notes}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between border-t border-gray-200">
        <Button className="px-4 py-2 font-semibold text-sm border border-gray-800 rounded-md hover:bg-gray-100">
          Edit
        </Button>
        <Button className="px-4 py-2 font-semibold text-sm border border-gray-800 rounded-md hover:bg-gray-100">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
