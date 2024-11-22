import React,{useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/form';
import { addressFormControls } from '@/config';
import { InitialAddressFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/store/store';

type AddressProps = {
    
};

const initialAddressFormData:InitialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address:React.FC<AddressProps> = () => {
    const [formData, setFormData] = useState<InitialAddressFormData>(initialAddressFormData);
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state:RootState) => state.auth);
    const { addressList } = useSelector((state:RootState) => state.shopAddress);

    const handleManageAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // if (addressList.length >= 3) {
        //   setFormData(initialAddressFormData);
        //   toast({
        //     title: "You can add max 3 addresses",
        //     variant: "destructive",
        //   });

        //   return;
        // }
    };

    return (
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
          Address List
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
          />
        </CardContent>
      </Card>
    );
}
export default Address;