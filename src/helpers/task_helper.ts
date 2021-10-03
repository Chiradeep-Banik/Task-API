import { IRequest } from '../custom';
export var task_update_validator = (value:IRequest, value_set:Set<string>):Boolean=>{
    var data = Object.keys(value.body);
    var to_update = true;
    for(var i = 0; i < data.length; i++){
        if(!value_set.has(data[i])){
            to_update = false;
            break;
        }
    }
    return to_update;
}