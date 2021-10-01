import * as dotenv from 'dotenv';
import { connect,Error } from 'mongoose';
dotenv.config();
const pw = process.env.DB_PASSWORD;
const uri = `mongodb+srv://banik_1313:${pw}@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority`;

connect(uri).then(():void => {

    console.log(" Connected to MongoDB !! ");

}).catch((err:Error):void => console.log(err));



