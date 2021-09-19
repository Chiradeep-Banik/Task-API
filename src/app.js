const express = require('express');
const app = express();

require("./db/mongoose");
const { user } = require("./models/user");
const { task } = require("./models/task");


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

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
