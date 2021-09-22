const express= require('express');
const app = express();

require("./db/mongoose");

const user_routes = require('./routes/user_routes');
const task_routes = require('./routes/task_routes');

const PORT = process.env.PORT || 1313;

app.use(express.json());
app.use(user_routes);
app.use(task_routes);

app.get("*",(req,res)=>{
    res.send("404 NOT FOUND");
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
