import { Response } from "express";
interface ResponseData{
        res:Response,
        message:string,
        data:any,
        error:null | Error,
        statusCode:number;
        success:Boolean
}

function customResponse({
    res,
    message,
    data,
    error = null,
    statusCode = 200,
    success = true,
  }:Partial<ResponseData>) {
    return res
      ?.status(statusCode)
      .json({ statusCode, success, message, data, error });
  }
  
export default customResponse
  