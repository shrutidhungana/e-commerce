import mongoose, { Document } from "mongoose";

export interface IFeature extends Document {
  image: string;
};

const FeatureSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

 export default mongoose.model<IFeature>("Feature", FeatureSchema);
