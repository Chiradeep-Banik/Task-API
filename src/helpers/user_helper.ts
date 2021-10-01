import { user,IUser } from "../models/user";
import * as dotenv from 'dotenv';
import { createHash } from "crypto";
// import isStrongPassword from 'validator/es/lib/isStrongPassword';
import { sign } from 'jsonwebtoken';
import {  Request, Response, NextFunction } from "express";
dotenv.config();
import { env } from 'node:process'

//Hashing the password with sha256
export var pass_to_hash = (pass:string):string=>{
    // if(!isStrongPassword(pass)) 
    //     throw ("Password is not strong enough");
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
    var secret = env.SECRET || "123";
    var token = sign({ _id: id.toString(),date: Date.now() }, secret);
    return token;
};

//Authentication middleware

export var auth = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    var token = req.body.token;
    var id = req.params.id;
    if(token){
        try{
            var m_user = await user.findById(id);
            if(m_user !== null){
                for(var i = 0; i < m_user.tokens.length; i++){
                    if(m_user.tokens[i].token === token){
                        next();
                        return;
                    }
                }
            }
            throw ("Invalid token");
        } catch (err){
            res.status(401).send(err);
        }
    }else{
        res.send("No token provided");
    }
};