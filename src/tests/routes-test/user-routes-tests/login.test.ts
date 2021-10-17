import { app } from '../../../app';
import supertest from 'supertest';
import { connection,Types } from 'mongoose';
import '../../../db/mongoose';
import { user } from '../../../models/user_model';
import { generate_token,pass_to_hash } from '../../../helpers/user_helper';

const id = new Types.ObjectId();

beforeEach( async ()=>{
    await user.deleteMany({});
    await user.create({
        "email":"mail1@gmail.com",
        "password":pass_to_hash("123QWEqwQe!@#"),
        "name":"USER1",
        "_id": id,
        "tokens":[{ token : await generate_token(id.toString()) }]
    });
});
afterAll( async ()=>{
    await user.deleteMany({});
    await connection.close(true);
});

describe('Test for POST at /users/login', ()=>{
    describe('If email or password is not provided', ()=>{
        var test_obj = [{
            "email":"mail1@gmail.com"   
        },{
            "password":"123QWEqwQe!@#"   
        },{}
        ];
        for(var body in test_obj){
            test('Should return 400', async ()=>{
                const res = await supertest(app).post('/users/login').send(body);
                expect(res.status).toBe(400);
            });
        }
    });
    describe('If everything is provided', ()=>{
        describe('If User exist', ()=>{
            test('Should return 200', async ()=>{               
                const res = await supertest(app).post('/users/login').send({
                    'email': 'mail1@gmail.com',
                    'password': '123QWEqwQe!@#'
                });
                expect(res.status).toBe(200);
            });
            test('Should return auth token in headers', async ()=>{
                const res = await supertest(app).post('/users/login').send({
                    'email': 'mail1@gmail.com',
                    'password': '123QWEqwQe!@#'
                });
                expect(res.header).toHaveProperty('authorization');
            });
            test('Should have only public fields', async () => {
                var res = await supertest(app).post('/users/signup').send({
                    "email":"mail1@gmail.com",
                    "password":"123QWEqwQe!@#",
                    "name":"USER2"
                });
                expect(res.body).not.toHaveProperty('tokens');
                expect(res.body).not.toHaveProperty('password');
            });
        });
        describe('If User does not exist', ()=>{
            test('Should return 400', async ()=>{
                const res = await supertest(app).post('/users/login').send({
                    "email":"mail@gmail.com",
                    "password":"123QWEqwQe!@#"
                });
                expect(res.status).toBe(400);
            });
        });
    });
    // describe('', ()=>{});
});