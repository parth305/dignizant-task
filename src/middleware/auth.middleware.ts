import { Request, Response } from "express";
import CustomError from "../utils/CustomError";
import { httpStatusCode } from "../utils/Consts";
import { checkToken } from "../utils/JWTToken";
import { getUserById } from "../service/User.service";

export async function verifyUser(req: Request, res: Response, next: Function) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomError("Unauthorized", httpStatusCode["Unauthorized"]);
    }

    const id = (await checkToken(token)) as string;
    const result = await getUserById(id);
    req.user = result;
    next();
  } catch (error:any) {
    const err = new CustomError(error.message, httpStatusCode["Bad Request"]);
    next(err);
  }
}
