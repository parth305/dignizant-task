import mongoose, { Schema } from "mongoose";

let ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: [String] },
  price: { type: Number, required: true },
  discountPrice: {
    type: Number,
  },
  description: { type: String, required: true },
  stock: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value:string) {
        return parseInt(value) > 0;
      },
      message: "cash need to be > 0",
    },
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
