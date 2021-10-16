import { app } from '../app';
import supertest from 'supertest';

describe("Test for GET / ", ()=>{
    test ("It should return 200 if the server started",async ()=>{
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
    }); 
});

describe("Test for GET * ", ()=>{
    test("It should return 200 if the route is not there ", async ()=>{
        const response = await supertest(app).get('/some_undefined_route');
        expect(response.status).toBe(200);
    });
});