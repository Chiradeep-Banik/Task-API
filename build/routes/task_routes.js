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
exports.task_router = void 0;
const express_1 = require("express");
const task_helper_1 = require("../helpers/task_helper");
const task_model_1 = require("../models/task_model");
const auth_1 = require("../middlewares/auth");
exports.task_router = (0, express_1.Router)();
//POST ----------------------------------------------------------------------------------------------
exports.task_router.post('/users/me/tasks', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = req.req_user;
        req.body.creator_id = my_user._id;
        var create_promise = yield task_model_1.task.create(req.body);
        res.status(200).send(create_promise);
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
}));
//POST ----------------------------------------------------------------------------------------------
//GET ------------------------------------------------------------------------------------------------
//GET /users/me/tasks?isCompleted=true
//GET /users/me/tasks?limit=10
exports.task_router.get('/users/me/tasks', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = req.req_user;
        if (req.query.limit !== undefined) {
            if (req.query.isCompleted === undefined) {
                var find_promise = yield task_model_1.task.find({ creator_id: my_user._id }).limit(parseInt(req.query.limit));
            }
            else if (req.query.isCompleted === 'true') {
                var find_promise = yield task_model_1.task.find({ creator_id: my_user._id, isCompleted: true }).limit(parseInt(req.query.limit));
            }
            else {
                var find_promise = yield task_model_1.task.find({ creator_id: my_user._id, isCompleted: false }).limit(parseInt(req.query.limit));
            }
        }
        else {
            var find_promise = yield task_model_1.task.find({ creator_id: my_user._id });
        }
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
exports.task_router.get('/users/me/tasks/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var my_user = req.req_user;
        var find_promise = yield task_model_1.task.find({ _id: id, creator_id: my_user._id });
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//GET ------------------------------------------------------------------------------------------------
//DELETE----------------------------------------------------------------------------------------------
exports.task_router.delete('/users/me/tasks', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var my_user = req.req_user;
        var delete_promise = yield task_model_1.task.deleteMany({ creator_id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted all ${delete_promise}`);
        else
            res.status(404).send("No task found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.task_router.delete('/users/me/tasks/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var my_user = req.req_user;
        var delete_promise = yield task_model_1.task.deleteOne({ _id: id, creator_id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted ${delete_promise}`);
        else
            res.status(404).send("No task found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//DELETE-----------------------------------------------------------------------------------------------
//UPDATE------------------------------------------------------------------------------------------------
exports.task_router.put("/users/me/tasks/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const can_update = new Set(["description", "isCompleted", "name"]);
    if (!(0, task_helper_1.task_update_validator)(req, can_update)) {
        res.status(400).send("Invalid update");
    }
    else
        try {
            var my_user = req.req_user;
            var id = req.params.id;
            var update_promise = yield task_model_1.task.findOneAndUpdate({ _id: id, creator_id: my_user._id }, req.body, { runValidators: true });
            res.status(204).send(update_promise);
        }
        catch (e) {
            res.status(400).send(e);
        }
}));
//UPDATE------------------------------------------------------------------------------------------------
