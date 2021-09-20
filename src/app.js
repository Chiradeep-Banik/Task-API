const express = require('express');
const app = express();

require("./db/mongoose");
const { user } = require("./models/user");
const { task } = require("./models/task");
const { ObjectId } = require('mongoose');

const PORT = process.env.PORT || 1313;

app.use(express.json());

app.post('/tasks', (req, res) => {
    console.log(req.body);
    task.create(req.body,).then(() => {
        console.log(task);
        res.sendStatus(201);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
app.post('/users', (req, res) => {
    console.log(req.body);
    user.create(req.body).then(() =>{
        console.log(user);
        res.sendStatus(201);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
app.get('/tasks', (req, res) => {
    task.find({}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
app.get('/tasks/:id',(req,res)=>{
    var id = req.params.id;
    task.find({_id: id}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
app.get('/users', (req, res) => {
    user.find({}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
app.get('/users/:id',(req,res)=>{
    var id = req.params.id;
    user.find({_id: id}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(err =>{
        res.status(400).send(err);
    });
});

app.delete('/tasks',(req,res)=>{    
    task.deleteMany({}).then(()=>{
        res.status(200).send("Deleted all tasks");
    }).catch(err=>{
        res.status(400).send(err);
    }); 
});
app.delete('/tasks/:id',(req,res)=>{
    var id = req.params.id;
    task.deleteOne({_id: id}).then((re)=>{
        console.log(task);
        res.status(204).send(re);
    }).catch(err=>{
        res.status(400).send(err);
    });
});
app.delete('/users',(req,res)=>{    
    user.deleteMany({}).then(()=>{
        res.status(200).send("Deleted all tasks");
    }).catch(err=>{
        res.status(400).send(err);
    }); 
});
app.delete('/users/:id',(req,res)=>{
    var id = req.params.id;
    user.deleteOne({_id: id}).then((re)=>{
        console.log(task);
        res.status(204).send(re);
    }).catch(err=>{
        res.status(400).send(err);
    });
});


app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
