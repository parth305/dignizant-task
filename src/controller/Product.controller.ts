import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
} from "../service/Product.service";
import customResponse from "../utils/CustomResponse";
import { httpStatusCode } from "../utils/Consts";

export const createProduct = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const data = await createProductService(
      { ...req.body, images: req.files },
      req.user._id
    );
    return customResponse({
      res,
      data,
      message: "Product Created",
      statusCode: httpStatusCode["Created"],
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: Function
) => {
    
  try {
    let limit = 5;
    let page = 1;
    if (req.query.limit) {
      let temp = req.query.limit as string;
      limit = parseInt(temp);
    }
    if (req.query.page) {
      let temp = req.query.page as string;
      page = parseInt(temp);
    }
    const data = await getProductsService(page, limit);
    return customResponse({
      res,
      data,
      message: "Products found",
      statusCode: httpStatusCode["OK"],
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: Function
) => {
    
  try {
    const data = await getProductByIdService(req.params.id);
    return customResponse({
      res,
      data,
      message: "Product found",
      statusCode: httpStatusCode["OK"],
    });
  } catch (error) {
    next(error);
  }
};


export const deleteProduct=async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try {
      const data = await deleteProductService(req.params.id, req.user._id)
      return customResponse({
        res,
        data,
        message: "Product deleted",
        statusCode: httpStatusCode["No Content"],
      });
    } catch (error) {
      next(error);
    }
  };


  export const updateProduct=async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try{
    const data=await updateProductService(req.body,req.params.id,req.user._id);
    return customResponse({
        res,
        data,
        message: "Product updated",
        statusCode: httpStatusCode["OK"],
      });
    } catch (error) {
      next(error);
    }

  }