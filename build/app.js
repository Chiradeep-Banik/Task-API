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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
require("./db/mongoose");
const app = (0, express_1.default)();
dotenv.config();
const task_routes_1 = require("./routes/task_routes");
const user_routes_1 = require("./routes/user_routes");
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(user_routes_1.user_router);
app.use(task_routes_1.task_router);
app.get("/", (req, res) => {
    res.send('<h1 style="text-align:center">Server started Properlly........</h1>');
});
app.get("*", (req, res) => {
    res.send("<h1>404 NOT FOUND......</h1>");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT} !!!!!`));
