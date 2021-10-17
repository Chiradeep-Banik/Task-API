import { app } from '../../../app';
import supertest from 'supertest';
import { connection,Types } from 'mongoose';
import '../../../db/mongoose';
import { user } from '../../../models/user_model';
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

describe('Test for POST at /users/me/logout',()=>{
    describe('Auth token is not provided',()=>{
        test('Should return 400',async ()=>{
            var res = await supertest(app).post('/users/me/logout');
            expect(res.status).toBe(400);
        });
    });
    describe('Auth token is provided',()=>{
        test('Should return 400 -- for wrong token',async ()=>{
            var res = await supertest(app).post('/users/me/logout').set('Authorization','Bearer wrong_token');
            expect(res.status).toBe(400);
        });
        describe('Everything is correct',()=>{
            test('Should return 200',async ()=>{
                var res = await supertest(app).post('/users/me/logout').set('Authorization',`Bearer ${token}`);
                expect(res.status).toBe(200);
            });
            test('Should have only public fields', async () => {
                var res = await supertest(app).post('/users/me/logout').set('Authorization', `Bearer ${token}`);
                expect(res.body).not.toHaveProperty('tokens');
                expect(res.body).not.toHaveProperty('password');
            });
        });
    });
});

describe('Test for POST at /users/me/logoutall',()=>{
    describe('Auth token is not provided',()=>{
        test('Should return 400',async ()=>{
            var res = await supertest(app).post('/users/me/logoutall');
            expect(res.status).toBe(400);
        });
    });
    describe('Auth token is provided',()=>{
        test('Should return 400 -- for wrong token',async ()=>{
            var res = await supertest(app).post('/users/me/logoutall').set('Authorization','Bearer wrong_token');
            expect(res.status).toBe(400);
        });
        describe('Everything is correct',()=>{
            test('Should return 200',async ()=>{
                var res = await supertest(app).post('/users/me/logoutall').set('Authorization',`Bearer ${token}`);
                expect(res.status).toBe(200);
            });
            test('Should have only public fields', async () => {
                var res = await supertest(app).post('/users/me/logoutall').set('Authorization', `Bearer ${token}`);
                expect(res.body).not.toHaveProperty('tokens');
                expect(res.body).not.toHaveProperty('password');
            });
        });
    });
});