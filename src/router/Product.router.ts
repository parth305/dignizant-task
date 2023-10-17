import express, { Router, Request } from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/Product.controller";
import { isSeller } from "../middleware/isSeller.middlerware";

const storage = multer.diskStorage({
  destination: "./dist/public",
  filename: fun,
});

function fun(req: Request, file: any, cb: Function) {
  cb(null, Date.now() + "_" + file.originalname);
}

export const ProductRouter: Router = express.Router();


ProductRouter.route("/").post(
  isSeller,
  multer({
    storage,
  }).array("Images"),
  createProduct
);
ProductRouter.route("/").get(getProducts)
ProductRouter.route("/:id").get(getProductById)
ProductRouter.route("/:id").delete(isSeller,deleteProduct)
ProductRouter.route("/:id").patch(isSeller,updateProduct)