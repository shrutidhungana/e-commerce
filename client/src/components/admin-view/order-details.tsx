import React, { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { OrderState, Order } from "../../types";
import { RootState, AppDispatch, Response } from "@/store/store";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";

type OrdersDetailsProps = {
  orderDetails: Order;
};
const initialFormData: OrderState = {
  status: "",
};

const AdminOrderDetailsView: React.FC<OrdersDetailsProps> = ({
  orderDetails,
}) => {
  const [formData, setFormData] = useState<OrderState>(initialFormData);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleUpdateStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id ?? "", orderStatus: status })
    ).then((data) => {
      const response = data as Response;
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id??""));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
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

  return (
    <DialogContent className="bg-white p-6 sm:max-w-[600px] max-w-full max-h-screen overflow-auto rounded-lg shadow-lg">
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
              <span className="text-black">{orderDetails?._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Date</span>
              <span className="text-black">
                {orderDetails?.orderDate?.split("T")[0]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Price</span>
              <span className="text-black">$${orderDetails?.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Payment Method</span>
              <span className="text-black">{orderDetails?.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Payment Status</span>
              <span className="text-black">{orderDetails?.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Order Status</span>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black">Products</h3>
          <Separator className="bg-black" />
          <ul className="space-y-4">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <li
                    className="flex flex-wrap items-center justify-between p-4 border-b border-gray-300 hover:bg-gray-100"
                    key={item?.price}
                  >
                    <span className="text-sm font-medium text-gray-800">
                      Title:
                    </span>
                    <span className="text-sm text-gray-600">{item.title}</span>

                    <span className="text-sm font-medium text-gray-800">
                      Quantity:
                    </span>
                    <span className="text-sm text-gray-600">
                      {item.quantity}
                    </span>

                    <span className="text-sm font-medium text-gray-800">
                      Price:
                    </span>
                    <span className="text-sm text-gray-600">${item.price}</span>
                  </li>
                ))
              : null}
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
              <span className="text-black">
                {orderDetails?.addressInfo?.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span>City:</span>
              <span className="text-black">
                {" "}
                {orderDetails?.addressInfo?.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pincode:</span>
              <span className="text-black">
                {" "}
                {orderDetails?.addressInfo?.pincode}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span className="text-black">
                {orderDetails?.addressInfo?.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Note:</span>
              <span className="text-black">
                {orderDetails?.addressInfo?.notes}
              </span>
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
                placeholder: "Update Status",
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
