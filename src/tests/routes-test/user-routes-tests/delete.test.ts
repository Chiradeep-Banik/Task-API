import { app } from '../../../app';
import supertest from 'supertest';
import { connection,Types } from 'mongoose';
import '../../../db/mongoose';
import { user } from '../../../models/user_model';
import { task } from '../../../models/task_model';
import { generate_token,pass_to_hash } from '../../../helpers/user_helper';

const id = new Types.ObjectId();
var token:string = '';
beforeEach( async ()=>{
    await user.deleteMany({});
    token =await generate_token(id.toString());
    await user.create({
        "email":"mail1@gmail.com",
        "password":pass_to_hash("123QWEqwQe!@#"),
        "name":"USER1",
        "_id": id,
        "tokens":[{ token : token }]
    });
});
afterAll( async ()=>{
    await user.deleteMany({});
    await connection.close(true);
});

describe('Test for DELETE at /users/me',()=>{
    describe('Auth token is not provided',()=>{
        test('Should return 400',async ()=>{
            var res = await supertest(app).delete('/users/me');
            expect(res.status).toBe(400);
        });
    });
    describe('Auth token is provided',()=>{
        test('Should return 400 -- for wrong token',async ()=>{
            var res = await supertest(app).delete('/users/me').set('Authorization','Bearer wrong_token');
            expect(res.status).toBe(400);
        });
        describe('Everything is correct',()=>{
            test('Should return 200',async ()=>{
                var res = await supertest(app).delete('/users/me').set('Authorization',`Bearer ${token}`);
                expect(res.status).toBe(200);
            });
            test('Should delete every trace of the user',async ()=>{
                var res = await supertest(app).delete('/users/me').set('Authorization',`Bearer ${token}`);
                var user_res = await user.findById(id.toString());
                expect(user_res).toBe(null);
            });
            test('Should delete the all the tasks of the user',async ()=>{
                var res = await supertest(app).delete('/users/me').set('Authorization',`Bearer ${token}`);
                var tasks_res = await task.find({creator_id:id.toString()});
                expect(tasks_res).toEqual([]);
            });
        });
    });
});