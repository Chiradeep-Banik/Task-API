const express = require('express');
const { mongoClient } = require('mongodb');
const { Schema, model, connect, save, Collection } = require('mongoose');
const { isEmail } = require('validator');

const pw = 'QLjY6d6xdGDW49N';
const uri = `mongodb+srv://banik_1313:${pw}@cluster0.gdrur.mongodb.net/Task-Manager?retryWrites=true&w=majority`;

connect(uri);

console.log('Connected to MongoDB');
var task_schema = new Schema({
    task_description : {
        type: String,
        required: true,
        maxlength: 500
    },
    completed : {
        type: Boolean,
        default: false,
        required: true
    }
});

var user_schema = new Schema({
    username : {
        type : String,
        required : true,
        maxlength : 10
    },
    email : {
        type : String,
        required : true,
        validate(val){
            if(!isEmail(val))
                throw new Error('Invalid email');
        }
    },
    age : {
        type: Number,
        required: true,
        maxlength: 10
    }
});
var task = model('task',task_schema,'tasks');
var user = model('user', user_schema,'users');

var t1 = new task({
    task_description : 'Task 1 description',
    completed : false
});
var user1 = new user({
    username : 'user1',
    email : 'qwe@123',
    age : 20
});

user1.save().then(res=>console.log(res)).catch(err=>console.log(err));
t1.save().then((res) => console.log(res));

task.find({}).then((res) => console.log(res));


