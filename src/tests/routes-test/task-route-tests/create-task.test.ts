import '../../../db/mongoose';
import { app } from '../../../app';
import supertest from 'supertest';
import { connection,Types } from 'mongoose';
import { task } from '../../../models/task_model';
import { user } from '../../../models/user_model';
import { generate_token,pass_to_hash } from '../../../helpers/user_helper';

const id = new Types.ObjectId();
var token:string = '';
beforeEach( async ()=>{
    await user.deleteMany({});
    await task.deleteMany({});
    token =await generate_token(id.toString());
    await user.create({
        "email":"mail1@gmail.com",
        "password":pass_to_hash("123QWEqwQe!@#"),
        "name":"USER1",
        "_id": id,
        "tokens":[{ token : token }]
    });

    await task.create({
        "name":"TASK1",
        "description":"DESCRIPTION1",
        "creator_id":id.toString(),
    });
    await task.create({
        "name":"TASK2",
        "description":"DESCRIPTION2",
        "creator_id":id.toString(),
    });
});
afterAll( async ()=>{
    await user.deleteMany({});
    await task.deleteMany({});
    await connection.close(true);
});

describe('Test for POST at /users/me/tasks',()=>{
    describe('Auth token is not provided',()=>{
        test('Should return 400',async ()=>{
            var res = await supertest(app).post('/users/me/tasks').send({
                "name":"TASK3",
                "description":"DESCRIPTION3",
            });
            expect(res.status).toBe(400);
        });
    });
    describe('Auth token is provided',()=>{
        test('Should return 400 -- for wrong token',async ()=>{
            var res = await supertest(app).post('/users/me/tasks').set('Authorization','Bearer wrong_token').send({
                "name":"TASK3",
                "description":"DESCRIPTION3",
            });
            expect(res.status).toBe(400);
        });
        describe('Everything is correct',()=>{
            test('Should return 200',async ()=>{
                var res = await supertest(app).post('/users/me/tasks').set('Authorization',`Bearer ${token}`).send({
                    "name":"TASK3",
                    "description":"DESCRIPTION3",
                });
                expect(res.status).toBe(200);
            });
        });
    });
});

