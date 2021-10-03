import { Response, NextFunction } from 'express';
import { user } from '../models/user_model';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IRequest } from '../custom';

//Authentication middleware

export var auth = async (req:IRequest, res:Response, next:NextFunction):Promise<void>=>{
    try{
        var token = (req.headers.authorization as string).replace('Bearer ', '');
        if(!token) throw new Error("No token provided");
        var decoded = verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        if(!decoded) throw new Error("Invalid Token");
        var my_user = await user.find({ _id:decoded._id, "tokens.token":token });
        console.log(my_user);
        req.req_user = my_user[0];
        req.token = token;
        next();
    } catch(error:unknown){
        res.status(400).send(`Invalid ${error}`);
    }
};