"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.get_public_fields = exports.generate_token = exports.user_update_validator = exports.check_user = exports.pass_to_hash = void 0;
const user_model_1 = require("../models/user_model");
const dotenv = __importStar(require("dotenv"));
const crypto_1 = require("crypto");
const password_validator_1 = __importDefault(require("password-validator"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv.config();
//Hashing the password with sha256
var isStrongPassword = new password_validator_1.default();
isStrongPassword.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits().has().not().spaces().has().symbols();
var pass_to_hash = (pass) => {
    if (!isStrongPassword.validate(pass))
        throw ("Password is not strong enough");
    var hash_password = (0, crypto_1.createHash)('sha256').update(pass).digest('hex');
    return hash_password;
};
exports.pass_to_hash = pass_to_hash;
//Checking the user during login
var check_user = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var my_user = yield user_model_1.user.findOne({ email: email });
    var hash_password = (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    if (my_user == null) {
        throw ("User not found");
    }
    else if (hash_password !== my_user.password) {
        throw ("Wrong password");
    }
    else
        return my_user;
});
exports.check_user = check_user;
var user_update_validator = (value, value_set) => {
    var data = Object.keys(value.body);
    var to_update = true;
    var has_pass = false;
    for (var i = 0; i < data.length; i++) {
        if (data[i] == "password") {
            has_pass = true;
        }
        if (!value_set.has(data[i])) {
            to_update = false;
            break;
        }
    }
    return { to_update, has_pass };
};
exports.user_update_validator = user_update_validator;
//User token creater 
var generate_token = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var token = (0, jsonwebtoken_1.sign)({ _id: id.toString() }, process.env.SECRET_KEY);
    return token;
});
exports.generate_token = generate_token;
//Get the public feilds of the user
var get_public_fields = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
});
exports.get_public_fields = get_public_fields;
