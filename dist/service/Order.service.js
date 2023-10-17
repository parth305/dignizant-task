"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = void 0;
const Order_model_1 = require("../model/Order.model");
const Product_model_1 = require("../model/Product.model");
const Consts_1 = require("../utils/Consts");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const createOrderService = (buyerId, productId, qty) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.Product.findById(productId);
    if (!product) {
        throw new CustomError_1.default("no Product found", Consts_1.httpStatusCode["Bad Request"]);
    }
    const temp = product.stock - parseInt(qty);
    if (temp < 0) {
        throw new CustomError_1.default("Insufficient stock", Consts_1.httpStatusCode["Bad Request"]);
    }
    const updatedProduct = yield Product_model_1.Product.updateOne({ _id: productId }, {
        $inc: {
            stock: -qty,
        },
    });
    const order = yield Order_model_1.Order.create({
        buyerId,
        productId,
        qty,
    });
    return order;
});
exports.createOrderService = createOrderService;
