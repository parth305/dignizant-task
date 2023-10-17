import mongoose, { Schema } from "mongoose";

let OrderSchema = new mongoose.Schema({
  productId:{
    type:Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },
  buyerId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  qty:{
    type:Number,
    required:true
  }
},{
  timestamps:true
});

export const Order = mongoose.model("Order", OrderSchema);
