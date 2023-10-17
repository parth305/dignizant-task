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
exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const Product_service_1 = require("../service/Product.service");
const CustomResponse_1 = __importDefault(require("../utils/CustomResponse"));
const Consts_1 = require("../utils/Consts");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, Product_service_1.createProductService)(Object.assign(Object.assign({}, req.body), { images: req.files }), req.user._id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "Product Created",
            statusCode: Consts_1.httpStatusCode["Created"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let limit = 5;
        let page = 1;
        if (req.query.limit) {
            let temp = req.query.limit;
            limit = parseInt(temp);
        }
        if (req.query.page) {
            let temp = req.query.page;
            page = parseInt(temp);
        }
        const data = yield (0, Product_service_1.getProductsService)(page, limit);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "Products found",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, Product_service_1.getProductByIdService)(req.params.id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "Product found",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, Product_service_1.deleteProductService)(req.params.id, req.user._id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "Product deleted",
            statusCode: Consts_1.httpStatusCode["No Content"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, Product_service_1.updateProductService)(req.body, req.params.id, req.user._id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "Product updated",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
