import React, { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { OrderState, Order } from "../../types";
import { RootState, AppDispatch } from "@/store/store";

type OrdersDetailsProps = {
  orderDetails: Order;
};
const initialFormData: OrderState = {
  status: "",
};

const AdminOrderDetailsView: React.FC<OrdersDetailsProps> = ({orderDetails}) => {
  const [formData, setFormData] = useState<OrderState>(initialFormData);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleUpdateStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };

  return (
    <DialogContent className="bg-white p-6 sm:max-w-[600px] rounded-lg shadow-lg">
      <div className="space-y-8">
        {/* Order Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-black tracking-wide">
            Order Details
          </h2>
          <Separator className="bg-black" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order ID</span>
              <span className="text-black">123456</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Date</span>
              <span className="text-black">23/11/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Price</span>
              <span className="text-black">$1000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Status</span>
              <span className="text-black">In Process</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black">Products</h3>
          <Separator className="bg-black" />
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-800">Product 1</span>
              <span className="text-black">$100</span>
            </li>
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black">
            Shipping Information
          </h3>
          <Separator className="bg-black" />
          <div className="text-gray-800 space-y-1">
            <div className="flex justify-between">
              <span>User Name:</span>
              <span className="text-black">{user?.user?.userName}</span>
            </div>
            <div className="flex justify-between">
              <span>Address:</span>
              <span className="text-black">Guheshwori</span>
            </div>
            <div className="flex justify-between">
              <span>City:</span>
              <span className="text-black">Kathmandu</span>
            </div>
            <div className="flex justify-between">
              <span>Pincode:</span>
              <span className="text-black">2345</span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span className="text-black">+977-9861495261</span>
            </div>
            <div className="flex justify-between">
              <span>Note:</span>
              <span className="text-black">Hello</span>
            </div>
          </div>
        </div>

        {/* Update Order Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black">
            Update Order Status
          </h3>
          <Separator className="bg-black" />
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
