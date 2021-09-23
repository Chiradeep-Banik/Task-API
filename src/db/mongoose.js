require('dotenv').config();

const { connect } = require('mongoose');
const pw = process.env.DB_PASSWORD;
const uri = `mongodb+srv://banik_1313:${pw}@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority`;

connect(uri).then((client) => {

    console.log(" Connected to MongoDB !! ");

}).catch(err => console.log(err));



