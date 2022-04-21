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
const isCached_1 = __importDefault(require("../utils/isCached"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test route responses', () => {
    it('upload sample image from local dir', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request
            .post('/post')
            .attach('image', './src/tests/sample.png');
        expect((0, isCached_1.default)('sample.png')).toBeTruthy();
    }));
    it('request cached image', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/sample.png');
        expect(query.status).toBe(200);
    }));
    it('request a missing image', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/bad-path.png');
        expect(query.text).toBe('Image does not exist');
    }));
    it('request image without extension', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/bad-path');
        expect(query.text).toBe('requested image file missing extension');
    }));
    it('requests new image size', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/sample.png?height=100');
        expect(query.status).toBe(200);
    }));
    // delete generated test images after testing
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.unlink('./gallery/sample.png', err => {
            console.log(err !== null && err !== void 0 ? err : 'deleted uploaded test image sample');
        });
        fs_1.default.unlink('./gallery/sample@x100.png', err => {
            console.log(err !== null && err !== void 0 ? err : 'deleted resized test image sample');
        });
    }));
});
