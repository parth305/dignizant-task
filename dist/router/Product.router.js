"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Product_controller_1 = require("../controller/Product.controller");
const isSeller_middlerware_1 = require("../middleware/isSeller.middlerware");
const storage = multer_1.default.diskStorage({
    destination: "./dist/public",
    filename: fun,
});
function fun(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
}
exports.ProductRouter = express_1.default.Router();
exports.ProductRouter.route("/").post(isSeller_middlerware_1.isSeller, (0, multer_1.default)({
    storage,
}).array("Images"), Product_controller_1.createProduct);
exports.ProductRouter.route("/").get(Product_controller_1.getProducts);
exports.ProductRouter.route("/:id").get(Product_controller_1.getProductById);
exports.ProductRouter.route("/:id").delete(isSeller_middlerware_1.isSeller, Product_controller_1.deleteProduct);
exports.ProductRouter.route("/:id").patch(isSeller_middlerware_1.isSeller, Product_controller_1.updateProduct);
