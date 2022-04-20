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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resize = (inputFile, width = NaN, height = NaN) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // set target width and/or height if provided
        const options = {};
        if (width)
            options.width = width;
        if (height)
            options.height = height;
        // construct outfile name
        const extension = inputFile.match(/\.\w+$/)[0];
        const name = inputFile.replace(extension, '');
        let outputFile = name +
            '@' +
            ((_a = options.width) !== null && _a !== void 0 ? _a : '') +
            'x' +
            ((_b = options.height) !== null && _b !== void 0 ? _b : '') +
            extension;
        // return img if this size is cached
        if (fs_1.default.existsSync(outputFile))
            return outputFile;
        // resize and return new image
        const resized = (0, sharp_1.default)(inputFile).resize(options);
        yield resized.toFile(outputFile);
        return outputFile;
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = resize;
