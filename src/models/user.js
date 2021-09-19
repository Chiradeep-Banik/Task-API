const { Schema,model } = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');

const user_schema = new Schema({
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
        validate: {
            validator(value){
                if(!isEmail(value))
                    throw new Error("Invalid email");
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate:{
            validator(value){
                if(!isStrongPassword(value)){
                    throw new Error("Not a strong password");
                }
            }
        }
    }
});
const user = model('user', user_schema,'Users');
module.exports ={
    user
}