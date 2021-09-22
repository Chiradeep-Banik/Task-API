const express = require('express');
const app = express();

require("./db/mongoose");
const { user } = require("./models/user");
const { task } = require("./models/task");

const PORT = process.env.PORT || 1313;

app.use(express.json());

//Task POST ----------------------------------------------------------------------------------------------
app.post('/tasks', async (req, res) => {
    try{
        var create_promise = await task.create(req.body);
        res.status(201).send(create_promise);
    } catch(err){
        res.status(400).send(err);
    };
});
//Task POST ----------------------------------------------------------------------------------------------
//User POST ----------------------------------------------------------------------------------------------
app.post('/users', async (req, res) => {
    try{
        var create_promise = await user.create(req.body);
        res.status(201).send(create_promise);
    } catch(err){
        res.status(400).send(err);
    };
});
//User POST ----------------------------------------------------------------------------------------------
//Task GET -----------------------------------------------------------------------------------------------
app.get('/tasks', async (req, res) => {
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
app.get('/tasks/:id', async (req,res)=>{
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
//Task GET ------------------------------------------------------------------------------------------------
////User GET-----------------------------------------------------------------------------------------------
app.get('/users', async (req, res) => {
    try{
        var find_promise = await user.find({});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err) {
        res.status(400).send(err);
    };
});
app.get('/users/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var find_promise = await user.find({_id: id});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err){
        res.status(400).send(err);
    }
});
////User GET-----------------------------------------------------------------------------------------------
//Task DELETE----------------------------------------------------------------------------------------------
app.delete('/tasks', async (req,res)=>{    
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
app.delete('/tasks/:id', async (req,res)=>{
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
//Task DELETE-----------------------------------------------------------------------------------------------
//User DELETE-----------------------------------------------------------------------------------------------
app.delete('/users', async (req,res)=>{    
    try{
        var delete_promise = await user.deleteMany({});
        if(delete_promise.deletedCount != 0)
            res.status(200).send("Deleted all users",delete_promise);
        else
            res.status(404).send("No users found");
    } catch(err){
        res.status(400).send(err);
    }
});
app.delete('/users/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var delete_promise = await user.deleteOne({_id: id});
        if(delete_promise.deletedCount != 0)
            res.status(200).send("Deleted all users",delete_promise);
        else
            res.status(404).send("No users found");
    }catch(err){
        res.status(400).send(err);
    }
});
//User DELETE-------------------------------------------------------------------------------------------------

//Task UPDATE-------------------------------------------------------------------------------------------------
app.put("/tasks/:id", async (req,res)=>{
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
//User UPDATE-------------------------------------------------------------------------------------------------
app.put("/users/:id", async (req,res)=>{
    var data = Object.keys(req.body);
    console.log(data);
    const can_update = new Set(["email","name","password"]);
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
        var update_promise = await user.findOneAndUpdate({_id : id },req.body,{runValidators:true});
        res.status(204).send(update_promise);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get("*",(req,res)=>{
    res.send("404 NOT FOUND");
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
