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
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../utils/resize"));
const upload_1 = __importDefault(require("../utils/upload"));
const IMG_DIR = 'http://localhost:3000/img/';
const route = express_1.default.Router();
route.post('/', upload_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    const outputFile = yield (0, resize_1.default)(req.file.path, width, height);
    console.log(req.file.path);
    if (!outputFile) {
        res.send('Upload failed: Please use a proper image file');
        return;
    }
    const url = IMG_DIR + outputFile.replace('gallery\\', '');
    res.redirect(url);
}));
exports.default = route;
