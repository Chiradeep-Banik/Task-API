import { Response, Request, NextFunction } from 'express';
import { user } from '../models/user_model';

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