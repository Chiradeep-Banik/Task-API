import { Document } from 'mongoose';
import { Request } from 'express';

export interface IToken {
    token: string;
}
export interface ITask {
    name: string;
    description: string;
    isCompleted: boolean;
    creator_id: string;
}
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tokens: Array<IToken>;
    _id: string;
}
export interface IRequest extends Request {
    req_user?: IUser;
    token?: string;
}