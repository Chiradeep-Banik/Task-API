"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const mongoose_1 = require("mongoose");
const task_schema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    isCompleted: {
        type: Boolean,
        trim: true,
        default: false
    }
});
exports.task = (0, mongoose_1.model)('task', task_schema, 'Tasks');
