import { Router, Response } from 'express';
import { task_update_validator } from "../helpers/task_helper";
import { task } from '../models/task_model';
import { IRequest } from '../custom';

export const router = Router();

//POST ----------------------------------------------------------------------------------------------
router.post('/tasks', async (req:IRequest, res:Response) => {
    try{
        var create_promise = await task.create(req.body);
        res.status(201).send(create_promise);
    } catch(err:unknown){
        res.status(400).send(err);
    };
});
//POST ----------------------------------------------------------------------------------------------

//GET -----------------------------------------------------------------------------------------------
router.get('/tasks', async (req:IRequest, res:Response):Promise<void> => {
    try{
        var find_promise = await task.find({});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err:unknown) {
        res.status(400).send(err);
    };
});
router.get('/tasks/:id', async (req:IRequest,res:Response):Promise<void>=>{
    try{
        var id = req.params.id;
        var find_promise = await task.find({_id: id});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err:unknown){
        res.status(400).send(err);
    }
});
//GET ------------------------------------------------------------------------------------------------

//DELETE----------------------------------------------------------------------------------------------
router.delete('/tasks', async (req:IRequest,res:Response):Promise<void>=>{    
    try{
        var delete_promise = await task.deleteMany({});
        if(delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted all ${delete_promise}`);
        else
            res.status(404).send("No task found");
    } catch(err:unknown){
        res.status(400).send(err);
    }
});
router.delete('/tasks/:id', async (req:IRequest,res:Response):Promise<void>=>{
    try{
        var id = req.params.id;
        var delete_promise = await task.deleteOne({_id: id});
        if(delete_promise.deletedCount != 0)
            res.status(204).send(`Deleted ${delete_promise}`);
        else
            res.status(404).send("No task found");
    }catch(err:unknown){
        res.status(400).send(err);
    }
});
//DELETE-----------------------------------------------------------------------------------------------

//UPDATE------------------------------------------------------------------------------------------------
router.put("/tasks/:id", async (req:IRequest,res:Response):Promise<void>=>{
    const can_update = new Set(["description", "isCompleted","name"]);
    if(!task_update_validator(req, can_update)){
        res.status(400).send("Invalid update");
    }else try {
        var id = req.params.id;
        var update_promise = await task.findOneAndUpdate({_id : id },req.body , {runValidators:true});
        res.status(204).send(update_promise);
    } catch (e:unknown) {
        res.status(400).send(e);
    }
});
//UPDATE------------------------------------------------------------------------------------------------
