"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../db/mongoose");
const app_1 = require("../../../app");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = require("mongoose");
const task_model_1 = require("../../../models/task_model");
const user_model_1 = require("../../../models/user_model");
const user_helper_1 = require("../../../helpers/user_helper");
const id = new mongoose_1.Types.ObjectId();
var token = '';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.user.deleteMany({});
    yield task_model_1.task.deleteMany({});
    token = yield (0, user_helper_1.generate_token)(id.toString());
    yield user_model_1.user.create({
        "email": "mail1@gmail.com",
        "password": (0, user_helper_1.pass_to_hash)("123QWEqwQe!@#"),
        "name": "USER1",
        "_id": id,
        "tokens": [{ token: token }]
    });
    yield task_model_1.task.create({
        "name": "TASK1",
        "description": "DESCRIPTION1",
        "creator_id": id.toString(),
    });
    yield task_model_1.task.create({
        "name": "TASK2",
        "description": "DESCRIPTION2",
        "creator_id": id.toString(),
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.user.deleteMany({});
    yield task_model_1.task.deleteMany({});
    yield mongoose_1.connection.close(true);
}));
describe('Test for GET at /users/me/tasks', () => {
    describe('Auth token is not provided', () => {
        test('Should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
            var res = yield (0, supertest_1.default)(app_1.app).get('/users/me/tasks');
            expect(res.status).toBe(400);
        }));
    });
    describe('Auth token is provided', () => {
        test('Should return 400 -- for wrong token', () => __awaiter(void 0, void 0, void 0, function* () {
            var res = yield (0, supertest_1.default)(app_1.app).get('/users/me/tasks').set('Authorization', 'Bearer wrong_token');
            expect(res.status).toBe(400);
        }));
        describe('Everything is correct', () => {
            test('Should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
                var res = yield (0, supertest_1.default)(app_1.app).get('/users/me/tasks').set('Authorization', `Bearer ${token}`);
                expect(res.status).toBe(200);
            }));
            test('Should return 404 if the user do not have any tasks', () => __awaiter(void 0, void 0, void 0, function* () {
                yield task_model_1.task.deleteMany({});
                var res = yield (0, supertest_1.default)(app_1.app).get('/users/me/tasks').set('Authorization', `Bearer ${token}`);
                expect(res.status).toBe(404);
            }));
        });
    });
});
