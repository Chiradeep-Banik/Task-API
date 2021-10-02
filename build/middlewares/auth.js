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
//Authentication middleware
var auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.body.token;
    var id = req.params.id;
    if (token) {
        try {
            var m_user = yield user_model_1.user.findById(id);
            if (m_user !== null) {
                for (var i = 0; i < m_user.tokens.length; i++) {
                    if (m_user.tokens[i].token === token) {
                        next();
                        return;
                    }
                }
            }
            throw ("Invalid token");
        }
        catch (err) {
            res.status(401).send(err);
        }
    }
    else {
        res.send("No token provided");
    }
});
exports.auth = auth;
