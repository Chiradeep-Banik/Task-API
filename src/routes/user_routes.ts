import { Router,Request,Response } from 'express';
import mongoose from 'mongoose';
import { user } from '../models/user_model';
import { pass_to_hash, check_user, user_update_validator, generate_token } from '../helpers/user_helper';
import { auth } from '../middlewares/auth';
export const router = Router();
const ObjectId = mongoose.Types.ObjectId;

// GET-----------------------------------------------------------------------------------------------------
router.get('/users', async (req:Request, res:Response):Promise<void> => {
    try {
        var find_promise = await user.find({});
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch (err:unknown) {
        res.status(400).send(err);
    };
});
router.get('/users/:id', async (req:Request, res:Response):Promise<void> => {
    try {
        var id = req.params.id;
        var find_promise = await user.find({ _id: id });
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch (err:unknown) {
        res.status(400).send(err);
    }
});
//GET-----------------------------------------------------------------------------------------------

//POST ----------------------------------------------------------------------------------------------
router.post('/users', async (req:Request, res:Response):Promise<void> => {
    try {
        req.body.password = pass_to_hash(req.body.password);
        req.body._id = new ObjectId();
        req.body.tokens = [{ token: await generate_token(req.body._id) }];
        var create_promise = await user.create(req.body);
        console.log(create_promise);
        res.status(201).send(create_promise);
    } catch (err:unknown) {
        res.status(400).send(err);
    };
});
//LOGIN
router.post('/users/login', async (req:Request, res:Response):Promise<void> => {
    try {
        var my_user = await check_user(req.body.email, req.body.password);
        var token = await generate_token(my_user._id);
        my_user.tokens.push({ token: token });
        console.log(my_user);
        await my_user.save();
        res.status(200).send({ my_user });
    } catch (err:unknown) {
        console.log(err);
        res.status(400).send(err);
    }
});

//POST ----------------------------------------------------------------------------------------------

//DELETE-----------------------------------------------------------------------------------------------
router.delete('/users', async (req:Request, res:Response):Promise<void> => {
    try {
        var delete_promise = await user.deleteMany({});
        if (delete_promise.deletedCount != 0)
            res.status(200).send(`Deleted all users ${delete_promise}`);
        else
            res.status(404).send("No users found");
    } catch (err:unknown) {
        res.status(400).send(err);
    }
});
router.delete('/users/:id',auth, async (req:Request, res:Response):Promise<void> => {
    try {
        var id = req.params.id;
        var delete_promise = await user.deleteOne({ _id: id });
        if (delete_promise.deletedCount != 0)
            res.status(200).send(`Deleted user ${delete_promise}`);
        else
            res.status(404).send("No users found");
    } catch (err:unknown) {
        res.status(400).send(err);
    }
});
//DELETE-------------------------------------------------------------------------------------------------


//UPDATE-------------------------------------------------------------------------------------------------
router.put("/users/:id", async (req:Request, res:Response):Promise<void> => {
    const can_update = new Set(["email", "name", "password"]);
    var { to_update, has_pass } = user_update_validator(req, can_update);
    if (!to_update) {
        res.status(400).send("Invalid update");
    } else try {
        var id = req.params.id;
        if (has_pass == true)
            req.body.password = pass_to_hash(req.body.password);
        var update_promise = await user.findOneAndUpdate({ _id: id }, req.body, { runValidators: true, new: true });
        console.log(update_promise);
        res.status(204).send(update_promise);
    } catch (e:unknown) {
        res.status(400).send(e);
    }
});
//UPDATE-------------------------------------------------------------------------------------------------

