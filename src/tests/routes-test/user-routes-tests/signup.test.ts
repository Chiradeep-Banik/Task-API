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
describe('Test for POST at /users/signup', () => {
    describe('If password or name or email is not provided',()=>{
        var req_obj = [
            {
                "email":"mail2@gmail.com",
                "name":"USER1"
            },{
                "email":"mail2@gmail.com",
                "password":"123QWEqwQe!@#"
            },{
                "name":"USER1",
                "password":"123QWEqwQe!@#"
            },{
                "password":"123QWEqwQe!@#"
            },{
                "email":"mail2@gmail.com"
            },{
                "name":"USER1"
            },{}
        ];
        for(var body in req_obj){
            test('Should return 400', async () => {
                var res = await supertest(app).post('/users/signup').send(body);
                expect(res.status).toBe(400);
            });
        }
    });
    describe('If everything is provided',()=>{
        test('Should return 200', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail2@gmail.com",
                "password":"123QWEqwQe!@#",
                "name":"USER2"
            });
            expect(res.status).toBe(200);
        });
        test('Should return authorization header', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail2@gmail.com",
                "password":"123QWEqwQe!@#",
                "name":"USER2"
            });
            expect(res.header).toHaveProperty('authorization');
        });
        test('Should have only public fields', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail2@gmail.com",
                "password":"123QWEqwQe!@#",
                "name":"USER2"
            });
            expect(res.body).not.toHaveProperty('tokens');
            expect(res.body).not.toHaveProperty('password');
        });
    });
    describe('If email is already registered',()=>{
        test('Should return 400', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail1@gmail.com",
                "password":"123QWEqwQe!@#",
                "name":"USER2"
            });
            expect(res.status).toBe(400);
        });
    });
    describe('If email is not valid',()=>{
        test('Should return 400', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail@gmailcom",
                "password":"123QWEqwQe!@#",
                "name":"USER1"
            });
            expect(res.status).toBe(400);
        });
    });
    describe('If password is not valid',()=>{
        test('Should return 400', async () => {
            var res = await supertest(app).post('/users/signup').send({
                "email":"mail2@gmail.com",
                "password":"!@#",
                "name":"USER1"
            });
            expect(res.status).toBe(400);
        });
    });
});