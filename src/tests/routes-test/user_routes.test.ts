import { app } from '../../app';
import supertest from 'supertest';
import { pass_to_hash, check_user, user_update_validator, generate_token, get_public_fields } from '../../helpers/user_helper';


describe('Test for POST at /users/signup', () => {
    describe('If password is not provided',()=>{
        test('Should return 400', async () => {
            var res = await supertest(app).post('/users/signup').send({
                email: 'test@mail.com',
                name:"USER1"
            });
            expect(res.status).toBe(400);
        });
    });
});