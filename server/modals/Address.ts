import mongoose, { Document } from "mongoose";

export interface IAddress extends Document {
  userId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}

const AddressSchema = new mongoose.Schema<IAddress>(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);