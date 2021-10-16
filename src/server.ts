import * as dotenv from "dotenv";
import { app } from "./app";

dotenv.config();
const PORT = process.env.PORT;
import "./db/mongoose";


app.listen(PORT, () => console.log(`Listening on port ${PORT} !!!!!`));