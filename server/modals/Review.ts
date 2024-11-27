import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  productId: string;
  userId: string;
  userName: string;
    reviewMessage: string;
    reviewValue: number;
}

const ProductReviewSchema = new mongoose.Schema<IReview>(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("ProductReview", ProductReviewSchema)