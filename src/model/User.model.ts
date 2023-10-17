import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  userType: {
    type: String,
    enum: ["USER", "SELLER"],
    default: "USER",
  },
});

export const User = mongoose.model("User", UserSchema);
