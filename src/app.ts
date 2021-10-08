import * as dotenv from "dotenv";
import express, { Response } from 'express';
import "./db/mongoose";
const app = express();
dotenv.config();
import { task_router } from './routes/task_routes';
import { user_router } from './routes/user_routes';
import { IRequest } from "./custom";

const PORT = process.env.PORT;
app.use(express.json());
app.use(user_router);
app.use(task_router);
app.get("/", (req: IRequest, res: Response):void => {
    res.send('<h1 style="text-align:center">Server started Properlly........</h1>');
});
app.get("*", (req: IRequest, res: Response):void => {
    res.send("<h1>404 NOT FOUND......</h1>");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} !!!!!`));
