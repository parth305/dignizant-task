"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function customResponse({ res, message, data, error = null, statusCode = 200, success = true, }) {
    return res === null || res === void 0 ? void 0 : res.status(statusCode).json({ statusCode, success, message, data, error });
}
exports.default = customResponse;
