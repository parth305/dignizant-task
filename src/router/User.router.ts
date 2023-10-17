import express, { Router } from "express";
import {
  createUser,
  loginUser,
  meRequest,
  updateUser,
} from "../controller/User.controller";
import { verifyUser } from "../middleware/auth.middleware";
import { body, validationResult } from "express-validator";
import CustomError from "../utils/CustomError";
import { httpStatusCode } from "../utils/Consts";
export const createUserSchema = [
  body("name").isString().notEmpty().withMessage("username can not be empty"),
  body("username")
    .isString()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("username length should be greater then 4"),
  body("email").isEmail().withMessage("please enter valid email"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("password should be minimum 6 letters"),
  body("phone")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("phone should be valid phone number"),
  body("userType")
    .isIn(["USER", "SELLER"])
    .withMessage("user type should be USER or SELLER"),
];

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: Function
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err= new CustomError(
      JSON.stringify(errors.array().map((el) => el.msg)),
      httpStatusCode["Bad Request"]
    );
    next(err)
  }
  next();
};

export const UserRouter: Router = express.Router();

UserRouter.route("/signup").post(
  createUserSchema,
  validateCreateUser,
  createUser
);
UserRouter.route("/login").post(loginUser);

UserRouter.use(verifyUser);
UserRouter.route("/me").get(meRequest);
UserRouter.route("/").patch(updateUser);
