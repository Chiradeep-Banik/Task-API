import { Router, Response } from 'express';
import mongoose from 'mongoose';
import { user } from '../models/user_model';
import { task } from '../models/task_model';
import { pass_to_hash, check_user, user_update_validator, generate_token, get_public_fields } from '../helpers/user_helper';
import { auth } from '../middlewares/auth';
import { IRequest, IUser } from '../custom';

export const user_router = Router();


//POST ----------------------------------------------------------------------------------------------
//SIGNUP
user_router.post('/users/signup', async (req: IRequest, res: Response): Promise<void> => {
    try {
        req.body.password = pass_to_hash(req.body.password);
        req.body._id = new mongoose.Types.ObjectId();
        req.body.tokens = [{ token: await generate_token(req.body._id) }];
        var create_promise = await user.create(req.body);
        res.header('Authorization', `Bearer ${req.body.tokens[0].token}`);
        res.status(200).send(await get_public_fields(create_promise));
    } catch (err: unknown) {
        res.status(400).send(err);
    };
});
//LOGIN
user_router.post('/users/login', async (req: IRequest, res: Response): Promise<void> => {
    try {
        var my_user = await check_user(req.body.email, req.body.password);
        var token = await generate_token(my_user._id);
        my_user.tokens.push({ token: token });
        await my_user.save();
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).send(await get_public_fields(my_user));
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//LOGOUT
user_router.post('/users/me/logout', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        console.log(req.req_user);
        var my_user = req.req_user as IUser;
        for (let i = 0; i < (req.req_user as IUser).tokens.length; i++) {
            if (my_user.tokens[i].token == req.token) {
                my_user.tokens.splice(i, 1);
                break;
            }
        }
        await my_user.save();
        res.status(200).send(await get_public_fields(my_user));
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//LOGOUT ALL
user_router.post('/users/me/logoutall', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var my_user = req.req_user as IUser;
        my_user.tokens = [];
        await my_user.save();
        res.status(200).send(await get_public_fields(my_user));
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//POST ----------------------------------------------------------------------------------------------

// GET-----------------------------------------------------------------------------------------------------
user_router.get('/users/me', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        res.status(200).send(await get_public_fields(req.req_user as IUser));
    } catch (err: unknown) {
        res.status(400).send(err);
    };
});
//GET-----------------------------------------------------------------------------------------------

//DELETE-----------------------------------------------------------------------------------------------

user_router.delete('/users/me', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var my_user = req.req_user as IUser;
        var delete_promise = await user.deleteOne({ _id: my_user._id });
        var task_del_promise = await task.deleteMany({ creator_id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(200).send(`Deleted user ${delete_promise} and tasks ${task_del_promise}`);
        else
            res.status(404).send("No users found");
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//DELETE-------------------------------------------------------------------------------------------------


//UPDATE-------------------------------------------------------------------------------------------------
user_router.put("/users/me", auth, async (req: IRequest, res: Response): Promise<void> => {
    const can_update = new Set(["email", "name", "password"]);
    var { to_update, has_pass } = user_update_validator(req, can_update);
    if (!to_update) {
        res.status(400).send("Invalid update");
    } else try {
        var my_user = req.req_user as IUser;
        if (has_pass == true)
            req.body.password = pass_to_hash(req.body.password);
        var update_promise = await user.findOneAndUpdate({ _id: my_user._id }, req.body, { runValidators: true, new: true });
        res.status(200).send(await get_public_fields(update_promise as IUser));
    } catch (e: unknown) {
        res.status(400).send(e);
    }
});
//UPDATE-------------------------------------------------------------------------------------------------

