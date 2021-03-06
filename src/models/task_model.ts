import { Schema, model } from "mongoose";
import { ITask } from "../custom";

const task_schema = new Schema<ITask>({
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
},{
    timestamps:true
});

export const task = model<ITask>('task', task_schema, 'Tasks');
