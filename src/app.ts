import * as dotenv from "dotenv";
import express, { Application,Response } from 'express';
import "./db/mongoose"; 
const app:Application = express();
dotenv.config();
import { router as task_routes } from './routes/task_routes';
import { router as user_routes } from './routes/user_routes';
import { IRequest } from "./custom";

const PORT = process.env.PORT;
app.use(express.json());
app.use(user_routes);
app.use(task_routes);

app.get("*",(req:IRequest, res:Response):void=>{
    res.send("404 NOT FOUND");
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT} !!!!!`));
