import mongoose, { Document } from "mongoose";

interface IProduct extends Document {
  image: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStock: number;
//   averageReview: number;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    // averageReview: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);