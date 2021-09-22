const { Router } = require('express');
const { task } = require('./../models/task');

const router = new Router();

//POST ----------------------------------------------------------------------------------------------
router.post('/tasks', async (req, res) => {
    try{
        var create_promise = await task.create(req.body);
        res.status(201).send(create_promise);
    } catch(err){
        res.status(400).send(err);
    };
});
//POST ----------------------------------------------------------------------------------------------

//GET -----------------------------------------------------------------------------------------------
router.get('/tasks', async (req, res) => {
    try{
        var find_promise = await task.find({});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err) {
        res.status(400).send(err);
    };
});
router.get('/tasks/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var find_promise = await task.find({_id: id});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err){
        res.status(400).send(err);
    }
});
//GET ------------------------------------------------------------------------------------------------

//DELETE----------------------------------------------------------------------------------------------
router.delete('/tasks', async (req,res)=>{    
    try{
        var delete_promise = await task.deleteMany({});
        if(delete_promise.deletedCount != 0)
            res.status(204).send(delete_promise);
        else
            res.status(404).send("No task found");
    } catch(err){
        res.status(400).send(err);
    }
});
router.delete('/tasks/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var delete_promise = await task.deleteOne({_id: id});
        if(delete_promise.deletedCount != 0)
            res.status(204).send(delete_promise);
        else
            res.status(404).send("No task found");
    }catch(err){
        res.status(400).send(err);
    }
});
//DELETE-----------------------------------------------------------------------------------------------

//UPDATE------------------------------------------------------------------------------------------------
router.put("/tasks/:id", async (req,res)=>{
    var data = Object.keys(req.body);
    console.log(data);
    const can_update = new Set(["description", "isCompleted","name"]);
    var to_update = true;
    for(var i = 0; i < data.length; i++){
        if(!can_update.has(data[i])){
            to_update = false;
            break;
        }
    }
    if(!to_update){
        res.status(400).send("Invalid update");
    }else try {
        var id = req.params.id;
        var update_promise = await task.findOneAndUpdate({_id : id },req.body , {runValidators:true});
        res.status(204).send(update_promise);
    } catch (e) {
        res.status(400).send(e);
    }
});
//UPDATE------------------------------------------------------------------------------------------------


module.exports = router;