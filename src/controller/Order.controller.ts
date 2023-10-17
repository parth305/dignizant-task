import { Request,Response } from "express"
import { createOrderService } from "../service/Order.service"
import customResponse from "../utils/CustomResponse";
import { httpStatusCode } from "../utils/Consts";

export const createOrder=async(req:Request,res:Response,next:Function)=>{
    try {
        const data=await createOrderService(req.user._id,req.params.id,req.body.qty)
        return customResponse({
            res,
            data,
            message: "Order Created",
            statusCode: httpStatusCode["OK"],
          });
    } catch (error) {
        next(error)
    }
}