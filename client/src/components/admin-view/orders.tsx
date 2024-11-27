import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import Empty from "../common/Empty";

type OrdersProps = {};

const AdminOrdersView: React.FC<OrdersProps> = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const { orderList, orderDetails } = useSelector((state: RootState) => state.adminOrder);
  const dispatch = useDispatch<AppDispatch>();

   const handleFetchOrderDetails = (getId:string) => {
     dispatch(getOrderDetailsForAdmin(getId));
   }
  
   useEffect(() => {
     dispatch(getAllOrdersForAdmin());
   }, [dispatch]);
  
 
  
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={(() => {
                        if (orderItem?.orderStatus === "confirmed")
                          return "py-1 px-3 bg-green-500";
                        if (orderItem?.orderStatus === "rejected")
                          return "py-1 px-3 bg-red-600";
                        if (orderItem?.orderStatus === "pending")
                          return "py-1 px-3 bg-yellow-600";
                        if (orderItem?.orderStatus === "delivered")
                          return "py-1 px-3 bg-violet-500";
                        if (orderItem?.orderStatus === "inProcess")
                          return "py-1 px-3 bg-cyan-600";
                        if (orderItem?.orderStatus === "inShipping")
                          return "py-1 px-3 bg-orange-600";
                        return "py-1 px-3 bg-black";
                      })()}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Empty
                title="No  Order found"
                description="Please,wait until some order is made"
              />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default AdminOrdersView;
