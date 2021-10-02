import { user,IUser } from "../models/user_model";
import * as dotenv from 'dotenv';
import { createHash } from "crypto";
import PasswordValidator from "password-validator";
import { sign } from 'jsonwebtoken';
import {  Request, Response, NextFunction } from "express";
dotenv.config();

//Hashing the password with sha256
var isStrongPassword = new PasswordValidator();
isStrongPassword.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits().has().not().spaces().has().symbols();
export var pass_to_hash = (pass:string):string=>{
    if(!isStrongPassword.validate(pass)) 
        throw ("Password is not strong enough");
    var hash_password = createHash('sha256').update(pass).digest('hex');
    return hash_password;
};
//Checking the user during login
export var check_user = async (email:string ,password:string):Promise<IUser>=>{
    var my_user = await user.findOne({ email: email});
    var hash_password = createHash('sha256').update(password).digest('hex');
    if(my_user == null){
        throw ("User not found");
    }else if(hash_password !== my_user.password){
        throw ("Wrong password");
    }else return my_user;
}
//User UPDATE validator
type update_return = {
    to_update:boolean,
    has_pass:boolean
};
export var user_update_validator = (value:Request, value_set:Set<string>):update_return=>{
    var data = Object.keys(value.body);
    var to_update = true;
    var has_pass = false;
    for(var i = 0; i < data.length; i++){
        if(data[i] == "password"){
            has_pass = true;
        }
        if(!value_set.has(data[i])){
            to_update = false;
            break;
        }
    }
    return { to_update, has_pass };
}
//User token creater 
export var generate_token = async (id:string):Promise<string>=>{
    var token = sign({ _id: id.toString()}, process.env.SECRET_KEY as string);
    return token;
};

