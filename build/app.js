"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const task_routes_1 = require("./routes/task_routes");
const user_routes_1 = require("./routes/user_routes");
exports.app.use(express_1.default.json());
exports.app.use(user_routes_1.user_router);
exports.app.use(task_routes_1.task_router);
exports.app.get("/", (req, res) => {
    res.send('<h1 style="text-align:center">Server started Properly........</h1>');
});
exports.app.get("*", (req, res) => {
    res.send("<h1>404 NOT FOUND......</h1>");
});
