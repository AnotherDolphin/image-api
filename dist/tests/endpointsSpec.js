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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('get main/home endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('upload sample image from local dir', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request
            .post('/post')
            .attach('image', './src/tests/sample.png');
        expect(fs_1.default.existsSync('./gallery/sample.png')).toBeTrue();
    }));
    xit('request cached image', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/sample.png');
        expect(query.status).toBe(200);
    }));
    it('request a missing image', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/bad-path.png');
        expect(query.text).toBe('Image does not exist');
    }));
    // it('requests new image size', async () => {
    //     const query = await request.get('/img/sample.png?height=100')
    //     expect(query.status).toBe(200)
    // })
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.unlink('./gallery/sample.png', err => {
            console.log(err !== null && err !== void 0 ? err : 'deleted uploaded test image sample');
        });
        fs_1.default.unlink('./gallery/sample@x100.png', err => {
            console.log(err !== null && err !== void 0 ? err : 'deleted resized test image sample');
        });
    }));
});
