import mongoose, { Document } from "mongoose";

interface IOrder extends Document {
  userId: string;
     cartId: string;
  cartItems: {
    productId: string;
    title: string;
    image: string;
    price: string;
    quantity: number;
    salePrice: string;
  }[];
  addressInfo: {
    addressId: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
  };
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  userId: String,
    cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      salePrice: String,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

export default mongoose.model<IOrder>("Order", OrderSchema);
