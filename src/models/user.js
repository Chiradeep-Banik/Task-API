const { Schema,model } = require('mongoose');
const { isEmail } = require('validator');

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
        unique: true,
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
        trim: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
});
const user = model('user', user_schema,'Users');
module.exports ={
    user
}