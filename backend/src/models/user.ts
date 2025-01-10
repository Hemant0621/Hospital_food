import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
