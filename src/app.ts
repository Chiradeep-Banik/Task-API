import express, { Response } from 'express';
export const app = express();
import { task_router } from './routes/task_routes';
import { user_router } from './routes/user_routes';
import { IRequest } from "./custom";

app.use(express.json());
app.use(user_router);
app.use(task_router);
app.get("/", (req: IRequest, res: Response):void => {
    res.send('<h1 style="text-align:center">Server started Properly........</h1>');
});
app.get("*", (req: IRequest, res: Response):void => {
    res.send("<h1>404 NOT FOUND......</h1>");
});

