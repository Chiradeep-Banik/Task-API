const { Schema,model } = require('mongoose');

const task_schema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    isCompleted:{
        type: Boolean,
        trim: true,
        default: false
    }
});

const task = model('task', task_schema,'Tasks');

module.exports = {
    task : task
};