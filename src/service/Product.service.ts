import { Product } from "../model/Product.model";
import { httpStatusCode } from "../utils/Consts";
import CustomError from "../utils/CustomError";

interface ProductInterface {
  title: string;
  images: [
    {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: string;
    }
  ];
  price: number;
  discountPrice: number;
  description: string;
  stock: number;
}

export const createProductService = async (
  data: Partial<ProductInterface>,
  id: string
) => {
  const product = await Product.create({
    title: data.title,
    description: data.description,
    price: data.price,
    discountPrice: data.discountPrice,
    stock: data.stock,
    images: data.images?.map(
      (el) => `http://localhost:${process.env.PORT}/${el.filename}`
    ),
    sellerId: id,
  });

  return product;
};

export const getProductsService = async (page: number, limit: number) => {
  const skipDocs = (page - 1) * limit;
  const products = await Product.find().skip(skipDocs).limit(limit);
  if (!products.length) {
    throw new CustomError("no Products found", httpStatusCode["Bad Request"]);
  }
  return products;
};

export const getProductByIdService = async (id: string) => {
  const product = await Product.findById(id).populate("sellerId");
  if (!product) {
    throw new CustomError("no Product found", httpStatusCode["Bad Request"]);
  }

  return product;
};

export const deleteProductService = async (_id: string, sellerId: string) => {
  const data = await Product.findOneAndDelete({ _id, sellerId });
  if (!data) {
    throw new CustomError("no Product found", httpStatusCode["Bad Request"]);
  }
  return data;
};

export const updateProductService = async (
  data: Partial<ProductInterface>,
  id: string,
  sellerId: string,
) => {
  const product = await Product.findOne({ _id: id, sellerId });

  if (!product) {
    throw new CustomError("no Product found", httpStatusCode["Bad Request"]);
  }

  if (data.images) {
    throw new CustomError(
      "Images can't be updated",
      httpStatusCode["Bad Request"]
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedProduct;
};
