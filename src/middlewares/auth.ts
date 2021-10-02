import { Response, Request, NextFunction } from 'express';
import { user } from '../models/user_model';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IUser } from '../models/user_model';
//Authentication middleware

export var auth = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    try{
        var token = (req.headers.authorization as string).replace('Bearer ', '');
        if(!token) throw new Error("No token provided");
        console.log(token);
        var decoded = verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        console.log(decoded);
        if(!decoded) throw new Error("Invalid Token");
        var my_user = await user.find({ _id:decoded._id, "tokens.token":token });
        console.log(my_user);
        interface req_user extends Request{
            user:IUser;
        };
        (req as req_user).user = my_user[0];
        next();
    } catch(error:unknown){
        res.status(400).send(`Invalid ${error}`);
    }
};