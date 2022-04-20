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
const resize_1 = __importDefault(require("../utils/resize"));
const image_size_1 = __importDefault(require("image-size"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('specpecpe thisisis', () => {
    it('expect this to equal 6', () => {
        expect(2 * 3).toEqual(6);
    });
    it('test image resizing', () => __awaiter(void 0, void 0, void 0, function* () {
        const imgPath = path_1.default.resolve('./gallery/shot.png');
        const resizedFile = yield (0, resize_1.default)(imgPath, 200);
        const dimensions = yield (0, image_size_1.default)(resizedFile);
        expect(dimensions.width).toEqual(200);
    }));
});
fdescribe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('request resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield request.get('/img/shot.png?height=100');
        expect(query.status).toBe(200);
    }));
});
