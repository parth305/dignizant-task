import { Order } from "../model/Order.model";
import { Product } from "../model/Product.model";
import { httpStatusCode } from "../utils/Consts";
import CustomError from "../utils/CustomError";

export const createOrderService = async (
  buyerId: String,
  productId: String,
  qty: string
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("no Product found", httpStatusCode["Bad Request"]);
  }
  const temp = product.stock - parseInt(qty);
  if (temp < 0) {
    throw new CustomError("Insufficient stock", httpStatusCode["Bad Request"]);
  }

  const updatedProduct = await Product.updateOne({_id:productId}, {
    $inc: {
      stock: -qty,
    },
  });

  const order = await Order.create({
    buyerId,
    productId,
    qty,
  });

  return order;
};
