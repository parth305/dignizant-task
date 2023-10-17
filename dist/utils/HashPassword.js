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
exports.checkHash = exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function generateHash(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(8);
        const password = yield bcryptjs_1.default.hash(val, salt);
        return password;
    });
}
exports.generateHash = generateHash;
function checkHash(password, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bcryptjs_1.default.compare(password, encryptedPassword);
        return result;
    });
}
exports.checkHash = checkHash;
