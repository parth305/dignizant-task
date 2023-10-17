import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './router/User.router';
import customResponse from './utils/CustomResponse';
import { httpStatusCode } from './utils/Consts';
import CustomError from './utils/CustomError';
import { ProductRouter } from './router/Product.router';
import { verifyUser } from './middleware/auth.middleware';
import path from 'path';
import { OrderRouter } from './router/Order.router';

dotenv.config();

const URI=process.env.MONGO_URI as string
const port = process.env.PORT;
const API="/api/v1"

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("./dist/public"));


app.use(API+"/user",UserRouter)
app.use(verifyUser)
app.use(API+"/product",ProductRouter)
app.use(API+"/order",OrderRouter)


app.use((error:CustomError, req:Request, res:Response, next:Function) => {
  const statusCode =
    error.statusCode || httpStatusCode['Internal Server Error'];
  const message = error.message || 'Internal server error';

  return customResponse({
    success: false,
    res,
    message,
    statusCode,
    error,
    data: null,
  });
});

app.listen(port, () => {
    mongoose
      .connect(URI)
      .then(() => {
        console.log(`Server started on port ` + port);
      })
      .catch((err) => console.log(err.message));
  });
  