"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const Order_controller_1 = require("../controller/Order.controller");
exports.OrderRouter = express_1.default.Router();
exports.OrderRouter.route("/:id").post(Order_controller_1.createOrder);
