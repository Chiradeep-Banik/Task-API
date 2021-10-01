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
exports.router = void 0;
const express_1 = require("express");
const task_helper_1 = require("../helpers/task_helper");
const task_1 = require("../models/task");
exports.router = (0, express_1.Router)();
//POST ----------------------------------------------------------------------------------------------
exports.router.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var create_promise = yield task_1.task.create(req.body);
        res.status(201).send(create_promise);
    }
    catch (err) {
        res.status(400).send(err);
    }
    ;
}));
//POST ----------------------------------------------------------------------------------------------
//GET -----------------------------------------------------------------------------------------------
exports.router.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var find_promise = yield task_1.task.find({});
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
exports.router.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var find_promise = yield task_1.task.find({ _id: id });
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
exports.router.delete('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delete_promise = yield task_1.task.deleteMany({});
        if (delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted all ${delete_promise}`);
        else
            res.status(404).send("No task found");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.router.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var delete_promise = yield task_1.task.deleteOne({ _id: id });
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
exports.router.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const can_update = new Set(["description", "isCompleted", "name"]);
    if (!(0, task_helper_1.task_update_validator)(req, can_update)) {
        res.status(400).send("Invalid update");
    }
    else
        try {
            var id = req.params.id;
            var update_promise = yield task_1.task.findOneAndUpdate({ _id: id }, req.body, { runValidators: true });
            res.status(204).send(update_promise);
        }
        catch (e) {
            res.status(400).send(e);
        }
}));
//UPDATE------------------------------------------------------------------------------------------------
