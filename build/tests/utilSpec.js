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
const resize_1 = __importDefault(require("../utils/resize"));
const image_size_1 = __importDefault(require("image-size"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test image transformation and image finding utilities', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // upload a sample to test utilities on
        const query = yield request
            .post('/post')
            .attach('image', './src/tests/sample.png');
    }));
    it('test isCached() to find image', () => {
        expect((0, isCached_1.default)('sample.png')).toBeTruthy();
    });
    it('test resize() to correctly transform an image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)('./src/tests/sample.png', 150, 150);
        expect((0, image_size_1.default)('./src/tests/sample@150x150.png').width).toEqual(150);
    }));
    // delete generated test images after testing
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.unlink('./gallery/sample.png', err => {
            console.log('deleted uploaded test image sample');
        });
        fs_1.default.unlink('./gallery/sample@150x150.png', err => {
            console.log('deleted transformed test image sample');
        });
    }));
});
