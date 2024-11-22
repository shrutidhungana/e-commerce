import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { InitialAddressFormData, Response } from "@/types";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./address-card";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

type AddressProps = {};

const initialAddressFormData: InitialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address: React.FC<AddressProps> = () => {
  const [formData, setFormData] = useState<InitialAddressFormData>(
    initialAddressFormData
  );
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { addressList } = useSelector((state: RootState) => state.shopAddress);

  console.log(addressList);

  const handleManageAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Error!",
        description: "You can add maximum of three address.",
        variant: "destructive",
      });

      return;
    }
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.user?.id ?? "",
      })
    ).then((data) => {
      const response = data as Response;

      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(fetchAllAddresses(user?.user?.id ?? ""));
        setFormData(initialAddressFormData);
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
        });
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.user?.id ?? ""));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList?.length > 0
          ? addressList?.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem?.userId}
                addressInfo={singleAddressItem}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          buttonText="Add"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};
export default Address;
