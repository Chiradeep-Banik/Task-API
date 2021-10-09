import { Router, Response } from 'express';
import { task_update_validator } from "../helpers/task_helper";
import { task } from '../models/task_model';
import { IRequest, IUser } from '../custom';
import { auth } from '../middlewares/auth';

export const task_router = Router();

//POST ----------------------------------------------------------------------------------------------
task_router.post('/users/me/tasks', auth, async (req: IRequest, res: Response) => {
    try {
        var my_user = req.req_user as IUser;
        req.body.creator_id = my_user._id;
        var create_promise = await task.create(req.body);
        res.status(201).send(create_promise);
    } catch (err: unknown) {
        res.status(400).send(err);
    };
});
//POST ----------------------------------------------------------------------------------------------
//GET ------------------------------------------------------------------------------------------------

//GET /users/me/tasks?isCompleted=true
//GET /users/me/tasks?limit=10
task_router.get('/users/me/tasks', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var my_user = req.req_user as IUser;
        if(req.query.limit !== undefined){
            if(req.query.isCompleted === undefined){
                var find_promise = await task.find({ creator_id: my_user._id }).limit(parseInt(req.query.limit as string));
            }else if (req.query.isCompleted === 'true'){
                var find_promise = await task.find({ creator_id: my_user._id, isCompleted:true }).limit(parseInt(req.query.limit as string));
            }else{
                var find_promise = await task.find({ creator_id: my_user._id, isCompleted:false }).limit(parseInt(req.query.limit as string));
            }
        }else{
            var find_promise = await task.find({ creator_id: my_user._id });
        }
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch (err: unknown) {
        res.status(400).send(err);
    };
});
task_router.get('/users/me/tasks/:id', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var id = req.params.id;
        var my_user = req.req_user as IUser;
        var find_promise = await task.find({ _id: id, creator_id: my_user._id });
        if (find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//GET ------------------------------------------------------------------------------------------------

//DELETE----------------------------------------------------------------------------------------------
task_router.delete('/users/me/tasks', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var my_user = req.req_user as IUser;
        var delete_promise = await task.deleteMany({ creator_id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted all ${delete_promise}`);
        else
            res.status(404).send("No task found");
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
task_router.delete('/users/me/tasks/:id', auth, async (req: IRequest, res: Response): Promise<void> => {
    try {
        var id = req.params.id;
        var my_user = req.req_user as IUser;
        var delete_promise = await task.deleteOne({ _id: id, creator_id: my_user._id });
        if (delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted ${delete_promise}`);
        else
            res.status(404).send("No task found");
    } catch (err: unknown) {
        res.status(400).send(err);
    }
});
//DELETE-----------------------------------------------------------------------------------------------

//UPDATE------------------------------------------------------------------------------------------------
task_router.put("/users/me/tasks/:id", auth, async (req: IRequest, res: Response): Promise<void> => {
    const can_update = new Set(["description", "isCompleted", "name"]);
    if (!task_update_validator(req, can_update)) {
        res.status(400).send("Invalid update");
    } else try {
        var my_user = req.req_user as IUser;
        var id = req.params.id;
        var update_promise = await task.findOneAndUpdate({ _id: id, creator_id: my_user._id }, req.body, { runValidators: true });
        res.status(204).send(update_promise);
    } catch (e: unknown) {
        res.status(400).send(e);
    }
});
//UPDATE------------------------------------------------------------------------------------------------
