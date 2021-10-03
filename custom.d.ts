import { Document } from 'mongoose';

declare namespace Express {
    interface IToken {
        token: string;
    }
    export interface IUser extends Document {
        name: string;
        email: string;
        password: string;
        tokens: Array<IToken>;
        _id: string;
    }
    export interface Request {
       user?: IUser;
    }
 }