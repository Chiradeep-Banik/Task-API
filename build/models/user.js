"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
;
;
const user_schema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
        unique: true,
        // validate: {
        //     validator(value:string){
        //         if(!isEmail(value))
        //             throw new Error("Invalid email");
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
exports.user = (0, mongoose_1.model)('user', user_schema, 'Users');
