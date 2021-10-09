import { Schema, model } from 'mongoose';
import * as emailValidator from 'email-validator';
import { IUser } from '../custom';

const user_schema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
        unique: true,
        minlength: 3,
        validate: {
            validator(value: string) {
                if (!(emailValidator.validate(value))) {
                    throw new Error("Invalid email");
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
});

export const user = model<IUser>('user', user_schema, 'Users');