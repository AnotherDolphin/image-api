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
const path_1 = __importDefault(require("path"));
const isCached_1 = __importDefault(require("../utils/isCached"));
const resize_1 = __importDefault(require("../utils/resize"));
const IMG_DIR = __dirname + '/../../gallery/';
const route = express_1.default.Router();
// middleware to process resize query
const checkResizeQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const width = (_a = parseInt(req.query.width)) !== null && _a !== void 0 ? _a : NaN;
    const height = (_b = parseInt(req.query.height)) !== null && _b !== void 0 ? _b : NaN;
    try {
        const imageCached = (0, isCached_1.default)(req.params.name, width, height);
        if (imageCached) {
            // serve image with if chached with provided dimensions
            res.locals.target = imageCached;
            return next();
        }
    }
    catch (err) {
        // handle missing filename extension in url
        let m = err;
        return res.send(m.message);
    }
    const image = path_1.default.normalize(IMG_DIR + req.params.name);
    // skip resize if url has no resize query
    if (!req.query.width && !req.query.height) {
        res.locals.target = image;
        return next();
    }
    // get resized image from cache or resize new
    res.locals.target = yield (0, resize_1.default)(image, width, height);
    next();
});
// serve target image / handle not found
route.get('/:name', checkResizeQuery, (req, res) => {
    res.sendFile(res.locals.target, (err) => {
        if (err)
            res.send('Image does not exist').end();
        else
            res.end();
    });
});
// redirect empty /image requests to home
route.get('/', (req, res) => res.redirect('/'));
exports.default = route;
