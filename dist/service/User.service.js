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
exports.getUserById = exports.updateUserService = exports.meRequestService = exports.loginUserService = exports.createUserService = void 0;
const User_model_1 = require("../model/User.model");
const Consts_1 = require("../utils/Consts");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const HashPassword_1 = require("../utils/HashPassword");
const JWTToken_1 = require("../utils/JWTToken");
var Types;
(function (Types) {
    Types["USER"] = "USER";
    Types["ADMIN"] = "ADMIN";
})(Types || (Types = {}));
const createUserService = ({ name, username, phone, email, password, userType }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasedpassword = yield (0, HashPassword_1.generateHash)(password);
        const data = yield User_model_1.User.create({
            name,
            username,
            phone,
            email,
            password: hasedpassword,
            userType: userType ? userType : Types.USER
        });
        const _id = data._id;
        const token = yield (0, JWTToken_1.generateToken)(_id);
        return { token };
    }
    catch (error) {
        throw new CustomError_1.default(error.message, Consts_1.httpStatusCode["Bad Request"]);
    }
});
exports.createUserService = createUserService;
const loginUserService = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User does not exists", Consts_1.httpStatusCode["Bad Request"]);
    }
    const pass = yield (0, HashPassword_1.checkHash)(password, user.password);
    if (!pass) {
        throw new CustomError_1.default("Email or passowrd is wrong", Consts_1.httpStatusCode["Bad Request"]);
    }
    const token = yield (0, JWTToken_1.generateToken)(user._id);
    return { token };
});
exports.loginUserService = loginUserService;
const meRequestService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(id);
    if (!user) {
        throw new CustomError_1.default("User does not exists", Consts_1.httpStatusCode["Bad Request"]);
    }
    const res = { name: user === null || user === void 0 ? void 0 : user.name, username: user === null || user === void 0 ? void 0 : user.username, phone: user === null || user === void 0 ? void 0 : user.phone, email: user === null || user === void 0 ? void 0 : user.email, _id: user === null || user === void 0 ? void 0 : user._id, userType: user === null || user === void 0 ? void 0 : user.userType };
    return res;
});
exports.meRequestService = meRequestService;
const updateUserService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(id);
    if (!user) {
        throw new CustomError_1.default("User does not exists", Consts_1.httpStatusCode["Bad Request"]);
    }
    if (data.password) {
        const hasedpassword = yield (0, HashPassword_1.generateHash)(data.password);
        data = Object.assign(Object.assign({}, data), { password: hasedpassword });
    }
    const updatedUser = yield User_model_1.User.findByIdAndUpdate(id, data, { new: true });
    const res = { name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name, username: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.username, phone: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.phone, email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email, _id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id, userType: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.userType };
    return res;
});
exports.updateUserService = updateUserService;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(id);
    if (!user) {
        throw new CustomError_1.default("Unauthorized", Consts_1.httpStatusCode["Unauthorized"]);
    }
    return user;
});
exports.getUserById = getUserById;
