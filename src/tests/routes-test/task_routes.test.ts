import { app } from '../../app';
import supertest from 'supertest';
import { task } from '../../models/task_model';
import { user } from '../../models/user_model';
import mongoose from 'mongoose';
import { pass_to_hash, check_user, user_update_validator, generate_token, get_public_fields } from '../../helpers/user_helper';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVjYTRjZjE1OWVhYmVjMzc4N2EiLCJpYXQiOjE2MzQ0NzE2MjZ9.1xqic4oEAnPMezPWu_2eb69HrgMIvMcLNsXcLWuifwg';

// beforeEach(() => {
//     task.deleteMany({});
//     user.deleteMany({});
//     user.create({
//         username: 'test',
//         password:pass_to_hash('test'),
//         email: 'test@gmail.com',
//         tokens: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVjYTRjZjE1OWVhYmVjMzc4N2EiLCJpYXQiOjE2MzQ0NzE2MjZ9.1xqic4oEAnPMezPWu_2eb69HrgMIvMcLNsXcLWuifwg',
//         _id: '616c0eca4cf159eabec3787a'
//     });
// });


