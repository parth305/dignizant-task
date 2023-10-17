import express, { Router, Request } from "express";
import { createOrder } from "../controller/Order.controller";

export const OrderRouter: Router = express.Router();


OrderRouter.route("/:id").post(createOrder)