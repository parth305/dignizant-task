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
exports.updateUser = exports.meRequest = exports.loginUser = exports.createUser = void 0;
const User_service_1 = require("../service/User.service");
const express_validator_1 = require("express-validator");
const Consts_1 = require("../utils/Consts");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const CustomResponse_1 = __importDefault(require("../utils/CustomResponse"));
const JWTToken_1 = require("../utils/JWTToken");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new CustomError_1.default(errors.array()[0].msg, Consts_1.httpStatusCode["Bad Request"]);
        }
        const data = yield (0, User_service_1.createUserService)(req.body);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "User registered successfully",
            statusCode: Consts_1.httpStatusCode["Created"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, User_service_1.loginUserService)(req.body);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "login successfull",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const meRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = yield (0, User_service_1.meRequestService)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "user found",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.meRequest = meRequest;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const token = (_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
        if (!token) {
            throw new CustomError_1.default("no token found", Consts_1.httpStatusCode["Bad Request"]);
        }
        const id = (yield (0, JWTToken_1.checkToken)(token));
        const data = yield (0, User_service_1.updateUserService)(req.body, id);
        return (0, CustomResponse_1.default)({
            res,
            data,
            message: "user updated",
            statusCode: Consts_1.httpStatusCode["OK"],
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
