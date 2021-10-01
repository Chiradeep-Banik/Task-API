"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task_update_validator = void 0;
var task_update_validator = (value, value_set) => {
    var data = Object.keys(value.body);
    var to_update = true;
    for (var i = 0; i < data.length; i++) {
        if (!value_set.has(data[i])) {
            to_update = false;
            break;
        }
    }
    return to_update;
};
exports.task_update_validator = task_update_validator;
