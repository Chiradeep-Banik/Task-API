// require('dotenv').config();
import * as dotenv from "dotenv";
import express, { Application,Response,Request } from 'express';
import "./db/mongoose"; 
const app:Application = express();
// require("./db/mongoose");
dotenv.config();
// import { UserRouter } from './routers/userRouter';
import { router as task_routes } from './routes/task_routes';

const user_routes = require('./routes/user_routes');
// const task_routes = require('./routes/task_routes');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(express.json());
app.use(user_routes);
app.use(task_routes);

app.get("*",(req:Request,res:Response)=>{
    res.send("404 NOT FOUND");
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT} !!!!!`));
