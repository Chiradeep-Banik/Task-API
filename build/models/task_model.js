"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const mongoose_1 = require("mongoose");
const task_schema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
    },
    creator_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.task = (0, mongoose_1.model)('task', task_schema, 'Tasks');
