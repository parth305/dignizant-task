"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_router_1 = require("./router/User.router");
const CustomResponse_1 = __importDefault(require("./utils/CustomResponse"));
const Consts_1 = require("./utils/Consts");
const Product_router_1 = require("./router/Product.router");
const auth_middleware_1 = require("./middleware/auth.middleware");
const Order_router_1 = require("./router/Order.router");
dotenv_1.default.config();
const URI = process.env.MONGO_URI;
const port = process.env.PORT;
const API = "/api/v1";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("./dist/public"));
app.use(API + "/user", User_router_1.UserRouter);
app.use(auth_middleware_1.verifyUser);
app.use(API + "/product", Product_router_1.ProductRouter);
app.use(API + "/order", Order_router_1.OrderRouter);
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || Consts_1.httpStatusCode['Internal Server Error'];
    const message = error.message || 'Internal server error';
    return (0, CustomResponse_1.default)({
        success: false,
        res,
        message,
        statusCode,
        error,
        data: null,
    });
});
app.listen(port, () => {
    mongoose_1.default
        .connect(URI)
        .then(() => {
        console.log(`Server started on port ` + port);
    })
        .catch((err) => console.log(err.message));
});
