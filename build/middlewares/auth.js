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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_model_1 = require("../models/user_model");
const jsonwebtoken_1 = require("jsonwebtoken");
//Authentication middleware
var auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var token = req.headers.authorization.replace('Bearer ', '');
        if (!token)
            throw new Error("No token provided");
        var decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
        if (!decoded)
            throw new Error("Invalid Token");
        var my_user = yield user_model_1.user.find({ _id: decoded._id, "tokens.token": token });
        if (my_user.length == 0)
            throw new Error("Invalid Token");
        req.req_user = my_user[0];
        req.token = token;
        next();
    }
    catch (error) {
        res.status(400).send(`Invalid ${error}`);
    }
});
exports.auth = auth;
