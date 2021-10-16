import * as dotenv from 'dotenv';
import { connect } from 'mongoose';
dotenv.config();
const pw = process.env.DB_PASSWORD as string;
const uri = `mongodb+srv://banik_1313:${pw}@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority`;

export const connection = connect(uri);

connection.then(():void => {

    console.log(" Connected to MongoDB !! ");

}).catch((err:unknown):void => console.log(err));



