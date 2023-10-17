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
exports.updateProductService = exports.deleteProductService = exports.getProductByIdService = exports.getProductsService = exports.createProductService = void 0;
const Product_model_1 = require("../model/Product.model");
const Consts_1 = require("../utils/Consts");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const createProductService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield Product_model_1.Product.create({
        title: data.title,
        description: data.description,
        price: data.price,
        discountPrice: data.discountPrice,
        stock: data.stock,
        images: (_a = data.images) === null || _a === void 0 ? void 0 : _a.map((el) => `http://localhost:${process.env.PORT}/${el.filename}`),
        sellerId: id,
    });
    return product;
});
exports.createProductService = createProductService;
const getProductsService = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skipDocs = (page - 1) * limit;
    const products = yield Product_model_1.Product.find().skip(skipDocs).limit(limit);
    if (!products.length) {
        throw new CustomError_1.default("no Products found", Consts_1.httpStatusCode["Bad Request"]);
    }
    return products;
});
exports.getProductsService = getProductsService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.Product.findById(id).populate("sellerId");
    if (!product) {
        throw new CustomError_1.default("no Product found", Consts_1.httpStatusCode["Bad Request"]);
    }
    return product;
});
exports.getProductByIdService = getProductByIdService;
const deleteProductService = (_id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Product_model_1.Product.findOneAndDelete({ _id, sellerId });
    if (!data) {
        throw new CustomError_1.default("no Product found", Consts_1.httpStatusCode["Bad Request"]);
    }
    return data;
});
exports.deleteProductService = deleteProductService;
const updateProductService = (data, id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.Product.findOne({ _id: id, sellerId });
    if (!product) {
        throw new CustomError_1.default("no Product found", Consts_1.httpStatusCode["Bad Request"]);
    }
    if (data.images) {
        throw new CustomError_1.default("Images can't be updated", Consts_1.httpStatusCode["Bad Request"]);
    }
    const updatedProduct = yield Product_model_1.Product.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updatedProduct;
});
exports.updateProductService = updateProductService;
