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
exports.verifyUser = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const Consts_1 = require("../utils/Consts");
const JWTToken_1 = require("../utils/JWTToken");
const User_service_1 = require("../service/User.service");
function verifyUser(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
            if (!token) {
                throw new CustomError_1.default("Unauthorized", Consts_1.httpStatusCode["Unauthorized"]);
            }
            const id = (yield (0, JWTToken_1.checkToken)(token));
            const result = yield (0, User_service_1.getUserById)(id);
            req.user = result;
            next();
        }
        catch (error) {
            const err = new CustomError_1.default(error.message, Consts_1.httpStatusCode["Bad Request"]);
            next(err);
        }
    });
}
exports.verifyUser = verifyUser;
