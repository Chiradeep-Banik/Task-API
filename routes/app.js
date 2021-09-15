console.log('app.js loaded');

const {MongoClient: mongo_client, ObjectId } = require('mongodb');

const pw = 'QLjY6d6xdGDW49N';
const uri = `mongodb+srv://banik_1313:${pw}@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority`;

// mongo_client.connect(uri, { useNewUrlParser: true }, (err, client) => {
//     if(err) return console.log(err);
//     console.log('Connected to database');

// });
const client = mongo_client.connect(uri,{ useNewUrlParser:true });

client.then(client => {
    const db = client.db ('Task-Manager');
    var users = db.collection('users');
    var tasks = db.collection('tasks');

    var p = users.deleteMany({name:'aaa'});
    var p1 = tasks.insertMany([
        {
            _id: new ObjectId(),
            name:'task1',
            description:'task1 description',
        },
        {
            _id: new ObjectId(),
            name:'task2',
            description:'task2 description',
        }
    ]);
    p.then(result => console.log(result)).catch(err => console.log(err));
    p1.then(result => console.log(result)).catch(err => console.log(err));

}).catch(err => console.log(err));