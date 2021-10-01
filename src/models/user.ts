import { Schema,model,Document} from 'mongoose';
import isEmail from 'validator/es/lib/isEmail';

interface IToken {
    token: string;
};
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tokens: Array<IToken>;
    _id: string;
};

const user_schema = new Schema<IUser>({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
        unique: true,
        validate: {
            validator(value:string){
                if(!isEmail(value))
                    throw new Error("Invalid email");
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
});
export const user = model<IUser>('user', user_schema,'Users');