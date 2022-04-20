"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const isCached = (image, width = NaN, height = NaN) => {
    let destination;
    // no resize values in image search
    if (!width && !height) {
        destination = path_1.default.normalize(__dirname + '/../../gallery/' + image);
        if (fs_1.default.existsSync(destination))
            return destination;
        return false;
    }
    // construct and search image name with resize values
    const extension = image.match(/\.\w+$/)[0];
    const name = image.replace(extension, '');
    let resizedName = name + '@' + `${width !== null && width !== void 0 ? width : ''}x${height !== null && height !== void 0 ? height : ''}` + extension;
    destination = path_1.default.normalize(__dirname + '/../../gallery/' + resizedName);
    if (fs_1.default.existsSync(destination))
        return destination;
    return false;
};
exports.default = isCached;
