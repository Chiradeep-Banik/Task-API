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
exports.user_router = void 0;
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user_model");
const user_helper_1 = require("../helpers/user_helper");
const auth_1 = require("../middlewares/auth");
exports.user_router = (0, express_1.Router)();
const ObjectId = mongoose_1.default.Types.ObjectId;
// GET-----------------------------------------------------------------------------------------------------
exports.user_router.get('/users/me', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(yield (0, user_helper_1.get_public_fields)(req.req_user));
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
}));
//GET-----------------------------------------------------------------------------------------------
//POST ----------------------------------------------------------------------------------------------
//SIGNUP
exports.user_router.post('/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, user_helper_1.pass_to_hash)(req.body.password);
        req.body._id = new ObjectId();
        req.body.tokens = [{ token: yield (0, user_helper_1.generate_token)(req.body._id) }];
        var create_promise = yield user_model_1.user.create(req.body);
        res.header('Authorization', `Bearer ${req.body.tokens[0].token}`);
        res.status(201).send(yield (0, user_helper_1.get_public_fields)(create_promise));
    }
    catch (err) {
        res.status(401).send(err);
    }
    ;
}));
//LOGIN
exports.user_router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = yield (0, user_helper_1.check_user)(req.body.email, req.body.password);
        var token = yield (0, user_helper_1.generate_token)(my_user._id);
        my_user.tokens.push({ token: token });
        yield my_user.save();
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).send(yield (0, user_helper_1.get_public_fields)(my_user));
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
//LOGOUT
exports.user_router.post('/users/logout', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.req_user);
        var my_user = req.req_user;
        for (let i = 0; i < req.req_user.tokens.length; i++) {
            if (my_user.tokens[i].token == req.token) {
                my_user.tokens.splice(i, 1);
                break;
            }
        }
        console.log(my_user);
        yield my_user.save();
        res.status(200).send(yield (0, user_helper_1.get_public_fields)(my_user));
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//LOGOUT ALL
exports.user_router.post('/users/logoutall', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = req.req_user;
        my_user.tokens = [];
        yield my_user.save();
        res.status(200).send(yield (0, user_helper_1.get_public_fields)(my_user));
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//POST ----------------------------------------------------------------------------------------------
//DELETE-----------------------------------------------------------------------------------------------
exports.user_router.delete('/users/me', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = req.req_user;
        var delete_promise = yield user_model_1.user.deleteOne({ _id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(200).send(`Deleted user ${delete_promise}`);
        else
            res.status(404).send("No users found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//DELETE-------------------------------------------------------------------------------------------------
//UPDATE-------------------------------------------------------------------------------------------------
exports.user_router.put("/users/me", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const can_update = new Set(["email", "name", "password"]);
    var { to_update, has_pass } = (0, user_helper_1.user_update_validator)(req, can_update);
    if (!to_update) {
        res.status(400).send("Invalid update");
    }
    else
        try {
            var my_user = req.req_user;
            if (has_pass == true)
                req.body.password = (0, user_helper_1.pass_to_hash)(req.body.password);
            var update_promise = yield user_model_1.user.findOneAndUpdate({ _id: my_user._id }, req.body, { runValidators: true, new: true });
            console.log(update_promise);
            res.status(204).send(yield (0, user_helper_1.get_public_fields)(update_promise));
        }
        catch (e) {
            res.status(400).send(e);
        }
}));
//UPDATE-------------------------------------------------------------------------------------------------
