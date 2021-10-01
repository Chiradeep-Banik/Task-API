"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/es/lib/isEmail"));
;
;
const user_schema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
        unique: true,
        validate: {
            validator(value) {
                if (!(0, isEmail_1.default)(value))
                    throw new Error("Invalid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
exports.user = (0, mongoose_1.model)('user', user_schema, 'Users');
