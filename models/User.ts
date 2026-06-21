import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
    description: "Must be one of the pre-defined roles",
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
