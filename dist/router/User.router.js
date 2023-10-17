"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = exports.validateCreateUser = exports.createUserSchema = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("../controller/User.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_validator_1 = require("express-validator");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const Consts_1 = require("../utils/Consts");
exports.createUserSchema = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("username can not be empty"),
    (0, express_validator_1.body)("username")
        .isString()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("username length should be greater then 4"),
    (0, express_validator_1.body)("email").isEmail().withMessage("please enter valid email"),
    (0, express_validator_1.body)("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("password should be minimum 6 letters"),
    (0, express_validator_1.body)("phone")
        .isMobilePhone("any", { strictMode: false })
        .withMessage("phone should be valid phone number"),
    (0, express_validator_1.body)("userType")
        .isIn(["USER", "SELLER"])
        .withMessage("user type should be USER or SELLER"),
];
const validateCreateUser = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new CustomError_1.default(JSON.stringify(errors.array().map((el) => el.msg)), Consts_1.httpStatusCode["Bad Request"]);
        next(err);
    }
    next();
};
exports.validateCreateUser = validateCreateUser;
exports.UserRouter = express_1.default.Router();
exports.UserRouter.route("/signup").post(exports.createUserSchema, exports.validateCreateUser, User_controller_1.createUser);
exports.UserRouter.route("/login").post(User_controller_1.loginUser);
exports.UserRouter.use(auth_middleware_1.verifyUser);
exports.UserRouter.route("/me").get(User_controller_1.meRequest);
exports.UserRouter.route("/").patch(User_controller_1.updateUser);
