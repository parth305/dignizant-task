import { Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  meRequestService,
  updateUserService,
} from "../service/User.service";
import { validationResult } from "express-validator";
import { httpStatusCode } from "../utils/Consts";
import CustomError from "../utils/CustomError";
import customResponse from "../utils/CustomResponse";
import { checkToken } from "../utils/JWTToken";

export const createUser = async (

  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(
        errors.array()[0].msg,
        httpStatusCode["Bad Request"]
      );
    }
    const data = await createUserService(req.body);
    return customResponse({
      res,
      data,
      message: "User registered successfully",
      statusCode: httpStatusCode["Created"],
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const data = await loginUserService(req.body);
    return customResponse({
      res,
      data,
      message: "login successfull",
      statusCode: httpStatusCode["OK"],
    });
  } catch (error) {
    next(error);
  }
};

export const meRequest = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const data = await meRequestService(req?.user?._id as string);

    return customResponse({
      res,
      data,
      message: "user found",
      statusCode: httpStatusCode["OK"],
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomError("no token found", httpStatusCode["Bad Request"]);
    }

    const id = (await checkToken(token)) as string;

    const data = await updateUserService(req.body, id);
    return customResponse({
      res,
      data,
      message: "user updated",
      statusCode: httpStatusCode["OK"],
    });
  } catch (error) {
    next(error);
  }
};
