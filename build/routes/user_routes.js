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
exports.router = void 0;
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user_model");
const user_helper_1 = require("../helpers/user_helper");
const auth_1 = require("../middlewares/auth");
exports.router = (0, express_1.Router)();
const ObjectId = mongoose_1.default.Types.ObjectId;
// GET-----------------------------------------------------------------------------------------------------
exports.router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var find_promise = yield user_model_1.user.find({});
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
}));
exports.router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var find_promise = yield user_model_1.user.find({ _id: id });
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//GET-----------------------------------------------------------------------------------------------
//POST ----------------------------------------------------------------------------------------------
exports.router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, user_helper_1.pass_to_hash)(req.body.password);
        req.body._id = new ObjectId();
        req.body.tokens = [{ token: yield (0, user_helper_1.generate_token)(req.body._id) }];
        var create_promise = yield user_model_1.user.create(req.body);
        console.log(create_promise);
        res.status(201).send(create_promise);
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
}));
//LOGIN
exports.router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = yield (0, user_helper_1.check_user)(req.body.email, req.body.password);
        var token = yield (0, user_helper_1.generate_token)(my_user._id);
        my_user.tokens.push({ token: token });
        console.log(my_user);
        yield my_user.save();
        res.status(200).send({ my_user });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
//POST ----------------------------------------------------------------------------------------------
//DELETE-----------------------------------------------------------------------------------------------
exports.router.delete('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delete_promise = yield user_model_1.user.deleteMany({});
        if (delete_promise.deletedCount != 0)
            res.status(200).send(`Deleted all users ${delete_promise}`);
        else
            res.status(404).send("No users found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.router.delete('/users/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var delete_promise = yield user_model_1.user.deleteOne({ _id: id });
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
exports.router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const can_update = new Set(["email", "name", "password"]);
    var { to_update, has_pass } = (0, user_helper_1.user_update_validator)(req, can_update);
    if (!to_update) {
        res.status(400).send("Invalid update");
    }
    else
        try {
            var id = req.params.id;
            if (has_pass == true)
                req.body.password = (0, user_helper_1.pass_to_hash)(req.body.password);
            var update_promise = yield user_model_1.user.findOneAndUpdate({ _id: id }, req.body, { runValidators: true, new: true });
            console.log(update_promise);
            res.status(204).send(update_promise);
        }
        catch (e) {
            res.status(400).send(e);
        }
}));
//UPDATE-------------------------------------------------------------------------------------------------
