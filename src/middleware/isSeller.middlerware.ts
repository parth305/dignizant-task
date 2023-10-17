import { httpStatusCode } from "../utils/Consts";
import CustomError from "../utils/CustomError";
import { Request,Response } from "express";

export async function isSeller(req: Request, res: Response, next: Function) {
  if (req.user.userType === "SELLER") {
    return next();
  }
  const error = new CustomError("Unauthorized", httpStatusCode["Unauthorized"]);
  return next(error);
};
