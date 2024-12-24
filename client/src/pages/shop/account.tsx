import React, {useState} from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import accImg from "../../../public/account.jpg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
import { Address as AddressType } from "@/types";

type accountProps = {};

const ShoppingAccount: React.FC<accountProps> = () => {
   const [currentSelectedAddress, setCurrentSelectedAddress] =
     useState<AddressType| null>(null);
  return (
    <ShoppingLayout>
      <div className="flex flex-col">
        <div className="relative h-[450px] w-full overflow-hidden">
          <Image
            src={accImg}
            alt="Account"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <ShoppingOrders />
              </TabsContent>
              <TabsContent value="address">
                <Address
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                  selectedId={currentSelectedAddress}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ShoppingLayout>
  );
};
export default ShoppingAccount;
