const { user } = require('../models/user');
const { createHash } = require('crypto');
const { isStrongPassword } = require('validator');
const { sign,verify } = require('jsonwebtoken');
require('dotenv').config();

//Hashing the password with sha256
var pass_to_hash = (pass)=>{
    if(!isStrongPassword(pass)) 
        throw ("Password is not strong enough");
    var hash_password = createHash('sha256').update(pass).digest('hex');
    return hash_password;
};
//Checking the user during login
var check_user = async (email ,password)=>{
    var my_user = await user.findOne({ email: email});
    var hash_password = createHash('sha256').update(password).digest('hex');
    if(my_user == null){
        throw ("User not found");
    }else if(hash_password !== my_user.password){
        throw ("Wrong password");
    }else return my_user;
}
//User UPDATE validator
var user_update_validator = (value, value_set)=>{
    var data = Object.keys(value);
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
var generate_token = async (id)=>{
    var token = sign({ _id: id.toString(),date: Date.now() }, process.env.SECRET_KEY);
    return token;
};
//verify token
var verify_token = async (token)=>{
    try{
        var res = verify(token, process.env.SECRET_KEY);
        if(res) return true;
    } catch (err){
        return false;
    }
};

module.exports= {
    pass_to_hash,
    check_user,
    user_update_validator,
    generate_token,
    verify_token
}