import mongoose, { Document, Model } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role?: string; // Optional property
}

// Create the UserSchema
const UserSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

// Export the User model
export default User;
