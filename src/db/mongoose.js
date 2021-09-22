const { connect } = require('mongoose');

const uri = "mongodb+srv://banik_1313:QLjY6d6xdGDW49N@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority";

connect(uri).then((client) => {

    console.log(" Connected to MongoDB !! ");

}).catch(err => console.log(err));



