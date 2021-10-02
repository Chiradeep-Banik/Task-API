import { Schema,model } from "mongoose";

export interface ITask {
    name:string;
    description:string;
    isCompleted:boolean;
}

const task_schema = new Schema<ITask>({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    isCompleted:{
        type: Boolean,
        trim: true,
        default: false
    }
});

export const task = model<ITask>('task', task_schema,'Tasks');
