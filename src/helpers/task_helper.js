var task_update_validator = (value, value_set)=>{
    var data = Object.keys(value);
    var to_update = true;
    for(var i = 0; i < data.length; i++){
        if(!value_set.has(data[i])){
            to_update = false;
            break;
        }
    }
    return to_update;
}

module.exports = {
    task_update_validator
}