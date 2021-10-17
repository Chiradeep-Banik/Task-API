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
const app_1 = require("../../../app");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = require("mongoose");
require("../../../db/mongoose");
const user_model_1 = require("../../../models/user_model");
const user_helper_1 = require("../../../helpers/user_helper");
const id = new mongoose_1.Types.ObjectId();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.user.deleteMany({});
    yield user_model_1.user.create({
        "email": "mail1@gmail.com",
        "password": (0, user_helper_1.pass_to_hash)("123QWEqwQe!@#"),
        "name": "USER1",
        "_id": id,
        "tokens": [{ token: yield (0, user_helper_1.generate_token)(id.toString()) }]
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.user.deleteMany({});
    yield mongoose_1.connection.close(true);
}));
describe('Test for POST at /users/login', () => {
    describe('If email or password is not provided', () => {
        var test_obj = [{
                "email": "mail1@gmail.com"
            }, {
                "password": "123QWEqwQe!@#"
            }, {}
        ];
        for (var body in test_obj) {
            test('Should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(app_1.app).post('/users/login').send(body);
                expect(res.status).toBe(400);
            }));
        }
    });
    describe('If everything is provided', () => {
        describe('If User exist', () => {
            test('Should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(app_1.app).post('/users/login').send({
                    'email': 'mail1@gmail.com',
                    'password': '123QWEqwQe!@#'
                });
                expect(res.status).toBe(200);
            }));
            test('Should return auth token in headers', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(app_1.app).post('/users/login').send({
                    'email': 'mail1@gmail.com',
                    'password': '123QWEqwQe!@#'
                });
                expect(res.header).toHaveProperty('authorization');
            }));
            test('Should have only public fields', () => __awaiter(void 0, void 0, void 0, function* () {
                var res = yield (0, supertest_1.default)(app_1.app).post('/users/signup').send({
                    "email": "mail1@gmail.com",
                    "password": "123QWEqwQe!@#",
                    "name": "USER2"
                });
                expect(res.body).not.toHaveProperty('tokens');
                expect(res.body).not.toHaveProperty('password');
            }));
        });
        describe('If User does not exist', () => {
            test('Should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(app_1.app).post('/users/login').send({
                    "email": "mail@gmail.com",
                    "password": "123QWEqwQe!@#"
                });
                expect(res.status).toBe(400);
            }));
        });
    });
    // describe('', ()=>{});
});
